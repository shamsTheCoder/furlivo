import { z } from 'zod';

// ─── Address Schema ───────────────────────────────────────────────────────────

export const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  line1: z.string().min(1, 'Address is required'),
  line2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(2, 'Country is required'),
  zip: z.string().min(3, 'Postal code is required'),
  phone: z.string().optional(),
});

// ─── Checkout Schemas ─────────────────────────────────────────────────────────

export const checkoutContactSchema = z.object({
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  marketingConsent: z.boolean().default(false),
});

export const checkoutShippingSchema = addressSchema;

export const checkoutSchema = z.object({
  contact: checkoutContactSchema,
  shippingAddress: checkoutShippingSchema,
  billingAddressSameAsShipping: z.boolean().default(true),
  billingAddress: addressSchema.optional(),
  couponCode: z.string().optional(),
});

// ─── Product Schemas ──────────────────────────────────────────────────────────

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, hyphens'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().max(300).optional(),
  price: z.number().positive('Price must be positive'),
  comparePrice: z.number().positive().optional(),
  supplierSku: z.string().optional(),
  supplierCost: z.number().positive().optional(),
  inventory: z.number().int().min(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
});

// ─── Review Schema ────────────────────────────────────────────────────────────

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(100).optional(),
  body: z.string().min(10, 'Review must be at least 10 characters').max(2000),
  customerName: z.string().min(1, 'Name is required'),
});

// ─── Discount Schema ──────────────────────────────────────────────────────────

export const discountSchema = z.object({
  code: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[A-Z0-9-]+$/, 'Code must be uppercase letters, numbers, hyphens'),
  type: z.enum(['percent', 'fixed']),
  value: z.number().positive(),
  minOrder: z.number().positive().optional(),
  maxUses: z.number().int().positive().optional(),
  expiresAt: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
});

// ─── Newsletter Schema ────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email('Valid email required'),
});

// ─── Contact Schema ───────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// ─── Auth Schemas ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Valid email required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
    marketingConsent: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// ─── Exports ──────────────────────────────────────────────────────────────────

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
export type ProductSchema = z.infer<typeof productSchema>;
export type ReviewSchema = z.infer<typeof reviewSchema>;
export type DiscountSchema = z.infer<typeof discountSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
