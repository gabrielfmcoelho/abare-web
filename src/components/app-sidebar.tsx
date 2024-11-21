"use client"

import * as React from "react"
import { 
  Plus,
  Edit,
  Sparkles,
  Calendar as CalendarIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendars } from "@/components/calendars"
import { format } from "date-fns"
import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "./ui/calendar"
import { Textarea } from "./ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

// This is sample data.
const data = {
  user: {
    name: "Layse Policarpo",
    email: "laysepolicarpo@abare.tech",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: 'Tags',
      items: ['Escola', 'Casa', 'Crise', 'Gostos', 'Desgostos', 'Desenvolvimento', 'Atenção', 'Medico'],
    },
    {
      name: "Acompanhados",
      items: ['José Lucas Lucena', 'Samuel Martins', 'Lucas Vinicius', 'Maria Cecilia Almeida'],
    },
    {
      name: "Ambientes",
      items: ["Familia", "Escola", "Externo"]
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openPatientPopover, setOpenPatientPopover] = React.useState(false)
  const [selectedPatient, setSelectedPatient] = React.useState<string | null>(null)
  const [diarySelectedDate, setDiarySelectedDate] = React.useState<Date>()
  const { toast } = useToast()

  // create a funcion that trigger a toast: toast("string")
  function AddDiary() {
    toast({
      title: 'Diário criado: ____',
      description: '21 de novembro 2024',
      action: (
        <ToastAction altText='Desfazer diario'>Desfazer</ToastAction>
      )
    })
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <Dialog>
          <DialogTrigger asChild className="mx-auto">
            <Button className='w-10/12 mb-4'>
              <Plus />
              Novo Diário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Diário</DialogTitle>
              <DialogDescription>
                Crie um novo diário ou adicione registro a um existente. Clique em salvar quando finalizar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="diary-title">Titulo</Label>
                <div className="flex flex-row space-x-4 items-center">
                  <Input 
                    id="diary-title"
                    placeholder="Acontecimento Inesperado"
                    required
                  />
                  <Button variant={"outline"}>
                    <Sparkles />
                  </Button>
                </div>      
              </div>
              <div className='grid gap-4 grid-flow-col'>
                <div className="grid gap-2">
                  <Label htmlFor="patient-picker">Acompanhado</Label>
                  <Popover open={openPatientPopover} onOpenChange={setOpenPatientPopover}>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className='w-full justify-start text-left font-normal'>
                        {
                          selectedPatient ? (
                            <>
                              {selectedPatient}
                            </>
                          ) : (
                            <>
                              + Adicionar Acompanhado
                            </>
                          )
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0' side='bottom' align='start'>
                      <Command>
                        <CommandInput placeholder='Busque acompanhado' />
                        <CommandList>
                          <CommandEmpty>Nenhum resultado encontrado</CommandEmpty>
                          <CommandGroup>
                            {data.calendars[1].items.map((patientName) => 
                              <CommandItem
                                key={patientName}
                                value={patientName}
                                onSelect={(value) => {
                                  setSelectedPatient(patientName)
                                  setOpenPatientPopover(false)
                                }}
                              >
                                <span>{patientName}</span>
                              </CommandItem>
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='diary-date'>Data do registro</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn('w-full justify-start text-left font-normal', !diarySelectedDate && 'text-muted-foreground')}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {diarySelectedDate ? format(diarySelectedDate, "PPP") : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode='single'
                        selected={diarySelectedDate}
                        onSelect={setDiarySelectedDate}
                        initialFocus
                        />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='Anotação'>Anotação</Label>
                <Textarea placeholder="Realize suas anotações aqui sobre o acompanhado." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={AddDiary} type='button'>
                  <Edit />
                  Criar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
