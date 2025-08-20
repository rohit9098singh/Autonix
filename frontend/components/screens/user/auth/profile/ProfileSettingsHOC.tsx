import dynamic from "next/dynamic";

const ProfileSettings = dynamic(() => import("./ProfileSettings"));

export const ProfileSettingsHOC = () => {
  return (
    <ProfileSettings />
  );
};
