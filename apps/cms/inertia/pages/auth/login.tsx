import { FormEventHandler } from 'react'
import { FormPrimaryButton } from '@website/design-system'
import { FieldElement } from '~/components/ui/form/field.tsx'
import { useForm } from '@inertiajs/react'
import { tuyau } from '~/lib/tuyau.ts'
import { FieldCheckbox } from '@website/design-system/src/molecules/field/field.tsx'

export default function Login() {
  const form = useForm({
    email: '',
    password: '',
    remember: false,
  })
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    return form.post(tuyau.$url('auth.login.store'))
  }
  return (
    <section>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-3 mb-3">
          <FieldElement
            value={form.data.email}
            type="email"
            name="email"
            label="email"
            placeholder="Email"
            onChange={(ev) => form.setData('email', (ev.currentTarget as HTMLInputElement).value)}
          />
          <FieldElement
            value={form.data.password}
            name="password"
            label="password"
            type="password"
            placeholder="password"
            onChange={(ev) =>
              form.setData('password', (ev.currentTarget as HTMLInputElement).value)
            }
          />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <FieldCheckbox
              type="checkbox"
              name="remember"
              checked={form.data.remember}
              onChange={(ev) => form.setData('remember', (ev.target as HTMLInputElement).checked)}
            />
            <span>Se souvenir de moi</span>
          </div>

          <FormPrimaryButton type="submit">Login</FormPrimaryButton>
        </div>
      </form>
    </section>
  )
}
