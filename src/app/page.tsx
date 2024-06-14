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
    <div className="p-6">
      <UserCard user={user} />
    </div>
  )
}

export default Home
