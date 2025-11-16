import { CalendarEvent as CalendarEventType } from '@/types/event';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface CalendarEventProps {
  event: CalendarEventType;
}

export const CalendarEvent = ({ event }: CalendarEventProps) => {
  return (
    <div
      className={cn(
        'text-xs px-2 py-1 rounded text-white truncate transition-all hover:scale-105 shadow-sm',
        event.hasConflict && 'ring-2 ring-destructive ring-offset-1'
      )}
      style={{ 
        backgroundColor: event.color,
        cursor: 'pointer'
      }}
      title={`${event.title} (${event.startTime} - ${event.endTime})${
        event.hasConflict ? ' - Conflicts with other events!' : ''
      }`}
    >
      <div className="flex items-center gap-1">
        {event.hasConflict && (
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
        )}
        <span className="truncate">{event.title}</span>
      </div>
    </div>
  );
};
