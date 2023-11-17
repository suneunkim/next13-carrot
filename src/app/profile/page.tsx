import React from "react";
import getCurrentUser from "../\baction/getCurrentUser";

const ProfilePage = async () => {
  const userDate = await getCurrentUser();

  return <div>ProfilePage</div>;
};

export default ProfilePage;
