import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Introduction from "../components/Introduction"
import Roadmap from "../components/Roadmap"
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getJobDetail } from "../redux/slices/jobSlice";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

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
          <div>
            <h3 className="heading3 green hover:cursor-pointer" onClick={() => setIsActive('intro')}>Pengenalan</h3>
            <h3 className="heading3 green hover:cursor-pointer" onClick={() => setIsActive('roadmap')}>Roadmap</h3>
          </div>

          {isActive === 'intro' && <Introduction data={jobDetail} setIsActive={setIsActive}></Introduction>}
          {isActive === 'roadmap' && <Roadmap data={jobDetail}></Roadmap>}
        </div>
        : <Loading></Loading>}
    </div>
  );
}

export default JobDetailPage;