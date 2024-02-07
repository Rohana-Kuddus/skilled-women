import CloseLineIcon from "remixicon-react/CloseLineIcon"
import ButtonRecommendation from "./ButtonRecommendation"
import { useNavigate } from "react-router"
import CardClass from "./CardClass"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getClassRoadmap } from "../redux/slices/courseSlice"
import { useParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { setAlert } from "../redux/slices/alertSlice"
import Alert from "./Alert"

function SidebarClass({ data, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { alert, alertName } = useSelector(state => state.alert);
  const { course } = useSelector(state => state.course);
  const params = useParams();

  useEffect(() => {
    dispatch(getClassRoadmap(params.id, data.id));
  }, []);

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
    <div>
      <div>
        <h1 className="heading1 green">Pilihan Kelas</h1>
        {/* perlu tambah error handling keluar alet kalau user belum login klik */}
        <CloseLineIcon color="#1E292B" onClick={() => setIsOpen({ status: false, id: '' })}></CloseLineIcon>
      </div>

      <div>
        <div>
          <h3 className="heading3 green font-bold">{data.name}</h3>
          <ButtonRecommendation name={'Kelas'} action={Object.keys(cookies).length !== 0 ?
            () => navigate('/recommendations') : () => dispatch(setAlert({ alert: true, alertName: 'class' }))}></ButtonRecommendation>
        </div>

        <div>
          {course.map(v => (
            <div key={v.id}>
              <CardClass data={v} editBtn={false}></CardClass>
            </div>
          ))}
        </div>
      </div>

      {alert && alertName === 'class'  && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button} 
        closeBtn={true} name={'class'}></Alert>}
    </div>
  );
}

SidebarClass.propTypes = {
  data: PropTypes.object,
  setIsOpen: PropTypes.func
}

export default SidebarClass;