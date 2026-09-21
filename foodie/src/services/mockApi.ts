const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = async <T>(data: T, delay = 400): Promise<T> => {
  await wait(delay);
  return data;
};
