import { imgUrl } from './utils';
import { BlogPost, HeroBanner } from '../types/blog';
import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firestoreUtils';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  quote: string;
  rating: number;
  image?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  badge: string;
  valid: string;
  consultations: string;
  features: string[];
  cta: string;
  popular: boolean;
  theme: 'silver' | 'gold' | 'diamond' | 'platinum';
}

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface BioData {
  name: string;
  surname: string;
  tagline: string;
  description: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface NavLink {
  label: string;
  path: string;
}

export interface CMSData {
  hero: HeroBanner; // Keeping for legacy/fallback
  slides: HeroSlide[];
  bio: BioData;
  navLinks: NavLink[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  pricing: PricingTier[];
  siteTagline: string;
}

const CMS_DOC_PATH = 'cms/data';

export const DEFAULT_CMS: CMSData = {
  hero: {
    title: "Decode Your Destiny",
    subtitle: "Expert Numerology, Astrology & Vastu Consultation — trusted by 5,000+ souls across India",
    image: imgUrl('/assets/img/Astrology.jpg'),
    ctaText: "Book a Session",
    ctaLink: "#pricing"
  },
  slides: [
    {
      id: '1',
      image: imgUrl('/assets/img/Astrology.jpg'),
      title: "Decode Your Destiny",
      subtitle: "Expert Numerology, Astrology & Vastu Consultations trusted by 5,000+ global seekers."
    },
    {
      id: '2',
      image: imgUrl('/assets/img/slide-astrology-1.jpg'),
      title: "Align with the Stars",
      subtitle: "Discover how celestial movements shape your personal and professional journey."
    },
    {
      id: '3',
      image: imgUrl('/assets/img/slide-astrology-2.jpg'),
      title: "Harmonize Your Space",
      subtitle: "Transform your environment into a sanctuary of energy, prosperity, and peace."
    }
  ],
  bio: {
    name: "Dr. Arun",
    surname: "Poovaiah",
    tagline: "Master Numerologist & Nadi Astrologer",
    description: "Dr. Arun Poovaiah, founder of Destiny Numbers, applies the science of Numerology and Nakshatra Nadi to help people across the world find clarity, direction, and purpose.",
    image: imgUrl('/assets/img/arun-profile.jpg'),
    stats: [
      { label: "Precision Analysis", value: "Advanced degree-based Dasha and Nakshatra alignment." },
      { label: "Global Authority", value: "Strategic consulting for HNWIs and brand identity." }
    ]
  },
  navLinks: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Products', path: '/products' },
    { label: 'Academy', path: '/academy' },
    { label: 'Blog', path: '/blog' },
    { label: 'FREE Tools', path: '/tools' }
  ],
  siteTagline: "✦ Destiny Numbers ✦",
  services: [
    { id: '1', title: 'Numerology', description: 'Decode the secret vibrations of your name and birth date.', image: imgUrl('/assets/img/svc-numerology.jpg') },
    { id: 'm1', title: 'Mobile Numerology', description: 'Transform your digital frequency. Align your mobile number with success algorithms.', image: imgUrl('/assets/img/svc-mobile.jpg') },
    { id: '2', title: 'Astrology', description: 'Precision mapping through Maharishi Parashara and Nakshatra Nadi systems for modern life.', image: imgUrl('/assets/img/svc-astrology.jpg') },
    { id: '2c', title: 'Horoscope Analysis', description: 'Deep cosmic mapping of planetary positions at birth to reveal your true destiny.', image: imgUrl('/assets/img/svc-horoscope.jpg') },
    { id: '2b', title: 'Dasha & Transit Analysis', description: 'Decode your divine timing. Precision mapping of planetary periods and energetic shifts.', image: imgUrl('/assets/img/svc-dasha.jpg') },
    { id: '3', title: 'Vastu', description: 'Ancient Vastu Shastra wisdom to create harmony and prosperity in your modern space.', image: imgUrl('/assets/img/svc-vastu.jpg') },
    { id: '4', title: 'Tarot Guidance', description: 'Unlock sacred intuition with the wisdom of the cards. Clear guidance and deep spiritual insights.', image: imgUrl('/assets/img/svc-tarot.jpg') },
    { id: '4-free', title: 'Free Tarot Reading', description: 'Instant Yes/No guidance using the original Rider-Waite cards for quick clarity.', image: imgUrl('/assets/img/svc-tarot.jpg') },
    { id: '5', title: 'Name Analysis', description: 'Ensure your name resonates with success and harmony.', image: imgUrl('/assets/img/svc-name.jpg') },
    { id: '6', title: 'Aura Reading', description: 'Decode the energetic field surrounding your soul.', image: imgUrl('/assets/img/svc-aura.jpg') },
  ],
  testimonials: [
    { id: '1', name: 'Linda Ibañez', city: 'Chile-Argentina', quote: 'Recomiendo en un 100%. La experiencia promete ser muy mística, pero no solo eso, descubres que dentro de tu vida hay situaciones que son muy marcadas por los designios con los que Dios te mandó y parte de eso es tu fecha de nacimiento lo cual es con los números que Dios decidió. Propongo descubran ustedes mísmos y se sorprenderán 🙂', rating: 5, image: imgUrl('/assets/img/Linda.jpg') },
    { id: '2', name: 'Pramita', city: 'Entrepreneur', quote: "You are blessing of God in my life. I would like to tell you sir you are mismerising by your words and action. I appreciate you getting in touch with me and helping me out. I think that was necessary. I ll be able to understand the situation more clearly as a result of this. I m glad I have this knowledge. Thank you sir for your wisdom, generous, overwhelming behavior. I would love to give 10 star.....", rating: 5, image: imgUrl('/assets/img/pramita.jpg') },
    { id: '3', name: 'Nidhi Shetty', city: 'Educationist', quote: "Extremely knowledgeable! He has an explanation for everything. At times when I feel stuck Mr. Poovaiah is my goto person to contact for some clarity and solutions. His remedies work like magic.", rating: 5, image: imgUrl('/assets/img/nidhi.jpg') },
    { id: 'deepa', name: 'Deepa S', city: 'Engineer', quote: "My son's numerology number was given by him. I am satisfied with his calculation and prediction. and Life Prediction is very difficult, especially about the future but he predicted accurately and give me a solution too.", rating: 5, image: imgUrl('/assets/img/deepa.jpg') },
    { id: 'priyanka', name: 'Priyanka Prasaath', city: 'Psychologist', quote: "I'd like to swear by his work , his astrological predictions are on point and without thinking twice I'd turn towards him for advice at any point in my life when the need be . He not only tells you things you want to hear but also things we have to work on to better ourselves .   It's been wonderful so far , thank you 🙏.", rating: 5, image: imgUrl('/assets/img/priyanka.jpg') },
    { id: 'surabhi', name: 'Surabhi', city: 'Home Maker', quote: "He was the best astrologer I have spoken with; he was so perfect with my analysis. Thankful to you, sir. Definitely, I suggest everyone reach out to him.", rating: 5, image: imgUrl('/assets/img/surabhi.jpg') },
    { id: 'dhanya', name: 'Dr. Dhanya', city: 'Doctor', quote: "Very knowledgeable. Answering to the point, not beating around the bush, easy remedies, highly recommended", rating: 5, image: imgUrl('/assets/img/Dr.Dhanya.jpg') },
    { id: 'rashmika', name: 'Rashmika A', city: 'IT Manager', quote: "Thank you so much sir for the wonderful session regarding my marriage and love relationship.superbbb accuracy of my present life Thank you so very much", rating: 5, image: imgUrl('/assets/img/ras.png') },
    { id: '4', name: 'Meera Krishnan', city: 'Chennai', quote: 'A rare combination of Nadi Astrology and modern analytical precision. Truly a life-altering consultation experience.', rating: 5, image: imgUrl('/assets/img/testimonial-meera.jpg') },
    { id: '5', name: 'Ankita Rao', city: 'Hyderabad', quote: "As a director, I consulted Dr. Arun for my film title. The resonance analysis gave us the confidence to move forward, and the success speaks for itself.", rating: 5, image: imgUrl('/assets/img/testimonial-ankita.jpg') },
    { id: '6', name: 'Deepak J.', city: 'Pune', quote: 'Professional, results-oriented, and highly empathetic. Dr. Arun don’t just predict; he provides practical solutions.', rating: 5, image: imgUrl('/assets/img/testimonial-deepak.jpg') },
    { id: '7', name: 'Siddharth M.', city: 'Singapore', quote: 'Even with a remote consultation, the depth of analysis was extraordinary. The Vastu remedies were easy to implement without structural changes.', rating: 5, image: imgUrl('/assets/img/testimonial-siddharth.jpg') },
    { id: '8', name: 'Kavita Menon', city: 'Kochi', quote: 'Found clarity during a very confusing phase of my career through Chaldean Numerology. Highly recommend the professional package.', rating: 5, image: imgUrl('/assets/img/testimonial-kavita.jpg') },
  ],
  pricing: [
    { 
      id: 'silver', 
      name: 'SILVER MOON', 
      price: '3,333', 
      badge: 'Begin Your Journey', 
      valid: '3 Months',
      consultations: '2 Consultations',
      features: ['Date of Birth Analysis', 'Name Numerology', 'Mobile Number Analysis', 'Health & Career Guidance'], 
      cta: 'Start with Silver', 
      popular: false,
      theme: 'silver'
    },
    { 
      id: 'gold', 
      name: 'GOLDEN STAR', 
      price: '5,100', 
      badge: 'Best Value', 
      valid: '5 Months',
      consultations: '4 Consultations',
      features: ['Everything in Silver', 'Kundali Analysis', 'Rin & Dosha Remedies', 'Business Guidance'], 
      cta: 'Choose Golden Star', 
      popular: true,
      theme: 'gold'
    },
    { 
      id: 'diamond', 
      name: 'DIAMOND GALAXY', 
      price: '8,100', 
      badge: 'Deep Transformation', 
      valid: '12 Months',
      consultations: '6 Consultations',
      features: ['Everything in Gold', 'Vastu Analysis', 'Wrist Watch Analysis', 'Aura Reading'], 
      cta: 'Go Diamond', 
      popular: false,
      theme: 'diamond'
    },
    { 
      id: 'platinum', 
      name: 'PLATINUM COSMOS', 
      price: '12,000', 
      badge: 'VIP & Unlimited', 
      valid: '12 Months',
      consultations: 'Unlimited Consultations',
      features: ['Everything in Diamond', 'Unlimited Consultation', 'Personal WhatsApp Access', 'Monthly Reports'], 
      cta: 'Join Platinum', 
      popular: false,
      theme: 'platinum'
    }
  ]
};

export const cmsService = {
  getData: async (): Promise<CMSData> => {
    try {
      const docRef = doc(db, CMS_DOC_PATH);
      const snapshot = await getDoc(docRef);
      
      if (!snapshot.exists()) {
        // Fallback to local storage migration or default
        const localData = localStorage.getItem('dn_cms_content');
        if (localData) {
          const parsedLocal = JSON.parse(localData);
          await cmsService.saveData(parsedLocal);
          return parsedLocal;
        }
        return DEFAULT_CMS;
      }

      const parsed = snapshot.data() as CMSData;
      
      // Merge with defaults to ensure all fields exist
      return {
        ...DEFAULT_CMS,
        ...parsed,
        bio: { ...DEFAULT_CMS.bio, ...(parsed.bio || {}) },
        navLinks: Array.isArray(parsed.navLinks) ? parsed.navLinks : DEFAULT_CMS.navLinks,
        slides: Array.isArray(parsed.slides) ? parsed.slides : DEFAULT_CMS.slides,
        services: Array.isArray(parsed.services) ? parsed.services : DEFAULT_CMS.services,
        testimonials: Array.isArray(parsed.testimonials) ? parsed.testimonials : DEFAULT_CMS.testimonials,
        pricing: Array.isArray(parsed.pricing) ? parsed.pricing : DEFAULT_CMS.pricing,
        siteTagline: parsed.siteTagline || DEFAULT_CMS.siteTagline,
      };
    } catch (e) {
      try {
        handleFirestoreError(e, OperationType.GET, CMS_DOC_PATH);
      } catch (logError) {
        console.warn("CMS doc retrieval failed. Failing over to local cache or defaults:", logError);
      }
      
      const localData = localStorage.getItem('dn_cms_content');
      if (localData) {
        try {
          return JSON.parse(localData);
        } catch {
          return DEFAULT_CMS;
        }
      }
      return DEFAULT_CMS;
    }
  },

  saveData: async (data: CMSData): Promise<void> => {
    try {
      const docRef = doc(db, CMS_DOC_PATH);
      // Automatically compress all embedded base64 images before saving to Firestore to fit under 1MB limit
      const compressedData = await compressCMSImages(data);
      await setDoc(docRef, compressedData);
      window.dispatchEvent(new Event('cms-update'));
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, CMS_DOC_PATH);
    }
  },

  uploadImage: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const originalBase64 = e.target?.result as string;
        try {
          const compressed = await compressBase64Image(originalBase64);
          resolve(compressed);
        } catch (err) {
          console.warn("Base64 compression failed, using original:", err);
          resolve(originalBase64);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};

export const compressBase64Image = (base64Str: string): Promise<string> => {
  if (!base64Str || typeof window === 'undefined' || !base64Str.startsWith('data:image')) {
    return Promise.resolve(base64Str);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1000;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(base64Str);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        // Compress as JPEG with 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      } catch (err) {
        console.error("Canvas compression helper failed:", err);
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
    img.src = base64Str;
  });
};

export const compressCMSImages = async (data: CMSData): Promise<CMSData> => {
  const cloned = JSON.parse(JSON.stringify(data)) as CMSData;
  
  if (cloned.hero && cloned.hero.image) {
    cloned.hero.image = await compressBase64Image(cloned.hero.image);
  }
  
  if (cloned.bio && cloned.bio.image) {
    cloned.bio.image = await compressBase64Image(cloned.bio.image);
  }
  
  if (Array.isArray(cloned.slides)) {
    for (const slide of cloned.slides) {
      if (slide.image) {
        slide.image = await compressBase64Image(slide.image);
      }
    }
  }
  
  if (Array.isArray(cloned.services)) {
    for (const service of cloned.services) {
      if (service.image) {
        service.image = await compressBase64Image(service.image);
      }
    }
  }
  
  if (Array.isArray(cloned.testimonials)) {
    for (const testimonial of cloned.testimonials) {
      if (testimonial.image) {
        testimonial.image = await compressBase64Image(testimonial.image);
      }
    }
  }
  
  return cloned;
};

