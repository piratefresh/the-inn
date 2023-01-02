export const uploadImage = async (
  picture: File,
  signature: string,
  timestamp: number
) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const formData = new FormData();
  formData.append("file", picture);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("folder", "The inn/campaignmedia");
  formData.append("upload_preset", "the_inn_campaign");
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });
  const data = response.json();

  return data;
};
