import { imgUrl } from './utils';
import { BlogPost, Category, MediaItem, Comment, BlogSettings, Author } from '../types/blog';
import { INITIAL_BLOG_POSTS } from './initialArticles';
import { supabase } from './supabase';

const generateUUID = () => Date.now() + Math.random().toString(36).substr(2, 9);

const DEFAULT_SETTINGS: BlogSettings = {
  blogTitle: "Destiny Numbers — Insights",
  blogDescription: "Expert insights into the mystical world of Numerology, Astrology, and Vastu.",
  postsPerPage: 6,
  featuredPostEnabled: true,
  commentsEnabled: true,
  relatedPostsEnabled: true,
  readingProgressBar: true,
  socialSharing: { whatsapp: true, twitter: true, linkedin: true, copyLink: true }
};

const DEFAULT_CATEGORIES: Category[] = [
  { name: 'Numerology', color: '#C9A84C', postCount: 0 },
  { name: 'Astrology', color: '#4C63C9', postCount: 0 },
  { name: 'Vastu', color: '#4CC9A8', postCount: 0 },
  { name: 'Tarot', color: '#C94C63', postCount: 0 },
  { name: 'Remedies', color: '#9B4CC9', postCount: 0 },
  { name: 'Lifestyle', color: '#C99B4C', postCount: 0 }
];

export const blogService = {
  getPosts: async (forceAll = false): Promise<BlogPost[]> => {
    try {
      let query = supabase.from('posts').select('*');
      if (!forceAll) {
        query = query.eq('status', 'published').eq('visibility', 'public');
      }
      const { data, error } = await query;
      if (error) throw error;

      const posts = (data ?? []) as BlogPost[];
      const dbIds = new Set(posts.map(p => p.id));
      const dbSlugs = new Set(posts.map(p => p.slug));

      const merged = [...posts];
      for (const p of INITIAL_BLOG_POSTS) {
        if (!dbIds.has(p.id) && !dbSlugs.has(p.slug)) {
          if (forceAll || (p.status === 'published' && p.visibility === 'public')) {
            merged.push(p);
          }
        }
      }

      merged.sort((a, b) =>
        new Date(b.createdAt || b.publishDate || 0).getTime() -
        new Date(a.createdAt || a.publishDate || 0).getTime()
      );
      return merged;
    } catch (e) {
      console.warn('getPosts failed, falling back:', e);
      const local = localStorage.getItem('dn_blog_posts');
      if (local) { try { return JSON.parse(local); } catch { } }
      return INITIAL_BLOG_POSTS;
    }
  },

  getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    try {
      const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single();
      if (error || !data) return INITIAL_BLOG_POSTS.find(p => p.slug === slug);
      return data as BlogPost;
    } catch {
      return INITIAL_BLOG_POSTS.find(p => p.slug === slug);
    }
  },

  getPostById: async (id: string): Promise<BlogPost | undefined> => {
    try {
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
      if (error || !data) return INITIAL_BLOG_POSTS.find(p => p.id === id);
      return data as BlogPost;
    } catch {
      return INITIAL_BLOG_POSTS.find(p => p.id === id);
    }
  },

  savePost: async (post: BlogPost): Promise<void> => {
    const id = post.id || generateUUID();
    const now = new Date().toISOString();

    let revisions = post.revisions ?? [];
    try {
      const { data: existing } = await supabase.from('posts').select('content,updatedAt,wordCount,revisions').eq('id', id).single();
      if (existing) {
        revisions = [{ date: existing.updatedAt, content: existing.content, wordCount: existing.wordCount }, ...(existing.revisions ?? [])].slice(0, 5);
      }
    } catch { }

    const updatedPost = {
      ...post,
      id,
      updatedAt: now,
      createdAt: post.createdAt || now,
      revisions,
    };

    const { error } = await supabase.from('posts').upsert(updatedPost);
    if (error) throw error;
    await blogService.updateCategoryCounts();
    window.dispatchEvent(new Event('cms-update'));
  },

  deletePost: async (id: string): Promise<void> => {
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) throw error;
    await blogService.updateCategoryCounts();
    window.dispatchEvent(new Event('cms-update'));
  },

  incrementViews: async (slug: string): Promise<void> => {
    try {
      const { data } = await supabase.from('posts').select('id,views').eq('slug', slug).single();
      if (data) {
        await supabase.from('posts').update({ views: (data.views || 0) + 1 }).eq('id', data.id);
      }
    } catch { }
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) throw error;
      return (data?.length ? data : DEFAULT_CATEGORIES) as Category[];
    } catch {
      return DEFAULT_CATEGORIES;
    }
  },

  saveCategory: async (category: Category): Promise<void> => {
    const { error } = await supabase.from('categories').upsert(category);
    if (error) throw error;
  },

  deleteCategory: async (name: string, fallbackCategory = 'Uncategorized'): Promise<void> => {
    const posts = await blogService.getPosts();
    for (const p of posts) {
      if (p.category === name) {
        await blogService.savePost({ ...p, category: fallbackCategory });
      }
    }
    const { error } = await supabase.from('categories').delete().eq('name', name);
    if (error) throw error;
    await blogService.updateCategoryCounts();
  },

  updateCategoryCounts: async (): Promise<void> => {
    try {
      const [posts, categories] = await Promise.all([blogService.getPosts(), blogService.getCategories()]);
      const counts: Record<string, number> = {};
      posts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
      await Promise.all(categories.map(cat => blogService.saveCategory({ ...cat, postCount: counts[cat.name] || 0 })));
    } catch (e) {
      console.error('updateCategoryCounts failed:', e);
    }
  },

  // Media
  getMedia: async (): Promise<MediaItem[]> => {
    try {
      const { data, error } = await supabase.from('media').select('*').order('date', { ascending: false });
      if (error) throw error;
      return (data ?? []) as MediaItem[];
    } catch {
      return [];
    }
  },

  saveMedia: async (item: MediaItem): Promise<void> => {
    const { error } = await supabase.from('media').upsert(item);
    if (error) throw error;
  },

  deleteMedia: async (id: string): Promise<void> => {
    const { error } = await supabase.from('media').delete().eq('id', id);
    if (error) throw error;
  },

  // Comments
  getComments: async (): Promise<Comment[]> => {
    try {
      const { data, error } = await supabase.from('comments').select('*');
      if (error) throw error;
      return (data ?? []) as Comment[];
    } catch {
      return [];
    }
  },

  getCommentsBySlug: async (slug: string): Promise<Comment[]> => {
    try {
      const { data, error } = await supabase.from('comments').select('*').eq('articleSlug', slug).eq('status', 'approved');
      if (error) throw error;
      return (data ?? []) as Comment[];
    } catch {
      return [];
    }
  },

  saveComment: async (comment: Comment): Promise<void> => {
    const id = comment.id || generateUUID();
    const { error } = await supabase.from('comments').upsert({ ...comment, id, date: comment.date || new Date().toISOString() });
    if (error) throw error;
  },

  deleteComment: async (id: string): Promise<void> => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) throw error;
  },

  // Settings
  getSettings: async (): Promise<BlogSettings> => {
    try {
      const { data, error } = await supabase.from('settings').select('value').eq('key', 'blog').single();
      if (error || !data) return DEFAULT_SETTINGS;
      return data.value as BlogSettings;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: async (settings: BlogSettings): Promise<void> => {
    const { error } = await supabase.from('settings').upsert({ key: 'blog', value: settings });
    if (error) throw error;
  },

  getAuthors: (): Author[] => [
    { name: 'Arun Poovaiah', role: 'Master Numerologist', avatar: imgUrl('/assets/img/arun-profile.jpg'), bio: 'Expert with 15+ years experience in Cosmic Vibrations.' },
    { name: 'Destiny Team', role: 'Content Editors', avatar: '', bio: 'Curating wisdom for the global soul.' }
  ],

  saveAutosave: (post: Partial<BlogPost>): void => {
    localStorage.setItem('dn_autosave', JSON.stringify({ post, timestamp: Date.now() }));
  },

  getAutosave: (): { post: Partial<BlogPost>; timestamp: number } | null => {
    const data = localStorage.getItem('dn_autosave');
    return data ? JSON.parse(data) : null;
  },

  clearAutosave: (): void => {
    localStorage.removeItem('dn_autosave');
  }
};
