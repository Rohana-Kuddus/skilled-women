import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Introduction from "../components/Introduction"
import Roadmap from "../components/Roadmap"
import { useDispatch } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import "../styles/pages/JobDetailPage.css"

function JobDetailPage() {
  const [isActive, setIsActive] = useState('intro');

  // dummy data supaya ngga error & contoh bentuk data pengenalan
  const data = {
    id: 1,
    title: 'Petani Hidroponik',
    image: '',
    description: 'ini deskripsi',
    percentage: '24%',
    percetageScope: 'IND',
    percentageLink: 'https://tailwindcss.com/docs/font-weight',
    industry: {
      name: 'Agrikultur',
      image: ''
    },
    income: 'Rp 7 Juta - Rp 20 Juta',
    incomeLink: 'https://tailwindcss.com/docs/font-weight',
    benefits: [
      {
        description: 'ini deskirpsi benefit 1',
        image: ''
      },
      {
        description: 'ini deskirpsi benefit 2',
        image: ''
      },
      {
        description: 'ini deskirpsi benefit 3',
        image: ''
      }
    ],
    video: 'https://www.youtube.com/embed/oHTySqyFlZQ?si=KO0b7X6bJ98uTmG-',
    figure: {
      name: 'jane doe',
      image: '',
      role: 'petani professional',
      description: 'ini cerita dia'
    },
    roadmapSummary: 'roadmap ini bertujuan untuk bla bla'
  };

  // reset footer's text + link
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  return ( 
    <div>
      {/* akan ditambah props data dari api */}
      <Hero data={data}></Hero>

      {/* tab */}
      <div className="tabSection">
        <h3 className="tab" onClick={() => setIsActive('intro')}>Pengenalan</h3>
        <h3 className="tab" onClick={() => setIsActive('roadmap')}>Roadmap</h3>
      </div>

      {/* akan ditambah props data dari redux api */}
      {isActive === 'intro' && <Introduction data={data} setIsActive={setIsActive}></Introduction>}
      {isActive === 'roadmap' && <Roadmap data={data}></Roadmap>}
    </div>
  );
}

export default JobDetailPage;