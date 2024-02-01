import SearchLineIcon from "remixicon-react/SearchLineIcon"
import ButtonRecommendation from "../components/ButtonRecommendation";
import { useEffect, useState } from "react";
import CardJob from "../components/CardJob";
import { setStatus } from "../redux/slices/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getJobList } from "../redux/slices/jobSlice";

function JobPage() {
  //if user not login set alert
  //akan cek dari api
  const [isRegistered, setRegistered] = useState(false);

  // alert
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);
  const { job } = useSelector(state => state.job);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getJobList(industryTerm, searchTerm));
  }, [job]);

  // update query params
  // belum bisa ditambah kesamping param nya
  const [searchParams, setSearchParams] = useSearchParams();
  const [industryParams, setIndustryParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const industryTerm = industryParams.get('industry') || '';

  const handleInput = event => {
    const search = event.target.value;
      if (search) {
        setSearchParams({ search });
      } else {
        setSearchParams({});
      }
  };

  const handleDropDown = event => {
    const industry = event.target.value;
    if (industry) {
      setIndustryParams({ industry, search });
    } else {
      setIndustryParams({});
    }
  }

  const Industry = [
    {
      "id": 1,
      "name": "Kreatif"
    },
    {
      "id": 2,
      "name": "Agrikultur"
    },
    {
      "id": 3,
      "name": "Bisnis"
    },
    {
      "id": 4,
      "name": "Teknologi"
    }
  ];

  const alert = {
    status: false,
    text: 'Silahkan login atau daftar akun terlebih dahulu',
    button: {
      primary: 'Login',
      primaryAction: () => {
        //ke page login
        navigate('/login');
        dispatch(setStatus(false));
      },
      secondary: 'Daftar sekarang',
      secondaryAction: () => {
        //ke page register
        navigate('/register');
        // dispatch(setStatus(false));
      }
    }
  }

  //click button recomendation
  const buttonHandler = () => {
    dispatch(setStatus(true));
  }
  
  // reset footer's text + link
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  return ( 
    <div>
      <div>
      {status && <Alert status={alert.status} text={alert.text} button={alert.button} closeBtn></Alert>}
      </div>
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
                value={searchTerm}
                onChange={handleInput} />
              <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
                <SearchLineIcon className="green"></SearchLineIcon>
              </button>
            </div>

            {/* dropdown industri */}
            <div className="relative pt-2 ">
              <select onChange={handleDropDown} name="jobIndustry" className="inline-flex justify-start px-4 py-2 w-40 paragraph-regular bg-white border border-gray-300 rounded-md shadow-sm">
                <option value="Pilih Industri">Pilih Industri</option>
                {
                  Industry.map((industry) => {
                    return <option value={industry.name} key={industry.id}>{industry.name}</option>
                  })
                }
              </select>
            </div>
          </div>

          <div className="basis-1/4 pt-2 ">
            <ButtonRecommendation name={'Pekerjaan'}  action={isRegistered ? () => window.open('url', '_blank', 'noreferrer') : buttonHandler}></ButtonRecommendation>
          </div> 

        </div> 
      </section>

      {/* section cards */}
      <section className="  px-7">
        <div className="container mt-10">
          <div className="flex flex-wrap -mx-4 gap-4">
            {
              job
              .map((val) => (
                <CardJob job={val} key={val.id}></CardJob>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default JobPage;