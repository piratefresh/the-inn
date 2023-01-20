// import Image from "next/Image";
import { formatDistanceToNow } from "date-fns";
import { Text } from "../Typography";

interface NotificationProps {
  sender: string;
  createdAt: string;
  children: React.ReactNode;
  imageSrc: string;
  relatedId: string;
}

export const Notification = ({
  sender,
  createdAt,
  children,
  imageSrc,
  relatedId,
}: NotificationProps) => {
  return (
    <div
      className="relative rounded-xl bg-brandLightBlack border-b-brandYellowGradient"
      style={{ maxWidth: 440 }}
    >
      <a
        className="flex flex-row gap-4 relative"
        href={`/campaign/${relatedId}`}
      >
        <div className="">
          <img
            src={imageSrc}
            alt="notification image"
            className="object-cover rounded-l-xl"
            style={{ width: "120px", height: "122px" }}
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row gap-8">
            <Text size="sm" color="loContrast" font="alegreyasans">
              {sender}
            </Text>
            <Text size="sm" color="loContrast" font="alegreyasans">
              {formatDistanceToNow(new Date(createdAt))}
            </Text>
          </div>
          <div>{children}</div>
        </div>
      </a>
    </div>
  );
};
