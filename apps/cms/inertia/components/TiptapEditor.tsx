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
import { useState } from 'react'
import { UploadImage } from './libs/uploadFile.ts'
import { EditorCommand } from './editorCommand.tsx'

const CustomDocument = Document.extend({
  content: 'heading block*',
})

const uploadFile = async (file: File): Promise<string> => {
  // Ici, on pourrait envoyer le fichier vers un serveur avec `fetch` ou `axios`
  // Ex: const formData = new FormData();
  // formData.append('file', file);
  // const response = await axios.post('/upload', formData);
  // return response.data.url;

  // Pour ce test, on simule un upload avec `picsum.photos`

  return `https://picsum.photos/seed/${file.name}/800/600`
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

export function TiptapEditor({
  value,
  onChange,
  name,
}: {
  value: string
  onChange: (ev: string) => void
  name: string
}) {
  const [content, setContent] = useState('')

  const editor = useEditor({
    content: content,
    extensions: [
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

    // editorProps: {
    //   attributes: {
    //     class: '',
    //   },
    // },
    onUpdate: (event) => {
      setContent(event.editor.getHTML())
      onChange(event.editor.getHTML())
    },
    onBlur: (event) => {
      setContent(event.editor.getHTML())
    },
  })

  return (
    <div className="wrapper">
      <EditorCommand editor={editor!} />
      <EditorContent name={name} onChange={() => onChange} content={value} editor={editor} />
    </div>
  )
}
