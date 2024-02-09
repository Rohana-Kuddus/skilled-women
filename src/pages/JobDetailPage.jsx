import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Introduction from "../components/Introduction";
import Roadmap from "../components/Roadmap";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getJobDetail } from "../redux/slices/jobSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import "../styles/pages/JobDetailPage.css";

function JobDetailPage() {
  const dispatch = useDispatch();
  const { jobDetail } = useSelector(state => state.job);
  const [isActive, setIsActive] = useState('intro');
  const params = useParams();

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getJobDetail(params.id));
  }, [jobDetail]);

  return (
    <div>
      {Object.keys(jobDetail).length !== 0 ?
        <div>
          {<Hero data={jobDetail}></Hero>}
        
          {/* tab */}
          <div className="container-job tabSection">
            <h3 className="tab" onClick={() => setIsActive('intro')}>Pengenalan</h3>
            <h3 className="tab" onClick={() => setIsActive('roadmap')}>Roadmap</h3>
          </div>

          <div className="container-job ">
            {isActive === 'intro' && <Introduction data={jobDetail} setIsActive={setIsActive}></Introduction>}
            {isActive === 'roadmap' && <Roadmap data={jobDetail}></Roadmap>}
          </div>
        </div>
        : <Loading></Loading>}
    </div>
  );
}

export default JobDetailPage;