"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);
  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (docId: string) => {
    router.push(`/documents/${docId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note",
      success: "Note restored",
      error: "Somethign went wrong while restoring",
    });
  };

  const onRemove = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note..",
      success: "Note deleted",
      error: "Sowmthing went wrong while removing",
    });

    if (params.id === documentId) {
      router.push("/documents");
    }

    if (documents === undefined) {
      return (
        <div className="h-full flex items-center p-4">
          <Spinner size={"lg"} />
        </div>
      );
    }
  };

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((doc) => (
            <div
                key={doc._id}
                role="button"
                onClick={() => onClick(doc._id)}
                 className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
            >
                <span className="truncate pl-2">
                    {doc.title}
                </span>
                <div className="flex items-center">
                    <div
                        onClick={(e) => onRestore(e, doc._id)}
                        role="button"
                        className="rounded-sm p-2 hover:bg-neutral-200"
                    >
                        <Undo className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div role="button" className="rounded-sm p-2 hover:bg-neutral-200">

                        <Trash className="w-4 h-4 text-muted-foreground" />
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;