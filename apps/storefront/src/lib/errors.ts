import { toast } from '@/store/toast.store';
import { ZodError } from 'zod';

export function handleApiError(error: unknown) {
  console.error('[API Error]', error);

  if (error instanceof ZodError) {
    const firstError = error.errors[0];
    if (firstError) {
      toast.error(firstError.message, 'Validation Error');
    } else {
      toast.error('A validation error occurred.', 'Validation Error');
    }
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message, 'An error occurred');
    return;
  }

  if (typeof error === 'string') {
    toast.error(error, 'An error occurred');
    return;
  }

  toast.error('An unexpected error occurred. Please try again.', 'Oops!');
}
