import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice";
import SearchLineIcon from "remixicon-react/SearchLineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import CardJob from "../components/CardJob";
import ButtonRecommendation from "../components/ButtonRecommendation";
import Alert from "../components/Alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getIndustry } from "../redux/slices/industrySlice";
import "../styles/pages/JobPage.css";

function JobPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegistered, setRegistered] = useState(true); // if user not login set alert, akan cek dari api
  const [searchTerm, setSearchTerm] = useState(""); //filter by search
  const [selected, setSelected] = useState([]); //filter by industry
  const { status } = useSelector(state => state.alert);
  const { industry } = useSelector(state => state.industry);

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getIndustry());
  }, [industry]);

  const jobs = [
    {
      title: "Graphic Designer",
      image: "https://source.unsplash.com/tuned-on-macbook-CGpifH3FjOA",
      industry: "Kreatif",
      description: "Ciptakan kreasi desain art kamu secara digital!",
      id: "1",
    },
    {
      title: "Petani Hidroponik",
      image: "https://source.unsplash.com/text-s_AgJxMc4zk",
      industry: "Agrikultur",
      description:
        "Cocok untuk kamu yang ingin membuka usaha tanaman hidroponik atau berkebun sendiri ~",
      id: "2",
    },
    {
      title: "Fotografer",
      image:
        "https://source.unsplash.com/person-holding-canon-dslr-camera-hfk6xOjQlFk",
      industry: "Kreatif",
      description:
        "Hobi foto-foto atau suka fotoin temen kamu? Yuk belajar menjadi fotografer handal!",
      id: "3",
    },
    {
      title: "Digital Marketing Consoultant",
      image:
        "https://source.unsplash.com/person-writing-on-white-paper-U33fHryBYBU",
      industry: "Bisnis",
      description:
        "Bantu konsultasi tim marketing kamu dengan menjadi digital marketing consoultant",
      id: "4",
    },
    {
      title: "Video Editor ",
      image:
        "https://source.unsplash.com/black-flat-screen-tv-turned-on-displaying-game-B4f_Kx5jvpg",
      industry: "Kreatif",
      description: "Jago ngedit video? Jadi Video editor aja!",
      id: "5",
    },
    {
      title: "Pilot Drone",
      image:
        "https://source.unsplash.com/brown-and-black-wooden-table-U9vKDttdNLA",
      industry: "Teknologi",
      description: "Hobi main game console & pesawat? Jadi pilot drone yuk! ",
      id: "6",
    },
  ];

  //filter by industry
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const filterHandler = (industryName) => {
    // akan hit ke api untuk filter
    const data = jobs.filter((job) => job.industry === industryName);
    setSelected(data);
  };
  const resetFilter = () => {
    setSelected([]);
  };

  //if user not login set alert
  //akan cek dari api
  // alert
  const alert = {
    status: false,
    text: 'Silahkan login atau daftar akun terlebih dahulu.',
    button: {
      primary: "Login",
      primaryAction: () => {
        navigate('/login');
        dispatch(setStatus(false));
      },
      secondary: "Daftar sekarang",
      secondaryAction: () => {
        navigate('/register');
        // dispatch(setStatus(false));
      }
    }
  };

  return (
    <>
      <div>
        {status && (
          <Alert
            status={alert.status}
            text={alert.text}
            button={alert.button}
            closeBtn
          ></Alert>
        )}
      </div>
      {/* hero section */}
      <section className="mx-auto lg:mx-0 ">
          <div className="hero">
            <p className="heading1 black text-center">Pilihlah Pekerjaan Yang <br /> Kamu Minati!</p>
            <img className=" max-w-36" src="https://imgur.com/dEyAXJg.png" alt="hero-image"/>
          </div>
      </section>

      {/* section filter */}
      <section className="flex flex-col mx-8">
          <p className="flex justify-center lg:justify-start heading2">Pilihan Pekerjaan</p>
        <div className="buttonsSection">
          <div className="filterSearchButton">
            {/* search bar */}
            <div className="searchSection">
              <input
                className="searchInput"
                type="search"
                name="search"
                placeholder="Cari Berdasarkan Pekerjaan"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <button type="submit" className="searchBtn">
                <SearchLineIcon className="green"></SearchLineIcon>
              </button>
            </div>

            {/* dropdown industri */}
            <div>
              <button onClick={toggleDropdown} type="button" className="dropdownButton">
                {selected.length >  0 ? selected[0].industry : "Pilih Industri"}
                <ArrowDownSLineIcon className="arrowDropdown"/>
              </button>
              {isOpen && (
                <div className="dropdownOptions">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a key="reset" className="options" role="menuitem" onClick={() => resetFilter()}>
                      Pilih Industri
                    </a>
                    {industry.map((industry) => (
                      <a key={industry.id} className="options" role="menuitem" onClick={() => filterHandler(industry.name)}>
                        {industry.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 lg:mt-0">
            <ButtonRecommendation
              name={"Pekerjaan"}
              action={
                isRegistered
                  ? () => window.open("url", "_blank", "noreferrer")
                  : buttonHandler
              }
              padding="px-[1.2em] md:px-8"
            />
          </div>
        </div>
      </section>

      {/* section cards */}
      <section className="mt-10 mx-0 md:mx-8">
        <div className="cardSection">
          {selected.length > 0
            ? selected.map((val) => <CardJob job={val} key={val.id}></CardJob>)
            : jobs
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((val) => <CardJob job={val} key={val.id}></CardJob>)}
        </div>
      </section>
    </>
  );
}

export default JobPage;
