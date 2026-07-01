import { supabase } from './supabase';
import { Product, PRODUCTS as STATIC_PRODUCTS } from './productsData';

const clean = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

// Normalize local asset paths to use the current BASE_URL (handles dev vs prod)
const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

const normalizeImg = (url: string): string => {
  if (!url || url.startsWith('http') || url.startsWith('data:')) return url;
  // Strip any existing /demo prefix so we can re-apply cleanly
  const path = url.replace(/^\/demo/, '').replace(/^\//, '');
  return base + '/' + path;
};

const normalizeProduct = (p: Product): Product => ({
  ...p,
  image: normalizeImg(p.image),
  images: p.images?.map(normalizeImg),
});

export const productService = {
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return data?.length ? (data as Product[]).map(normalizeProduct) : [...STATIC_PRODUCTS];
    } catch {
      return [...STATIC_PRODUCTS];
    }
  },

  async getProductsAdmin(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return (data ?? []) as Product[];
  },

  async saveProduct(product: Product): Promise<void> {
    const { error } = await supabase.from('products').upsert(clean(product));
    if (error) throw error;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  },

  async seedProducts(products: Product[]): Promise<void> {
    const { error } = await supabase.from('products').upsert(products.map(clean));
    if (error) throw error;
  },
};
