import React from "react";
import { useCallback, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import DropZoneStyles from "./Dropzone.module.css";
import Uploady from "@rpldy/uploady";
import { DropZone } from "./TargetBox";
import { FileCard } from "./FileCard";
import { SignedUploadButton } from "./UploadButton";

const CLOUD_NAME = "da91pbpmj",
  API_KEY = "446621691525293";

export const Dropzone = ({
  onChange,
  ...rest
}: {
  onChange: (...event: any[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);

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

  console.log(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
  );

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
              key={file.name}
              index={index}
              id={file.name}
              file={file}
              onRemoveCard={handleRemoveCard}
              onMoveCard={handleMoveCard}
            />
          ))}

        <DropZone
          onDrop={handleOnDrop}
          className="col-span-3 relative h-48 bg-white p-5 border-dashed border-2 border-brandYellow cursor-pointer rounded-md overflow-hidden"
        />

        <SignedUploadButton />
      </div>
    </DndProvider>
  );
};
