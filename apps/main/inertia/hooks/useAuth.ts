import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'
import type { CurrentUserViewModelSerialized } from '#auth/view_models/current_user_view_model'

export function useAuth() {
  const page = usePage()
  return useMemo(() => {
    return page.props.currentUser as CurrentUserViewModelSerialized
  }, [usePage])
}
