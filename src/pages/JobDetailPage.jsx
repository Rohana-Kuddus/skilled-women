import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Introduction from "../components/Introduction"
import Roadmap from "../components/Roadmap"
import { useDispatch } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getClassRoadmap } from "../redux/slices/courseSlice";

function JobDetailPage() {
  const [isActive, setIsActive] = useState('intro');
  const dispatch = useDispatch();

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
      <Hero data={data}></Hero>

      {/* tab */}
      <div>
        <h3 className="heading3 green" onClick={() => setIsActive('intro')}>Pengenalan</h3>
        <h3 className="heading3 green" onClick={() => setIsActive('roadmap')}>Roadmap</h3>
      </div>

      {/* akan ditambah props data dari redux api */}
      {isActive === 'intro' && <Introduction data={data} setIsActive={setIsActive}></Introduction>}
      {isActive === 'roadmap' && <Roadmap data={data}></Roadmap>}
    </div>
  );
}

export default JobDetailPage;