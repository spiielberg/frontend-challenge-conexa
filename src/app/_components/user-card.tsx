import { User } from '@/types/user'
import { StarIcon, User2Icon } from 'lucide-react'
import Image from 'next/image'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-x-4">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={192}
            height={192}
            className="size-28 rounded-full md:size-48"
            data-testid="user-image"
          />
        ) : (
          <div className="size-48 overflow-hidden rounded-full bg-gray-300">
            <User2Icon
              className="mt-6 size-48 text-gray-500"
              data-testid="user-fallback-image"
            />
          </div>
        )}

        <div className="space-y-1 text-sm text-gray-600">
          <p
            className="text-xl font-semibold text-gray-800"
            data-testid="user-name"
          >
            {user.name}
          </p>

          <div>
            <div className="flex gap-x-1">
              <p className="font-semibold text-sky-500" data-testid="user-job">
                {user.job}
              </p>

              <p>|</p>

              <p data-testid="user-city">{user.city}</p>
            </div>

            <div className="flex items-start gap-x-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`size-4 fill-current ${
                      index < user.reviews.ratingAverage
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                    data-testid="user-star-rating"
                  />
                ))}
              </div>

              <p>({user.reviews.quantity} reviews)</p>
            </div>
          </div>

          <div>
            <p className="font-medium" data-testid="user-price-per-minute">
              <span className="text-lg font-semibold">R${user.price}</span> /{' '}
              {user.minutes} MINUTES
            </p>
          </div>
        </div>
      </div>

      <p>{user.jobDescription}</p>
    </div>
  )
}
