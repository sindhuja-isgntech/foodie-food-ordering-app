// Cuisine values here must match the `cuisine` column seeded in the backend
// DataLoader, since they are sent straight through as the `?cuisine=` filter.
export const CUISINES = ['All', 'Indian', 'Italian', 'Fast Food', 'Japanese', 'Asian'] as const;

export type Cuisine = (typeof CUISINES)[number];
