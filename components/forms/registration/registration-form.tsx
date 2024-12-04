'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressIndicator } from './progress-indicator';
import { FormNavigation } from './form-navigation';
import { PersonalInfoStep } from './steps/personal-info-step';
import { MedicalHistoryStep } from './steps/medical-history-step';
import { FamilyInfoStep } from './steps/family-info-step';
import { EducationalInfoStep } from './steps/educational-info-step';
import { useRegistrationForm } from './form-provider';
import { useToast } from '@/hooks/use-toast';

const steps = [
  {
    title: 'Personal Info',
    description: 'Basic details',
  },
  {
    title: 'Medical History',
    description: 'Health information',
  },
  {
    title: 'Family Info',
    description: 'Guardian details',
  },
  {
    title: 'Education',
    description: 'School records',
  },
];

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const form = useRegistrationForm();
  const { toast } = useToast();

  const { handleSubmit, trigger, formState: { isValid, isDirty } } = form;

  const onSubmit = async (data: any) => {
    if (currentStep < steps.length - 1) {
      const isStepValid = await trigger();
      if (isStepValid) {
        setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      try {
        // In a real app, this would call an API
        console.log('Form submitted:', data);
        toast({
          title: 'Success',
          description: 'Registration completed successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to submit registration',
          variant: 'destructive',
        });
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleSave = () => {
    // In a real app, this would save progress to local storage or API
    toast({
      title: 'Progress Saved',
      description: 'Your progress has been saved',
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <ProgressIndicator
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      <Card className="mt-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {currentStep === 0 && <PersonalInfoStep form={form} />}
            {currentStep === 1 && <MedicalHistoryStep form={form} />}
            {currentStep === 2 && <FamilyInfoStep form={form} />}
            {currentStep === 3 && <EducationalInfoStep form={form} />}

            <FormNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              isValid={isValid}
              isDirty={isDirty}
              onNext={handleSubmit(onSubmit)}
              onPrevious={handlePrevious}
              onSave={handleSave}
            />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}