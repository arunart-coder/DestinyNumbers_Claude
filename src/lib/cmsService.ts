import { imgUrl } from './utils';
import { BlogPost, HeroBanner } from '../types/blog';
import { supabase } from './supabase';
import { compressBase64Image, compressCMSImages } from './cmsImageUtils';

export interface ServiceItem { id: string; title: string; description: string; image: string; }
export interface Testimonial { id: string; name: string; city: string; quote: string; rating: number; image?: string; }
export interface PricingTier { id: string; name: string; price: string; badge: string; valid: string; consultations: string; features: string[]; cta: string; popular: boolean; theme: 'silver' | 'gold' | 'diamond' | 'platinum'; }
export interface HeroSlide { id: string; image: string; title: string; subtitle: string; }
export interface BioData { name: string; surname: string; tagline: string; description: string; image: string; stats: { label: string; value: string }[]; }
export interface NavLink { label: string; path: string; }

export interface CMSData {
  hero: HeroBanner;
  slides: HeroSlide[];
  bio: BioData;
  navLinks: NavLink[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  siteTagline: string;
}

const CMS_KEY = 'cms';

export const DEFAULT_CMS: CMSData = {
  hero: {
    title: "Decode Your Destiny",
    subtitle: "Expert Numerology, Astrology & Vastu Consultation — trusted by 5,000+ souls across India",
    image: imgUrl('/assets/img/Astrology.jpg'),
    ctaText: "Book a Session",
    ctaLink: "#pricing"
  },
  slides: [
    { id: '1', image: imgUrl('/assets/img/Astrology.jpg'), title: "Decode Your Destiny", subtitle: "Expert Numerology, Astrology & Vastu Consultations trusted by 5,000+ global seekers." },
    { id: '2', image: imgUrl('/assets/img/slide-astrology-1.jpg'), title: "Align with the Stars", subtitle: "Discover how celestial movements shape your personal and professional journey." },
    { id: '3', image: imgUrl('/assets/img/slide-astrology-2.jpg'), title: "Harmonize Your Space", subtitle: "Transform your environment into a sanctuary of energy, prosperity, and peace." }
  ],
  bio: {
    name: "Dr. Arun", surname: "Poovaiah", tagline: "Master Numerologist & Nadi Astrologer",
    description: "Dr. Arun Poovaiah, founder of Destiny Numbers, applies the science of Numerology and Nakshatra Nadi to help people across the world find clarity, direction, and purpose.",
    image: imgUrl('/assets/img/arun-profile.jpg'),
    stats: [
      { label: "Precision Analysis", value: "Advanced degree-based Dasha and Nakshatra alignment." },
      { label: "Global Authority", value: "Strategic consulting for HNWIs and brand identity." }
    ]
  },
  navLinks: [
    { label: 'Home', path: '/' }, { label: 'About', path: '/about' }, { label: 'Services', path: '/services' },
    { label: 'Products', path: '/products' }, { label: 'Academy', path: '/academy' },
    { label: 'Blog', path: '/blog' }, { label: 'FREE Tools', path: '/tools' }
  ],
  siteTagline: "✦ Destiny Numbers ✦",
  services: [
    { id: '1', title: 'Numerology', description: 'Decode the secret vibrations of your name and birth date.', image: imgUrl('/assets/img/svc-numerology.jpg') },
    { id: 'm1', title: 'Mobile Numerology', description: 'Transform your digital frequency.', image: imgUrl('/assets/img/svc-mobile.jpg') },
    { id: '2', title: 'Astrology', description: 'Precision mapping through Maharishi Parashara and Nakshatra Nadi systems.', image: imgUrl('/assets/img/svc-astrology.jpg') },
    { id: '2c', title: 'Horoscope Analysis', description: 'Deep cosmic mapping of planetary positions at birth.', image: imgUrl('/assets/img/svc-horoscope.jpg') },
    { id: '2b', title: 'Dasha & Transit Analysis', description: 'Decode your divine timing.', image: imgUrl('/assets/img/svc-dasha.jpg') },
    { id: '3', title: 'Vastu', description: 'Ancient Vastu Shastra wisdom for harmony and prosperity.', image: imgUrl('/assets/img/svc-vastu.jpg') },
    { id: '4', title: 'Tarot Guidance', description: 'Unlock sacred intuition with the wisdom of the cards.', image: imgUrl('/assets/img/svc-tarot.jpg') },
    { id: '4-free', title: 'Free Tarot Reading', description: 'Instant Yes/No guidance using Rider-Waite cards.', image: imgUrl('/assets/img/svc-tarot.jpg') },
    { id: '5', title: 'Name Analysis', description: 'Ensure your name resonates with success and harmony.', image: imgUrl('/assets/img/svc-name.jpg') },
    { id: '6', title: 'Aura Reading', description: 'Decode the energetic field surrounding your soul.', image: imgUrl('/assets/img/svc-aura.jpg') },
  ],
  testimonials: [
    { id: '1', name: 'Linda Ibañez', city: 'Chile-Argentina', quote: 'Recomiendo en un 100%. La experiencia promete ser muy mística...', rating: 5, image: imgUrl('/assets/img/Linda.jpg') },
    { id: '2', name: 'Pramita', city: 'Entrepreneur', quote: "You are blessing of God in my life...", rating: 5, image: imgUrl('/assets/img/pramita.jpg') },
    { id: '3', name: 'Nidhi Shetty', city: 'Educationist', quote: "Extremely knowledgeable! His remedies work like magic.", rating: 5, image: imgUrl('/assets/img/nidhi.jpg') },
    { id: 'deepa', name: 'Deepa S', city: 'Engineer', quote: "My son's numerology number was given by him. Very satisfied.", rating: 5, image: imgUrl('/assets/img/deepa.jpg') },
    { id: 'priyanka', name: 'Priyanka Prasaath', city: 'Psychologist', quote: "His astrological predictions are on point.", rating: 5, image: imgUrl('/assets/img/priyanka.jpg') },
    { id: 'surabhi', name: 'Surabhi', city: 'Home Maker', quote: "He was the best astrologer I have spoken with.", rating: 5, image: imgUrl('/assets/img/surabhi.jpg') },
    { id: 'dhanya', name: 'Dr. Dhanya', city: 'Doctor', quote: "Very knowledgeable. Easy remedies, highly recommended.", rating: 5, image: imgUrl('/assets/img/Dr.Dhanya.jpg') },
    { id: 'rashmika', name: 'Rashmika A', city: 'IT Manager', quote: "Superbbb accuracy of my present life.", rating: 5, image: imgUrl('/assets/img/ras.png') },
    { id: '4', name: 'Meera Krishnan', city: 'Chennai', quote: 'A rare combination of Nadi Astrology and modern analytical precision.', rating: 5, image: imgUrl('/assets/img/testimonial-meera.jpg') },
    { id: '5', name: 'Ankita Rao', city: 'Hyderabad', quote: "The resonance analysis gave us the confidence to move forward.", rating: 5, image: imgUrl('/assets/img/testimonial-ankita.jpg') },
    { id: '6', name: 'Deepak J.', city: 'Pune', quote: 'Professional, results-oriented, and highly empathetic.', rating: 5, image: imgUrl('/assets/img/testimonial-deepak.jpg') },
    { id: '7', name: 'Siddharth M.', city: 'Singapore', quote: 'The depth of analysis was extraordinary.', rating: 5, image: imgUrl('/assets/img/testimonial-siddharth.jpg') },
    { id: '8', name: 'Kavita Menon', city: 'Kochi', quote: 'Found clarity during a very confusing phase of my career.', rating: 5, image: imgUrl('/assets/img/testimonial-kavita.jpg') },
  ],
  pricing: [
    { id: 'silver', name: 'SILVER MOON', price: '3,333', badge: 'Begin Your Journey', valid: '3 Months', consultations: '2 Consultations', features: ['Date of Birth Analysis', 'Name Numerology', 'Mobile Number Analysis', 'Health & Career Guidance'], cta: 'Start with Silver', popular: false, theme: 'silver' },
    { id: 'gold', name: 'GOLDEN STAR', price: '5,100', badge: 'Best Value', valid: '5 Months', consultations: '4 Consultations', features: ['Everything in Silver', 'Kundali Analysis', 'Rin & Dosha Remedies', 'Business Guidance'], cta: 'Choose Golden Star', popular: true, theme: 'gold' },
    { id: 'diamond', name: 'DIAMOND GALAXY', price: '8,100', badge: 'Deep Transformation', valid: '12 Months', consultations: '6 Consultations', features: ['Everything in Gold', 'Vastu Analysis', 'Wrist Watch Analysis', 'Aura Reading'], cta: 'Go Diamond', popular: false, theme: 'diamond' },
    { id: 'platinum', name: 'PLATINUM COSMOS', price: '12,000', badge: 'VIP & Unlimited', valid: '12 Months', consultations: 'Unlimited Consultations', features: ['Everything in Diamond', 'Unlimited Consultation', 'Personal WhatsApp Access', 'Monthly Reports'], cta: 'Join Platinum', popular: false, theme: 'platinum' }
  ]
};

export const cmsService = {
  getData: async (): Promise<CMSData> => {
    try {
      const { data, error } = await supabase.from('settings').select('value').eq('key', CMS_KEY).single();
      if (error || !data) {
        const local = localStorage.getItem('dn_cms_content');
        if (local) {
          const parsed = JSON.parse(local);
          await cmsService.saveData(parsed);
          return parsed;
        }
        return DEFAULT_CMS;
      }
      const parsed = data.value as CMSData;
      return {
        ...DEFAULT_CMS, ...parsed,
        bio: { ...DEFAULT_CMS.bio, ...(parsed.bio || {}) },
        navLinks: Array.isArray(parsed.navLinks) ? parsed.navLinks : DEFAULT_CMS.navLinks,
        slides: Array.isArray(parsed.slides) ? parsed.slides : DEFAULT_CMS.slides,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CMS.services,
        testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : DEFAULT_CMS.testimonials,
        pricing: Array.isArray(parsed.pricing) ? parsed.pricing : DEFAULT_CMS.pricing,
        siteTagline: parsed.siteTagline || DEFAULT_CMS.siteTagline,
      };
    } catch {
      const local = localStorage.getItem('dn_cms_content');
      if (local) { try { return JSON.parse(local); } catch { } }
      return DEFAULT_CMS;
    }
  },

  saveData: async (data: CMSData): Promise<void> => {
    const compressed = await compressCMSImages(data);
    const { error } = await supabase.from('settings').upsert({ key: CMS_KEY, value: compressed });
    if (error) throw error;
    window.dispatchEvent(new Event('cms-update'));
  },

  uploadImage: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          resolve(await compressBase64Image(e.target?.result as string));
        } catch {
          resolve(e.target?.result as string);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};

export { compressBase64Image, compressCMSImages };
