import ArticleTypes from '#enums/article_types'
import AssetTypes from '#enums/asset_types'
import States, { ArticleStatusText } from '#enums/state'
import { useForm } from '@inertiajs/react'
import { FormField, FormPrimaryButton } from '@website/design-system'
import {
  Field,
  FieldInput,
  FieldTextarea,
} from '@website/design-system/src/molecules/field/field.js'
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef } from 'react'
import { AssetUpload } from '~/composants/AssetUpload.js'
import { InputTags, SelectTags } from '~/composants/TaxonomyTags.js'
import { FieldElement } from '~/composants/ui/form/field.js'
import { Textarea } from '~/composants/ui/form/textarea.js'
import { tuyau } from '~/lib/tuyau.js'

type taxonomiesProps = {
  id: any
  name: string
}

type articlesProps = {
  id: any
  title: any
  slug: any
  summary: any
  content: any
  stateId: any
  viewCount: any
  publishAt: any
  articleTypeId: any
  comments: any
  assets: any
  thumbnails: any
  covers: any
  taxonomies: any[]
  collections: any
  authors: any
  createdAt: any
  updatedAt: any
}

type Props = {
  taxonomies: taxonomiesProps[]
  articles?: articlesProps
}

export default function Form(props: Props) {
  const form = useForm({
    title: props.articles?.title ?? '',
    slug: props.articles?.slug ?? '',
    summary: props.articles?.summary ?? '',
    content: props.articles?.content ?? '',
    stateId: props.articles?.stateId ?? '',
    viewCount: props.articles?.viewCount ?? '',
    publishAt: props.articles?.publishAt ?? '',
    comments: props.articles?.comments ?? '',
    assets: props.articles?.assets ?? '',
    thumbnails: props.articles?.thumbnails ?? '',
    covers: props.articles?.covers ?? '',
    taxonomyIds: props.articles?.taxonomies ?? '',
    collections: props.articles?.collections ?? '',
    authors: props.articles?.authors ?? '',
    createdAt: props.articles?.createdAt ?? '',
    updatedAt: props.articles?.updatedAt ?? '',
  })

  const formThumbnails = useForm({
    thumbnails: props.articles?.thumbnails ?? '',
  })

  const formDataRef = useRef(form.data)

  useEffect(() => {
    formDataRef.current = form.data
  }, [form.data])

  const cleanedFormData = (f: FormData) => {
    const cleaned = new FormData()
    for (const [key, value] of f) {
      if (value && value.toString().trim() !== '') {
        cleaned.append(key, value)
      }
    }
    return cleaned
  }

  const handleSumbit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const cleaned = cleanedFormData(formData)

      for (const [key, value] of cleaned) {
        form.setData(key as any, value)
      }

      form.post(tuyau.$url('articles.store'), {
        forceFormData: true,
      })
    },
    [form]
  )

  const handleChange = useCallback(
    (key: keyof (typeof form)['data']) => (e?: ChangeEvent) => {
      if (e instanceof Array) {
        form.setData(key, e)
      } else {
        e?.preventDefault()
        const input = e?.currentTarget as HTMLInputElement
        form.setData(key, input.type === 'file' ? input.files![0] : input.value)
      }
    },
    [form.data]
  )

  const handleUploadFile = () => {
    const url = tuyau.$url('assets.store', {
      params: [AssetTypes.THUMBNAIL],
    })
    formThumbnails.post(url)
  }

  console.log(formThumbnails.data)

  return (
    <div className="flex gap-4">
      <form onSubmit={handleSumbit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Create your article</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <FieldElement onChange={handleChange('title')} name="title" label="Title" />
              <FieldElement name="slug" label="Slug" />
              <FieldElement name="summary" label="Summary" />
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">Options</h2>
            <p className="mt-1 text-sm/6 text-gray-600">Options de publication</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                  Taxonomy - State
                </label>

                <div className="flex gap-5 items-center justify-between">
                  <div className="mt-2 grid grid-cols-1">
                    {/* <select
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(ev) => {
                        form.setData('taxonomies', parseInt(ev.currentTarget.value, 10))
                      }}
                      name="taxonomyIds"
                    >
                      {props.taxonomies.map((taxonomy, index) => (
                        <option key={index} value={taxonomy.id}>
                          {taxonomy.name}
                        </option>
                      ))}
                    </select> */}
                    <SelectTags
                      name="taxonomyIds"
                      onChange={(e) => form.setData('taxonomyIds', e)}
                      items={props.taxonomies}
                    />
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="mt-2 grid grid-cols-1">
                    <select
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={ArticleStatusText['1']}
                      onChange={(ev) => form.setData('stateId', ev.currentTarget.value)}
                      name="stateId"
                    >
                      {Object.keys(ArticleStatusText).map((state, index) => (
                        <option key={index} value={state}>
                          {ArticleStatusText[state]}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>

                  <div className="mt-2 grid grid-cols-1">
                    <select
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={ArticleTypes['BLOG']}
                      name="articleTypeId"
                    >
                      {Object.keys(ArticleTypes).map((type, index) => (
                        <option key={index} value={type}>
                          {ArticleTypes[type]}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <Textarea name="content" label="Body" />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <FormPrimaryButton
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
            text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Save
          </FormPrimaryButton>
        </div>
      </form>

      <input
        onChange={(ev) => formThumbnails.setData('thumbnails', ev.currentTarget.files![0])}
        type="file"
        name="thumbnails"
        id=""
      />
      <button onClick={handleUploadFile}>Upload</button>

      {/* <AssetUpload
        value={form.data.thumbnails}
        onChange={handleChange('thumbnails')}
        name="thumbnails"
      /> */}
    </div>
  )
}
