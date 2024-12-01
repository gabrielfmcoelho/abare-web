// src/components/LoginForm.tsx

"use client";

import { LogIn, ShieldAlert, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { TEXT } from "@/app/texts";
import { CurrentUser } from "@/types";
import { CurrentDemoUser } from "@/data/user";

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
});

const LoginForm: React.FC = () => {
  const { toast } = useToast();
  const [systemStatus, setSystemStatus] = useState<{ online: boolean; loading: boolean }>({ online: false, loading: true });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        console.log("Checking health...");
        const response = await fetch("https://127.0.0.1:8080/api/health");
        console.log(response);
        if (response.ok) {
          setSystemStatus({ online: true, loading: false });
        } else {
          const data = await response.json();
          throw new Error(data.message || "Erro desconhecido");
        }
      } catch (error) {
        setSystemStatus({ online: false, loading: false });
        toast({
          title: TEXT.loginForm.errorTitle,
          description: "Iniciando modo demo offline.",
          variant: "destructive",
          action: <ToastAction altText="Ok">Entendo</ToastAction>,
        });
        form.setValue("email", CurrentDemoUser.email);
        form.setValue("password", CurrentDemoUser.password);
      }
    };

    checkHealth();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("https://127.0.0.1:8080/api/security/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        window.location.href = TEXT.loginForm.successRedirect;
      } else {
        throw new Error(data.message || "Erro desconhecido");
      }
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error.message || "Error de comunicação com servidor";
      toast({
        title: TEXT.loginForm.errorTitle,
        description: "Acessando plataforma em modo demo offline.",
        variant: "destructive",
        action: <ToastAction altText="ok">OK</ToastAction>,
      });
      window.location.href = TEXT.loginForm.successRedirect;
    }
  };

  return (
    <Card className="w-full md:w-2/3 xl:w-1/2 rounded-md shadow-md">
      <CardHeader className="flex flex-col space-y-4">
        <CardTitle className="text-2xl font-bold text-center">{TEXT.loginForm.title}</CardTitle>
        <CardDescription className="justify-center items-center text-center flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <span className="flex flex-row items-center justify-center text-center">
            <span
              className={`w-3 h-3 rounded-full mr-2 ${
                systemStatus.loading
                  ? "bg-gray-500"
                  : systemStatus.online
                  ? "bg-green-500"
                  : "bg-orange-500"
              }`}
            />
            {TEXT.loginForm.description.systemStatus}
            <span className={`font-bold ml-1 ${systemStatus.online ? "text-green-500" : "text-orange-500"}`}>
              {systemStatus.online ? "Online" : "Offline"}
            </span>
          </span>
          <span className="flex flex-row items-center justify-center">
            {TEXT.loginForm.description.version}{" "}
            <span className="ml-1 font-semibold">{TEXT.loginForm.description.versionNumber}</span>
          </span>
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">{TEXT.loginForm.emailLabel}</Label>
            <Input id="email" placeholder={TEXT.loginForm.emailPlaceholder} {...form.register("email")} />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">{TEXT.loginForm.passwordLabel}</Label>
            <Input
              type="password"
              id="password"
              placeholder={TEXT.loginForm.passwordPlaceholder}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="flex flex-row w-full bg-[#23a4c5] text-white hover:bg-[#0f427d] focus:outline-none focus:ring-2 focus:ring-[#23a4c5] focus:ring-opacity-75 transition duration-200 ease-in-out rounded-md p-2"
          >
            <LogIn size={18} className="mr-2" />
            <p>{TEXT.loginForm.submitButton}</p>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <ShieldAlert size={18} className="mr-2" />
                <p>{TEXT.loginForm.forgotPassword}</p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{TEXT.loginForm.resetPasswordTitle}</DialogTitle>
                <DialogDescription>{TEXT.loginForm.resetPasswordDescription}</DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue={TEXT.loginForm.resetPasswordContact} readOnly />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="px-3"
                  onClick={() => {
                    navigator.clipboard.writeText(TEXT.loginForm.resetPasswordContact);
                    toast({
                      title: "Email copiado!",
                      description: "O email de contato foi copiado para a área de transferência.",
                      action: <ToastAction altText="Ok">Ok</ToastAction>,
                    });
                  }}
                >
                  <span className="sr-only">{TEXT.loginForm.copyButtonLabel}</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    <p>{TEXT.loginForm.closeButton}</p>
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
