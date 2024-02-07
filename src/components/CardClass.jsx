import ThumbUpLineIcon from "remixicon-react/ThumbUpLineIcon"
import ThumbUpFillIcon from "remixicon-react/ThumbUpFillIcon"
import ThumbDownLineIcon from "remixicon-react/ThumbDownLineIcon"
import ThumbDownFillIcon from "remixicon-react/ThumbDownFillIcon"
import ButtonPrimary from "./ButtonPrimary"
import ButtonSecondary from "./ButtonSecondary"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAlert } from "../redux/slices/alertSlice"
import { useState } from "react"
import PropTypes from "prop-types"
import "../styles/components/CardClass.css"
import { voteClass } from "../redux/slices/courseSlice"
import { useCookies } from "react-cookie"

function CardClass({ data, editBtn = false, imgScale = "object-cover", imgWidth = "w-32", imgHeight ="h-auto", setId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const [active, setActive] = useState('none');
  
  const checkToken = Object.keys(cookies).length !== 0; // check if user loggedin

  // vote payload
  const payload = {
    token: cookies.token,
    classId: data.id
  };

  const likeHandler = () => {
    if (active === 'none') {
      payload.vote = true;
      dispatch(voteClass(payload));
      return setActive('like');
    };

    if (active === 'like') {
      return setActive('none');
    };

    if (active === 'dislike') {
      payload.vote = true;
      dispatch(voteClass(payload));
      return setActive('like');
    };
  };

  const dislikeHandler = () => {
    if (active === 'none') {
      payload.vote = false;
      dispatch(voteClass(payload));
      return setActive('dislike');
    };

    if (active === 'dislike') {
      return setActive('none');
    };

    if (active === 'like') {
      payload.vote = false;
      dispatch(voteClass(payload));
      return setActive('dislike');
    };
  };

  return (
    <div>
      <div className="container flex flex-row gap-4 items-center border-2 rounded-md mb-4 w-full">
        {/* default icon untuk kelas tanpa image */}
        <img src={data.image ? data.image : 'https://cdn-icons-png.flaticon.com/128/9257/9257182.png'} alt="kelas" className={`${imgScale} ${imgWidth} ${imgHeight} rounded-s-md`}/>

        <div className="card flex flex-col mr-4">
          <p className="paragraph-small green font-bold">{data.username !== '' ? data.username : ''}</p>
          <p className="paragraph-regular dark">{data.name}</p>
          <div>
            <p className="paragraph-small dark">{data.paid ? 'Berbayar' : 'Gratis'}</p>
          </div>
          <p className="paragraph-small dark">{data.description}</p>

          {/* buttons */}
          <div className="card-content flex flex-row justify-between items-center gap-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="hover:cursor-pointer" onClick={checkToken ? likeHandler 
                  : () => dispatch(setAlert({ alert: true, alertName: 'class' }))}>
                {active === 'none' || active !== 'like' ? 
                  <ThumbUpLineIcon color="#4F6C6A"></ThumbUpLineIcon> : <ThumbUpFillIcon color="#4F6C6A"></ThumbUpFillIcon>}
              </div>
              <p className="paragraph-regular green">{data.rating}</p>
              <div className="hover:cursor-pointer" onClick={checkToken ? dislikeHandler 
                  : () => dispatch(setAlert({ alert: true, alertName: 'class' }))}>
                {active === 'none' || active !== 'dislike' ? 
                  <ThumbDownLineIcon color="#4F6C6A"></ThumbDownLineIcon> : <ThumbDownFillIcon color="#4F6C6A"></ThumbDownFillIcon>}
              </div>
            </div>

            {!editBtn ?
              <ButtonPrimary buttonText={'Lihat Kelas'} onClick={() => window.open(`${data.link}`, '_blank', 'noreferrer')}></ButtonPrimary>
              : <div className="flex flex-row items-center gap-2">
                <ButtonPrimary buttonText={'Edit'} onClick={() => navigate('/recommendations', { state: { classId: data.id } })} padding="px-8"></ButtonPrimary>
                <ButtonSecondary name={'Hapus'} action={() => {
                  setId(data.id);
                  dispatch(setAlert({ alert: true, alertName: 'deleteClass' }));
                }} padding="px-7" height="h-10"></ButtonSecondary>
                </div>
              }
          </div>
        </div>
      </div>
    </div>
  );
}

CardClass.propTypes = {
  data: PropTypes.object,
  editBtn: PropTypes.bool,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
  imgScale: PropTypes.string,
  setId: PropTypes.func
}

export default CardClass;