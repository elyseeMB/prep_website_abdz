import ArticleTypes, { ArticleTypesDesc } from '#enums/article_types'
import States from '#enums/state'
import { router } from '@inertiajs/react'
import { Button } from '@website/design-system'
import { ChangeEvent, FormEvent, MouseEvent, useCallback, useEffect, useState } from 'react'
import { AssetUpload } from '~/components/AssetUpload.js'
import { SelectTags } from '~/components/TaxonomyTags.js'
import { FieldElement } from '~/components/ui/form/field.js'
import { tuyau } from '~/lib/tuyau.js'
import ArticleFormDto from '../../../app/dto/article/article_form.js'
import { TiptapEditor } from '~/components/TiptapEditor.js'
import { BasicTitpapEditor } from '~/components/BasicTiptap.js'
import { Collapsible } from '~/components/ui/collapsible/collapsible_wrapper.js'
import { CollapsibleTrigger } from '~/components/ui/collapsible/collapsible_trigger.js'
import { CollapsibleContent } from '~/components/ui/collapsible/collapsible_content.js'

type taxonomiesProps = {
  id: any
  name: string
}

// type articlesProps = {
//   id: any
//   title: any
//   slug: any
//   summary: any
//   content: any
//   stateId: any
//   viewCount: any
//   publishAt: any
//   articleTypeId: any
//   comments: any
//   assets: any
//   thumbnails: any
//   covers: any
//   taxonomies: any[]
//   collections: any
//   authors: any
//   createdAt: any
//   updatedAt: any
// }

type Props = {
  article?: ArticleFormDto
  taxonomies: taxonomiesProps[]
}

export default function Form(props: Props) {
  const [data, setData] = useState({
    title: '',
    slug: '',
    summary: '',
    pageTitle: props.article?.pageTitle ?? '',
    metaDescription: props.article?.metaDescription ?? '',
    canonical: props.article?.canonical ?? '',
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
    (e: MouseEvent) => {
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

        <Button
          primary={true}
          value={States.PUBLIC}
          onClick={handleSubmitAction}
          className="text-sm"
        >
          Publish Now
        </Button>
      </div>

      <div className="page-wrapper-2">
        <form onSubmit={handleSumbit}>
          <div className="stack">
            <div className="border-b border-gray-900/10 card">
              <h2 className="text-base/7 font-semibold text-gray-900">Create your article</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <BasicTitpapEditor
                  isText={true}
                  label="Title"
                  value={data.title}
                  onChange={(ev: string) => setData((v) => ({ ...v, title: ev }))}
                  name="title"
                />
                <BasicTitpapEditor
                  isText={true}
                  label="Slug"
                  value={data.slug}
                  onChange={(ev: string) => setData((v) => ({ ...v, slug: ev }))}
                  name="slug"
                />
                <BasicTitpapEditor
                  isText={true}
                  label="Summary"
                  value={data.summary}
                  onChange={(ev: string) => setData((v) => ({ ...v, summary: ev }))}
                  name="summary"
                />
                {/* <FieldElement
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
                /> */}
              </div>
            </div>

            <div className="card">
              <h2 className="text-base/7 font-semibold text-gray-900 mb-3">
                Search Engine Optimization (SEO)
              </h2>
              <Collapsible>
                <CollapsibleTrigger className="rounded-t-xl" label="Page Title">
                  <CollapsibleContent>
                    <div className="p-5 border border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                      <BasicTitpapEditor
                        isText={true}
                        value={data.pageTitle}
                        onChange={(ev: string) => setData((v) => ({ ...v, pageTitle: ev }))}
                        name="pageTitle"
                      />
                    </div>
                  </CollapsibleContent>
                </CollapsibleTrigger>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger label="Meta Description">
                  <CollapsibleContent>
                    <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 last:border-b">
                      <BasicTitpapEditor
                        isText={true}
                        value={data.metaDescription}
                        onChange={(ev: string) => setData((v) => ({ ...v, metaDescription: ev }))}
                        name="metaDescriptioneTitle"
                      />
                    </div>
                  </CollapsibleContent>
                </CollapsibleTrigger>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger label="Canonical">
                  <CollapsibleContent>
                    <div className="p-5 border border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                      <BasicTitpapEditor
                        description="La balise canonical est un élément HTML utilisé pour indiquer aux moteurs de recherche quelle est la version principale (ou canonique) d'une page web, notamment lorsqu'il existe plusieurs pages avec un contenu similaire ou identique."
                        isText={true}
                        placeholder="Lien vers l'original ici."
                        value={data.canonical}
                        onChange={(ev: string) => setData((v) => ({ ...v, canonical: ev }))}
                        name="canonical"
                      />
                    </div>
                  </CollapsibleContent>
                </CollapsibleTrigger>
              </Collapsible>
            </div>

            <div className="border-b border-gray-900/10 card">
              <h2 className="text-base/7 font-semibold text-gray-900">Options</h2>
              <p className="mt-1 text-sm/6 text-gray-600">Options de publication</p>

              <div className="mt-10 ">
                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                    Taxonomy - State
                  </label>

                  <div className="grid cols-2 gap-4">
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
                        onChange={(ev) =>
                          setData((v) => ({
                            ...v,
                            articleTypeId: Number(ev.target.value),
                          }))
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

                {/* <Textarea
                  value={data.content}
                  onChange={handleChange}
                  name="content"
                  label="Body"
                /> */}
              </div>
            </div>
            <TiptapEditor
              value={data.content}
              onChange={(ev: string) => setData((v) => ({ ...v, content: ev }))}
              name="content"
            />
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
          thumbnail={props.article?.thumbnail!}
          value={data.thumbnails}
          onChange={(value: any) => setData((prev) => ({ ...prev, thumbnails: value }))}
          name="thumbnails"
        />
      </div>
    </>
  )
}
