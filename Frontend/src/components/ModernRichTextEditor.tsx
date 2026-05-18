import React from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import EditorToolbar from "./EditorToolbar"

type Props = {
  content?: string
  onChange?: (html: string) => void
  placeholder?: string
  className?: string
}

export const ModernRichTextEditor: React.FC<Props> = ({
  content = "",
  onChange,
  placeholder = "Start writing...",
  className = "",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "ProseMirror focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  })

  return (
    <div className={`rich-text-editor w-full ${className}`}>
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
        <EditorToolbar editor={editor} />
        <div className="bg-white px-4 py-3 md:px-5 md:py-4">
          <EditorContent editor={editor} />
        </div>
      </div>
      <style>{`
        .rich-text-editor .ProseMirror {
          min-height: 220px;
          color: #1f2937;
          font-size: 1rem;
          line-height: 1.65;
          background: #fff;
        }
        @media (min-width: 768px) {
          .rich-text-editor .ProseMirror { min-height: 320px; }
        }
        .rich-text-editor .ProseMirror:focus { outline: none; }
        .rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          float: left;
          height: 0;
          pointer-events: none;
        }
        .rich-text-editor .ProseMirror h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0.75rem 0 0.5rem;
          color: #111827;
        }
        .rich-text-editor .ProseMirror h2 {
          font-size: 1.375rem;
          font-weight: 700;
          margin: 0.65rem 0 0.4rem;
          color: #111827;
        }
        .rich-text-editor .ProseMirror h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0.5rem 0 0.35rem;
          color: #111827;
        }
        .rich-text-editor .ProseMirror p { margin: 0.35rem 0; }
        .rich-text-editor .ProseMirror blockquote {
          border-left: 3px solid #d1d5db;
          margin: 0.5rem 0;
          padding: 0.25rem 0 0.25rem 1rem;
          color: #6b7280;
        }
        .rich-text-editor .ProseMirror ul,
        .rich-text-editor .ProseMirror ol {
          margin: 0.35rem 0;
          padding-left: 1.5rem;
        }
        .rich-text-editor .ProseMirror ul { list-style: disc; }
        .rich-text-editor .ProseMirror ol { list-style: decimal; }
        .rich-text-editor .ProseMirror li { margin: 0.15rem 0; }
        .rich-text-editor .ProseMirror strong { font-weight: 700; }
        .rich-text-editor .ProseMirror em { font-style: italic; }
        .rich-text-editor .ProseMirror u { text-decoration: underline; }
        .rich-text-editor .ProseMirror s { text-decoration: line-through; }
      `}</style>
    </div>
  )
}

export default ModernRichTextEditor
