import dynamic from "next/dynamic";

const Car = dynamic(() => import("./Car"));

export const CarHOC = () => {
  return (
    <Car />
  );
};
