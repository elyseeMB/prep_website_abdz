import { ArticleStatusText } from '#enums/state'
import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { client } from '~/pages/login.js'
import { Form, FormField, FormPrimaryButton } from '@website/design-system/src/molecules/form/form'

type ArticleStatusTextProps = {
  [key: string]: string
}

export default function Create(props: {
  currentUser: { id: number; name: string }
  categories: { id: number; name: string }[]
}) {
  const form = useForm({
    title: '',
    summary: '',
    markdown: '',
    slug: '',
    categoryId: props.categories[0].id,
    stateId: ArticleStatusText['1'],
  })

  const handleSubmit = () => {
    // e.preventDefault()
    console.log(form)
    const url = client.$url('admin.articles.store')
    form.post(url, {})
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormField
          value={form.data.title}
          onChange={(ev) => form.setData('title', ev.currentTarget.value)}
          name="title"
        >
          le titre
        </FormField>
        <FormField
          value={form.data.summary}
          onChange={(ev) => form.setData('summary', ev.currentTarget.value)}
          name="summary"
        >
          summary
        </FormField>
        <FormField
          value={form.data.markdown}
          onChange={(ev) => form.setData('markdown', ev.currentTarget.value)}
          name="markdown"
        >
          content
        </FormField>
        <FormField
          value={form.data.slug}
          onChange={(ev) => form.setData('slug', ev.currentTarget.value)}
          name="slug"
        >
          slug
        </FormField>
        <select
          onChange={(ev) => {
            form.setData('categoryId', parseInt(ev.currentTarget.value, 10))
          }}
          name="categoryId"
        >
          {props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          defaultValue={ArticleStatusText['1']}
          onChange={(ev) => form.setData('stateId', ev.currentTarget.value)}
          name="stateId"
        >
          {Object.keys(ArticleStatusText).map((state) => (
            <option key={state} value={state}>
              {ArticleStatusText[state]}
            </option>
          ))}
        </select>
        <FormPrimaryButton type="submit">send</FormPrimaryButton>
      </Form>
      {/*<form onSubmit={handleSubmit}>*/}
      {/*  <input*/}
      {/*    value={form.data.title}*/}
      {/*    onChange={(ev) => form.setData('title', ev.currentTarget.value)}*/}
      {/*    name="title"*/}
      {/*    type="text"*/}
      {/*    placeholder="title"*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    value={form.data.summary}*/}
      {/*    onChange={(ev) => form.setData('summary', ev.currentTarget.value)}*/}
      {/*    name="summary"*/}
      {/*    type="text"*/}
      {/*    placeholder="summary"*/}
      {/*  />*/}
      {/*  <input*/}
      {/*    value={form.data.slug}*/}
      {/*    onChange={(ev) => form.setData('slug', ev.currentTarget.value)}*/}
      {/*    name="slug"*/}
      {/*    type="text"*/}
      {/*    placeholder="slug"*/}
      {/*  />*/}
      {/*  <select*/}
      {/*    onChange={(ev) => {*/}
      {/*      form.setData('categoryId', parseInt(ev.currentTarget.value, 10))*/}
      {/*    }}*/}
      {/*    name="categoryId"*/}
      {/*  >*/}
      {/*    {props.categories.map((category) => (*/}
      {/*      <option key={category.id} value={category.id}>*/}
      {/*        {category.name}*/}
      {/*      </option>*/}
      {/*    ))}*/}
      {/*  </select>*/}
      {/*  <select*/}
      {/*    defaultValue={ArticleStatusText['1']}*/}
      {/*    onChange={(ev) => form.setData('stateId', ev.currentTarget.value)}*/}
      {/*    name="stateId"*/}
      {/*  >*/}
      {/*    {Object.keys(ArticleStatusText).map((state) => (*/}
      {/*      <option key={state} value={state}>*/}
      {/*        {ArticleStatusText[state]}*/}
      {/*      </option>*/}
      {/*    ))}*/}
      {/*  </select>*/}
      {/*  <textarea*/}
      {/*    value={form.data.markdown}*/}
      {/*    onChange={(ev) => form.setData('markdown', ev.currentTarget.value)}*/}
      {/*    name="markdown"*/}
      {/*  ></textarea>*/}
      {/*  <button type="submit">senc</button>*/}
      {/*</form>*/}
    </div>
  )
}
