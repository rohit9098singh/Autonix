import dynamic from "next/dynamic";

const ResetPassword = dynamic(() => import("./ResetPassword"));

export const ResetPasswordHOC = () => {
  return (
    <ResetPassword />
  );
};
