import Image from "next/Image";
import { formatDistanceToNow } from "date-fns";
import { Text } from "../Typography";

interface NotificationProps {
  sender: string;
  createdAt: string;
  children: React.ReactNode;
  imageSrc: string;
}

export const Notification = ({
  sender,
  createdAt,
  children,
  imageSrc,
}: NotificationProps) => {
  return (
    <div className="rounded-lg bg-brandLightBlack flex flex-row">
      <div className="relative" style={{ width: "100px", height: "122px" }}>
        <Image layout="fill" src={imageSrc} alt="notification image" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row gap-8">
          <Text color="hiContrast">{sender}</Text>
          <Text color="hiContrast">
            {formatDistanceToNow(new Date(createdAt))}
          </Text>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
