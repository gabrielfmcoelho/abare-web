"use client"

import { useState } from 'react';
import { mockUserData } from '@/lib/api';
import { ChildCard } from '@/components/children/child-card';
import { Button } from '@/components/ui/button';
import { Plus, Archive, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function ChildrenPage() {
  const { children } = mockUserData.family;
  const archivedChildren = children.filter((child) => child.archived);
  const activeChildren = children.filter((child) => !child.archived);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Crianças</h2>
          <p className="text-muted-foreground">
            Gerencie e acompanhe o progresso das crianças
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/children/register">
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Registrar Criança
            </Button>
          </Link>
          {
            /*
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Adição rápida
            </Button>
            */
          }
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">
            Ativas
          </TabsTrigger>
          <TabsTrigger value="archived">
            <Archive className="mr-2 h-4 w-4" />
            Arquivadas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeChildren.map((child) => (
              <ChildCard key={child.id} child={child} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {archivedChildren.map((child) => (
              <ChildCard key={child.id} child={child} isArchived />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}