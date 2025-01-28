import { createTuyau } from '@tuyau/client'
import { api } from '../../.adonisjs/api.js'
import { Head, useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
export const client = createTuyau({
  api,
  baseUrl: 'http://localhost:3333',
})

const loginUrl = client.$url('login_route')

export default function Login() {
  const form = useForm('login', {
    email: 'johnDoe@gmail.com',
    password: 'je suis le password',
  })

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    form.post(loginUrl, {
      onSuccess: () => {
        console.log('je suis le success')
      },
    })
  }

  return (
    <>
      <Head title="Homepage" />

      <h3>Connection</h3>
      <form onSubmit={onSubmit}>
        <input
          value={form.data.email}
          onChange={(ev) => form.setData('email', ev.currentTarget.value)}
          type="email"
          name="email"
        />
        <input
          value={form.data.password}
          onChange={(ev) => form.setData('password', ev.currentTarget.value)}
          type="text"
          name="password"
        />
        <button type="submit">send</button>
      </form>
    </>
  )
}
