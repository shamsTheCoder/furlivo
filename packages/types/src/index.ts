// ─── Product Types ───────────────────────────────────────────────────────────

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number; // in cents
  comparePrice?: number; // in cents
  images: ProductImage[];
  variants: ProductVariant[];
  tags: string[];
  supplierSku?: string;
  supplierCost?: number;
  inventory: number;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  position: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>; // e.g. { color: 'blue', size: 'M' }
}

// ─── Order Types ─────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  guestEmail?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingAmount: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  shippingAddress: Address;
  billingAddress?: Address;
  stripePaymentIntentId?: string;
  supplierOrderId?: string;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
}

// ─── User / Customer Types ───────────────────────────────────────────────────

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  marketingConsent: boolean;
  supabaseAuthId: string;
  role: 'customer' | 'admin' | 'staff';
  createdAt: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  phone?: string;
}

// ─── Cart Types ──────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  variantName?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  slug: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}

// ─── Review Types ────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  customerId?: string;
  customerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  body: string;
  images?: string[];
  isVerified: boolean;
  isApproved: boolean;
  createdAt: string;
}

// ─── Discount Types ──────────────────────────────────────────────────────────

export interface Discount {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder?: number;
  maxUses?: number;
  usesCount: number;
  expiresAt?: string;
  isActive: boolean;
}

// ─── Payment Types ───────────────────────────────────────────────────────────

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}
