import { LoginForm } from '@/components/auth/login-form';
import { WelcomeModal } from '@/components/auth/welcome-modal';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-4">
        <LoginForm />
        <WelcomeModal />
      </div>
    </main>
  );
}