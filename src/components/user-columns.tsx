"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type User = {
    id: string
    firstName: string
    surName: string
    jobTitle: string
    email: string
    services: string[]
    active: boolean
}

export const columns: ColumnDef<User>[] = [
    {
      header: 'Nome',
      accessorKey: 'firstName'
    },
    {
      header: 'Sobrenome',
      accessorKey: 'surName'
    },
    {
      header: 'Cargo',
      accessorKey: 'jobTitle'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Serviços',
      accessorKey: 'services',
      cell: ({ row }) => {
        const services = row.getValue('services') as string[]
        return <div className="text-right flex flex-row">
            {services.map((service) => (
                <Badge key={service} color="blue" variant={"outline"} className="mr-2">
                    {service}
                </Badge>
            ))}
        </div>
      }
    },
    {
      header: 'Ativo',
      accessorKey: 'active',
      cell: ({ row }) => {
        const active = row.getValue('active') as boolean
        return active ? 'Sim' : 'Não'
      }
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(user.email)}
                >
                  Copiar email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Editar usuário</DropdownMenuItem>
                <DropdownMenuItem>Deletar usuário</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
  ]
