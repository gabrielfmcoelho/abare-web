'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export function ProgressIndicator({
  steps,
  currentStep,
  completedSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="relative">
      <div
        className="absolute top-4 left-0 right-0 h-0.5 bg-muted"
        aria-hidden="true"
      >
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{
            width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>

      <ol className="relative z-10 flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;

          return (
            <li
              key={step.title}
              className="flex flex-col items-center"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2',
                  {
                    'border-primary bg-primary text-primary-foreground': isCompleted,
                    'border-primary bg-background': isCurrent,
                    'border-muted bg-muted': !isCompleted && !isCurrent,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 hidden md:block">
                <div className="text-xs font-semibold">{step.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}