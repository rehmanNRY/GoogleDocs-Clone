import React, { useState } from 'react'
import { Id } from '../../convex/_generated/dataModel'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface RenameDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
  initialTitle: string;
}

const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {
  const update = useMutation(api.documents.updateById);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false)

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsRenaming(true);
    update({ id: documentId, title: newTitle.trim() || "Untitled" })
      .then(()=> setOpen(false))
      .finally(() => {
        setIsRenaming(false)
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            Enter a new name for your document
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleRename}>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Document name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              disabled={isRenaming}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false)
              }}
              variant={"ghost"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isRenaming || !newTitle.trim()}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameDialog