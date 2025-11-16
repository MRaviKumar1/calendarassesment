import { useState } from 'react';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarGrid } from '@/components/calendar/CalendarGrid';
import { EventDetailsModal } from '@/components/calendar/EventDetailsModal';
import { getMonthDays, getNextMonth, getPreviousMonth } from '@/utils/dateUtils';
import eventsData from '@/data/events.json';
import { Event } from '@/types/event';

const Index = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = getMonthDays(currentMonth);
  const events: Event[] = eventsData;

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handleToday = () => {
    setCurrentMonth(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <CalendarHeader
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      
      <CalendarGrid
        days={days}
        currentMonth={currentMonth}
        events={events}
        onDateClick={handleDateClick}
      />

      <EventDetailsModal
        date={selectedDate}
        events={events}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
