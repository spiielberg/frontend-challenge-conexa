'use server'

import { User } from '@/types/user'

export const getUser = async () => {
  const response = await fetch('http://localhost:3333/user')

  if (!response.ok) {
    return null
  }

  return (await response.json()) as User
}
