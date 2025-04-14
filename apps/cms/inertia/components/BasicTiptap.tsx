import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useMemo } from 'react'
import { EditorCommand } from './editorCommand.tsx'

export const BasicTitpap = ({
  value,
  name,
  onChange,
  label,
  isText = false,
  placeholder,
  description,
}: {
  label?: string
  placeholder?: string
  value: string
  name: string
  isText?: boolean
  description?: string
  onChange: (e: string) => void
}) => {
  const extensions = useMemo(
    () => [
      StarterKit,
      Highlight,
      Placeholder.configure({
        placeholder: () => {
          if (placeholder) {
            return placeholder
          }
          return `Quel est votre ${name}`
        },
      }),
    ],
    []
  )

  const editor = useEditor({
    extensions,
    onUpdate: ({ editor }) => {
      const newContent = isText ? editor.getText() : editor.getHTML()
      onChange(newContent)
    },
    onBlur: ({ editor }) => {
      if (editor && value !== (isText ? editor.getText() : editor.getHTML())) {
        const newContent = isText ? editor.getText() : editor.getHTML()
        onChange(newContent)
      }
    },
  })

  useEffect(() => {
    if (editor && value !== (isText ? editor.getText() : editor.getHTML())) {
      editor?.commands.setContent(value)
    }
  }, [editor, value])

  return (
    <div className="col-span-full">
      {label && (
        <label className="block text-sm/6 font-medium text-gray-900 mb-2" htmlFor={name}>
          {name}
        </label>
      )}
      <EditorCommand floated={false} editor={editor!} />
      <EditorContent
        className=" border border-1 border-black/10 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        editor={editor}
        name={name}
      />
      {description && (
        <div className="flex items-start mt-2">
          <svg
            className="w-5 h-5 me-2 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span className="text-12px opacity-50">{description}</span>
        </div>
      )}
    </div>
  )
}

export const BasicTitpapEditor = React.memo(BasicTitpap, (prev, next) => {
  return prev.value === next.value
})
