import { router } from '@inertiajs/react'
import { PropsWithChildren, createContext, useState } from 'react'
import { tuyau } from '~/lib/tuyau.ts'

export const FormContext = createContext({
  errors: {},
  loading: false,
  emptyError: (name: any) => {},
})

export function FetchForm({
  onSuccess,
  children,
}: PropsWithChildren<{
  onSuccess: () => {}
}>) {
  const [{ loading, errors }, setData] = useState({ loading: false, errors: [] })

  const emptyError = (name: any) => {
    if (!errors[name]) return null
    const newErrors = { ...errors }
    delete newErrors[name]
    setData((s) => ({ ...s, errors: newErrors }))
  }

  const handleSubmitAction = (e: MouseEvent) => {
    const newStateId = e.currentTarget.value

    // Mise à jour de l'état avec callback pour s'assurer d'avoir la valeur actuelle
    setData((prevData) => {
      const updatedData = { ...prevData, stateId: newStateId }

      // Vérifier si c'est un article existant et faire la requête
      if (props.article?.id) {
        router.put(
          tuyau.$url('articles.update', {
            params: { id: props.article.id },
          }),
          updatedData // Utiliser les données mises à jour
        )
      } else {
        router.post(tuyau.$url('articles.store'), updatedData)
      }

      return updatedData
    })
  }

  return (
    <FormContext.Provider value={{ loading, errors, emptyError }}>
      <form onSubmit={handleSubmitAction}>{children}</form>
    </FormContext.Provider>
  )
}
