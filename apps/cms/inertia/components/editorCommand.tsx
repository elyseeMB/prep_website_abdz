import { Editor } from "@tiptap/core";
import { BubbleMenu, FloatingMenu } from "@tiptap/react";

type Props = {
  editor: Editor;
};

export function EditorCommand({ editor }: Props) {
  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "is-active" : ""}
          >
            Highlight
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{
            duration: 200,
            placement: "bottom-start",
          }}
          editor={editor}
        >
          <div className="control-group">
            <div className="button-group">
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
              >
                H1
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
              >
                H2
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
              >
                H3
              </button>
              <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? "is-active" : ""}
              >
                Paragraph
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "is-active" : ""}
              >
                Bullet list
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "is-active" : ""}
              >
                Ordered list
              </button>

              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "is-active" : ""}
              >
                Blockquote
              </button>
            </div>
          </div>
        </FloatingMenu>
      )}
    </>
  );
}
