export const awaitToError = async <E = Error, T = any>(
  p: Promise<T>,
): Promise<[E | null, T | null]> => {
  try {
    const r = await Promise.resolve<T>(p);
    
    return [null, r];
  } catch (e: any) {
    return [e, null];
  }
};
