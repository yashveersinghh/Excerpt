import React, { useEffect, useRef, useState } from "react"
import { Editor } from "@tiptap/react"
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
} from "react-icons/md"
import { HiChevronUpDown } from "react-icons/hi2"

type ToolbarProps = { editor: Editor | null }

function useEditorRerender(editor: Editor | null) {
  const [, setTick] = useState(0)
  useEffect(() => {
    if (!editor) return
    const update = () => setTick((n) => n + 1)
    editor.on("selectionUpdate", update)
    editor.on("transaction", update)
    return () => {
      editor.off("selectionUpdate", update)
      editor.off("transaction", update)
    }
  }, [editor])
}

function getBlockLabel(editor: Editor): string {
  if (editor.isActive("heading", { level: 1 })) return "Heading 1"
  if (editor.isActive("heading", { level: 2 })) return "Heading 2"
  if (editor.isActive("heading", { level: 3 })) return "Heading 3"
  return "Normal"
}

export const EditorToolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [headingOpen, setHeadingOpen] = useState(false)
  const headingRef = useRef<HTMLDivElement>(null)

  useEditorRerender(editor)

  useEffect(() => {
    if (!headingOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (headingRef.current && !headingRef.current.contains(e.target as Node)) {
        setHeadingOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [headingOpen])

  if (!editor) return null

  const btn = (
    label: React.ReactNode,
    onClick: () => void,
    active = false,
    title = ""
  ) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex h-8 w-8 shrink-0 items-center justify-center cursor-pointer rounded text-gray-500 transition-colors ${
        active ? "bg-gray-200 text-gray-900" : "hover:bg-gray-100 hover:text-gray-800"
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  )

  const applyHeading = (level: 1 | 2 | 3 | null) => {
    if (level === null) {
      editor.chain().focus().setParagraph().run()
    } else {
      editor.chain().focus().setHeading({ level }).run()
    }
    setHeadingOpen(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-white px-2 py-1.5">
      <div ref={headingRef} className="relative mr-1">
        <button
          type="button"
          onClick={() => setHeadingOpen((o) => !o)}
          className="flex h-8 min-w-22 items-center cursor-pointer justify-between gap-1 rounded px-2 text-sm text-gray-700 hover:bg-gray-100"
          aria-expanded={headingOpen}
          aria-haspopup="listbox"
        >
          <span className="truncate">{getBlockLabel(editor)}</span>
          <HiChevronUpDown className="shrink-0 text-base text-gray-400" />
        </button>
        {headingOpen && (
          <div
            role="listbox"
            className="absolute left-0 top-full z-30 mt-1 min-w-35 overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg"
          >
            {(
              [
                ["Normal", null],
                ["Heading 1", 1],
                ["Heading 2", 2],
                ["Heading 3", 3],
              ] as const
            ).map(([label, level]) => (
              <button
                key={label}
                type="button"
                role="option"
                onClick={() => applyHeading(level)}
                className={`block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
                  (level === null && !editor.isActive("heading")) ||
                  (level !== null && editor.isActive("heading", { level }))
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <span className="mx-1 hidden h-5 w-px bg-gray-200 sm:block" aria-hidden />

      {btn(<MdFormatBold size={18} />, () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"), "Bold")}
      {btn(<MdFormatItalic size={18} />, () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"), "Italic")}
      {btn(<MdFormatUnderlined size={18} />, () => editor.chain().focus().toggleUnderline().run(), editor.isActive("underline"), "Underline")}
      {btn(<MdStrikethroughS size={18} />, () => editor.chain().focus().toggleStrike().run(), editor.isActive("strike"), "Strikethrough")}

      <span className="mx-1 hidden h-5 w-px bg-gray-200 sm:block" aria-hidden />

      {btn(<MdFormatQuote size={18} />, () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"), "Quote")}
      {btn(<MdFormatListBulleted size={18} />, () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"), "Bullet list")}
      {btn(<MdFormatListNumbered size={18} />, () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"), "Numbered list")}
    </div>
  )
}

export default EditorToolbar

