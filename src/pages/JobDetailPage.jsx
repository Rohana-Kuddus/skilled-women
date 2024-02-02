import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Introduction from "../components/Introduction"
import Roadmap from "../components/Roadmap"
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getClassRoadmap } from "../redux/slices/courseSlice";
import { getJobDetail } from "../redux/slices/jobSlice";
import { useParams } from "react-router-dom";

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

  return ( 
    <div>
      {/* akan ditambah props data dari api */}
      {/* <Hero data={job}></Hero> */}

      {/* tab */}
      <div>
        <h3 className="heading3 green" onClick={() => setIsActive('intro')}>Pengenalan</h3>
        <h3 className="heading3 green" onClick={() => setIsActive('roadmap')}>Roadmap</h3>

      </div>

      {/* akan ditambah props data dari redux api */}
      {/* {isActive === 'intro' && <Introduction data={job} setIsActive={setIsActive}></Introduction>} */}
      {isActive === 'roadmap' && <Roadmap data={job}></Roadmap>}
    </div>
  );
}

export default JobDetailPage;