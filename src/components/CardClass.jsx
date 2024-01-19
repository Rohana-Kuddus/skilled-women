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

function CardClass({ data, editBtn = false }) {
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
      <div>
        {/* default icon untuk kelas tanpa image */}
        <img src={data.image ? data.image : 'https://cdn-icons-png.flaticon.com/128/9257/9257182.png'} alt="kelas" />

        <div>
          <p className="paragraph-small green font-bold">{data.username !== '' ? data.username : ''}</p>
          <p className="paragraph-regular dark">{data.name}</p>
          <div>
            <div className="dot"></div>
            <p className="paragraph-small dark">{data.paid ? 'Berbayar' : 'Gratis'}</p>
          </div>
          <p className="paragraph-small dark">{data.description}</p>

          <div>
            {/* akan ditambah error handling jika user klik sebelum login */}
            <div>
              {/* hit api ketika di klik untuk tambah rating */}
              <div onClick={likeHandler}>
                {active === 'none' || active !== 'like' ? 
                  <ThumbUpLineIcon></ThumbUpLineIcon> : <ThumbUpFillIcon></ThumbUpFillIcon>}
              </div>
              <p className="paragraph-regular green">{data.rating}</p>
              <div onClick={dislikeHandler}>
                {active === 'none' || active !== 'dislike' ? 
                  <ThumbDownLineIcon></ThumbDownLineIcon> : <ThumbDownFillIcon></ThumbDownFillIcon>}
              </div>
            </div>

            {!editBtn ?
              <ButtonPrimary text={'Lihat Kelas'} action={() => window.open(`${data.link}`, '_blank', 'noreferrer')}></ButtonPrimary>
              : <div>
                <ButtonPrimary text={'Edit'} action={() => navigate('/recommendations')}></ButtonPrimary>
                <ButtonSecondary text={'Hapus'} action={() => dispatch(setStatus(true))}></ButtonSecondary>
              </div>}
          </div>
        </div>
      </div>

      {status && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </div>
  );
}

CardClass.propTypes = {
  data: PropTypes.object,
  editBtn: PropTypes.bool
}

export default CardClass;