import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Event } from '@/types/event';
import { getEventsForDate, detectConflicts } from '@/utils/dateUtils';
import { Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EventDetailsModalProps {
  date: Date | null;
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailsModal = ({
  date,
  events,
  isOpen,
  onClose,
}: EventDetailsModalProps) => {
  if (!date) return null;

  const dayEvents = getEventsForDate(date, events);
  const eventsWithConflicts = detectConflicts(dayEvents);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {format(date, 'EEEE, MMMM d, yyyy')}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          {eventsWithConflicts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No events scheduled for this day
            </div>
          ) : (
            <div className="space-y-3">
              {eventsWithConflicts.map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: event.color }}
                        />
                        <h3 className="font-semibold text-foreground">
                          {event.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>

                      {event.hasConflict && (
                        <Badge variant="destructive" className="mt-2 gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Conflicts with {event.conflictCount} event{event.conflictCount !== 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
