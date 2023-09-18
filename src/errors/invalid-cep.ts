import { ApplicationError } from '@/protocols';

export function invalidCep(resource: string): ApplicationError {
  return {
    name: 'NotFindCep',
    message: `${resource}`,
  };
}
