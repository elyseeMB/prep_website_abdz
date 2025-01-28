import { useAuth } from '~/hooks/useAuth.js'

export default function Dashboard() {
  const currentUser = useAuth()
  return <div> hello : {currentUser?.name}</div>
}
