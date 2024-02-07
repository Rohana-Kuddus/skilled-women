import ThumbUpLineIcon from "remixicon-react/ThumbUpLineIcon"
import ThumbUpFillIcon from "remixicon-react/ThumbUpFillIcon"
import ThumbDownLineIcon from "remixicon-react/ThumbDownLineIcon"
import ThumbDownFillIcon from "remixicon-react/ThumbDownFillIcon"
import ButtonPrimary from "./ButtonPrimary"
import ButtonSecondary from "./ButtonSecondary"
import { useNavigate } from "react-router-dom"
import Alert from "./Alert"
import { useDispatch, useSelector } from "react-redux"
import { setStatus } from "../redux/slices/alertSlice"
import { useState } from "react"
import PropTypes from "prop-types"
import "../styles/components/CardClass.css"
import { deleteClass, voteClass } from "../redux/slices/courseSlice"

function CardClass({ data, editBtn = false, imgScale = "object-cover", imgSize = "size-40" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState('none');
  const { status } = useSelector(state => state.alert);

  const alert = {
    status: false,
    text: `Tindakan ini tidak dapat dibatalkan <br> Apakah Anda yakin ingin menghapusnya?`,
    button: {
      primary: 'Hapus',
      primaryAction: () => {
        dispatch(deleteClass(data.id));
        dispatch(setStatus(false));
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setStatus(false))
    }
  };

  // dummy token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huZG9lQGVtYWlsLmNvbSIsImlhdCI6MTcwNjc0ODg0NX0.HDhf3ah9l5abgcoRIdF_G6yK8UVJ7_ddmFYuwVf88Qg';
  const likeHandler = () => {
    if (active === 'none') {
      dispatch(voteClass(token, data.id, true));
      return setActive('like');
    };

    if (active === 'like') {
      return setActive('none');
    };

    if (active === 'dislike') {
      dispatch(voteClass(token, data.id, true));
      return setActive('like');
    };
  };

  const dislikeHandler = () => {
    if (active === 'none') {
      dispatch(voteClass(token, data.id, false));
      return setActive('dislike');
    };

    if (active === 'dislike') {
      return setActive('none');
    };

    if (active === 'like') {
      dispatch(voteClass(token, data.id, false));
      return setActive('dislike');
    };
  };

  return (
    <>
      <div className="cardContainer">
        {/* default icon untuk kelas tanpa image */}
        <img src={data.image ? data.image : 'https://cdn-icons-png.flaticon.com/128/9257/9257182.png'} alt="kelas" className={` ${imgScale} ${imgSize} rounded-s-md`}/>

        <div className="card flex flex-col mr-4 w-full py-4">
          <p className="paragraph-small green font-bold">{data.username !== '' ? data.username : ''}</p>
          <p className="paragraph-regular dark">{data.name}</p>
          <div>
            <p className="paragraph-small dark">{data.paid ? 'Berbayar' : 'Gratis'}</p>
          </div>
          <p className="paragraph-small dark">{data.description}</p>

          {/* buttons */}
          <div className="reqBtn">
            {/* akan ditambah error handling jika user klik sebelum login */}
            <div className="grid grid-cols-3 gap-2">
              {/* hit api ketika di klik untuk tambah rating */}
              <div onClick={likeHandler}>
                {active === 'none' || active !== 'like' ? 
                  <ThumbUpLineIcon color="#4F6C6A"></ThumbUpLineIcon> : <ThumbUpFillIcon color="#4F6C6A"></ThumbUpFillIcon>}
              </div>
              <p className="paragraph-regular green">{data.rating}</p>
              <div onClick={dislikeHandler}>
                {active === 'none' || active !== 'dislike' ? 
                  <ThumbDownLineIcon color="#4F6C6A"></ThumbDownLineIcon> : <ThumbDownFillIcon color="#4F6C6A"></ThumbDownFillIcon>}
              </div>
            </div>

            {!editBtn ?
              <ButtonPrimary buttonText={'Lihat Kelas'} onClick={() => window.open(`${data.link}`, '_blank', 'noreferrer')}></ButtonPrimary>
              : <div className="flex flex-row items-center gap-2">
                <ButtonPrimary buttonText={'Edit'} onClick={() => navigate('/recommendations', { state: { classId: data.id } })} padding="px-8"></ButtonPrimary>
                <ButtonSecondary name={'Hapus'} action={() => dispatch(setStatus(true))} padding="px-7" height="h-10"></ButtonSecondary>
                </div>
              }
          </div>
        </div>
      </div>

      {status && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </>
  );
}

CardClass.propTypes = {
  data: PropTypes.object,
  editBtn: PropTypes.bool,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
  imgScale: PropTypes.string,
}

export default CardClass;