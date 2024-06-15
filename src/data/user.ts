'use server'

import { User } from '@/types/user'

export const getUser = async () => {
  const response = await fetch('http://localhost:3333/user', {
    cache: 'no-store',
  })

  if (!response.ok) {
    return null
  }

  const user = (await response.json()) as User

  return user
}
