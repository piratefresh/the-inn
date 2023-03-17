import React from "react";
import Image, { ImageProps } from "next/image";
import { Dialog, styled, Text } from "ui";
import { CameraIcon, PencilIcon } from "@heroicons/react/24/outline";
import { AvatarUploadDialog } from "./AvatarUploadDialog";
import { AvatarDialog } from "./AvatarDialog";

const StyledImage = styled(Image, {
  height: "100%",
  width: "100%",
});

interface AvatarUploadProps {
  defaultSrc?: string | null;
  onChange: (file: File) => void;
  image?: File;
}

export const AvatarUpload = ({
  defaultSrc,
  image,
  onChange,
}: AvatarUploadProps) => {
  const [open, setOpen] = React.useState(false);
  const [openCropper, setOpenCropper] = React.useState(false);

  const [preview, setPreview] = React.useState<string>(defaultSrc);
  const fileInputRef = React.useRef<HTMLInputElement>();

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleDialogs = (v: boolean) => {
    setOpen(v);
    setOpenCropper(v);
  };

  console.log("openCropper: ", openCropper);

  return (
    <div>
      <Text color="hiContrast">{openCropper}</Text>
      <div
        className="h-40 w-40 border-4 border-brandYellow rounded-full relative cursor-pointer flex justify-center items-center overflow-hidden"
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
          setOpenCropper(true);
        }}
      >
        {preview && !openCropper ? (
          <div>
            <StyledImage
              alt="Avatar uploader"
              fill
              src={preview}
              objectFit="cover"
            />
            <div className="absolute bottom-5 right-5 z-20 bg-brandYellow rounded-full p-2">
              <PencilIcon className="h5 w-5" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <CameraIcon />
            <Text>Add Image</Text>
          </div>
        )}
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substr(0, 5) === "image") {
            onChange(file);
            handleDialogs(false);
          }
        }}
      />

      <Dialog
        onOpen={handleDialogs}
        open={open}
        title="Avatar Upload"
        description=""
      >
        {preview ? (
          <AvatarUploadDialog
            image={preview}
            onChange={onChange}
            onCloseDialog={() => {
              handleDialogs(false);
            }}
          />
        ) : (
          <AvatarDialog
            openFileInput={() => fileInputRef.current.click()}
            openCropper={() => setOpenCropper(true)}
          />
        )}
      </Dialog>
    </div>
  );
};
