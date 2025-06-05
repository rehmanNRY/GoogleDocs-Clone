"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DocumentInput from './document-input'
import {
  FaFile,
  FaEdit,
  FaPlus,
  FaFont,
  FaSave,
  FaFileAlt,
  FaTrash,
  FaPrint,
  FaUndo,
  FaRedo,
  FaCut,
  FaCopy,
  FaPaste,
  FaImage,
  FaTable,
  FaLink,
  FaBold,
  FaItalic,
  FaUnderline,
  FaList,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight
} from 'react-icons/fa'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { useEditorStore } from '@/store/use-editor-store';
import { cn } from '@/lib/utils';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Avatars } from './avatars'
import { Inbox } from './inbox'
import { Doc } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import RenameDialog from '@/components/rename-dialog'
import RemoveDialog from '@/components/remove-dialog'

interface NavbarProps {
  data: Doc<"documents">
}

const Navbar = ({ data }: NavbarProps) => {
  const { editor } = useEditorStore();
  const router = useRouter();

  const mutation = useMutation(api.documents.create)

  const handleSave = () => {
    const content = editor?.getHTML();
    const blob = new Blob([content || ''], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveAs = (format: string) => {
    let content = '';
    let mimeType = '';
    let extension = '';

    switch (format) {
      case 'html':
        content = editor?.getHTML() || '';
        mimeType = 'text/html';
        extension = 'html';
        break;
      case 'json':
        content = JSON.stringify(editor?.getJSON(), null, 2);
        mimeType = 'application/json';
        extension = 'json';
        break;
      case 'text':
        content = editor?.getText() || '';
        mimeType = 'text/plain';
        extension = 'txt';
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.title}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNewDocument = () => {
    mutation({
      title: "Untitled document",
      initialContent: ""
    })
      .then((id) => {
        toast.success("Document created")
        router.push(`/documents/${id}`)
      })
      .catch(() => toast.error("Something went wrong"))
  };

  const tableSizes = [
    { label: "2x2", rows: 2, cols: 2 },
    { label: "3x3", rows: 3, cols: 3 },
    { label: "4x4", rows: 4, cols: 4 },
    { label: "5x5", rows: 5, cols: 5 },
  ];

  const listTypes = [
    {
      label: "Bullet List",
      icon: <FaList className="text-blue-600" />,
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive("bulletList"),
    },
    {
      label: "Ordered List",
      icon: <FaList className="text-blue-600" />,
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor?.isActive("orderedList"),
    },
    {
      label: "Task List",
      icon: <FaList className="text-blue-600" />,
      onClick: () => editor?.chain().focus().toggleTaskList().run(),
      isActive: editor?.isActive("taskList"),
    },
  ];

  return (
    <nav className='flex items-center justify-between py-2 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm'>
      <div className="flex gap-1 items-center">
        <Link href={'/'} className="hover:opacity-80 transition-opacity">
          <Image
            src="/logo.svg"
            alt='logo'
            width={30}
            height={30}
            className="hover:scale-105 transition-transform"
          />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex print:hidden">
            <Menubar className="rounded-lg border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-colors">
                  <FaFile className="text-blue-600" /> File
                </MenubarTrigger>
                <MenubarContent className="min-w-[220px] p-2 rounded-lg shadow-lg border border-gray-100">
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors">
                      <FaSave className="text-blue-600" /> Save
                    </MenubarSubTrigger>
                    <MenubarSubContent className="min-w-[200px] p-2 rounded-lg shadow-lg border border-gray-100 print:hidden">
                      <MenubarItem
                        className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                        onClick={handleSave}>
                        Save
                        <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                        onClick={() => handleSaveAs('html')}>
                        Save as HTML
                        <MenubarShortcut>⌘⇧H</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                        onClick={() => handleSaveAs('json')}>
                        Save as JSON
                        <MenubarShortcut>⌘⇧J</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                        onClick={() => handleSaveAs('text')}>
                        Save as Text
                        <MenubarShortcut>⌘⇧T</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator className="my-1" />
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={handleNewDocument}>
                    <div className="flex items-center gap-2">
                      <FaFileAlt className="text-blue-600" /> New document
                    </div>
                    <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <RenameDialog documentId={data._id} initialTitle={data.title} >
                    <MenubarItem
                      className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        <FaFileAlt className="text-blue-600" /> Rename
                      </div>
                      <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                  </RenameDialog>
                  <MenubarSeparator className="my-1" />
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem
                      className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors text-red-600"
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        <FaTrash /> Remove
                      </div>
                      <MenubarShortcut>⌘⌫</MenubarShortcut>
                    </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator className="my-1" />
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => window.print()}>
                    <div className="flex items-center gap-2">
                      <FaPrint className="text-blue-600" /> Print
                    </div>
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-colors">
                  <FaEdit className="text-blue-600" /> Edit
                </MenubarTrigger>
                <MenubarContent className="min-w-[220px] p-2 rounded-lg shadow-lg border border-gray-100">
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().undo().run()}>
                    <div className="flex items-center gap-2">
                      <FaUndo className="text-blue-600" /> Undo
                    </div>
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().redo().run()}>
                    <div className="flex items-center gap-2">
                      <FaRedo className="text-blue-600" /> Redo
                    </div>
                    <MenubarShortcut>⌘⇧Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator className="my-1" />
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => document.execCommand('cut')}>
                    <div className="flex items-center gap-2">
                      <FaCut className="text-blue-600" /> Cut
                    </div>
                    <MenubarShortcut>⌘X</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => document.execCommand('copy')}>
                    <div className="flex items-center gap-2">
                      <FaCopy className="text-blue-600" /> Copy
                    </div>
                    <MenubarShortcut>⌘C</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => document.execCommand('paste')}>
                    <div className="flex items-center gap-2">
                      <FaPaste className="text-blue-600" /> Paste
                    </div>
                    <MenubarShortcut>⌘V</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-colors">
                  <FaPlus className="text-blue-600" /> Insert
                </MenubarTrigger>
                <MenubarContent className="min-w-[220px] p-2 rounded-lg shadow-lg border border-gray-100">
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = async (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          editor?.chain().focus().setImage({ src: imageUrl }).run();
                        }
                      };
                      input.click();
                    }}>
                    <div className="flex items-center gap-2">
                      <FaImage className="text-blue-600" /> Image
                    </div>
                  </MenubarItem>
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors">
                      <FaTable className="text-blue-600" /> Table
                    </MenubarSubTrigger>
                    <MenubarSubContent className="min-w-[200px] p-2 rounded-lg shadow-lg border border-gray-100">
                      {tableSizes.map(({ label, rows, cols }) => (
                        <MenubarItem
                          key={label}
                          className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                          onClick={() => editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()}
                        >
                          {label}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => {
                      const url = window.prompt('Enter URL');
                      if (url) {
                        editor?.chain().focus().setLink({ href: url }).run();
                      }
                    }}>
                    <div className="flex items-center gap-2">
                      <FaLink className="text-blue-600" /> Link
                    </div>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-3 py-1.5 transition-colors">
                  <FaFont className="text-blue-600" /> Format
                </MenubarTrigger>
                <MenubarContent className="min-w-[220px] p-2 rounded-lg shadow-lg border border-gray-100">
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <div className="flex items-center gap-2">
                      <FaBold className="text-blue-600" /> Bold
                    </div>
                    <MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <div className="flex items-center gap-2">
                      <FaItalic className="text-blue-600" /> Italic
                    </div>
                    <MenubarShortcut>⌘I</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                    <div className="flex items-center gap-2">
                      <FaUnderline className="text-blue-600" /> Underline
                    </div>
                    <MenubarShortcut>⌘U</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator className="my-1" />
                  <MenubarSub>
                    <MenubarSubTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors">
                      <FaList className="text-blue-600" /> Lists
                    </MenubarSubTrigger>
                    <MenubarSubContent className="min-w-[200px] p-2 rounded-lg shadow-lg border border-gray-100">
                      {listTypes.map(({ label, icon, onClick, isActive }) => (
                        <MenubarItem
                          key={label}
                          className={cn(
                            "flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors",
                            isActive && "bg-gray-100"
                          )}
                          onClick={onClick}
                        >
                          <div className="flex items-center gap-2">
                            {icon} {label}
                          </div>
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSeparator className="my-1" />
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}>
                    <div className="flex items-center gap-2">
                      <FaAlignLeft className="text-blue-600" /> Align left
                    </div>
                  </MenubarItem>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}>
                    <div className="flex items-center gap-2">
                      <FaAlignCenter className="text-blue-600" /> Align center
                    </div>
                  </MenubarItem>
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}>
                    <div className="flex items-center gap-2">
                      <FaAlignRight className="text-blue-600" /> Align right
                    </div>
                  </MenubarItem>
                  <MenubarSeparator className="my-1" />
                  <MenubarItem
                    className="flex items-center justify-between hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors"
                    onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <div className="flex items-center gap-2">
                      <FaFont className="text-blue-600" /> Clear formatting
                    </div>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl='/'
          afterSelectOrganizationUrl={'/'}
          afterSelectPersonalUrl={'/'}
        />
        <UserButton />
      </div>
    </nav>
  )
}

export default Navbar