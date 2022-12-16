import { useCreateImageSignatureMutation } from "@generated/graphql";
import { Button } from "@mantine/core";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { useRequestPreSend } from "@rpldy/uploady";
import React from "react";
import { forwardRef } from "react";
import DropZoneStyles from "./Dropzone.module.css";

interface ISignedUploadButtone extends HTMLButtonElement {
  onChange: (file: FileLike) => void;
  onClick: () => void;
}

export const SignedUploadButton = forwardRef(
  ({ onClick, onChange, ...buttonProps }: ISignedUploadButtone, ref: any) => {
    const [, createImageSignature] = useCreateImageSignatureMutation();
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

    const onZoneClick = React.useCallback(
      (e) => {
        if (onClick) {
          onClick(e);
        }
      },
      [onClick]
    );

    return (
      <UploadDropZone
        {...buttonProps}
        ref={ref}
        onDragOverClassName="drag-over"
        extraProps={{ onClick: onZoneClick }}
      >
        <div
          id="drag-text"
          className={clsx(
            "col-span-3 relative h-48 bg-white p-5 cursor-pointer rounded-md overflow-hidden",
            DropZoneStyles["root"],
            DropZoneStyles["dropzoneHeight"]
          )}
        >
          <div className="h-full w-full flex place-items-center justify-center">
            Drag File(s) Here
          </div>
        </div>
      </UploadDropZone>
    );
  }
);

SignedUploadButton.displayName = "SignedUploadButton";
