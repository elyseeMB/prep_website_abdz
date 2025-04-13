import Document from '@tiptap/extension-document'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import CommandsFormSuggs from './libs/command.ts'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import suggestion from './libs/suggestion.ts'
import React, { useEffect, useMemo } from 'react'
import { UploadImage } from './libs/uploadFile.ts'
import { EditorCommand } from './editorCommand.tsx'
import AssetTypes from '#enums/asset_types'

const CustomDocument = Document.extend({
  content: 'heading block*',
})

const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.set('thumbnails', file)
  const response = await fetch(`/assets/${AssetTypes.THUMBNAIL}`, {
    body: formData,
    method: 'POST',
  })
  const data = await response.json()
  return ` http://localhost:3335/assets/${data.filename}?width=900`
}

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => {
          return {
            'data-background-color': attributes.backgroundColor,
            'style': `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

export function TiptapEditorComponent({
  value,
  onChange,
  name,
}: {
  value: string
  onChange: (ev: string) => void
  name: string
}) {
  const extensions = useMemo(
    () => [
      CustomDocument,
      StarterKit.configure({
        document: false,
        dropcursor: {
          color: 'red',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      CommandsFormSuggs.configure({
        suggestion,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return "What's the title"
          }
          return 'Type / to see available commands ...'
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
      Image,
      UploadImage.configure({ uploadFn: uploadFile }),
    ],
    []
  )

  const editor = useEditor({
    extensions,
    // editorProps: {
    //   attributes: {
    //     class: '',
    //   },
    // },
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML()
      onChange(newContent)
    },
    onBlur: ({ editor }) => {
      if (editor && value !== editor.getHTML()) {
        const newContent = editor.getHTML()
        onChange(newContent)
      }
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor?.commands.setContent(value)
    }
  }, [editor, value])

  return (
    <div className="wrapper card">
      <EditorCommand editor={editor!} />
      <EditorContent name={name} editor={editor} />
    </div>
  )
}

export const TiptapEditor = React.memo(TiptapEditorComponent, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value
})
