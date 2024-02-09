import { useEffect, useState } from "react";
import CardJob from "../components/CardJob";
import { setAlert } from "../redux/slices/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import SearchLineIcon from "remixicon-react/SearchLineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import ButtonRecommendation from "../components/ButtonRecommendation";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getIndustry } from "../redux/slices/industrySlice";
import { useCookies } from "react-cookie";
import { getJobList } from "../redux/slices/jobSlice";
import "../styles/pages/JobPage.css";

function JobPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const { alert, alertName } = useSelector(state => state.alert);
  const { industry } = useSelector(state => state.industry);
  const { job } = useSelector(state => state.job);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getIndustry());
    dispatch(getJobList());
  }, []);

  const filterHandler = (params) => {
    const { name, value } = params;
    dispatch(getJobList({ [name]: value }));
  };

  //filter by industry
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const alertObj = {
    status: false,
    text: 'Silahkan login atau daftar akun terlebih dahulu.',
    button: {
      primary: "Login",
      primaryAction: () => {
        navigate('/login');
        dispatch(setAlert({ alert: false, alertName: 'login' }));
      },
      secondary: "Daftar sekarang",
      secondaryAction: () => {
        navigate('/register');
      }
    }
  };

  return (
    <div>
      {/* hero section */}
      <section className="mx-auto lg:mx-0 ">
        <div className="hero-job">
          <p className="heading1 black text-center">Pilihlah Pekerjaan Yang <br /> Kamu Minati!</p>
          <img className="max-w-36" src="https://imgur.com/dEyAXJg.png" alt="hero-image" />
        </div>
      </section>

      {/* section filter */}
      <section className="flex flex-col mx-8">
        <h2 className="flex justify-center lg:justify-start heading2">Pilihan Pekerjaan</h2>
        <div className="buttonsSection">
          <div className="filterSearchButton">
            {/* search bar */}
            <div className="searchSection">
              <input className="searchInput"
                type="search" name="search" placeholder="Cari Berdasarkan Pekerjaan"
                onChange={(e) => filterHandler({ name: 'search', value: e.target.value })} />
              <button type="submit" className="searchBtn">
                <SearchLineIcon className="green"></SearchLineIcon>
              </button>
            </div>

            {/* dropdown industri */}
            <div>
              <button onClick={toggleDropdown} type="button" className="dropdownButton">
                {selected ? selected : "Pilih Industri"}
                <ArrowDownSLineIcon className="arrowDropdown" />
              </button>
              {isOpen && (
                <div className="dropdownOptions">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a key="reset" className="options" role="menuitem" onClick={() => {
                      setSelected('');
                      setIsOpen(false);
                    }}>
                      Pilih Industri
                    </a>
                    {industry.map((industry) => (
                      <a key={industry.id} className="options" role="menuitem" onClick={() => {
                        filterHandler({name: 'industry', value: industry.name});
                        setSelected(industry.name);
                        setIsOpen(false);
                      }}>
                        {industry.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 lg:mt-0">
            <ButtonRecommendation name={'Pekerjaan'} action={Object.keys(cookies).length !== 0
              ? () => window.open('https://forms.gle/azMcFgBtZ29ZpcVPA', '_blank', 'noreferrer')
              : () => dispatch(setAlert({ alert: true, alertName: 'login' }))} padding="px-[1.2em] md:px-8"></ButtonRecommendation>
          </div>
        </div>
      </section>

      {/* section cards */}
      <section className="mt-10 mx-0 md:mx-8">
        <div className="cardSection">
          {job.map((val) => (
            <div key={val.id}>
              <CardJob job={val}></CardJob>
            </div>
          ))}
        </div>
      </section>

      {alert && alertName === 'login' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}
        closeBtn={true} name={'login'}></Alert>}
    </div>
  );
}

export default JobPage;
