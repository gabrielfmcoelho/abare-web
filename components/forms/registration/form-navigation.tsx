'use client';

import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  isDirty: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onSave?: () => void;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  isValid,
  isDirty,
  onNext,
  onPrevious,
  onSave,
}: FormNavigationProps) {
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handlePrevious = () => {
    if (isDirty) {
      setShowLeaveDialog(true);
    } else {
      onPrevious();
    }
  };

  return (
    <>
      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
        >
          Previous
        </Button>
        <div className="space-x-2">
          {onSave && (
            <Button
              type="button"
              variant="outline"
              onClick={onSave}
              disabled={!isDirty}
            >
              Save Progress
            </Button>
          )}
          <Button
            type="submit"
            disabled={!isValid}
          >
            {isLastStep ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>

      <AlertDialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave this section?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowLeaveDialog(false);
                onPrevious();
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}