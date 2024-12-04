'use client';

import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Link de reset de senha invalido</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Este link de reset de senha é inválido ou expirou.
              Por favor, solicite um novo link de reset de senha.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-4">
        <ResetPasswordForm token={token} />
      </div>
    </main>
  );
}