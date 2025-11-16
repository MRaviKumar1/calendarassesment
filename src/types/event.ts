export interface Event {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  color: string; // Hex color
}

export interface CalendarEvent extends Event {
  hasConflict?: boolean;
  conflictCount?: number;
}
