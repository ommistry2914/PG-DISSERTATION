import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'
import './dashboard.css'
import CircularProgressBar from "../Progress/CircularProgressBar";
import { FaChevronRight, FaCalendar } from "react-icons/fa";
import Photo1 from '../../images/photo1.png';
import Lottie from 'react-lottie';
import animationData from './Student.json';

const Profile = () => {

  const MyLottieAnimation = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return <Lottie options={defaultOptions} />;
  };

  const day = 75;
  const totalDays = 300;

 


  return <div className="common-pg-contents">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item"><a href="#">Student</a></li>
        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
      </ol>
    </nav>
    <div className=" common-pg-dashboard-content">
      <div className=' common-pg-project-div row'>
        <div className=" common-pg-student-name col-sm-12 col-md-4 col-lg-4">
          <div className="common-pg-profile-img"><img src={Photo1} alt="" className="common-pg-profile-pic" /></div>
          <div className="common-pg-profile-detail">
            <h4>Shruti Patel</h4>
            <p id="common-pg-field">Computer Science and Engineering</p>
            <p id="common-pg-college">Maharaja Sayajirao University</p>
          </div>

        </div>
        <div className="common-pg-project-overviews col-sm-12 col-md-2 col-lg-2">Project: <p  id="common-pg-project-name">Lorem ipsum dolor sit amet consectetur adipisicing.</p></div>
        <div className="common-pg-project-overviews col-sm-12 col-md-2 col-lg-2">
          <div className="common-pg-calender-icon">
            <span className="common-pg-handle-one"></span>
            <span className="common-pg-handle-two"></span>
            <div className="common-pg-block"></div>
            <div className="common-pg-day-left">75</div>
          </div>
          <p>days remaining</p>
        </div>
        <div className="common-pg-anime col-sm-12 col-md-2 col-lg-2"><MyLottieAnimation /></div>

      </div>
      <div className=' common-pg-additional-div'>
        <div className=" common-pg-project-details">
          <p>Description </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatem repellendus eos ab excepturi rerum facilis vero quam quisquam ratione. Suscipit eligendi quis sed nostrum iure dolor optio rerum quae quam dolore earum quidem ut quas blanditiis repudiandae voluptatibus, nobis est explicabo totam vitae beatae cupiditate alias dolores accusamus. Vitae sequi ducimus ratione corporis asperiores fugit suscipit nemo iure alias. Voluptatem vel magni, necessitatibus maxime aliquam asperiores doloremque cum dolorem nesciunt et assumenda? Ipsam nulla similique veritatis consequatur, sapiente et adipisci corporis doloremque rerum eum delectus. Laboriosam natus fuga modi repellendus error magnam maxime eveniet architecto atque totam molestiae repellat, quam, quo sapiente. Distinctio, libero cupiditate minus quam adipisci itaque accusantium consectetur tempora veritatis. Quo beatae deserunt voluptate tenetur quia non dolorum possimus. Iste voluptates atque aperiam? Commodi, necessitatibus! Ad consequatur neque, rerum voluptates impedit modi vitae dignissimos alias culpa mollitia magni laborum beatae sunt, eveniet distinctio fuga. Veniam, deserunt!</p>
          <p><span>Start Date:</span> <span>21 feb 2024</span> <span>End Date: </span> <span>21 feb 2024</span></p>
        </div>
        <div className="common-pg-task-details row">
          <div className=" common-pg-overall-progress col-sm-12 col-md-6 col-lg-6">
            <div class="common-pg-wrapper">
              <div class="common-pg-lid one"></div>
              <div class="common-pg-lid two"></div>
              <div class="common-pg-envelope">Overall Progress</div>
              <div class="common-pg-letter">
                <p style={{ display: 'flex', justifyContent: 'center' }}><CircularProgressBar percentage={60} /></p>
              </div>
            </div>
          </div>
          <div className=" common-pg-todays-task col-sm-12 col-md-6 col-lg-6">
            <h6>Upcoming Tasks</h6>
            <ul className='common-pg-today-task-ul'>
              <li><span>Lorem ipsum dolor sit amet.</span></li>
              <li><span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span></li>
              <li><span>Lorem, ipsum dolor.</span></li>
            </ul>
            <Link to={'/schedule'}><button className="common-pg-view-all">View all <FaChevronRight /></button></Link>
          </div>
        </div>
      </div>
    </div></div>;
};

export default Profile;
