import { useMutation } from '@tanstack/react-query';
import { submitContactForm, type ContactPayload } from '../services/api';

export const useContactForm = () => {
  return useMutation({
    mutationFn: (payload: ContactPayload) => submitContactForm(payload),
  });
};
