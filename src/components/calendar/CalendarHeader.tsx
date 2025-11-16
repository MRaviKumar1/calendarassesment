import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatMonthYear } from '@/utils/dateUtils';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-card">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-foreground">
          {formatMonthYear(currentMonth)}
        </h1>
        <Button
          onClick={onToday}
          variant="outline"
          size="sm"
          className="hover:bg-accent transition-colors"
        >
          Today
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          onClick={onPreviousMonth}
          variant="ghost"
          size="icon"
          className="hover:bg-accent transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={onNextMonth}
          variant="ghost"
          size="icon"
          className="hover:bg-accent transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
