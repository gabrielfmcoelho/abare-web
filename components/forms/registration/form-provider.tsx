'use client';

import { createContext, useContext } from 'react';
import { useForm, FormProvider as HookFormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, type RegistrationData } from './types';

const FormContext = createContext<ReturnType<typeof useForm<RegistrationData>> | null>(null);

export function useRegistrationForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useRegistrationForm must be used within a FormProvider');
  }
  return context;
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });

  return (
    <FormContext.Provider value={methods}>
      <HookFormProvider {...methods}>
        {children}
      </HookFormProvider>
    </FormContext.Provider>
  );
}