import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, getDay, startOfWeek, endOfWeek } from 'date-fns';
import { Event, CalendarEvent } from '@/types/event';

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  // Get the start of the week for the first day of the month
  const calendarStart = startOfWeek(start, { weekStartsOn: 0 }); // Sunday
  // Get the end of the week for the last day of the month
  const calendarEnd = endOfWeek(end, { weekStartsOn: 0 });
  
  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isCurrentMonth = (date: Date, currentMonth: Date): boolean => {
  return isSameMonth(date, currentMonth);
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const getNextMonth = (date: Date): Date => {
  return addMonths(date, 1);
};

export const getPreviousMonth = (date: Date): Date => {
  return subMonths(date, 1);
};

export const getEventsForDate = (date: Date, events: Event[]): Event[] => {
  const dateStr = formatDate(date);
  return events.filter(event => event.date === dateStr);
};

// Check if two events overlap
const doEventsOverlap = (event1: Event, event2: Event): boolean => {
  const [start1Hour, start1Min] = event1.startTime.split(':').map(Number);
  const [end1Hour, end1Min] = event1.endTime.split(':').map(Number);
  const [start2Hour, start2Min] = event2.startTime.split(':').map(Number);
  const [end2Hour, end2Min] = event2.endTime.split(':').map(Number);
  
  const start1 = start1Hour * 60 + start1Min;
  const end1 = end1Hour * 60 + end1Min;
  const start2 = start2Hour * 60 + start2Min;
  const end2 = end2Hour * 60 + end2Min;
  
  return (start1 < end2) && (end1 > start2);
};

// Detect conflicts in events for a date
export const detectConflicts = (events: Event[]): CalendarEvent[] => {
  const result: CalendarEvent[] = [];
  
  events.forEach((event, index) => {
    let hasConflict = false;
    let conflictCount = 0;
    
    events.forEach((otherEvent, otherIndex) => {
      if (index !== otherIndex && doEventsOverlap(event, otherEvent)) {
        hasConflict = true;
        conflictCount++;
      }
    });
    
    result.push({
      ...event,
      hasConflict,
      conflictCount
    });
  });
  
  return result;
};
