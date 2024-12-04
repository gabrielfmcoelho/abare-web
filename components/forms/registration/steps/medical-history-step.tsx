'use client';

import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { RegistrationData } from '../types';

const commonAllergies = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Eggs',
  'Soy',
  'Wheat',
  'Fish',
  'Shellfish',
];

const commonConditions = [
  'Asthma',
  'Diabetes',
  'Epilepsy',
  'Heart Condition',
  'ADHD',
  'Autism',
  'Anxiety',
  'Depression',
];

interface MedicalHistoryStepProps {
  form: UseFormReturn<RegistrationData>;
}

export function MedicalHistoryStep({ form }: MedicalHistoryStepProps) {
  const medications = form.watch('medicalHistory.medications') || [];

  const addMedication = () => {
    const currentMeds = form.getValues('medicalHistory.medications') || [];
    form.setValue('medicalHistory.medications', [
      ...currentMeds,
      { name: '', dosage: '', frequency: '' },
    ]);
  };

  const removeMedication = (index: number) => {
    const currentMeds = form.getValues('medicalHistory.medications') || [];
    form.setValue(
      'medicalHistory.medications',
      currentMeds.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="medicalHistory.bloodType"
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Emergency Contact</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="medicalHistory.emergencyContact.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medicalHistory.emergencyContact.relationship"
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
            name="medicalHistory.emergencyContact.phone"
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
            name="medicalHistory.emergencyContact.email"
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
      </div>

      <div className="space-y-4">
        <FormLabel>Allergies</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {commonAllergies.map((allergy) => (
            <FormField
              key={allergy}
              control={form.control}
              name="medicalHistory.allergies"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(allergy)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        const updated = checked
                          ? [...current, allergy]
                          : current.filter((a) => a !== allergy);
                        field.onChange(updated);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {allergy}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
        <FormField
          control={form.control}
          name="medicalHistory.otherAllergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Allergies</FormLabel>
              <FormControl>
                <Input placeholder="List any other allergies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormLabel>Medical Conditions</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {commonConditions.map((condition) => (
            <FormField
              key={condition}
              control={form.control}
              name="medicalHistory.medicalConditions"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(condition)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        const updated = checked
                          ? [...current, condition]
                          : current.filter((c) => c !== condition);
                        field.onChange(updated);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {condition}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
        <FormField
          control={form.control}
          name="medicalHistory.otherConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Other Conditions</FormLabel>
              <FormControl>
                <Input placeholder="List any other conditions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel>Current Medications</FormLabel>
          <Button type="button" variant="outline" size="sm" onClick={addMedication}>
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </div>
        {medications.map((_, index) => (
          <div key={index} className="grid gap-4 md:grid-cols-3 items-start">
            <FormField
              control={form.control}
              name={`medicalHistory.medications.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medication Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter medication name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`medicalHistory.medications.${index}.dosage`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dosage</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dosage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end gap-2">
              <FormField
                control={form.control}
                name={`medicalHistory.medications.${index}.frequency`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter frequency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mb-2"
                onClick={() => removeMedication(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}