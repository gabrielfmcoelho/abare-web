import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { AddSessionButton } from './session-list-actions';
import { ListHeader } from './list-header';
import { DateRangeFilter } from './date-range-filter';

interface SessionListProps {
  sessions: Array<{
    id: number;
    type: string;
    date: string;
    notes: string;
    therapist: string;
  }>;
}

export function SessionList({ sessions }: SessionListProps) {
  const [filteredSessions, setFilteredSessions] = useState(sessions);

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    if (!range.from) {
      setFilteredSessions(sessions);
      return;
    }

    const filtered = sessions.filter((session) => {
      const sessionDate = new Date(session.date);
      if (range.to) {
        return sessionDate >= range.from && sessionDate <= range.to;
      }
      return sessionDate >= range.from;
    });

    setFilteredSessions(filtered);
  };

  return (
    <div className="space-y-4">
      <ListHeader
        title="Therapy Sessions"
        description="Schedule and track therapy progress"
      />

      <div className="flex justify-between items-center mb-6">
        <DateRangeFilter onRangeChange={handleDateRangeChange} />
        <AddSessionButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredSessions.map((session) => (
        <Card key={session.id} className="group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">
                {session.type}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {format(new Date(session.date), 'MMM d, yyyy')}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Session
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Cancel Session
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Therapist: {session.therapist}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{session.notes}</p>
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  );
}