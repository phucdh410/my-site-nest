export type HttpResponse<T> = any & {
  data: T[] | T | null;
};
