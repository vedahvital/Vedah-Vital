import { useMutation } from '@tanstack/react-query';
import { subscribeNewsletter } from '../services/api';

export const useNewsletterSubscribe = () => {
  return useMutation({
    mutationFn: (email: string) => subscribeNewsletter(email),
  });
};
