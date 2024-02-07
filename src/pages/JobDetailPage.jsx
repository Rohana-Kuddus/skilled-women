import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Introduction from "../components/Introduction"
import Roadmap from "../components/Roadmap"
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getClassRoadmap } from "../redux/slices/courseSlice";
import { getJobDetail } from "../redux/slices/jobSlice";
import { useParams } from "react-router-dom";
import "../styles/pages/JobDetailPage.css"

function JobDetailPage() {
  const [isActive, setIsActive] = useState('intro');
  const dispatch = useDispatch();
  const { job } = useSelector(state => state.job);
  const params = useParams();
  const id = params.id

  // ada masalah, kalau di refresh error 
  useEffect(() => {
    dispatch(getJobDetail(id))
  }, [])
  // console.log(job);

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  // dummy data supaya ngga error & contoh bentuk data pengenalan
  const data = {
    id: 1,
    title: 'Petani Hidroponik',
    image: 'https://dummyimage.com/400x400/000/fff.jpg&text=Introduction',
    description: 'ini deskripsi',
    percentage: '24%',
    percetageScope: 'IND',
    percentageLink: 'https://tailwindcss.com/docs/font-weight',
    industry: {
      name: 'Agrikultur',
      image: 'https://dummyimage.com/400x400/000/fff.jpg&text=Introduction'
    },
    income: 'Rp 7 Juta - Rp 20 Juta',
    incomeLink: 'https://tailwindcss.com/docs/font-weight',
    benefits: [
      {
        description: 'ini deskirpsi benefit 1',
        image: 'https://dummyimage.com/400x400/000/fff.jpg&text=Introduction'
      },
      {
        description: 'ini deskirpsi benefit 2',
        image: 'https://dummyimage.com/400x400/000/fff.jpg&text=Introduction'
      },
      {
        description: 'ini deskirpsi benefit 3',
        image: 'https://dummyimage.com/400x400/000/fff.jpg&text=Introduction'
      }
    ],
    video: 'https://www.youtube.com/embed/oHTySqyFlZQ?si=KO0b7X6bJ98uTmG-',
    figure: {
      name: 'jane doe',
      image: 'https://dummyimage.com/400x400/000/fff.jpg&text=Introduction',
      role: 'petani professional',
      description: 'ini cerita dia'
    },
    roadmapSummary: 'roadmap ini bertujuan untuk bla bla'
  };

  return ( 
    <div>
      {/* akan ditambah props data dari api */}
      {/* <Hero data={job}></Hero> */}

      {/* tab */}
      <div className="tabSection">
        <h3 className="tab" onClick={() => setIsActive('intro')}>Pengenalan</h3>
        <h3 className="tab" onClick={() => setIsActive('roadmap')}>Roadmap</h3>
      </div>

      {/* akan ditambah props data dari redux api */}
      {/* {isActive === 'intro' && <Introduction data={job} setIsActive={setIsActive}></Introduction>} */}
      {isActive === 'roadmap' && <Roadmap data={job}></Roadmap>}
    </div>
  );
}

export default JobDetailPage;