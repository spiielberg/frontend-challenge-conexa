import { Calendar } from '@/app/_components/calendar'
import { UserCard } from '@/app/_components/user-card'
import { getUser } from '@/data/user'

const Home = async () => {
  const user = await getUser()

  if (!user) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center">
        <p className="text-lg font-medium text-gray-800">User not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 p-6 lg:flex-row">
      <UserCard user={user} />

      <Calendar city={user.city} schedules={user.schedules} />
    </div>
  )
}

export default Home
