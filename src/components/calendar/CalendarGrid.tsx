import { format } from 'date-fns';
import { Event } from '@/types/event';
import { isToday, isCurrentMonth, formatDate, getEventsForDate, detectConflicts } from '@/utils/dateUtils';
import { cn } from '@/lib/utils';
import { CalendarEvent } from './CalendarEvent';

interface CalendarGridProps {
  days: Date[];
  currentMonth: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid = ({ days, currentMonth, events, onDateClick }: CalendarGridProps) => {
  return (
    <div className="flex-1 p-6">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-px mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-muted-foreground py-3"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden shadow-sm">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day, events);
          const eventsWithConflicts = detectConflicts(dayEvents);
          const isCurrentDay = isToday(day);
          const inCurrentMonth = isCurrentMonth(day, currentMonth);
          const isWeekend = index % 7 === 0 || index % 7 === 6;

          return (
            <div
              key={day.toISOString()}
              onClick={() => onDateClick(day)}
              className={cn(
                'bg-card min-h-[120px] p-2 cursor-pointer transition-all hover:bg-accent/50',
                !inCurrentMonth && 'opacity-40',
                isWeekend && 'bg-muted/20'
              )}
            >
              <div className="flex flex-col h-full">
                <div
                  className={cn(
                    'text-sm font-medium mb-1 w-8 h-8 flex items-center justify-center rounded-full',
                    isCurrentDay
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : isWeekend
                      ? 'text-muted-foreground'
                      : 'text-foreground'
                  )}
                >
                  {format(day, 'd')}
                </div>
                
                <div className="flex-1 space-y-1 overflow-y-auto">
                  {eventsWithConflicts.slice(0, 3).map((event) => (
                    <CalendarEvent key={event.id} event={event} />
                  ))}
                  {eventsWithConflicts.length > 3 && (
                    <div className="text-xs text-muted-foreground px-1">
                      +{eventsWithConflicts.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
