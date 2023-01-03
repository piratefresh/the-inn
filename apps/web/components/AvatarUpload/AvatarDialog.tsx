import { Text } from "ui";

export const AvatarDialog = ({ openFileInput, openCropper }) => {
  return (
    <div>
      <Text>Update Profile Picture</Text>
      <div className="flex flex-col gap-8">
        <button onClick={openFileInput}>Upload Photo</button>
        <button onClick={openCropper}>Edit Current Avatar</button>
      </div>
    </div>
  );
};
