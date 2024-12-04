'use client';

import { FormProvider } from '@/components/forms/registration/form-provider';

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormProvider>{children}</FormProvider>;
}