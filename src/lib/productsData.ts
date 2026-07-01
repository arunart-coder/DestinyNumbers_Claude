import { imgUrl } from './utils';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'Yantras' | 'Crystals' | 'Vastu' | 'Bracelets';
  categories: string[];
  price: number;
  description: string;
  rating: number;
  image: string;
  images?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'surya-yantra',
    name: 'Surya Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Gold-plated solar grid for solar activation, leadership, vitality, and authority.',
    rating: 4.9,
    image: imgUrl('/assets/img/products/surya-yantra.jpg')
  },
  {
    id: 'budh-yantra',
    name: 'Budh Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Sacred matrix for Mercury (Budha) to enhance intellect, business decisions, and trade growth.',
    rating: 4.8,
    image: imgUrl('/assets/img/products/budh-yantra.jpg')
  },
  {
    id: 'budh-pyra-yantra',
    name: 'Budh-Pyra Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Pyramid-amplified Mercury grid for rapid analytical clarity, professional focus, and commerce.',
    rating: 4.9,
    image: imgUrl('/assets/img/products/budh-pyra-yantra.jpg')
  },
  {
    id: 'pyra-yantra',
    name: 'Pyra Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Multi-layered pyramid geometry plate matching prime cosmic frequencies for environmental balance.',
    rating: 4.7,
    image: imgUrl('/assets/img/products/pyra-yantra.jpg')
  },
  {
    id: 'gayatri-yantra',
    name: 'Gayatri Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Supreme radiant grid invoking divine light, spiritual expansion, clear consciousness, and block removal.',
    rating: 5.0,
    image: imgUrl('/assets/img/products/gayatri-yantra.jpg')
  },
  {
    id: 'saraswati-yantra',
    name: 'Saraswati Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Refined geometric plate for concentration, artistic mastery, academics, and divine creative wisdom.',
    rating: 4.9,
    image: imgUrl('/assets/img/products/saraswati-yantra.jpg')
  },
  {
    id: 'surya-pyra-yantra',
    name: 'Surya-Pyra Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Pyramid solar grid creating accelerated energy amplification for business prestige and physical strength.',
    rating: 4.9,
    image: imgUrl('/assets/img/products/surya-pyra-yantra.jpg')
  },
  {
    id: 'surya-budh-yantra',
    name: 'Surya-Budh Yantra',
    category: 'Yantras',
    categories: ['Yantras'],
    price: 7999,
    description: 'Budhaditya combination grid that balances logic and action. Triggers profound executive success.',
    rating: 5.0,
    image: imgUrl('/assets/img/products/surya-budh-yantra.jpg')
  },
  {
    id: 'crystal-bracelet',
    name: 'Crystal Bracelet',
    category: 'Bracelets',
    categories: ['Bracelets', 'Crystals'],
    price: 600,
    description: 'Premium amethyst and quartz crystal beads tuned to clear energetic blockages and restore calm focus.',
    rating: 4.8,
    image: imgUrl('/assets/img/products/crystal-bracelet.jpg')
  },
  {
    id: 'wood-crystal-bracelet',
    name: 'Wood Crystal Bracelet',
    category: 'Bracelets',
    categories: ['Bracelets'],
    price: 500,
    description: "Natural aromatic sandalwood beads matched with genuine Tiger's Eye for deep grounding and shield protection.",
    rating: 4.7,
    image: imgUrl('/assets/img/products/wood-crystal-bracelet.jpg')
  },
  {
    id: 'vastu-crystal-set',
    name: 'Max Pyramid',
    category: 'Vastu',
    categories: ['Vastu'],
    price: 6000,
    description: 'Maximum pyramid energy for home, office, and meditation spaces.',
    rating: 4.9,
    image: imgUrl('/assets/img/products/max-pyramid.webp')
  },
  {
    id: 'vastu-copper-helix',
    name: 'Navratna for Vastu',
    subtitle: 'Navarathna Set Box for Bhoomi Pooja & Good Vastu | 7×5 mm',
    category: 'Vastu',
    categories: ['Vastu'],
    price: 2500,
    description: 'Nine planets. One foundation. A lifetime of cosmic harmony.',
    rating: 4.8,
    image: imgUrl('/assets/img/products/navratna-vastu.jpg')
  }
];

export const PRODUCT_IMAGE_MAP: Record<string, string> = Object.fromEntries(
  PRODUCTS.map(p => [p.id, p.image])
);

export const PRODUCT_DETAILED_BULLETS: Record<string, string[]> = {
  'surya-yantra': [
    "Low energy, self-doubt, or lack of direction — Surya yantra works on all three",
    "Channels the raw power of the Sun to restore confidence and inner fire",
    "Strengthens willpower, ambition, and your ability to lead with authority",
    "A powerful tool for anyone in a growth phase or navigating major life decisions",
    "Energised to fuel fearless action, clarity of purpose, and lasting personal growth"
  ],
  'budh-yantra': [
    "Stress, mental fog, and communication breakdowns — Mercury yantra addresses all three",
    "Realigns the nervous system and thought process for sharper, calmer functioning",
    "Removes energetic blockages that cloud judgment and strain relationships",
    "A precision tool for professionals, decision-makers, and deep thinkers under pressure",
    "Ritually energised to restore mental clarity, emotional balance, and confident expression"
  ],
  'budh-pyra-yantra': [
    "Two powerful energies, one complete remedy for mind and heart",
    "Budh governs logic, communication, and sharp decisive thinking",
    "Pyra governs emotional healing and astrological chart realignment",
    "Ideal for mental clutter, strained relationships, or persistently off-balance life phases",
    "Energised for those ready to think better, feel lighter, and live with renewed clarity"
  ],
  'pyra-yantra': [
    "One yantra. Total life stabilisation across relationships, health, and finances",
    "Targets the root cause — missing energies in your personal numerology chart",
    "Rebuilds your energetic foundation so every area of life can move forward again",
    "Not a quick fix — a deep, lasting realignment of your life's natural rhythm",
    "Ritually activated using authentic Vedic methods for precise, purposeful correction"
  ],
  'gayatri-yantra': [
    "Spiritual protection, emotional healing, and inner strength — when you need it most",
    "Specifically designed for difficult life phases — illness, emotional crisis, or dark nights of the soul",
    "Works on the energetic level to restore resilience, hope, and clarity of spirit",
    "A sacred tool trusted across generations to shield, uplift, and realign",
    "Fully energised and activated to serve as your most reliable anchor in uncertain times"
  ],
  'saraswati-yantra': [
    "Struggling with focus, creative blocks, or slow learning — Saraswati yantra works at the source",
    "Activates memory, sharpens concentration, and restores natural flow in thought and expression",
    "The ideal energetic tool for students facing exams, creators chasing breakthroughs, and teachers seeking deeper impact",
    "Works across all disciplines — academic, artistic, spiritual, and professional",
    "Charged for measurable clarity of mind, accelerated learning, and effortless brilliance in expression"
  ],
  'surya-pyra-yantra': [
    "Two forces. One complete solution for vitality, relationships, and energetic alignment",
    "Surya rebuilds life force, drive, and the confidence to move forward with clarity",
    "Pyra's Loshu Grid corrects missing chart elements and restores harmony in family and personal energy",
    "Addresses the root numerological gaps that silently affect health, relationships, and momentum",
    "A high-impact yantra for anyone feeling persistently low, disconnected, or energetically incomplete"
  ],
  'surya-budh-yantra': [
    "Indecision, mental fog, and low confidence — this dual yantra targets all three at the source",
    "Surya activates leadership energy, self-belief, and unwavering personal direction",
    "Budh sharpens analytical thinking, emotional intelligence, and clear decisive communication",
    "A precision tool for professionals, leaders, and individuals in high-stakes personal or career transitions",
    "Ritually energised using Vedic methods for deep, measurable, and long-lasting transformation"
  ],
  'crystal-bracelet': [
    "The numbers missing from your birth date shape your struggles more than you realise",
    "Absence of 2, 5, or 8 creates mental turbulence, emotional reactivity, and energetic depletion",
    "This yantra directly corrects those gaps — calming the mind, cooling the temperament, restoring flow",
    "Delivers measurable clarity and stronger decision-making regardless of your numeroscope's completeness",
    "Compact, purposeful, and deeply effective — your daily anchor for focus, balance, and lasting alignment"
  ],
  'wood-crystal-bracelet': [
    "Missing 3 or 4 in your numeroscope creates restlessness, health imbalances, and eroding confidence",
    "This yantra directly targets those numerological gaps with focused, corrective energy",
    "Clears aura-based blockages that conventional remedies simply cannot reach",
    "Natural wood and crystal work in harmony — one anchors, the other heals and amplifies",
    "A precise, elegant, and powerfully effective tool for those ready to restore balance at the root level"
  ],
  'vastu-crystal-set': [
    "Maximum pyramid energy for home, office, and meditation spaces.",
    "The South-East governs nourishment; the South-West governs bonds — this yantra speaks to both",
    "Place it with intention in your kitchen or relationship zone and feel the shift unfold gradually",
    "For deeper imbalances, bury it in the earth and let it work silently at the soil's energetic core",
    "Energised to harmonise direction, space, and the invisible forces that shape how your home truly feels"
  ],
  'vastu-copper-helix': [
    "Nine sacred gemstones, one powerful remedy — the Navaratna set channels the combined energy of all nine planetary forces into your home's foundation",
    "Installed at the centre of the foundation before construction begins, anchoring cosmic balance into the very structure of your space",
    "Each gemstone corresponds to a specific planet — correcting imbalances, neutralising doshas, and inviting prosperity, health, and harmony from the ground up",
    "A time-honoured Vedic practice that transforms your home into an energetically protected and positively charged living environment",
    "Energised and ritually activated to ensure every room above it benefits from stable, harmonious, and uninterrupted planetary flow"
  ]
};
