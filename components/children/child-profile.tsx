'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MilestoneList } from '@/components/children/milestone-list';
import { SessionList } from '@/components/children/session-list';
import { NotesList } from '@/components/children/notes-list';
import { CreateParentAccount } from '@/components/children/create-parent-account';
import { BioForm } from '@/components/children/bio-form';
import { FamilyForm } from '@/components/children/family-form';
import { useToast } from '@/hooks/use-toast';

interface ChildProfileProps {
  child: any; // Type this properly based on your data structure
}

export function ChildProfile({ child }: ChildProfileProps) {
  const { toast } = useToast();

  const handleBioSubmit = async (data: any) => {
    try {
      // In a real app, this would call an API
      console.log('Bio update:', data);
      toast({
        title: 'Success',
        description: 'Bio information updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update bio information',
        variant: 'destructive',
      });
    }
  };

  const handleFamilySubmit = async (data: any) => {
    try {
      // In a real app, this would call an API
      console.log('Family update:', data);
      toast({
        title: 'Success',
        description: 'Family information updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update family information',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <CreateParentAccount />
      </div>
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <BioForm initialData={child} onSubmit={handleBioSubmit} />
        <FamilyForm initialData={child} onSubmit={handleFamilySubmit} />
      </div>

      <Tabs defaultValue="milestones">
        <TabsList>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="sessions">Therapy Sessions</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="mt-6">
          <MilestoneList milestones={child.milestones} />
        </TabsContent>

        <TabsContent value="sessions" className="mt-6">
          <SessionList sessions={child.therapySessions} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <NotesList notes={child.notes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}