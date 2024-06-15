import { Calendar } from '@/app/_components/calendar'
import { fireEvent, render, screen } from '@testing-library/react'
import { addDays, format, startOfDay } from 'date-fns'
import { mockUserWithoutImage } from '../mocks/user'

test('renders without crashing', () => {
  render(<Calendar city={mockUserWithoutImage.city} schedules={[]} />)
  expect(
    screen.getByText(mockUserWithoutImage.city, { exact: false }),
  ).toBeInTheDocument()
})

test('initial state values', () => {
  render(<Calendar city={mockUserWithoutImage.city} schedules={[]} />)

  const today = startOfDay(new Date())

  expect(
    screen.getByText(format(today, 'MMM dd'), { exact: false }),
  ).toBeInTheDocument()
})

test('date change updates the state', () => {
  render(<Calendar city={mockUserWithoutImage.city} schedules={[]} />)

  const nextButton = screen.getByTestId('chevron-right')
  fireEvent.click(nextButton)
  fireEvent.click(nextButton)
  fireEvent.click(nextButton)
  fireEvent.click(nextButton)

  const fourDaysAfterToday = addDays(new Date(), 4)

  expect(
    screen.getByText(format(fourDaysAfterToday, 'MMM dd'), { exact: false }),
  ).toBeInTheDocument()
})

test('generates time slots correctly', async () => {
  render(<Calendar city={mockUserWithoutImage.city} schedules={[]} />)

  expect(screen.getAllByTestId('current-time-slot')).toHaveLength(6)
  expect(screen.getAllByText('08:00')).toHaveLength(3)
  expect(screen.getAllByText('09:00')).toHaveLength(3)
  expect(screen.getAllByText('10:00')).toHaveLength(3)
})
