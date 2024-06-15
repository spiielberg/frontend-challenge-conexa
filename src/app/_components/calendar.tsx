'use client'

import { getUtcOffsetForLocation } from '@/lib/get-timezone'
import { generateTimeSlots } from '@/utils/generate-time-slots'
import { addDays, addHours, format, startOfDay } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from 'lucide-react'
import { Fragment, useCallback, useEffect, useState } from 'react'

interface CalendarProps {
  city: string
  schedules: {
    date: string
    time: string
  }[]
}

export const Calendar = ({ city, schedules }: CalendarProps) => {
  const [timezone, setTimezone] = useState<number[]>([])
  const [initialDate, setInitialDate] = useState(new Date())
  const [dates, setDates] = useState<Date[]>([])
  const [timeSlots, setTimeSlots] = useState<string[]>([])

  const getDates = useCallback(() => {
    return Array.from({ length: 4 }, (_, index) => addDays(initialDate, index))
  }, [initialDate])

  const handleChangeFirstDate = (value: number) => {
    const newDate = addDays(initialDate, value)

    setInitialDate(newDate)
  }

  useEffect(() => {
    if (city) {
      const cityTimezone = getUtcOffsetForLocation(city)
      setTimezone(cityTimezone || [])
    }
  }, [city])

  useEffect(() => {
    const newDates = getDates()

    setDates(newDates)
  }, [getDates])

  useEffect(() => {
    const startTime = addHours(startOfDay(new Date()), 8)
    const endTime = addHours(startOfDay(new Date()), 10)

    setTimeSlots(generateTimeSlots({ startTime, endTime, interval: 30 }))
  }, [schedules])

  if (dates.length === 0 || timeSlots.length === 0) {
    return (
      <div className="flex h-[369px] w-[388px] shrink-0 items-center justify-center text-gray-600">
        <Loader2Icon size={48} />
      </div>
    )
  }

  return (
    <div className="shrink-0 space-y-3">
      <div>
        <div className="flex flex-col items-center bg-[#3478D4] p-3 text-white">
          <p className="text-lg font-medium">Schedule your session!</p>

          <p className="text-sm font-light">
            {timezone && (
              <>
                Timezone: {city} ({timezone[0] > 0 ? '+' : ''}
                {timezone[0]})
              </>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between gap-x-2 bg-white p-3 text-gray-600 shadow-lg shadow-gray-400">
          <button
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-400"
            onClick={() => handleChangeFirstDate(-1)}
            disabled={
              format(initialDate, 'yyyy-MM-dd') ===
              format(new Date(), 'yyyy-MM-dd')
            }
            data-testid="chevron-left"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <div className="grid w-full grid-cols-4 gap-x-1">
            {dates.map((date) => (
              <div
                key={date.toString()}
                className="flex w-[72px] flex-col items-center px-3"
              >
                <p className="text-[0.625rem] uppercase">
                  {format(date, 'EEE')}
                </p>

                <p className="text-xs uppercase">{format(date, 'MMM dd')}</p>
              </div>
            ))}
          </div>

          <button
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-400"
            onClick={() => handleChangeFirstDate(1)}
            data-testid="chevron-right"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-x-2 bg-white p-3 text-gray-600 shadow-lg shadow-gray-400">
        <div className="size-6 shrink-0" />

        <div className="grid w-full grid-flow-col grid-cols-4 grid-rows-6 gap-1 text-[0.625rem] font-semibold">
          {dates.map((date) => (
            <Fragment key={date.toString()}>
              {format(date, 'yyyy-MM-dd') !==
              format(new Date(), 'yyyy-MM-dd') ? (
                <>
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className="flex w-full items-center justify-center bg-gray-200 py-2"
                    >
                      {time}
                    </div>
                  ))}

                  <div className="flex w-full items-center justify-center bg-gray-200 py-2">
                    MORE
                  </div>
                </>
              ) : (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-center py-2"
                      data-testid="current-time-slot"
                    >
                      -
                    </div>
                  ))}
                </>
              )}
            </Fragment>
          ))}
        </div>

        <div className="size-6 shrink-0" />
      </div>
    </div>
  )
}
