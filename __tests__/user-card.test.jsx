import { UserCard } from '@/app/_components/user-card'
import { render, screen } from '@testing-library/react'
import { mockUserWithImage, mockUserWithoutImage } from '../mocks/user'

test('renders user card with user data', () => {
  const user = mockUserWithImage

  render(<UserCard user={user} />)

  expect(screen.getByText(user.name)).toBeInTheDocument()
  expect(screen.getByText(user.job)).toBeInTheDocument()
  expect(screen.getByText(user.city)).toBeInTheDocument()

  const stars = screen.getAllByTestId('user-star-rating')

  expect(stars).toHaveLength(5)
  expect(
    stars.filter((star) => star.classList.contains('text-yellow-500')),
  ).toHaveLength(user.reviews.ratingAverage)

  expect(screen.getByTestId('user-price-per-minute')).toHaveTextContent(
    user.price,
  )
  expect(
    screen.getByText(`(${user.reviews.quantity} reviews)`),
  ).toBeInTheDocument()

  expect(screen.getByText(user.jobDescription)).toBeInTheDocument()
})

test('render user avatar with user image', () => {
  render(<UserCard user={mockUserWithImage} />)

  expect(screen.getByTestId('user-image').src).toContain(
    mockUserWithImage.image,
  )
})

test('render user avatar without user image', () => {
  render(<UserCard user={mockUserWithoutImage} />)

  expect(screen.getByTestId('user-fallback-image')).toBeInTheDocument()
})
