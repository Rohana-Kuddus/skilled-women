import CloseLineIcon from "remixicon-react/CloseLineIcon"
import ButtonRecommendation from "./ButtonRecommendation"
import { useNavigate } from "react-router"
import CardClass from "./CardClass"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getClassRoadmap } from "../redux/slices/courseSlice"

function SidebarClass({ data, setIsOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector(state => state.course);
  const params = useParams();

  useEffect(() => {
    dispatch(getClassRoadmap(params.id, data.id));
  }, [course]);

  return ( 
    <div>
      <div>
        <h1 className="heading1 green">Pilihan Kelas</h1>
        {/* perlu tambah error handling keluar alet kalau user belum login klik */}
        <CloseLineIcon color="#1E292B" onClick={() => setIsOpen(false)}></CloseLineIcon>
      </div>

      <div>
        <div>
          <h3 className="heading3 green font-bold">{data.name}</h3>
          <ButtonRecommendation name={'Kelas'} action={() => navigate('/recommendations')}></ButtonRecommendation>
        </div>

        <div>
          {course.map(v => (
            <div key={v.id}>
              <CardClass data={v} editBtn={false}></CardClass>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SidebarClass.propTypes = {
  data: PropTypes.object,
  setIsOpen: PropTypes.func
}

export default SidebarClass;