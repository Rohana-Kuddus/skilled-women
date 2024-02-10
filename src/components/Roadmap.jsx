import { useCookies } from "react-cookie";
import ButtonRecommendation from "./ButtonRecommendation";
import StepRoadmap from "./StepRoadmap";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../redux/slices/alertSlice";
import PropTypes from "prop-types";
import "../styles/pages/JobDetailPage.css";

function Roadmap({ data }) {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const { alert, alertName } = useSelector(state => state.alert);

  const alertObj = {
    status: false,
    text: 'Silahkan login atau daftar akun terlebih dahulu.',
    button: {
      primary: 'Login',
      primaryAction: () => {
        navigate('/login');
        dispatch(setAlert({ alert: false, alertName: 'roadmap' }));
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
        <div className="summary">
          <h2 className="flex-auto w-32 heading2 white">Roadmap</h2>
          <p className="flex-auto w-64 paragraph-regular white">{data.roadmapSummary}</p>
        </div>

        <div className="flex justify-end mb-2">
          {/* perlu ubah url jadi link gform rekomendasi roadmap */}
          <ButtonRecommendation name={'Roadmap'} action={Object.keys(cookies).length !== 0 ?
            () => window.open('https://forms.gle/75LaERLJ8hQSXYSV6', '_blank', 'noreferrer') : () => 
            dispatch(setAlert({ alert: true, alertName: 'roadmap' }))}></ButtonRecommendation>
        </div>

        <StepRoadmap></StepRoadmap>
      </div>

      {alert && alertName === 'roadmap' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button} 
        closeBtn={true} name={'roadmap'}></Alert>}
    </div>
  );
}

Roadmap.propTypes = {
  data: PropTypes.object
}

export default Roadmap;