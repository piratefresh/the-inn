import React from "react";
import Image from "next/image";
import { styled } from "ui";

const StyledImage = styled(Image, {
  borderRadius: "$full",
  border: "10px solid $yellowBrand",
  cursor: "pointer",
});

const UploadButton = styled("button", {
  borderRadius: "$full",
  backgroundColor: "$yellowBrand",
  cursor: "pointer",
  width: "160px",
  height: "160px",
});

interface AvatarUploadProps {
  defaultSrc?: string | null;
  onChange: (file: File) => void;
}

export const AvatarUpload = ({ defaultSrc, onChange }: AvatarUploadProps) => {
  const [image, setImage] = React.useState<File>();
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
  return (
    <div>
      <div className="h-40 w-40">
        <StyledImage
          alt="Avatar uploader"
          width={200}
          height={200}
          layout="responsive"
          src={preview}
          objectFit="cover"
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.click();
          }}
        />
      </div>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substr(0, 5) === "image") {
            setImage(file);
          } else {
            setImage(null);
          }
        }}
      />
    </div>
  );
};
