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

function CardClass({ data, editBtn = false, imgScale = "object-cover", imgWidth = "w-32", imgHeight ="h-auto" }) {
  const navigate = useNavigate();
  const [active, setActive] = useState('none');

  // activate alert
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);

  const alert = {
    status: false,
    text: `Tindakan ini tidak dapat dibatalkan <br> Apakah Anda yakin ingin menghapusnya?`,
    button: {
      primary: 'Hapus',
      primaryAction: () => { // akan diubah dengan hit api delete
        console.log('kelas berhasil dihapus');
        dispatch(setStatus(false));
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setStatus(false))
    }
  };

  const likeHandler = () => {
    if (active === 'none') {
      return setActive('like');
    };

    if (active === 'like') {
      return setActive('none');
    };

    if (active === 'dislike') {
      return setActive('like');
    };
  };

  const dislikeHandler = () => {
    if (active === 'none') {
      return setActive('dislike');
    };

    if (active === 'dislike') {
      return setActive('none');
    };

    if (active === 'like') {
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
          <p className="paragraph-regular dark">{data.title}</p>
          <div>
            <p className="paragraph-small dark">{data.paid ? 'Berbayar' : 'Gratis'}</p>
          </div>
          <p className="paragraph-small dark">{data.description}</p>

          {/* buttons */}
          <div className="card-content flex flex-row justify-between items-center gap-2">
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
                <ButtonPrimary buttonText={'Edit'} onClick={() => navigate('/recommendations')} padding="px-8"></ButtonPrimary>
                <ButtonSecondary name={'Hapus'} action={() => dispatch(setStatus(true))} padding="px-7" height="h-10"></ButtonSecondary>
                </div>
              }
          </div>
        </div>
      </div>

      {status && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </div>
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