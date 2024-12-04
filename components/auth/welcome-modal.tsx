'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, Heart, Users, LineChart } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Brain,
    title: 'Acompanhamento do Desenvolvimento',
    description: 'Monitore o progresso e as metas de desenvolvimento com insights detalhados.',
  },
  {
    icon: Users,
    title: 'Cuidado Colaborativo',
    description: 'Conecte e compartilhe informações entre pais, terapeutas e educadores para um cuidado integrado.',
  },
  {
    icon: Heart,
    title: 'Suporte Personalizado',
    description: "Customizado para atender a jornada única de cada criança e família.",
  },
];

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex flex-col items-center align-middle justify-center">
            <Image src="/logoabare.png" alt="Abaré" width={150} height={150} />
            Bem Vindo(a) ao Abaré
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Sua plataforma completa para acompanhar e apoiar crianças com necessidades especiais.
            Fornecemos as ferramentas e insights necessários para garantir que cada criança alcance seu potencial máximo.
            Descubra como o Abaré pode ajudar você e aqueles que você ama e acompanha.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleClose}>
            Entendi, Vamos Começar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}