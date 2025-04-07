import { ChangeEvent, useCallback, useMemo } from 'react'
import TaxonomyDto from '../../../app/dto/taxonomy/taxonomy.js'
import { useForm } from '@inertiajs/react'
import { tuyau } from '~/lib/tuyau.js'
import { FormPrimaryButton } from '@website/design-system'
import { FieldElement } from '~/components/ui/form/field.js'
import { Textarea } from '~/components/ui/form/textarea.js'

type Props = {
  parent: TaxonomyDto | null
}

export default function Form(props: Props) {
  const rootParentId = useMemo(() => {
    if (props.parent?.rootParentId) return props.parent.rootParentId
    if (props.parent) return props.parent.id
    return null
  }, [props.parent])

  const form = useForm({
    parentId: props.parent?.id ?? null,
    rootParentId: rootParentId,
    name: props.parent?.name ?? null,
    slug: props.parent?.slug ?? null,
    description: props.parent?.description ?? null,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    form.post(tuyau.$url('taxonomies.store'))
  }

  const handleChange = useCallback((e: ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement
    form.setData((data) => ({ ...data, [element.name]: element.value }))
  }, [])

  console.log('render')

  console.log(form.data)

  return (
    <div>
      <h2 className="text-xl mb-2">
        Create new Taxonomy {props.parent ? `for ${props.parent.name}` : ''}
      </h2>
      <form onSubmit={handleSubmit} action="">
        <FormPrimaryButton>Save new taxonomy</FormPrimaryButton>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <FieldElement label="Name" name="name" value={form.data.name!} onChange={handleChange} />
          <FieldElement label="Slug" name="slug" value={form.data.slug!} onChange={handleChange} />
          <Textarea
            label="Description"
            name="description"
            value={form.data.description!}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  )
}
