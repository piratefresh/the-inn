import UploadDropZone from "@rpldy/upload-drop-zone";
import { useBatchAddListener, useRequestPreSend } from "@rpldy/uploady";
import clsx from "clsx";
import { forwardRef, useCallback, useEffect, useState } from "react";
import DropZoneStyles from "./Dropzone.module.css";
import { useCreateImageSignatureMutation } from "@generated/graphql";
import Image from "next/image";
import React from "react";

interface IClickableDropZone extends HTMLButtonElement {
  onClick: () => void;
  onChange: (image: string) => void;
  previewImage?: string;
  error?: string;
}

export const ClickableDropZone = forwardRef(
  ({
    onClick,
    onChange,
    previewImage,
    error,
    ...buttonProps
  }: IClickableDropZone) => {
    const [, createImageSignature] = useCreateImageSignatureMutation();
    const [image, setImage] = useState(previewImage);

    useRequestPreSend(async ({ options }) => {
      const { data: signatureData } = await createImageSignature({});

      if (signatureData) {
        const { signature, timestamp } = signatureData.createImageSignature;

        return {
          options: {
            destination: {
              params: {
                signature,
                timestamp,
                api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              },
            },
          },
        };
      }
    });

    useBatchAddListener((batch) => {
      // Not sure how to convert FileLike to Blob
      // @ts-ignore
      const imageUrl = URL.createObjectURL(batch.items[0].file);

      setImage(imageUrl);
      onChange(imageUrl);
    });

    const onZoneClick = useCallback(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);

    return (
      <UploadDropZone
        {...buttonProps}
        onDragOverClassName="drag-over"
        extraProps={{ onClick: onZoneClick }}
      >
        <div
          id="drag-text"
          className={clsx(
            "col-span-3 relative h-48 bg-white p-5 cursor-pointer rounded-md overflow-hidden",
            DropZoneStyles["root"],
            DropZoneStyles["dropzoneHeight"],
            { [DropZoneStyles["error"]]: error }
          )}
        >
          <div className="h-full w-full flex place-items-center justify-center">
            {image ? (
              <Image
                src={image}
                alt="Preview image"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              "Drag File(s) Here"
            )}
          </div>
        </div>
      </UploadDropZone>
    );
  }
);

ClickableDropZone.displayName = "ClickableDropzone";
