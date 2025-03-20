import AssetTypes from '#enums/asset_types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { FilePondFile, FilePondInitialFile, FilePondServerConfigProps } from 'filepond'
import { registerPlugin, FilePond } from 'react-filepond'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'

import { tuyau } from '~/lib/tuyau.js'
import AssetDto from '../../app/dto/asset/asset.js'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface Asset {
  id: number
  assetTypeId?: AssetTypes
  filename?: string
  byteSize?: number
}

type Props = {
  name?: string
  label?: string
  thumbnail?: AssetDto
  value: {
    id?: number
    altText?: string
    credit?: string
  }
  onChange: (value: { id?: number; altText?: string; credit?: string }) => void
}

const server: FilePondServerConfigProps['server'] = {
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

export function AssetUpload({ value, onChange, name, label, thumbnail }: Props) {
  console.log(thumbnail)
  const [internalValue, SetInternalValue] = useState(null)
  const [files, setFiles] = useState<FilePondInitialFile[]>([])

  useEffect(() => {
    const data: FilePondInitialFile = {
      source: thumbnail?.filename!,
      options: {
        type: 'local',
        metadata: {
          id: thumbnail?.id,
        },
      },
    }
    setFiles((v) => [...v, data])
  }, [thumbnail])

  const pondRef = useRef<FilePond>(null)
  const handleInit = () => {
    const file = pondRef.current?.getFiles()[0]
    const response = JSON.parse(file?.serverId!)
    onChange({
      ...value,
      id: response.id,
    })
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

  const handleRemove = async (_: any, file: FilePondFile) => {
    const { id } = file.getMetadata()
    if (!id) {
      return
    }
    await tuyau.$route('assets.destroy', { id }).$delete()
  }

  // console.log(internalValue)

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
          server={server}
          accepted-file-types="image/jpeg, image/png"
          name={name}
          onprocessfiles={handleInit}
          labelIdle="Drag & Drop"
        />
        {value.id && (
          <input
            value={value.id}
            type="text"
            onChange={(e) =>
              onChange({
                ...value,
                id: parseInt(e.currentTarget.value, 10),
              })
            }
          />
        )}
      </div>
    </div>
  )
}
