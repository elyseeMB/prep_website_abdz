import { ReactRenderer } from '@tiptap/react'
import { Editor, Range } from '@tiptap/core'
import tippy, { Instance as TippyInstance } from 'tippy.js'
import DropdownMenu from './dropdownMenu.js'

interface CommandItem {
  title: string
  command: ({ editor, range }: { editor: Editor; range: Range }) => void
}

interface SuggestionProps {
  editor: Editor
  range: Range
  command: (item: CommandItem) => void
  items: CommandItem[]
  clientRect: () => DOMRect
  event: KeyboardEvent
}

interface ReactRendererRef {
  ref: {
    onKeyDown: (props: { event: KeyboardEvent }) => boolean
  } | null
  element: HTMLElement
  updateProps: (props: Partial<SuggestionProps>) => void
  destroy: () => void
}

export default {
  items: ({ query }: { query: string }): CommandItem[] => {
    return [
      {
        title: 'Bold',
        command: ({ editor, range }: { editor: Editor; range: Range }) =>
          editor.chain().focus().deleteRange(range).toggleBold().run(),
      },
      {
        title: 'Italic',
        command: ({ editor, range }: { editor: Editor; range: Range }) =>
          editor.chain().focus().deleteRange(range).toggleItalic().run(),
      },
      {
        title: 'Strike',
        command: ({ editor, range }: { editor: Editor; range: Range }) =>
          editor.chain().focus().deleteRange(range).toggleStrike().run(),
      },
      {
        title: 'Left Align',
        command: ({ editor }: { editor: Editor }) => {
          editor.chain().focus().setTextAlign('left').run()
        },
      },
      {
        title: 'Center Align',
        command: ({ editor }: { editor: Editor }) => {
          editor.chain().focus().setTextAlign('center').run()
        },
      },
      {
        title: 'Right Align',
        command: ({ editor }: { editor: Editor }) => {
          editor.chain().focus().setTextAlign('right').run()
        },
      },
      {
        title: 'Justify Align',
        command: ({ editor }: { editor: Editor }) => {
          editor.chain().focus().setTextAlign('justify').run()
        },
      },

      {
        title: 'Code',
        command: ({ editor, range }: { editor: Editor; range: Range }) =>
          editor.chain().focus().deleteRange(range).toggleCode().run(),
      },
      {
        title: 'Blockquote',
        command: ({ editor, range }: { editor: Editor; range: Range }) =>
          editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
      },
      {
        title: 'Horizontal rule',
        command: ({ editor, range }: { editor: Editor; range: Range }) =>
          editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
      },
      {
        title: 'Hard break',
        command: ({ editor, range }: { editor: Editor; range: Range }) =>
          editor.chain().focus().deleteRange(range).setHardBreak().run(),
      },
      {
        title: 'Image',
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.commands.addImage()
        },
      },
      {
        title: 'table-Insert Table',
        command: ({ editor }: { editor: Editor }) =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
      },
      {
        title: 'table-Add Column Before',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().addColumnBefore().run(),
      },
      {
        title: 'table-Add Column After',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().addColumnAfter().run(),
      },
      {
        title: 'table-Delete Column',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().deleteColumn().run(),
      },
      {
        title: 'table-Add Row Before',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().addRowBefore().run(),
      },
      {
        title: 'table-Add Row After',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().addRowAfter().run(),
      },
      {
        title: 'table-Delete Row',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().deleteRow().run(),
      },
      {
        title: 'table-Delete Table',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().deleteTable().run(),
      },
      {
        title: 'table-Merge Cells',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().mergeCells().run(),
      },
      {
        title: 'table-Split Cell',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().splitCell().run(),
      },
      {
        title: 'table-Toggle Header Column',
        command: ({ editor }: { editor: Editor }) =>
          editor.chain().focus().toggleHeaderColumn().run(),
      },
      {
        title: 'table-Toggle Header Row',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().toggleHeaderRow().run(),
      },
      {
        title: 'table-Toggle Header Cell',
        command: ({ editor }: { editor: Editor }) =>
          editor.chain().focus().toggleHeaderCell().run(),
      },
      {
        title: 'table-Merge or Split',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().mergeOrSplit().run(),
      },
      {
        title: 'table-Set Cell Attribute',
        command: ({ editor }: { editor: Editor }) =>
          editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run(),
      },
      {
        title: 'table-Fix Tables',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().fixTables().run(),
      },
      {
        title: 'table-Go to Next Cell',
        command: ({ editor }: { editor: Editor }) => editor.chain().focus().goToNextCell().run(),
      },
      {
        title: 'table-Go to Previous Cell',
        command: ({ editor }: { editor: Editor }) =>
          editor.chain().focus().goToPreviousCell().run(),
      },
    ]
      .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 20)
  },

  render: () => {
    let component: ReactRendererRef
    let popup: TippyInstance[]

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(DropdownMenu, {
          props,
          editor: props.editor,
        }) as unknown as ReactRendererRef

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: SuggestionProps) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (props.event.key === 'Escape') {
          popup[0].hide()
          return true
        }
        return component.ref?.onKeyDown(props) || false
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
