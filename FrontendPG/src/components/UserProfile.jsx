import { UserRoundX } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { CgProfile } from "react-icons/cg";
const UserProfile = () => {
  return (
    <div className="register">
      <div className="block md:hidden">
        <button className="avatar">
          <UserRoundX />
        </button>
      </div>
      <div className="hidden md:block">
      {/* <Link to='/studentprofile' className='profileicon'>Profile</Link> */}
      <Link to='/mentorprofile' className='profileicon'>Profile</Link>
        <Link to='/login'>Log in</Link>
       <Link to='/signup'> <button className="sign">Sign up</button></Link>
        
      </div>
    </div>
  );
};

export default UserProfile;
