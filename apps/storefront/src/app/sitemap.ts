import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://furlivo.shop';

  const now = new Date();

  return [
    // ── Homepage ────────────────────────────────────────────
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },

    // ── Products ─────────────────────────────────────────────
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/products/steam-grooming-brush`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products/pet-hair-remover-roller`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/products/grooming-bundle`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },

    // ── Blog ─────────────────────────────────────────────────
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/blog/how-to-reduce-pet-shedding`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog/best-grooming-routine-for-cats`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog/steam-vs-dry-brush-grooming`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog/grooming-anxious-pets`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog/fur-on-furniture-solutions`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/blog/furlivo-steam-brush-review`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // ── Brand pages ───────────────────────────────────────────
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // ── Legal / support ───────────────────────────────────────
    { url: `${baseUrl}/returns`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/order-tracking`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];
}

