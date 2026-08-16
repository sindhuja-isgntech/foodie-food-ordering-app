const env = import.meta.env;

export const appConfig = {
  apiBaseUrl: (env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:5000/api',
  appName: (env.VITE_APP_NAME as string | undefined) ?? 'Foodie',
  defaultLocation: (env.VITE_DEFAULT_LOCATION as string | undefined) ?? 'Downtown',
};

export const getApiUrl = (path = ''): string => {
  const base = appConfig.apiBaseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${base}${normalizedPath}`;
};
