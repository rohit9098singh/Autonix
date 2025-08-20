import dynamic from "next/dynamic";

const AddCar = dynamic(() => import("./AddCar"));

export const AddCarHOC = () => {
  return (
    <AddCar />
  );
};
