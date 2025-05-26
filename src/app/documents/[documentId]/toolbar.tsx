"use client"
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListCollapseIcon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon
} from 'lucide-react';
import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Level } from "@tiptap/extension-heading"
import { type ColorResult, CirclePicker, SketchPicker } from "react-color"
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineHeights = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: "l",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-gray-100 px-2 overflow-hidden text-sm transition-colors">
          <ListCollapseIcon className='size-4 text-blue-600' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 rounded-lg shadow-lg border border-gray-100 min-w-[200px]'>
        <DropdownMenuLabel className="text-sm font-medium">Line Height</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {lineHeights.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "text-sm h-8 flex items-center rounded-md hover:bg-gray-100 transition-colors",
              editor?.getAttributes("paragraph").lineHeight === value && "bg-gray-100"
            )}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor?.getAttributes("textStyle").fontSize.replace("px", "") : "16";
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize)
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize)
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(size.toString());
      setInputValue(size.toString());
      setIsEditing(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleInputBlur = () => {
    updateFontSize(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateFontSize(inputValue)
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  }

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  }

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
        <MinusIcon className='size-4 text-blue-600' />
      </button>
      {isEditing ? (
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-8 w-12 text-sm border border-gray-200 rounded-md text-center bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize)
          }}
          className="h-8 w-12 text-sm border border-gray-200 rounded-md bg-transparent cursor-text text-center hover:bg-gray-100 transition-colors">
          {currentFontSize}
        </button>
      )}
      <button
        onClick={increment}
        className="h-8 w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors">
        <PlusIcon className='size-4 text-blue-600' />
      </button>
    </div>
  )
}

const ListButton = () => {
  const { editor } = useEditorStore();

  const lists = [
    {
      label: "Bullet List",
      value: "bulletList",
      isActive: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      icon: <ListIcon className='size-4 text-blue-600' />
    },
    {
      label: "Ordered List",
      value: "orderedList",
      isActive: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: <ListOrderedIcon className='size-4 text-blue-600' />
    },
    {
      label: "Task List",
      value: "taskList",
      isActive: editor?.isActive("taskList"),
      onClick: () => editor?.chain().focus().toggleTaskList().run(),
      icon: <ListTodoIcon className='size-4 text-blue-600' />
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-gray-100 px-2 overflow-hidden text-sm transition-colors">
          <ListIcon className='size-4 text-blue-600' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 rounded-lg shadow-lg border border-gray-100 min-w-[200px]'>
        <DropdownMenuLabel className="text-sm font-medium">List Type</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {lists.map(({ label, icon: Icon, isActive, onClick }) => (
          <DropdownMenuItem
            key={label}
            onClick={onClick}
            className={cn(
              "text-sm h-8 flex items-center gap-2 rounded-md hover:bg-gray-100 transition-colors",
              isActive && "bg-gray-100"
            )}
          >
            {Icon}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Left",
      value: "left",
      icon: <AlignLeftIcon className='size-4 text-blue-600' />
    },
    {
      label: "Center",
      value: "center",
      icon: <AlignCenterIcon className='size-4 text-blue-600' />
    },
    {
      label: "Right",
      value: "right",
      icon: <AlignRightIcon className='size-4 text-blue-600' />
    },
    {
      label: "Justify",
      value: "justify",
      icon: <AlignJustifyIcon className='size-4 text-blue-600' />
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-gray-100 px-2 overflow-hidden text-sm transition-colors">
          <AlignLeftIcon className='size-4 text-blue-600' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 rounded-lg shadow-lg border border-gray-100 min-w-[200px]'>
        <DropdownMenuLabel className="text-sm font-medium">Text Alignment</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {alignments.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "text-sm h-8 flex items-center gap-2 rounded-md hover:bg-gray-100 transition-colors",
              editor?.isActive({ textAlign: value }) && "bg-gray-100"
            )}
          >
            {Icon}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
    setImageUrl("");
    setIsDialogOpen(false);
  }

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    }
    input.click();
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 min-w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-gray-100 px-2 overflow-hidden text-sm transition-colors">
            <ImageIcon className='size-4 text-blue-600' />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='p-2 rounded-lg shadow-lg border border-gray-100 min-w-[200px]'>
          <DropdownMenuLabel className="text-sm font-medium">Insert Image</DropdownMenuLabel>
          <DropdownMenuSeparator className="my-1" />
          <DropdownMenuItem 
            onClick={onUpload}
            className="text-sm h-8 flex items-center gap-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <UploadIcon className='size-4 text-blue-600' />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setIsDialogOpen(true)}
            className="text-sm h-8 flex items-center gap-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <SearchIcon className='size-4 text-blue-600' />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[425px] rounded-lg shadow-lg border border-gray-100'>
          <DialogHeader>
            <DialogTitle className="text-lg font-medium">Paste image url</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Paste the image url to insert it into the document.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="mt-4"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <div className='flex justify-end mt-4'>
            <Button 
              onClick={handleImageUrlSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Insert
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  }

  return (
    <DropdownMenu onOpenChange={(open) => {
      if (open) {
        setValue(editor?.getAttributes("link").href || "")
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button className="h-8 min-w-8 shrink-0 flex items-center justify-center rounded-md hover:bg-gray-100 px-2 overflow-hidden text-sm transition-colors">
          <Link2Icon className='size-4 text-blue-600' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 rounded-lg shadow-lg border border-gray-100 min-w-[300px]'>
        <DropdownMenuLabel className="text-sm font-medium">Insert Link</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        <div className="flex items-center gap-x-2 mt-2">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://example.com/"
            className="flex-1"
          />
          <Button 
            onClick={() => onChange(value)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
        <button className="h-8 w-[120px] shrink-0 flex items-center justify-between rounded-md hover:bg-gray-100 px-2 overflow-hidden text-sm transition-colors">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0 text-blue-600' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 rounded-lg shadow-lg border border-gray-100 min-w-[200px]'>
        <DropdownMenuLabel className="text-sm font-medium">Font Family</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {fonts.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "text-sm h-8 flex items-center justify-between rounded-md hover:bg-gray-100 transition-colors",
              editor?.getAttributes("textStyle").fontFamily === value && "bg-gray-100"
            )}
            style={{ fontFamily: value }}
          >
            {label}
          </DropdownMenuItem>
        ))}
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
        <button className="h-8 min-w-[120px] shrink-0 flex items-center justify-between rounded-md hover:bg-gray-100 px-2 overflow-hidden text-sm transition-colors">
          <span className="truncate">
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className='ml-2 size-4 shrink-0 text-blue-600' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2 rounded-lg shadow-lg border border-gray-100 min-w-[200px]'>
        <DropdownMenuLabel className="text-sm font-medium">Heading Level</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
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
            className={cn(
              "text-sm h-8 flex items-center justify-between rounded-md hover:bg-gray-100 transition-colors",
              (value === 0 && !editor?.isActive("heading") || editor?.isActive("heading", { level: value })) && "bg-gray-100"
            )}
            style={{ fontSize }}
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
      className={cn(
        "text-sm h-8 min-w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors",
        isActive && "bg-gray-100"
      )}
    >
      <Icon className='size-4 text-blue-600' />
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
          isActive: false,
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
    <div className='bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm px-4 py-2 min-h-[48px] flex items-center gap-x-1 overflow-x-auto'>
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
      <Separator orientation='vertical' className='h-6 bg-gray-200' />
      <FontFamilyButton />
      <Separator orientation='vertical' className='h-6 bg-gray-200' />
      <HeadingLevelButton />
      <Separator orientation='vertical' className='h-6 bg-gray-200' />
      <FontSizeButton />
      <Separator orientation='vertical' className='h-6 bg-gray-200' />
      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          {...item}
        />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className='h-6 bg-gray-200' />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <LineHeightButton />
      <ListButton />
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