import useAuth from "../../hooks/useAuth";

import UserProfile from "./UserProfile";

const ProfileMain = () => {
  const user = useAuth();

  return (
    <div>
      <UserProfile user={user} />
     




    </div>
  )
}
export default ProfileMain