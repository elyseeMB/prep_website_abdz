import AssetTypes from '#enums/asset_types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { FilePondFile, FilePondInitialFile } from 'filepond'
import { registerPlugin, FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { tuyau } from '~/lib/tuyau.js'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface Asset {
  id: number
  assetTypeId: AssetTypes
  filename: string
  byteSize: number
}
type Props = {
  name?: string
  label?: string
  assets?: Asset[]
  value?: string
  onChange?: any
}

const server = {
  process: {
    url: `/assets/${AssetTypes.THUMBNAIL}`,
    withCredentials: true,
  },
  fetch: {
    url: '/assets?fetch=',
    withCredentials: true,
  },
  load: {
    url: '/assets?load=',
    withCredentials: true,
  },
}

export function AssetUpload({ value, onChange, name, label, assets }: Props) {
  const [files, setFiles] = useState<FilePondInitialFile[]>([])
  const pondRef = useRef<FilePond>(null)

  const handleInit = () => {
    const response = pondRef.current?.getFiles()[0]
    const data: FilePondInitialFile = {
      source: response?.filename!,
      options: {
        type: 'local',
        metadata: {
          id: response?.id,
        },
      },
    }
    setFiles((v) => [...v, data])
  }

  const handleRemove = async (err, file) => {
    const { id } = file.getMetadata()
    if (!id) {
      console.log('error')
      console.error(err)
      return
    }
    await tuyau.$route('assets.destroy', { id }).$delete()
  }

  console.log(files)

  // useEffect(() => {
  //   if (pondRef.current) {
  //     pondRef.current.addEventListener('FilePond:removefile', (e) => {
  //       console.log(e)
  //     })
  //   }

  //   return () => {
  //     if (pondRef.current) {
  //       pondRef.current = null
  //     }
  //   }
  // }, [])
  return (
    <div className="col-span-full">
      <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 w-48 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <FilePond
          ref={pondRef}
          files={files}
          onremovefile={handleRemove}
          // onupdatefiles={setFiles}
          allowMultiple={true}
          allowImagePreview={true}
          server={server}
          accepted-file-types="image/jpeg, image/png"
          name={name}
          onprocessfiles={handleInit}
          labelIdle="Drag & Drop"
        />
      </div>
    </div>
  )
}
