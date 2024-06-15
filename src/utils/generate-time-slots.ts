import { addMinutes, format } from 'date-fns'

interface GenerateTimeSlotsProps {
  startTime: Date
  endTime: Date
  interval: number
}

export const generateTimeSlots = ({
  startTime,
  endTime,
  interval,
}: GenerateTimeSlotsProps) => {
  const slots = []

  let current = startTime

  while (current <= endTime) {
    slots.push(format(new Date(current), 'HH:mm'))

    current = addMinutes(current, interval)
  }

  return slots
}
