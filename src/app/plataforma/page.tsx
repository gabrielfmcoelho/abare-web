"use client"
import Link from "next/link";
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Settings } from "lucide-react";


export default function Platform() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between bg-white p-4 shadow-lg">
        <div className="flex items-center">
          <button className="lg:hidden" onClick={toggleDrawer}>
            <span className="material-icons">menu</span>
          </button>
          <Skeleton className="w-[50px] h-[50px] rounded-md" />
          <h1 className="text-lg font-bold ml-4">Entidade</h1>
          <span className="ml-2">| HUB</span>
        </div>
        <div className="flex items-center space-x-4">
          <Bell size={24} />
          <Link href="/plataforma/gestao">
            <Settings size={24} />
          </Link>
          <Avatar>
            <AvatarImage src="https://github.com/shadc.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1 bg-gray-200">
        <aside
          className={`bg-white lg:my-4 lg:block ${isDrawerOpen ? 'block' : 'hidden'} rounded-lg lg:w-32 w-32 flex-shrink-0 shadow-lg z-50 lg:relative absolute lg:translate-x-0 transform ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <nav className="flex flex-col p-4 space-y-4">
            <Button className="">Item 1</Button>
            <Button className="">Item 2</Button>
            <Button className="">Item 3</Button>
            <Button className="">Item 4</Button>
            <Button className="">Item 5</Button>
          </nav>
        </aside>
        <main className="flex-1 bg-gray-200 p-4">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle className='flex flex-row items-center space-x-2'>
                  <Skeleton className="w-[50px] h-[50px] rounded-md" />
                  <span className='font-semibold'>Serviço</span>
                </CardTitle>
                <CardDescription>Descrição</CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-44 rounded-md" />
              </CardContent>
              <CardFooter>
                <Button>Acessar</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className='flex flex-row items-center space-x-2'>
                  <Skeleton className="w-[50px] h-[50px] rounded-md" />
                  <span className='font-semibold'>Serviço</span>
                </CardTitle>
                <CardDescription>Descrição</CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-44 rounded-md" />
              </CardContent>
              <CardFooter>
                <Button variant={"outline"}>Contratar</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};