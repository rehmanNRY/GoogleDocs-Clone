"use client"
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {type Level} from "@tiptap/extension-heading"
import {type ColorResult, CirclePicker, SketchPicker } from "react-color"

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF"

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className='size-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex flex-col gap-y-1'>
        <DropdownMenuLabel>Highlight Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextColorButton = () => {
  const { editor } = useEditorStore();
  
  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm flex-col">
          <span className=""> 
            A
          </span>
          <div className='h-0.5 w-full' style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2.5 flex flex-col gap-y-1'>
        <DropdownMenuLabel>Text Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <CirclePicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ]

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive(`heading`, { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        <DropdownMenuLabel>Heading Level</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {headings.map(({ value, label, fontSize }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
              }
            }}
            className={cn("text-sm min-w-7 flex items-center justify-between rounded-sm hover:bg-neutral-200/80", (value === 0 && !editor?.isActive("heading") || editor?.isActive("heading", { level: value })) && "bg-neutral-200/80")}
            style={{ fontSize }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 flex flex-col gap-y-1'>
        <DropdownMenuLabel>Font Family</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {fonts.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn("text-sm h-7 min-w-7 flex items-center justify-between rounded-sm hover:bg-neutral-200/80", editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80")}
            style={{ fontFamily: value }}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* todo font size */}
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      {/* todo link */}
      {/* todo image */}
      {/* todo align */}
      {/* todo: line height */}
      {/* todo: line list */}
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