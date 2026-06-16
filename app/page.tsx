
import { redirect } from 'next/navigation'

export default function HomePage() {
  // For now, we'll just redirect to the feed page.
  // In a real app, you'd check if the user is logged in.
  redirect('/feed')
}
