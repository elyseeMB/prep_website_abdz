import ArticleTypes, { ArticleTypesDesc } from '#enums/article_types'
import AssetTypes from '#enums/asset_types'
import States, { ArticleStatusText } from '#enums/state'
import { router, useForm } from '@inertiajs/react'
import { Button, FormField, FormPrimaryButton } from '@website/design-system'
import {
  Field,
  FieldCheckbox,
  FieldInput,
  FieldTextarea,
} from '@website/design-system/src/molecules/field/field.js'
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { AssetUpload } from '~/components/AssetUpload.js'
import { InputTags, SelectTags } from '~/components/TaxonomyTags.js'
import { FieldElement } from '~/components/ui/form/field.js'
import { Textarea } from '~/components/ui/form/textarea.js'
import { tuyau } from '~/lib/tuyau.js'
import ArticleFormDto from '../../../app/dto/article/article_form.js'

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
  article?: ArticleFormDto
  taxonomies: taxonomiesProps[]
}

export default function Form(props: Props) {
  const [data, setData] = useState({
    title: '',
    slug: '',
    summary: '',
    articleTypeId: ArticleTypes.LESSON,
    content: '',
    stateId: States.DRAFT,
    viewCount: '',
    publishAt: '',
    thumbnails: {
      id: '',
    },
    taxonomyIds: '',
    createdAt: '',
    updatedAt: '',
  })

  useEffect(() => {
    if (props.article) {
      const data = {
        title: props.article?.title ?? '',
        slug: props.article?.slug ?? '',
        summary: props.article?.summary ?? '',
        content: props.article?.content ?? '',
        articleTypeId: props.article?.articleTypeId ?? ArticleTypes.LESSON,
        stateId: props.article?.stateId ?? States.DRAFT,
        viewCount: props.article?.viewCount ?? '',
        publishAt: props.article?.publishAt ?? '',
        thumbnails: {
          id: props.article?.thumbnail?.id ?? '',
        },
        taxonomyIds: props.article?.taxonomyIds ?? '',
        createdAt: props.article?.createdAt ?? '',
        updatedAt: props.article?.updatedAt ?? '',
      }
      setData((prevData) => ({ ...prevData, ...data }))
    }
  }, [props.article])

  const handleSumbit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // const formData = new FormData(e.currentTarget)
      // const cleaned = cleanedFormData(formData)

      // for (const [key, value] of cleaned) {
      //   form.setData(key as any, value)
      // }

      // router.post(tuyau.$url('articles.store'), data)
    },

    [data]
  )

  const handleChange = useCallback(
    (e: ChangeEvent) => {
      const element = e.currentTarget as HTMLInputElement
      setData((data) => ({ ...data, [element.name]: element.value }))
    },
    [data]
  )

  // Modifiez handleSubmitAction pour corriger la mise à jour d'état
  const handleSubmitAction = useCallback(
    (e: ChangeEvent) => {
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
    },
    [props.article?.id]
  ) // Dépendances réduites

  console.log(data)

  return (
    <>
      <div className="flex gap-2 items-center">
        {!props.article?.id ||
          (props.article?.stateId === States.DRAFT && (
            <Button value={States.DRAFT} onClick={handleSubmitAction} className="text-sm">
              Draft
            </Button>
          ))}

        <Button value={States.UNLISTED} onClick={handleSubmitAction} className="text-sm">
          Unlisted
        </Button>

        <Button value={States.PRIVATE} onClick={handleSubmitAction} className="text-sm">
          Private
        </Button>

        <Button value={States.PUBLIC} onClick={handleSubmitAction} className="text-sm">
          Publish Now
        </Button>
      </div>

      <div className="flex gap-4">
        <form onSubmit={handleSumbit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Create your article</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <FieldElement
                  value={data.title}
                  onChange={handleChange}
                  name="title"
                  label="Title"
                />
                <FieldElement value={data.slug} name="slug" onChange={handleChange} label="Slug" />
                <FieldElement
                  name="summary"
                  value={data.summary}
                  onChange={handleChange}
                  label="Summary"
                />
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
                      <SelectTags
                        name="taxonomyIds"
                        onChange={(e) => setData((data) => ({ ...data, taxonomyIds: e }))}
                        items={props.taxonomies}
                        taxonomyIds={props.article?.taxonomyIds}
                      />
                    </div>

                    <div className="mt-2 grid grid-cols-1">
                      <select
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        name="articleTypeId"
                        value={data.articleTypeId}
                        onChange={
                          (ev) =>
                            setData((v) => ({
                              ...v,
                              articleTypeId: Number(ev.target.value),
                            })) //
                        }
                      >
                        {Object.keys(ArticleTypes)
                          .filter((key) => isNaN(Number(key)))
                          .map((typeName) => {
                            const typeId = ArticleTypes[typeName as keyof typeof ArticleTypes]
                            return (
                              <option key={typeId} value={typeId}>
                                {ArticleTypesDesc[typeId as ArticleTypes]}
                              </option>
                            )
                          })}
                      </select>

                      <svg
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <Textarea
                  value={data.content}
                  onChange={handleChange}
                  name="content"
                  label="Body"
                />
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

        {/* <a href={url.toString()}>
        <img src={props.image} alt="" />
      </a> */}
        {/* 
      <input
        onChange={(ev) => form.setData('thumbnails', ev.currentTarget.files![0])}
        type="file"
        name="thumbnails"
      />
      <button onClick={handleUploadFile}>Upload</button> */}

        <AssetUpload
          thumbnail={props.article?.thumbnail}
          value={data.thumbnails}
          onChange={(value: any) => setData((prev) => ({ ...prev, thumbnails: value }))}
          name="thumbnails"
        />
      </div>
    </>
  )
}
