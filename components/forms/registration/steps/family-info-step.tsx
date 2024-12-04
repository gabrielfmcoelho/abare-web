'use client';

import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { RegistrationData } from '../types';

interface FamilyInfoStepProps {
  form: UseFormReturn<RegistrationData>;
}

export function FamilyInfoStep({ form }: FamilyInfoStepProps) {
  const additionalGuardians = form.watch('familyInfo.additionalGuardians') || [];
  const siblings = form.watch('familyInfo.siblings') || [];

  const addGuardian = () => {
    const current = form.getValues('familyInfo.additionalGuardians') || [];
    form.setValue('familyInfo.additionalGuardians', [
      ...current,
      { name: '', relationship: '', phone: '', email: '', address: '' },
    ]);
  };

  const removeGuardian = (index: number) => {
    const current = form.getValues('familyInfo.additionalGuardians') || [];
    form.setValue(
      'familyInfo.additionalGuardians',
      current.filter((_, i) => i !== index)
    );
  };

  const addSibling = () => {
    const current = form.getValues('familyInfo.siblings') || [];
    form.setValue('familyInfo.siblings', [
      ...current,
      { name: '', age: 0, sameSchool: false },
    ]);
  };

  const removeSibling = (index: number) => {
    const current = form.getValues('familyInfo.siblings') || [];
    form.setValue(
      'familyInfo.siblings',
      current.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Primary Guardian</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="familyInfo.primaryGuardian.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="familyInfo.primaryGuardian.relationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relationship</FormLabel>
                <FormControl>
                  <Input placeholder="Enter relationship" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="familyInfo.primaryGuardian.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="familyInfo.primaryGuardian.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="familyInfo.primaryGuardian.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Additional Guardians</h3>
          <Button type="button" variant="outline" size="sm" onClick={addGuardian}>
            <Plus className="h-4 w-4 mr-2" />
            Add Guardian
          </Button>
        </div>
        {additionalGuardians.map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeGuardian(index)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name={`familyInfo.additionalGuardians.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyInfo.additionalGuardians.${index}.relationship`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter relationship" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyInfo.additionalGuardians.${index}.phone`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyInfo.additionalGuardians.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`familyInfo.additionalGuardians.${index}.address`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Siblings</h3>
          <Button type="button" variant="outline" size="sm" onClick={addSibling}>
            <Plus className="h-4 w-4 mr-2" />
            Add Sibling
          </Button>
        </div>
        {siblings.map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeSibling(index)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name={`familyInfo.siblings.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`familyInfo.siblings.${index}.age`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Enter age"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}