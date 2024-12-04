'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const bioFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  birthDate: z.string(),
  gender: z.string(),
  bloodType: z.string(),
  allergies: z.string(),
  medications: z.string(),
  diagnosis: z.string(),
  grade: z.string(),
});

type BioFormData = z.infer<typeof bioFormSchema>;

interface BioFormProps {
  initialData: any;
  onSubmit: (data: BioFormData) => void;
}

export function BioForm({ initialData, onSubmit }: BioFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<BioFormData>({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      name: initialData.name,
      birthDate: initialData.birthDate,
      gender: initialData.gender,
      bloodType: initialData.bloodType,
      allergies: initialData.allergies.join(', '),
      medications: initialData.medications.join(', '),
      diagnosis: initialData.diagnosis,
      grade: initialData.grade || '',
    },
  });

  const handleSubmit = async (data: BioFormData) => {
    try {
      await onSubmit(data);
      setIsEditing(false);
      toast({
        title: 'Success',
        description: 'Biographical information updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update biographical information',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Biographical Information</CardTitle>
        {!isEditing ? (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" size="sm" form="bioForm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form id="bioForm" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diagnosis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Diagnosis</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List allergies separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Medications</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List medications separated by commas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="font-medium">Full Name:</dt>
              <dd>{initialData.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Birth Date:</dt>
              <dd>{new Date(initialData.birthDate).toLocaleDateString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Gender:</dt>
              <dd>{initialData.gender}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Blood Type:</dt>
              <dd>{initialData.bloodType}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium">Primary Diagnosis:</dt>
              <dd>{initialData.diagnosis}</dd>
            </div>
            <div>
              <dt className="font-medium">Allergies:</dt>
              <dd className="mt-1">{initialData.allergies.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-medium">Current Medications:</dt>
              <dd className="mt-1">{initialData.medications.join(', ')}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}