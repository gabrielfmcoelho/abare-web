import { RegistrationForm } from '@/components/forms/registration/registration-form';

export default function RegisterChildPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Registrar Nova Criança</h1>
        <p className="text-muted-foreground">
          Complete o formulário de registro para adicionar uma nova criança ao sistema
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}