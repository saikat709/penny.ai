import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loading.json";
import type React from "react";
import type { LoadingProps } from "../custom_types/PropTypes";

const LoadingComp: React.FC<LoadingProps> = ({ shortened, className }: LoadingProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
     <Lottie
        animationData={loadingAnimation}
        loop
        className={shortened ? "w-56 h-56" : "w-72 h-72"}
      />
    </div>
  );
}

export default LoadingComp;