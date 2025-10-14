import { router } from '@inertiajs/react'
import { GeneratedRoutes, RouteName, RouteUrlParams } from '@tuyau/client'
import {
  FormEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  createContext,
  useState,
} from 'react'
import { tuyau } from '~/lib/tuyau.ts'

export const FormContext = createContext({
  errors: {},
  loading: false,
  emptyError: (name: any) => {},
})

export function FetchForm({
  data = {},
  onSuccess,
  actions,
  children,
}: PropsWithChildren<{
  data: Record<string, any>
  actions: any
  onSuccess: (arg: any) => {}
}>) {
  const [{ loading, errors }, setData] = useState({ loading: false, errors: [] })

  const emptyError = (name: any) => {
    if (!errors[name]) return null
    const newErrors = { ...errors }
    delete newErrors[name]
    setData((s) => ({ ...s, errors: newErrors }))
  }

  const handleSubmitAction: FormEventHandler<HTMLFormElement> = (e) => {
    const newStateId = e.currentTarget.value

    setData((prevData) => {
      const updatedData = { ...prevData, stateId: newStateId }
      router.post(tuyau.$url(actions), updatedData)
      onSuccess(updatedData)
    })
  }

  return (
    <FormContext.Provider value={{ loading, errors, emptyError }}>
      <form onSubmit={handleSubmitAction}>{children}</form>
    </FormContext.Provider>
  )
}
