import { useCookies } from "react-cookie";
import ButtonRecommendation from "./ButtonRecommendation";
import StepRoadmap from "./StepRoadmap";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../redux/slices/alertSlice";

function Roadmap({ data }) {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const { status, name } = useSelector(state => state.alert);

  const alert = {
    status: false,
    text: 'Silahkan login atau daftar akun terlebih dahulu.',
    button: {
      primary: 'Login',
      primaryAction: () => {
        navigate('/login');
        dispatch(setAlert({ status: false, name: 'roadmap' }));
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
        <div className="bg-[#4F6C6A]">
          <h2 className="heading2 white">Roadmap</h2>
          <p className="paragraph-regular white">{data.roadmapSummary}</p>
        </div>

        {/* perlu ubah url jadi link gform rekomendasi roadmap */}
        <ButtonRecommendation name={'Roadmap'} action={Object.keys(cookies).length !== 0 ?
          () => window.open('url', '_blank', 'noreferrer') : () => dispatch(setAlert({ status: true, name: 'roadmap' }))}></ButtonRecommendation>

        <StepRoadmap></StepRoadmap>
      </div>

      {status && name === 'roadmap' && <Alert status={alert.status} text={alert.text} button={alert.button} 
        closeBtn={true} name={'roadmap'}></Alert>}
    </div>
  );
}

export default Roadmap;