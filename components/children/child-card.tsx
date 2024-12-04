import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Calendar, Archive, RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { ArchiveDialog } from './archive-dialog';

interface ChildCardProps {
  child: {
    id: number;
    name: string;
    age: number;
    diagnosis: string;
    profileImage: string;
    milestones: Array<{
      id: number;
      category: string;
      status: string;
    }>;
    therapySessions: Array<{
      id: number;
      type: string;
      date: string;
    }>;
  };
  isArchived?: boolean;
  onArchiveToggle?: () => void;
}

export function ChildCard({ child, isArchived, onArchiveToggle }: ChildCardProps) {
  const completedMilestones = child.milestones.filter(
    (m) => m.status === 'achieved'
  ).length;
  const totalMilestones = child.milestones.length;
  const progress = (completedMilestones / totalMilestones) * 100;

  const nextSession = child.therapySessions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .find((session) => new Date(session.date) >= new Date());

  return (
    <Card className={`hover:shadow-lg transition-shadow ${isArchived ? 'opacity-75' : ''}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={child.profileImage} alt={child.name} />
          <AvatarFallback>{child.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{child.name}</h3>
          <p className="text-sm text-muted-foreground">
            Age: {child.age} • {child.diagnosis}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {completedMilestones}/{totalMilestones} Goals
            </span>
          </div>
          {nextSession && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{nextSession.type}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link href={`/dashboard/children/${child.id}`} className="flex-1">
            <Button className="w-full" variant="secondary">
              View Profile
            </Button>
          </Link>
          {!isArchived ? (
            <ArchiveDialog
              childId={child.id}
              childName={child.name}
              onArchived={onArchiveToggle}
            />
          ) : (
            <Button
              variant="outline"
              className="flex-1"
              onClick={onArchiveToggle}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Restore
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}