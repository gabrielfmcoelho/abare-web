'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AddMilestoneButton() {
  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={() => {
        // TODO: Implement milestone creation
        console.log('Add milestone clicked');
      }}
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Milestone
    </Button>
  );
}