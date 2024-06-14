export interface User {
  name: string
  job: string
  jobDescription: string
  city: string
  image?: string
  reviews: {
    quantity: number
    ratingAverage: number
  }
  price: number
  minutes: number
  schedules: {
    date: string
    time: string
  }[]
}
