import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import Cropper from "react-easy-crop";
import { RangeSlider, Text, Button } from "ui";
import getCroppedImg from "./cropImage";

interface AvatarUploadDialogProps {
  image: string;
  onChange: (file: File) => void;
  onCloseDialog: () => void;
}

export const AvatarUploadDialog = ({
  onChange,
  onCloseDialog,

  image,
}: AvatarUploadDialogProps) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState<number>(0);
  const [zoom, setZoom] = React.useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [croppedImage, setCroppedImage] = React.useState(null);

  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onClose = React.useCallback(() => {
    setCroppedImage(null);
  }, []);

  const showCroppedImage = React.useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );

      setCroppedImage(croppedImage);

      onChange(croppedImage);

      onClose();
      onCloseDialog();
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels, rotation, onChange, onClose, onCloseDialog]);

  return (
    <div className="flex flex-col">
      <div
        className="relative flex items-center justify-center"
        style={{ height: "600px", width: "100%" }}
      >
        <Cropper
          image={image}
          crop={crop}
          cropShape="round"
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="bg-white my-4">
        <div className="flex flex-row items-center justify-center">
          <MagnifyingGlassCircleIcon className="h-6 w-6" />
          <RangeSlider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onValueChange={(zoom) => setZoom(zoom[0])}
          />
          <Button size="large" type="submit" onClick={showCroppedImage}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
