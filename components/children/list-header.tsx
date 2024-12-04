'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ListHeaderProps {
  title: string;
  description?: string;
  onAdd?: () => void;
  addButtonText?: string;
}

export function ListHeader({ 
  title, 
  description, 
  onAdd, 
  addButtonText = "Add New"
}: ListHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {onAdd && (
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {addButtonText}
        </Button>
      )}
    </div>
  );
}