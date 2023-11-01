"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import ConfirmModal from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}
const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId })
    
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Something went wrong removing note from the banner!",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId }).then(() => {
      router.push("/documents");
    });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note retored!",
      error: "Something went wrong restoring note from the banner!",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center 
    text-sm p-2 text-white flex items-center justify-center">
      <p>This page is in the trash.</p>
      <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent 
        hover:bg-primary/5 text-white hover:text-white p-1 mr-2 ml-2 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
      <Button
        size={"sm"}
        
        variant={"outline"}
        className="border-white bg-transparent 
        hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Delete forever
      </Button>
      </ConfirmModal>
     
    </div>
  );
};

export default Banner;
