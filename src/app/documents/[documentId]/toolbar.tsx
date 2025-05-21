"use client"
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react';
import React from 'react'

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/80")}
    >
      <Icon className='size-4' />
    </button>
  )
}

const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
      [
        {
          label: "Undo",
          icon: Undo2Icon,
          onClick: () => editor?.chain().focus().undo().run(),
        },
        {
          label: "Redo",
          icon: Redo2Icon,
          onClick: () => editor?.chain().focus().redo().run(),
        },
        {
          label: "Print",
          icon: PrinterIcon,
          onClick: () => window.print(),
        },
        {
          label: "Spell check",
          icon: SpellCheckIcon,
          onClick: () => {
            const current = editor?.view.dom.getAttribute("spellcheck");
            if (current === "true") {
              editor?.view.dom.setAttribute("spellcheck", "false");
            } else {
              editor?.view.dom.setAttribute("spellcheck", "true");
            }
          },
        },
      ],
      [
        {
          label: "Bold",
          icon: BoldIcon,
          onClick: () => editor?.chain().focus().toggleBold().run(),
          isActive: editor?.isActive("bold"),
        },
        {
          label: "Italic",
          icon: ItalicIcon,
          onClick: () => editor?.chain().focus().toggleItalic().run(),
          isActive: editor?.isActive("italic"),
        },
        {
          label: "Underline",
          icon: UnderlineIcon,
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
          isActive: editor?.isActive("underline"),
        },
      ],
      [
        {
          label: "Comment",
          icon: MessageSquarePlusIcon,
          onClick: () => console.log("TODO: comment"),
          isActive: false, // todo: implement this funcationality 
        },
        {
          label: "List Todo",
          icon: ListTodoIcon,
          onClick: () => editor?.chain().focus().toggleTaskList().run(),
          isActive: editor?.isActive("tasklist"),
        },
        {
          label: "Remove Formatting",
          icon: RemoveFormattingIcon,
          onClick: () => editor?.chain().focus().unsetAllMarks().run(),
        },
      ]
    ];

  return (
    <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* Todo font family */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* todo heading */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* todo font size */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
      {/* Todo: text color */}
      {/* todo highlight color */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* todo link */}
      {/* todo image */}
      {/* todo align */}
      {/* todo: line height */}
      {sections[2].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
    </div>
  )
}

export default Toolbar