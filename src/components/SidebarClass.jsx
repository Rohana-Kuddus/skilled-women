import CloseLineIcon from "remixicon-react/CloseLineIcon"
import ButtonRecommendation from "./ButtonRecommendation"
import { useNavigate } from "react-router"
import CardClass from "./CardClass"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getClassRoadmap, voteClass } from "../redux/slices/courseSlice"
import { useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { setAlert } from "../redux/slices/alertSlice"
import Alert from "./Alert"
import { getToast } from "../redux/slices/toastSlice"
import Toast from "./Toast"
import "../styles/components/SidebarClass.css"

function SidebarClass({ data, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [cookies] = useCookies();
  const { alert, alertName } = useSelector(state => state.alert);
  const { toast, toastName } = useSelector(state => state.toast);
  const { course, courseMessage } = useSelector(state => state.course);
  const [vote, setVote] = useState({});

  useEffect(() => {
    dispatch(getClassRoadmap(params.id, data.id));
  }, [course]);

  useEffect(() => {
    if (Object.keys(vote).length !== 0) {
      const payload = {
        token: cookies.token,
        classId: vote.id,
        vote: vote.vote
      };
      dispatch(voteClass(payload));

      if (!courseMessage.includes('Get')) {
        dispatch(getToast({ toast: true, toastName: 'voteClass' }));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'voteClass' }));
        }, 3000);
      };
    };
  }, [vote]);

  const alertObj = {
    status: false,
    text: 'Silahkan login atau daftar akun terlebih dahulu.',
    button: {
      primary: 'Login',
      primaryAction: () => {
        navigate('/login');
        dispatch(setAlert({ alert: false, alertName: 'class' }));
      },
      secondary: 'Daftar sekarang',
      secondaryAction: () => {
        navigate('/register');
      }
    }
  };

  return (
    <div className="sidebar-bg">
      <div className="sidebar-container">
        <div className="sidebar-title">
          <h1 className="heading1 green">Pilihan Kelas</h1>
          <CloseLineIcon className="close" color="#1E292B" onClick={() => setIsOpen({ status: false, id: '' })}></CloseLineIcon>
        </div>

        <div className="sidebar-main">
          <div className="sidebar-name">
            <h2 className="heading2 green font-bold max-w-80">{data.name}</h2>
            <ButtonRecommendation name={'Kelas'} action={Object.keys(cookies).length !== 0 ?
              () => navigate('/recommendations') : () => dispatch(setAlert({ alert: true, alertName: 'class' }))}></ButtonRecommendation>
          </div>

          <div className="sidebar-class">
            {course.map(v => (
              <div key={v.id}>
                <CardClass data={v} editBtn={false} setVote={setVote}></CardClass>
              </div>
            ))}
          </div>
        </div>

        {alert && alertName === 'class' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}
          closeBtn={true} name={'class'}></Alert>}
        {toast && toastName === 'voteClass' && <Toast message={courseMessage}></Toast>}
      </div>
    </div>
  );
}

SidebarClass.propTypes = {
  data: PropTypes.object,
  setIsOpen: PropTypes.func
}

export default SidebarClass;