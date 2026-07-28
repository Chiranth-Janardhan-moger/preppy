import { Product, Review } from '../types';
import reel1 from '../assets/reels/reel-1.png';
import reel2 from '../assets/reels/reel-2.png';
import reel3 from '../assets/reels/reel-3.png';
import reel4 from '../assets/reels/reel-4.png';
import reel5 from '../assets/reels/reel-5.png';
import reel6 from '../assets/reels/reel-6.png';


export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  INR: { symbol: '₹', rate: 83.5 },
};

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Lady Eleanor Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '2 weeks ago',
    comment: 'I got about 5 blouses stitched here and I am super happy with the work. The fit is perfect and the designs are beautiful. Really recommend this place.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    userName: 'Ananya Singhania',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '1 month ago',
    comment: 'I have been getting my blouse stitched from past 10 years at Pallavi designer studio. Their detailing is so neat. I am very much satisfied with their workmanship.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    userName: 'Sophia De Sica',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Best and unique blouse designs! The stitching and embroidery work are very neat and beautiful. The finishing is excellent, and the fitting is perfect . I am very satisfied with the work.',
    verifiedPurchase: true
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'ast-001',
    name: 'Aurelia Draped Gold Silk Gown',
    subtitle: 'Haute Couture Evening Capsule',
    category: 'Women',
    subCategory: 'Evening Gowns',
    price: 3850,
    originalPrice: 4200,
    discountPercentage: 8,
    rating: 4.9,
    reviewCount: 24,
    isNew: true,
    isBestSeller: true,
    isLuxury: true,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Imperial Gold', hex: '#D4AF37' },
      { name: 'Champagne Gold', hex: '#F7E7CE' },
      { name: 'Obsidian Black', hex: '#0B0B0B' }
    ],
    sizes: ['XS (EU 34)', 'S (EU 36)', 'M (EU 38)', 'L (EU 40)', 'Bespoke Custom'],
    fabric: '100% Mulberry Silk Gazar & 24K Gold-Plated Metallic Mesh',
    careInstructions: 'Specialist dry clean only. Store in protective garment bag.',
    description: 'A masterpiece of liquid elegance. Sculpted entirely by hand in our Paris atelier, the Aurelia Gown features cascading hand-pleated Mulberry silk, an internal silk corset, and a dramatic floor-sweeping train.',
    details: [
      'Hand-pleated crossover bodice',
      'Built-in boned silk corset for sculpted fit',
      'Concealed back zip closure',
      'Includes bespoke garment travel casing'
    ],
    inStock: true,
    stockCount: 5,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-W-GOWN-001',
    tags: ['Gown', 'Gold', 'Silk', 'Couture', 'Met Gala']
  },
  {
    id: 'ast-002',
    name: 'Empress Velvet & Gold Embroidered Anarkali',
    subtitle: 'The Imperial Heritage Collection',
    category: 'Ethnic',
    subCategory: 'Anarkali',
    price: 4900,
    rating: 5.0,
    reviewCount: 19,
    isNew: true,
    isFeatured: true,
    isLuxury: true,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Royal Emerald', hex: '#0B3B26' },
      { name: 'Midnight Navy', hex: '#0F172A' },
      { name: 'Deep Ruby', hex: '#4A0E17' }
    ],
    sizes: ['XS (EU 34)', 'S (EU 36)', 'M (EU 38)', 'L (EU 40)', 'Bespoke Custom'],
    fabric: 'Italian Silk Velvet & 24K Gold Plated Zardozi Embroidery',
    careInstructions: 'Specialist dry clean only. Store in acid-free tissue.',
    description: 'An ode to royalty. Crafted from deep emerald velvet, hand-embroidered with intricate bullion threadwork by master artisans with over 40 hours of needlework.',
    details: [
      'Hand-appliquéd 24K gold zardozi motifs',
      'Silk satin lining for supreme comfort',
      'Includes sheer organza drape dupatta',
      'Includes padded velvet hanger and garment casing'
    ],
    inStock: true,
    stockCount: 3,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-E-ANARK-002',
    tags: ['Women', 'Ethnic', 'Wedding', 'Velvet', 'Gold Embroidered']
  },
  {
    id: 'ast-003',
    name: 'Bespoke Satin Blazer Dress & Cape',
    subtitle: 'Parisian Sartorial Elegance',
    category: 'Women',
    subCategory: 'Suits',
    price: 2950,
    originalPrice: 3200,
    discountPercentage: 8,
    rating: 4.8,
    reviewCount: 34,
    isBestSeller: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#000000' },
      { name: 'Ivory White', hex: '#FDFBF7' }
    ],
    sizes: ['XS (EU 34)', 'S (EU 36)', 'M (EU 38)', 'L (EU 40)'],
    fabric: 'Super 160s Loro Piana Italian Wool & Silk Satin Lapels',
    careInstructions: 'Dry clean only.',
    description: 'Designed for high-society galas and red-carpet entrances. Cut in an immaculate modern silhouette with silk peak lapels and horn buttons.',
    details: [
      'Silk satin peak lapel',
      'Half-canvas construction for ergonomic drape',
      'Flattering tailored fit',
      'Structured padded shoulders'
    ],
    inStock: true,
    stockCount: 8,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-W-BLAZER-003',
    tags: ['Women', 'Suits', 'Wool', 'Formal', 'Gala']
  },
  {
    id: 'ast-004',
    name: 'Celestia Royal Bridal Lehenga',
    subtitle: 'Couture Bridal Heritage',
    category: 'Wedding',
    subCategory: 'Bridal Lehenga',
    price: 6800,
    rating: 5.0,
    reviewCount: 42,
    isBestSeller: true,
    isLuxury: true,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Heritage Crimson', hex: '#8B0000' },
      { name: 'Blush Rose Gold', hex: '#B76E79' },
      { name: 'Ivory Cream', hex: '#FFFDD0' }
    ],
    sizes: ['Bespoke Made to Measure'],
    fabric: 'Raw Silk & Hand-beaded Swarovski Crystal + Antique Dabka Work',
    careInstructions: 'Preservation dry cleaning. Stored in cedar trunk casing.',
    description: 'The pinnacle of regal bridal couture. Incorporates 320 artisan hours of intricate hand embroidery, micro-pearl embellishments, and custom motif storytelling.',
    details: [
      'Over 50,000 hand-sewn Swarovski crystals',
      'Includes dual organza dupattas (heavy trailing & light head veil)',
      'Customized waistband embroidery with couple initials',
      'Complimentary royal styling session with our creative director'
    ],
    inStock: true,
    stockCount: 2,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-W-LEH-004',
    tags: ['Bridal', 'Lehenga', 'Swarovski', 'Heritage', 'Wedding']
  },
  {
    id: 'ast-005',
    name: 'Venetian Sculpted Silk Corset Gown',
    subtitle: 'Red Carpet Gala Edition',
    category: 'Party Wear',
    subCategory: 'Cocktail Gowns',
    price: 3200,
    originalPrice: 3500,
    discountPercentage: 8,
    rating: 4.7,
    reviewCount: 15,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Venetian Red', hex: '#C8102E' },
      { name: 'Satin Noir', hex: '#111111' },
      { name: 'Charcoal Slate', hex: '#36454F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '100% Organic Mongolian Cashmere',
    careInstructions: 'Dry clean only.',
    description: 'Unrivalled softness meets architectural tailorwork. A relaxed yet refined silhouette designed to overlay seamless cocktail or casual attire.',
    details: [
      'Horn button fastenings',
      'Welted hand pockets & interior passholder pocket',
      'Cupro breathable silk lining'
    ],
    inStock: true,
    stockCount: 12,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-C-COAT-005',
    tags: ['Cashmere', 'Overcoat', 'Winter', 'Luxury Minimal']
  },
  {
    id: 'ast-006',
    name: 'Venetian Sculpted Metallic Minaudière',
    subtitle: 'Fine Jewelry Accessories',
    category: 'Accessories',
    subCategory: 'Clutches',
    price: 1450,
    rating: 4.9,
    reviewCount: 19,
    isNew: true,
    isTrending: true,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Brass Gold', hex: '#E5C158' },
      { name: 'Polished Palladium', hex: '#D1D5DB' }
    ],
    sizes: ['One Size'],
    fabric: 'Hand-cast Brass, Nappa Leather Lining & Quartz Crystal Clasp',
    careInstructions: 'Wipe clean with microfiber jewelry cloth.',
    description: 'A wearable sculpture inspired by Venetian architecture. Hand-polished brass frame adorned with genuine quartz crystal push-clasp.',
    details: [
      'Detachable 24K gold chain shoulder strap',
      'Suede-lined interior with card slot',
      'Individually numbered limited production piece'
    ],
    inStock: true,
    stockCount: 7,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-A-BAG-006',
    tags: ['Accessories', 'Clutch', 'Jewelry', 'Gold']
  },
  {
    id: 'ast-007',
    name: 'Elysian Sequin Cocktail Mini',
    subtitle: 'Nightfall Party Wear',
    category: 'Party Wear',
    subCategory: 'Dresses',
    price: 1850,
    originalPrice: 2100,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 22,
    isTrending: true,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Champagne Silver', hex: '#E8E8E8' },
      { name: 'Midnight Jet', hex: '#1C1C1C' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    fabric: 'Micro-Sequined Tulle & Italian Stretch Silk Slip',
    careInstructions: 'Delicate dry clean.',
    description: 'Catch every light in the room with hand-applied ombre micro-sequins engineered to shimmer with subtle movement.',
    details: [
      'Plunging cowl neckline',
      'Built-in inner corset boning',
      'Hidden back zipper'
    ],
    inStock: true,
    stockCount: 9,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-P-DRESS-007',
    tags: ['Party Wear', 'Sequins', 'Cocktail', 'Mini Dress']
  },
  {
    id: 'ast-008',
    name: 'Verona Silk Printed Trench & Dress Set',
    subtitle: 'Resort Haute Line',
    category: 'Casual',
    subCategory: 'Resort Wear',
    price: 2400,
    rating: 4.6,
    reviewCount: 11,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Tuscan Ochre', hex: '#CC7722' },
      { name: 'Aegean Blue', hex: '#1E3A8A' }
    ],
    sizes: ['S', 'M', 'L'],
    fabric: '100% Habotai Silk with Hand-screened Botanical Motif',
    careInstructions: 'Dry clean only.',
    description: 'Effortless Italian Riviera glamor. A flowing midi dress paired with a floor-length lightweight silk trench coat.',
    details: [
      'Detachable sash belt with mother-of-pearl buckle',
      'Breathable, weightless silk weave',
      'Custom botanical artwork'
    ],
    inStock: true,
    stockCount: 6,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-C-SET-008',
    tags: ['Resort', 'Silk', 'Trench', 'Casual']
  },
  {
    id: 'ast-009',
    name: 'Palace Gold Diamond Collar Necklace',
    subtitle: 'Fine High Jewelry Collection',
    category: 'Accessories',
    subCategory: 'Jewelry',
    price: 12500,
    rating: 5.0,
    reviewCount: 9,
    isLuxury: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: '18K Yellow Gold', hex: '#E5C158' },
      { name: '18K Rose Gold', hex: '#B76E79' }
    ],
    sizes: ['Standard 16 inch Collar'],
    fabric: '18K Gold, 4.2 Carats VVS Natural Earth Diamonds',
    careInstructions: 'Store in velvet security vault box.',
    description: 'An architectural collar necklace handset with brilliant-cut diamonds forming geometric lotus arches.',
    details: [
      'GIA Diamond Certificate included',
      'Safety lock box clasp',
      'Includes lifetime polishing warranty'
    ],
    inStock: true,
    stockCount: 1,
    reviewsList: SAMPLE_REVIEWS,
    sku: 'AST-J-NECK-009',
    tags: ['Jewelry', 'Diamonds', '18K Gold', 'High Jewelry']
  }
];

export const CATEGORIES_LIST = [
  {
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    description: 'Haute couture gowns, draped silks & eveningwear',
    itemCount: '140+ Pieces'
  },
  {
    name: 'Ethnic',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Imperial lehengas, royal sarees & handloom weaves',
    itemCount: '110+ Pieces'
  },
  {
    name: 'Wedding',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: 'Bridal lehengas, couture veils & ceremony ensembles',
    itemCount: '80+ Pieces'
  },
  {
    name: 'Party Wear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    description: 'Glamorous sequin minis, metallic silks & gala gowns',
    itemCount: '75+ Pieces'
  },
  {
    name: 'Casual',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    description: 'Cashmere outerwear, silk trenches & effortless chic',
    itemCount: '60+ Pieces'
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    description: 'Sculpted brass minaudières, silk scarves & high jewelry',
    itemCount: '120+ Pieces'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image:reel1,
    url:'https://www.instagram.com/reel/C2fvmbsS82U/?igsh=MXducmF6cHU2Y3ZwcA==',
    likes: '14.2K',
    comments: '342',
    caption: 'Happy Customer!!! #PREPPY'
  },
  {
    id: 'ig-2',
    image:reel2,
    url:'https://www.instagram.com/reel/DVERnGXCfWh/?igsh=d3V0azlxMTNrMmd1',
    likes: '18.9K',
    comments: '512',
    caption: 'Beautiful raw silk blouse with Tanjore painting and #D embossing details,crafted with vibrant designs and intricate style #PREPPY'
  },
  {
    id: 'ig-3',
    image:reel3,
    url:'https://www.instagram.com/reel/DP3DitcE-U2/?igsh=MTU1bnk0aDd2am05NQ==',
    likes: '12.5K',
    comments: '280',
    caption: 'Silk Organza Saree #PREPPY'
  },
  {
    id: 'ig-4',
    image:reel4,
    url:'https://www.instagram.com/reel/DUzrGUVk_8C/?igsh=OW1hanB6a3R0N2xh',
    likes: '24.1K',
    comments: '890',
    caption: 'Pallu meets its match, Traditional look with trending hanging decorative tassels with hand Embroided work Blouse #PREPPY'
  },
  {
    id: 'ig-5',
    image:reel5,
    url:'https://www.instagram.com/reel/DU2EdsYAR2H/?igsh=MWpqYWVmNXBldDdobw==',
    likes: '9.8K',
    comments: '190',
    caption: 'Our Latest Customised Hanging Tassels with Machine and Hand Embroidery designs #PREPPY'
  },
  {
    id: 'ig-6',
    image:reel6,
    url:'https://www.instagram.com/reel/DO769aKE8pf/?igsh=MXVldXV1c296bmE5bw==',
    likes: '15.6K',
    comments: '410',
    caption: 'Our first Launch at Raintree was full of love,laughter, and the most wonderful people. #PREPPY'
  }
];

export const FAQS_LIST = [
  {
    category: 'Orders & Bespoke Fitting',
    question: 'How do I request a Bespoke Tailoring fitting?',
    answer: 'You may select "Tailored Bespoke" or "Custom Made to Measure" when adding any gown or lehenga to your bag, or visit one of our flagship ateliers in Paris, New York, Milan, or Mumbai. Our Master Tailor will conduct a private video or in-person measurement consultation.'
  },
  {
    category: 'Orders & Bespoke Fitting',
    question: 'Can I request custom color variations for bridal ensembles?',
    answer: 'Yes. Our Haute Couture salon accepts custom color dye requests on mulberry silks and velvet bases with a lead time of 4 to 6 weeks.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'What are your international luxury shipping terms?',
    answer: 'We provide complimentary climate-controlled, insured express white-glove delivery worldwide via courier with real-time GPS tracking. All duties and customs taxes are prepaid by PREPPY.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'What is Luxury Packaging?',
    answer: 'Every piece is wrapped in acid-free tissue inside a cedar-scented velvet gift box with a silk ribbon closure, accompanied by a personalized hand-embossed certificate of authenticity.'
  },
  {
    category: 'Returns & Authenticity',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery in original, unworn condition with security tags intact. Bespoke and custom-tailored creations are non-refundable but eligible for unlimited complimentary fitting adjustments.'
  }
];
