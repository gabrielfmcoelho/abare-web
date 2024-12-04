import { createElement, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, Award } from 'lucide-react';
import { format } from 'date-fns';
import { MilestoneForm } from './milestone-form';
import { ListHeader } from './list-header';

const categoryIcons = {
  Communication: Brain,
  'Motor Skills': Target,
  default: Award,
};

interface MilestoneListProps {
  milestones: Array<{
    id: number;
    category: string;
    title: string;
    date: string;
    notes: string;
    status: string;
  }>;
}

export function MilestoneList({ milestones }: MilestoneListProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <ListHeader
        title="Development Milestones"
        description="Track and monitor developmental progress"
        onAdd={() => setShowForm(true)}
        addButtonText="Add Milestone"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {milestones.map((milestone) => (
        <Card key={milestone.id} className="flex overflow-hidden">
          <div className="w-2 bg-primary" />
          <div className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-start gap-4">
              {createElement(
                categoryIcons[milestone.category as keyof typeof categoryIcons] || categoryIcons.default,
                { className: "h-8 w-8 text-primary" }
              )}
              <div>
              <CardTitle className="text-base font-medium">
                {milestone.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{milestone.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(milestone.date), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            </div>
            <Badge
              variant={milestone.status === 'achieved' ? 'default' : 'outline'}
            >
              {milestone.status}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{milestone.notes}</p>
          </CardContent>
          </div>
        </Card>
      ))}
      </div>
      <MilestoneForm
        isOpen={showForm}
        onOpenChange={setShowForm}
        onSubmit={(data) => {
          console.log('New milestone:', data);
          setShowForm(false);
        }}
      />
    </div>
  );
}