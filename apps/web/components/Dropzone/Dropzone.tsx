import React from "react";
import { useCallback, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import DropZoneStyles from "./Dropzone.module.css";
import { useRequestPreSend } from "@rpldy/uploady";
import { DropZone } from "./TargetBox";
import { FileCard } from "./FileCard";

import clsx from "clsx";
import { useCreateImageSignatureMutation } from "@generated/graphql";

export const Dropzone = ({
  onChange,
  ...rest
}: {
  onChange: (...event: any[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [, createImageSignature] = useCreateImageSignatureMutation();
  const presend = useRequestPreSend(async ({ options }) => {
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

  const handleOnDrop = useCallback((item: { files: any[] }) => {
    // Do something with the files
    if (item) {
      const files = item.files;
      setFiles((oldFiles) => (oldFiles ? [...oldFiles, ...files] : [...files]));
    }
  }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleMoveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = files[dragIndex];
      setFiles(
        update(files, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [files]
  );

  const handleRemoveCard = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const fileName = e.currentTarget.dataset.filename;
    console.log("filename: ", fileName);
    const filteredFiles = files.filter((file) => file.name !== fileName);

    setFiles(filteredFiles);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`grid gap-4 h-full bg-white p-4 ${DropZoneStyles.root}`}
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(30%, 1fr))",
        }}
      >
        {files.length > 0 &&
          files.map((file, index) => (
            <FileCard
              key={uuidv4()}
              index={index}
              id={file?.name ?? ""}
              file={file}
              onRemoveCard={handleRemoveCard}
              onMoveCard={handleMoveCard}
            />
          ))}

        <DropZone
          onDrop={handleOnDrop}
          className={clsx(
            "col-span-3 relative h-48 bg-white p-5 cursor-pointer rounded-md overflow-hidden",
            DropZoneStyles["dropzoneHeight"]
          )}
          onChange={onChange}
        />
      </div>
    </DndProvider>
  );
};
