import AssetTypes from '#enums/asset_types'
import { useEffect, useRef, useState } from 'react'

import { FilePondFile, FilePondInitialFile } from 'filepond'
import { registerPlugin, FilePond } from 'react-filepond'

// Importation correcte des plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

// Importation des styles CSS
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'

import { tuyau } from '~/lib/tuyau.js'
import AssetDto from '../../app/dto/asset/asset.js'

// S'assurer que les plugins sont enregistrés correctement
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
)

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
  // Désactiver revert pour éviter les redirections
  revert: null,
}

export function AssetUpload({ value, onChange, name, label, thumbnail }: Props) {
  const [files, setFiles] = useState<FilePondInitialFile[]>([])
  const pondRef = useRef<FilePond>(null)

  // Gérer le fichier thumbnail initial
  useEffect(() => {
    if (!thumbnail?.filename || !thumbnail?.id) {
      return
    }

    // Vérifier si ce fichier existe déjà
    const fileExists = files.some((file) => {
      if (typeof file === 'string') return false

      const options = (file as any).options
      return options?.metadata?.id === thumbnail.id
    })

    if (fileExists) return

    // Ajouter le fichier initial
    const initialFile: FilePondInitialFile = {
      source: thumbnail.filename,
      options: {
        type: 'local',
        file: {
          name: thumbnail.filename,
          size: thumbnail.byteSize || 0,
          type: 'image/jpeg', // Supposer un type par défaut
        },
        metadata: {
          id: thumbnail.id,
        },
      },
    }

    setFiles((prevFiles) => [...prevFiles, initialFile])
  }, [thumbnail])

  // Fonction appelée quand le fichier est traité avec succès
  const handleProcessFile = (error: any, file: FilePondFile) => {
    if (error) {
      console.error('Error processing file:', error)
      return
    }

    try {
      const response = JSON.parse(file.serverId || '{}')

      onChange({
        ...value,
        id: response.id,
      })

      setFiles([
        { source: response.filename, options: { type: 'local', metadata: { id: response.id } } },
      ])
    } catch (e) {
      console.error('Error parsing server response:', e)
    }
  }

  // Fonction appelée quand un fichier est supprimé - version corrigée
  const handleRemoveFile = async (_: any, file: FilePondFile) => {
    const { id } = file.getMetadata()

    if (!id) {
      return
    }

    try {
      if (id) {
        try {
          await tuyau.$route('assets.destroy', { id }).$delete()
        } catch (e) {
          console.error('Error deleting asset from server:', e)
        }
      }

      onChange({
        ...value,
        id: undefined,
      })
    } catch (e) {
      console.error('Global error in handleRemoveFile:', e)

      onChange({
        ...value,
        id: undefined,
      })
    }
  }

  // Gérer les mises à jour de fichiers
  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    setFiles(fileItems)

    // Si aucun fichier, réinitialiser aussi l'id
    if (fileItems.length === 0 && value.id) {
      onChange({
        ...value,
        id: undefined,
      })
    }
  }

  return (
    <div className="col-span-full card form-upload">
      <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2 w-100 max-w-300px flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <FilePond
          ref={pondRef}
          files={files}
          onremovefile={handleRemoveFile}
          onprocessfile={handleProcessFile}
          onupdatefiles={handleUpdateFiles}
          server={server}
          name={name || 'filepond'}
          labelIdle="Drag & Drop"
          allowImagePreview={true}
          imagePreviewHeight={200}
          stylePanelLayout="compact"
          acceptedFileTypes={['image/jpeg', 'image/png']}
        />

        {/* Input caché pour stocker l'ID - optionnel, car onChange gère déjà l'ID */}
        {value.id && <input value={value.id} type="hidden" readOnly />}
      </div>
    </div>
  )
}
