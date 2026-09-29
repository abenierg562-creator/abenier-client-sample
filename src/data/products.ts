export type Brand = 'Akotet Shoes';
export type Category = 'Boots' | 'Loafers' | 'Casual' | 'Heels' | 'Formal';
export type Gender = 'Men' | 'Women' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  sizes: number[];
  colors: string[];
  category: Category;
  gender: Gender;
  material: string;
  inStock: boolean;
  stockCount?: number;
  isTrending?: boolean;
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
}

export const brands: Brand[] = ['Akotet Shoes'];

// Vite asset imports
import img1 from '@/assets/photo_2026-09-19_03-22-43.jpg';
import img2 from '@/assets/photo_2026-09-19_03-22-56.jpg';
import img3 from '@/assets/photo_2026-09-24_03-13-03.jpg';
import img4 from '@/assets/photo_2026-09-19_03-23-15.jpg';
import img5 from '@/assets/photo_2026-09-19_03-23-29.jpg';
import img6 from '@/assets/photo_2026-09-19_03-23-35.jpg';
import img7 from '@/assets/photo_2026-09-19_03-23-42.jpg';
import img8 from '@/assets/photo_2026-09-19_03-24-01.jpg';
import img9 from '@/assets/photo_2026-09-19_03-24-08.jpg';
import img10 from '@/assets/photo_2026-09-24_03-13-10.jpg';
import img11 from '@/assets/photo_2026-09-24_03-13-16.jpg';
import img12 from '@/assets/photo_2026-09-24_03-13-20.jpg';

const prefix = '100% ከ ንፁህ ቆዳ የተሰሩ ጫማዎች \n🔥 ኤክስፓርት ስታንዳርድ ኳሊቲ 🔥\n\n';

export const products: Product[] = [
  {
    id: '1',
    name: 'Tan Suede Derby',
    brand: 'Akotet Shoes',
    price: 3200,
    images: [img1],
    description: `${prefix}Classic tan suede derby with lace-up design. Lightweight and comfortable for everyday wear.`,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ['Tan'],
    category: 'Casual',
    gender: 'Men',
    material: 'Suede upper, rubber sole',
    inStock: true,
    isNewDrop: true,
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: '2',
    name: 'Blue Chukka Boot',
    brand: 'Akotet Shoes',
    price: 3500,
    images: [img2],
    description: `${prefix}Stylish blue chukka boot with lace-up closure. Perfect for casual and semi-formal occasions.`,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['Blue'],
    category: 'Boots',
    gender: 'Men',
    material: 'Nubuck leather upper',
    inStock: true,
    isNewDrop: true,
    isTrending: true,
    isSpecialOffer: true,
  },
  {
    id: '3',
    name: 'Dark Brown Suede Chukka',
    brand: 'Akotet Shoes',
    price: 3800,
    oldPrice: 4200,
    images: [img3],
    description: `${prefix}Premium dark brown suede chukka boot with lace-up design. Lightweight and stylish for any season.`,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Dark Brown'],
    category: 'Boots',
    gender: 'Men',
    material: 'Premium suede upper, rubber sole',
    inStock: true,
    stockCount: 5,
    isNewDrop: true,
    isTrending: true,
    isSpecialOffer: true,
  },
  {
    id: '4',
    name: 'Black Leather Zipper Boot',
    brand: 'Akotet Shoes',
    price: 3600,
    images: [img4],
    description: `${prefix}Export-standard black leather boot with side zipper and brogue detailing. Elegant and durable.`,
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ['Black'],
    category: 'Formal',
    gender: 'Men',
    material: 'Full-grain leather upper',
    inStock: true,
    isNewDrop: true,
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: '5',
    name: 'Black Chelsea Boot',
    brand: 'Akotet Shoes',
    price: 3400,
    images: [img5],
    description: `${prefix}Sleek black suede chelsea boot with elastic side panel. Easy slip-on with a modern look.`,
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ['Black'],
    category: 'Boots',
    gender: 'Unisex',
    material: 'Suede upper, rubber sole',
    inStock: true,
    stockCount: 8,
    isNewDrop: true,
    isTrending: true,
    isBestSeller: true,
  },
  {
    id: '6',
    name: 'Grey Suede Derby',
    brand: 'Akotet Shoes',
    price: 3200,
    images: [img6],
    description: `${prefix}Light grey suede derby with chunky rubber sole. Casual and versatile for daily wear.`,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ['Grey'],
    category: 'Casual',
    gender: 'Unisex',
    material: 'Suede upper, chunky rubber sole',
    inStock: true,
    isNewDrop: true,
    isSpecialOffer: true,
  },
  {
    id: '7',
    name: 'Brown Derby Oxford',
    brand: 'Akotet Shoes',
    price: 3500,
    images: [img7],
    description: `${prefix}Classic brown derby oxford with fine stitching. A must-have for formal occasions.`,
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ['Brown'],
    category: 'Formal',
    gender: 'Men',
    material: 'Leather upper, leather sole',
    inStock: true,
    isNewDrop: true,
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: '8',
    name: 'Tan Lace-Up Loafer',
    brand: 'Akotet Shoes',
    price: 3300,
    images: [img8],
    description: `${prefix}Comfortable tan lace-up loafer with a relaxed fit. Great for casual and smart-casual outfits.`,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Tan'],
    category: 'Loafers',
    gender: 'Men',
    material: 'Suede upper, rubber sole',
    inStock: true,
    isNewDrop: true,
    isSpecialOffer: true,
  },
  {
    id: '9',
    name: 'Classic Black Derby',
    brand: 'Akotet Shoes',
    price: 3400,
    images: [img9],
    description: `${prefix}Timeless black derby shoe perfect for office and formal wear.`,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Black'],
    category: 'Formal',
    gender: 'Men',
    material: 'Full-grain leather upper',
    inStock: true,
    stockCount: 10,
    isNewDrop: true,
    isTrending: true,
    isSpecialOffer: true,
  },
  {
    id: '10',
    name: 'Black Leather Derby',
    brand: 'Akotet Shoes',
    price: 3700,
    oldPrice: 4000,
    images: [img10],
    description: `${prefix}Sleek black leather derby with white sole. Clean and modern design perfect for everyday wear.`,
    sizes: [38, 39, 40, 41, 42, 43, 44],
    colors: ['Black'],
    category: 'Casual',
    gender: 'Men',
    material: 'Full-grain leather upper, rubber sole',
    inStock: true,
    isNewDrop: true,
    isBestSeller: true,
    isSpecialOffer: true,
    isTrending: true,
  },
  {
    id: '11',
    name: 'Black Leather Oxford',
    brand: 'Akotet Shoes',
    price: 3500,
    images: [img11],
    description: `${prefix}Classic black leather oxford with contrasting sole. In stock now — a must-have for any wardrobe.`,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Black'],
    category: 'Formal',
    gender: 'Men',
    material: 'Full-grain leather upper',
    inStock: true,
    isNewDrop: true,
    isTrending: true,
    isBestSeller: true,
  },
  {
    id: '12',
    name: 'Black Casual Derby',
    brand: 'Akotet Shoes',
    price: 3400,
    images: [img12],
    description: `${prefix}Versatile black casual derby with a comfortable fit. Great for both office and daily wear.`,
    sizes: [39, 40, 41, 42, 43, 44, 45],
    colors: ['Black'],
    category: 'Casual',
    gender: 'Men',
    material: 'Leather upper, rubber sole',
    inStock: true,
    isNewDrop: true,
    isTrending: true,
  },
];
