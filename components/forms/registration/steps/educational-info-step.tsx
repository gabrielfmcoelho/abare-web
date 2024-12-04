'use client';

import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RegistrationData } from '../types';

const specialNeeds = [
  'Learning Support',
  'Speech Therapy',
  'Occupational Therapy',
  'Physical Therapy',
  'Behavioral Support',
  'Visual Support',
  'Hearing Support',
  'Social Skills Support',
];

const gradeLevels = [
  'Pre-K',
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
];

interface EducationalInfoStepProps {
  form: UseFormReturn<RegistrationData>;
}

export function EducationalInfoStep({ form }: EducationalInfoStepProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        form.setError('educationalInfo.academicRecords', {
          type: 'manual',
          message: 'File size must be less than 10MB',
        });
        return;
      }
      form.setValue('educationalInfo.academicRecords', file);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="educationalInfo.gradeLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Grade Level</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {gradeLevels.map((grade) => (
                  <SelectItem key={grade} value={grade.toLowerCase()}>
                    {grade}
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
        name="educationalInfo.previousSchool"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Previous/Current School</FormLabel>
            <FormControl>
              <Input placeholder="Enter school name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormLabel>Special Educational Needs</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specialNeeds.map((need) => (
            <FormField
              key={need}
              control={form.control}
              name="educationalInfo.specialNeeds"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(need)}
                      onCheckedChange={(checked) => {
                        const current = field.value || [];
                        const updated = checked
                          ? [...current, need]
                          : current.filter((n) => n !== need);
                        field.onChange(updated);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {need}
                  </FormLabel>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      <FormField
        control={form.control}
        name="educationalInfo.supportRequirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Support Requirements</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any additional support needs"
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormLabel htmlFor="records">Academic Records (Optional)</FormLabel>
        <Input
          id="records"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <p className="text-sm text-muted-foreground">
          Maximum file size: 10MB. Accepted formats: PDF, DOC, DOCX
        </p>
        {form.formState.errors.educationalInfo?.academicRecords && (
          <p className="text-sm text-destructive">
            {form.formState.errors.educationalInfo.academicRecords.message}
          </p>
        )}
      </div>
    </div>
  );
}