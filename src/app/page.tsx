"use client"

import Image from "next/image";
import Link from "next/link";

import { LogIn, Hospital, Copy, ShieldAlert, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string({
    message: "Por favor, insira um endereço de e-mail",
  }).email({
    message: "Por favor, insira um endereço de e-mail válido",
  }),
  password: z.string({
    message: "Por favor, insira uma senha",
  }).min(8, {
    message: "A senha deve ter no mínimo 8 caracteres",
  }),
})

export default function Home() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)

    let apiResponse = await fetch('/api/security/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => response.json()).then((data) => {
      console.log('Success:', data);
      window.location.href = '/plataforma';
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <main className="flex flex-col lg:flex-row items-center justify-center w-full h-full bg-slate-100">
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-screen lg:space-y-4 bg-white">
        <div className="w-full h-1/6 pl-4 pt-4 justify-center flex flex-col items-center lg:items-start">
          <Skeleton className="w-[200px] h-[100px] rounded-md" />
        </div>
        <div className="w-full h-4/6 pl-4 flex flex-col items-center justify-evenly">
          <div className="flex flex-row items-center justify-center space-x-4">
            <Skeleton className="w-[50px] h-[50px] rounded-md" />
            <h1 className="text-3xl font-bold">
              Abaré
            </h1>
          </div>
          <p className="text-center pl-16 pr-16 lg:pl-28 lg:pr-28">
          Acompanhar o desenvolvimento de crianças com Transtorno do Espectro Autista (TEA) nunca foi tão fácil e eficiente. Nossa plataforma conecta famílias, clínicas e escolas em um ambiente colaborativo, garantindo um acompanhamento personalizado e contínuo para maximizar o progresso de cada criança. <br/><br/>Com ferramentas intuitivas, oferecemos o suporte que todos os envolvidos no processo de desenvolvimento infantil merecem.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-row items-center justify-center space-x-4">
              <Skeleton className="w-[20px] h-[20px] rounded-md" />
              <p className="font-semibold text-sm">
                Monitoramento em tempo real
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4">
              <Skeleton className="w-[20px] h-[20px] rounded-md" />
              <p className="font-semibold text-sm">
                Relatórios personalizados
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4">
              <Skeleton className="w-[20px] h-[20px] rounded-md" />
              <p className="font-semibold text-sm">
                Comunicação facilitada
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4">
              <Skeleton className="w-[20px] h-[20px] rounded-md" />
              <p className="font-semibold text-sm">
                Acesso a qualquer momento
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-1/6 pl-4 pb-4 flex flex-col items-center lg:items-start justify-center lg:justify-end text-sm">
          <p>
            Potencializado por
            <span className="font-semibold"> InovaICEV </span>
          </p>
          <p>
            © Copyrights 2020 | 
            <span> </span>
            <Link href="/termos-de-uso">
              Direitos reservados
            </Link>
          </p>
          <p>
            Conheça nossos
            <span> </span>
            <Link href="/politica-de-privacidade">
              termos de uso
            </Link>
            <span> </span>
            e adequações à LGPD
          </p>
          <div className="flex flex-row space-x-4">
            <Button variant="ghost" className="flex flex-row">
              <Phone size={18} className="" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 h-screen">
        <Card className="w-full md:w-2/3 xl:w-1/2 rounded-md shadow-md">
          <CardHeader className="flex flex-col space-y-4">
            <CardTitle className="text-2xl font-bold text-center">
              Acesso a Plataforma
            </CardTitle>
            <CardDescription className="justify-center items-center text-center flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
              <span className="flex flex-row items-center justify-center text-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"/>
                Sistema
                <span className="font-bold text-green-500 ml-1">Online</span>
              </span>
              <span className="flex flex-row items-center justify-center">
                Versão
                <span className="ml-1 font-semibold">1.0.0</span>
              </span>
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Insira seu email ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Insira sua senha ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="flex flex-row w-full">
                    <LogIn size={18} className="mr-2" />
                    <p>Autenticar</p>
                  </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost">
                      <ShieldAlert size={18} className="mr-2" />
                      <p>Esqueceu a senha?</p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Recuperar senha</DialogTitle>
                      <DialogDescription>
                        Para usuários padrões, orientamos a solicitação por meio administrador do sistema da sua instituição. Para casos excepcionais, entre em contato com o suporte técnico abaixo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue="contato@inovaicev.tech"
                          readOnly
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copiar</span>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          <p>Fechar</p>
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </main>
  );
}
