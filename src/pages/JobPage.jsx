import SearchLineIcon from "remixicon-react/SearchLineIcon"
import ButtonRecommendation from "../components/ButtonRecommendation";
import { useEffect, useState } from "react";
import CardJob from "../components/CardJob";
import { setStatus } from "../redux/slices/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getIndustry } from "../redux/slices/industrySlice";
import { getJobList } from "../redux/slices/jobSlice";
import { useCookies } from "react-cookie";

function JobPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const { status } = useSelector(state => state.alert);
  const { industry } = useSelector(state => state.industry);
  const { job } = useSelector(state => state.job);

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getIndustry());
    dispatch(getJobList());
  }, []);

  const filterHandler = (e) => {
    const { name, value } = e.target;
    dispatch(getJobList({ [name]: value }));
  };

  const alert = {
    status: false,
    text: 'Silahkan login atau daftar akun terlebih dahulu.',
    button: {
      primary: 'Login',
      primaryAction: () => {
        navigate('/login');
        dispatch(setStatus(false));
      },
      secondary: 'Daftar sekarang',
      secondaryAction: () => {
        navigate('/register');
      }
    }
  };

  return ( 
    <div>
      {/* hero section */}
      <section>
        <div className="container">
          <div className="flex justify-end">
            <p className="heading1 black text-center">Pilihlah Pekerjaan Yang <br /> Kamu Minati!</p>
            <img className=" max-w-72" src="https://imgur.com/dEyAXJg.png" alt="" />
          </div>
        </div>
      </section>

      {/* section filter */}
      <section className=" px-7">
        <div className="flex flex-row justify-between">
          <div className="flex gap-4">
            {/* search bar */}
            <div className="pt-2 relative mx-auto green">
              <input className="border-2 border-gray-300 paragraph-regular black bg-white h-10 px-5 pr-16 rounded-md text-sm w-72 focus:outline-none"
                type="search" name="search" placeholder="Cari Berdasarkan Pekerjaan"
                onChange={filterHandler} />
              <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
                <SearchLineIcon className="green"></SearchLineIcon>
              </button>
            </div>

            {/* dropdown industri */}
            <div className="relative pt-2">
              <select onChange={filterHandler} name="industry" className="inline-flex justify-start px-4 py-2 w-40 paragraph-regular bg-white border border-gray-300 rounded-md shadow-sm">
                <option value=''>Pilih Industri</option>
                {industry.map((v) => (
                  <option key={v.id} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="basis-1/4 pt-2">
            <ButtonRecommendation name={'Pekerjaan'} action={cookies.token ? 
              () => window.open('url', '_blank', 'noreferrer') : () => dispatch(setStatus(true))}></ButtonRecommendation>
          </div> 
        </div> 
      </section>

      {/* section cards */}
      <section className="px-7">
        <div className="container mt-10 flex flex-wrap justify-start">
            {job.map((val) => (
              <div key={val.id} className="m-3">
                <CardJob job={val}></CardJob>
              </div>
            ))}
        </div>
      </section>
      
      {status && <Alert status={alert.status} text={alert.text} button={alert.button} closeBtn={true}></Alert>}
    </div>
  );
}

export default JobPage;