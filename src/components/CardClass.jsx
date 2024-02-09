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
import { useCookies } from "react-cookie"

function CardClass({ data, editBtn = false, imgScale = "object-cover", imgSize = "size-40", setId, setVote }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const [active, setActive] = useState('none');

  const checkToken = Object.keys(cookies).length !== 0; // check if user loggedin

  const likeHandler = () => {
    if (active === 'none') {
      setVote({ id: data.id, vote: true });
      return setActive('like');
    };

    if (active === 'like') {
      setVote({ id: data.id, vote: false });
      return setActive('none');
    };

    if (active === 'dislike') {
      setVote({ id: data.id, vote: true });
      return setActive('like');
    };
  };

  const dislikeHandler = () => {
    if (active === 'none' && data.rating !== 0) {
      setVote({ id: data.id, vote: false });
      return setActive('dislike');
    };

    if (active === 'dislike') {
      setVote({ id: data.id, vote: true });
      return setActive('none');
    };

    if (active === 'like') {
      setVote({ id: data.id, vote: false });
      return setActive('dislike');
    };
  };

  return (
    <div>
      <div className="cardContainer">
        <img src={data.image ? data.image : 'https://cdn-icons-png.flaticon.com/128/9257/9257182.png'} alt="kelas" className={` ${imgScale} ${imgSize} rounded-s-md`} />

        <div className="card flex flex-col mr-4 py-4 gap-[0.20rem]">
          <p className="paragraph-small green font-bold">{data.username !== '' ? data.username : ''}</p>
          <p className="paragraph-regular dark">{data.name}</p>
          <div>
            <p className="paragraph-small dark">{data.paid ? 'Berbayar' : 'Gratis'}</p>
          </div>
          <p className="paragraph-small dark">{data.description}</p>

          {/* buttons */}
          <div className="reqBtn">
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
  setId: PropTypes.func,
  setVote: PropTypes.func
}

export default CardClass;