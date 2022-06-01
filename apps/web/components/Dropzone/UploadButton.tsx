import { useCreateImageSignatureMutation } from "@generated/graphql";
import { Button } from "@mantine/core";
import { useRequestPreSend, useUploady } from "@rpldy/uploady";

export const SignedUploadButton = () => {
  const [, createImageSignature] = useCreateImageSignatureMutation();
  useRequestPreSend(async ({ options }) => {
    const { data: signatureData } = await createImageSignature();

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

  return <Button>Signed Upload to Cloudinary</Button>;
};
