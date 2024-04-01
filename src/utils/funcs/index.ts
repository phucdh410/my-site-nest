import { HttpResponse } from 'src/types';

export const returnObjects = <T>(
  data: T | T[] | null,
  errorCode?: number,
  message?: string | null,
  errors?: [{ [key: string]: string }] | null,
): HttpResponse<T> => {
  return {
    data: data,
    errorCode: data != null ? 0 : errorCode ?? 0,
    message: data !== null ? null : message,
    errors: errors ?? null,
  };
};

export const destructureFile = (originalName: string) => {
  const index = originalName.lastIndexOf('.');

  const name = originalName.substring(0, index);
  const extension = originalName.substring(index + 1);

  return { name, extension };
};
