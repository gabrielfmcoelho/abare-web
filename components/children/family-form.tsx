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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Save, X, Plus, Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const parentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  relation: z.string(),
  occupation: z.string(),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  workplace: z.string(),
  workAddress: z.string(),
});

const siblingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(0),
  relation: z.string(),
  birthDate: z.string(),
  school: z.string().optional(),
  grade: z.string().optional(),
});

const familyFormSchema = z.object({
  parents: z.array(parentSchema),
  siblings: z.array(siblingSchema),
  emergencyContact: z.object({
    name: z.string(),
    relation: z.string(),
    phone: z.string(),
    email: z.string().email(),
    address: z.string(),
  }),
});

type FamilyFormData = z.infer<typeof familyFormSchema>;

interface FamilyFormProps {
  initialData: any;
  onSubmit: (data: FamilyFormData) => void;
}

export function FamilyForm({ initialData, onSubmit }: FamilyFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<FamilyFormData>({
    resolver: zodResolver(familyFormSchema),
    defaultValues: {
      parents: initialData.family.parents,
      siblings: initialData.family.siblings,
      emergencyContact: initialData.emergencyContact,
    },
  });

  const handleSubmit = async (data: FamilyFormData) => {
    try {
      await onSubmit(data);
      setIsEditing(false);
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Family Information</CardTitle>
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
            <Button type="submit" size="sm" form="familyForm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form id="familyForm" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Parents/Guardians</h3>
                {form.watch('parents').map((_, index) => (
                  <div key={index} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <FormField
                      control={form.control}
                      name={`parents.${index}.name`}
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
                        name={`parents.${index}.relation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relation</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`parents.${index}.occupation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`parents.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`parents.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`parents.${index}.address`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Home Address</FormLabel>
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
                        name={`parents.${index}.workplace`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Workplace</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`parents.${index}.workAddress`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Siblings</h3>
                {form.watch('siblings').map((_, index) => (
                  <div key={index} className="space-y-4 mb-6 p-4 border rounded-lg">
                    <FormField
                      control={form.control}
                      name={`siblings.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
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
                        name={`siblings.${index}.age`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`siblings.${index}.relation`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relation</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`siblings.${index}.school`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>School</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`siblings.${index}.grade`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grade</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
                <div className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name="emergencyContact.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
                      name="emergencyContact.relation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relation</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="emergencyContact.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
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
                    name="emergencyContact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Parents/Guardians</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {initialData.family.parents.map((parent: any) => (
                  <div key={parent.name} className="space-y-2">
                    <h4 className="font-medium">{parent.name}</h4>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Relation:</dt>
                        <dd>{parent.relation}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Phone:</dt>
                        <dd>{parent.phone}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Email:</dt>
                        <dd>{parent.email}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Address:</dt>
                        <dd className="mt-1">{parent.address}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Workplace:</dt>
                        <dd className="mt-1">{parent.workplace}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Siblings</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {initialData.family.siblings.map((sibling: any) => (
                  <div key={sibling.name} className="space-y-2">
                    <h4 className="font-medium">{sibling.name}</h4>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Age:</dt>
                        <dd>{sibling.age}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Relation:</dt>
                        <dd>{sibling.relation}</dd>
                      </div>
                      {sibling.school && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">School:</dt>
                          <dd>{sibling.school}</dd>
                        </div>
                      )}
                      {sibling.grade && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Grade:</dt>
                          <dd>{sibling.grade}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Name:</dt>
                  <dd>{initialData.emergencyContact.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Relation:</dt>
                  <dd>{initialData.emergencyContact.relation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Phone:</dt>
                  <dd>{initialData.emergencyContact.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Email:</dt>
                  <dd>{initialData.emergencyContact.email}</dd>
                </div>
                <div>
                  <dt className="font-medium">Address:</dt>
                  <dd className="mt-1">{initialData.emergencyContact.address}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}