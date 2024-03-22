import { UserRoundX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
const UserProfile = () => {
  return (
    <div className="register">
      <div className="block md:hidden">
        <button className="avatar">
          <UserRoundX />
        </button>
      </div>
      <div className="hidden md:block">
      <Link to={'#'} className='profileicon'>Profile</Link>
        <Link to={`#`}>Log in</Link>
        <button className="sign">Sign up</button>
        
      </div>
    </div>
  );
};

export default UserProfile;
