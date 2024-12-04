'use client';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import Image from 'next/image';
import { useRegistrationForm } from '../form-provider';

export function PersonalInfoStep() {
  const form = useRegistrationForm();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        form.setError('personalInfo.profilePhoto', {
          type: 'manual',
          message: 'File size must be less than 5MB',
        });
        return;
      }
      
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      form.setValue('personalInfo.profilePhoto', file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="personalInfo.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalInfo.middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter middle name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="personalInfo.lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter last name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="personalInfo.dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="personalInfo.gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender Identity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.sexAtBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex Assigned at Birth</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sex at birth" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <Label htmlFor="photo">Profile Photo (Optional)</Label>
        <div className="flex items-center gap-4">
          {previewUrl && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={previewUrl}
                alt="Profile preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          <Input
            id="photo"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="max-w-xs"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Maximum file size: 5MB. Accepted formats: JPG, PNG
        </p>
        {form.formState.errors.personalInfo?.profilePhoto && (
          <p className="text-sm text-destructive">
            {form.formState.errors.personalInfo.profilePhoto.message}
          </p>
        )}
      </div>
    </div>
  );
}