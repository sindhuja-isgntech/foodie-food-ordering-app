// Optional text inputs are sent as null rather than empty strings.
export const emptyToNull = (value: string | null | undefined): string | null => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

// For number inputs / selects registered with react-hook-form: '' becomes null.
export const toNullableNumber = (value: unknown): number | null =>
  value === '' || value === null || value === undefined ? null : Number(value);
