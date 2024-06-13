

export const generateSlots = (startTime: string, endTime: string, slotDuration: number) => {
    const timeToMinutes = (time: string): number => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    const minutesToTime = (minutes: number): string => {
      const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
      const mins = (minutes % 60).toString().padStart(2, '0');
      return `${hours}:${mins}`;
    };
  
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const totalDuration = endMinutes - startMinutes;
  
    const numberOfSlots = Math.floor(totalDuration / slotDuration);
    const slots = [];
  
    for (let i = 0; i < numberOfSlots; i++) {
      const slotStart = startMinutes + i * slotDuration;
      const slotEnd = slotStart + slotDuration;
      slots.push({
        startTime: minutesToTime(slotStart),
        endTime: minutesToTime(slotEnd)
      });
    }
  
    return slots;
  };

 