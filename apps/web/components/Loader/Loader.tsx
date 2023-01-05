import Lottie from "lottie-react";
import diceLoader from "./dice-loader.json";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div style={{ width: "150px" }} role="status">
        <Lottie animationData={diceLoader} loop={true} />
      </div>
    </div>
  );
};
