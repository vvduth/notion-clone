"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "../ui/single-image-dropzone";

import React, { useState } from "react";

import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const CoverImageModal = () => {
  const [file, setFile] = useState<File>();
  const [issubmitting, setIssubmitting] = useState(false);
  const update = useMutation(api.documents.update);

  const params = useParams();
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    setFile(undefined);
    setIssubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIssubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
          <div>TODO: Upload image</div>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          onChange={onChange}
          disabled={issubmitting}
          value={file}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
