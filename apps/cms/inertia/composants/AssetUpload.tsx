import AssetTypes from '#enums/asset_types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { FilePondFile, FilePondInitialFile } from 'filepond'
import { registerPlugin, FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

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
  onChange?: (e: ChangeEvent) => void
}

export function AssetUpload({ value, onChange, name, label, assets }: Props) {
  const [files, setFiles] = useState<FilePondInitialFile[]>([])
  const pondRef = useRef<FilePond>(null)

  const handleInit = () => {
    const file = pondRef.current?.getFiles()[0]
    console.log(file?.source)
  }

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
          // onupdatefiles={(filesItems) =>
          //   setFiles({ files: filesItems.map((fileItem) => fileItem.file) })
          // }
          allowMultiple={true}
          allowImagePreview={true}
          server="./"
          accepted-file-types="image/jpeg, image/png"
          name={name}
          onprocessfiles={handleInit}
          labelIdle="Drag & Drop"
        />
      </div>
    </div>
  )
}
