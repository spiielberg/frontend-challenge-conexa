import * as cityTimeZones from 'city-timezones'
import * as moment from 'moment-timezone'

/**
 * Returns the UTC offset for the given timezone
 * @param timezone Example: America/New_York
 */
export const getNormalizedUtcOffset = (timezone: string) => {
  const momentTimezone = moment.tz(timezone)

  if (!momentTimezone) {
    return null
  }

  const offset = momentTimezone.utcOffset()

  return offset / 60
}

/**
 * Returns the offset range for the given city or region
 * @param location
 */
export const getUtcOffsetForLocation = (location: string) => {
  const timezones = cityTimeZones.findFromCityStateProvince(location)

  if (timezones && timezones.length) {
    const offsetSet = new Set<number>()

    for (const timezone of timezones) {
      const offset = getNormalizedUtcOffset(timezone.timezone)

      if (offset !== null) {
        offsetSet.add(offset)
      }
    }

    return [...offsetSet].sort((a, b) => a - b)
  }

  return null
}
