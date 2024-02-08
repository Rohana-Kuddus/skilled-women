import React, { useEffect, useState } from "react";
import SidebarProfile from "../components/SidebarProfile";
import CardClass from "../components/CardClass";
import ButtonRecommendation from "../components/ButtonRecommendation";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { deleteClass, getClassUser, voteClass } from "../redux/slices/courseSlice";
import { useCookies } from "react-cookie";
import Alert from "../components/Alert";
import { getToast } from "../redux/slices/toastSlice";
import Toast from "../components/Toast";
import { setAlert } from "../redux/slices/alertSlice";
import { getUserProfile } from "../redux/slices/userSlice";

function UserRecommendationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { course } = useSelector(state => state.course);
  const { alert, alertName } = useSelector(state => state.alert);
  const { toast, toastName } = useSelector(state => state.toast);
  const { courseMessage } = useSelector(state => state.course);
  const [id, setId] = useState();
  const [vote, setVote] = useState({});

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getClassUser(cookies.token));
    dispatch(getUserProfile(cookies.token));
  }, [course]);

  useEffect(() => {
    if (Object.keys(vote).length !== 0) {
      const payload = {
        token: cookies.token,
        classId: vote.id,
        vote: vote.vote
      };
      dispatch(voteClass(payload));

      if (!courseMessage.includes('Get')) {
        dispatch(getToast({ toast: true, toastName: 'voteClass'}));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'voteClass'}));
        }, 3000);
      };
    };
  }, [vote]);

  const alertObj = {
    status: false,
    text: `Tindakan ini tidak dapat dibatalkan <br> Apakah Anda yakin ingin menghapusnya?`,
    button: {
      primary: 'Hapus',
      primaryAction: () => {
        dispatch(deleteClass({ token: cookies.token, classId: id }));

        if (!courseMessage.includes('Get')) {
          dispatch(getToast({ toast: true, toastName: 'deleteClass'}));

          setTimeout(() => {
            dispatch(getToast({ toast: false, toastName: 'deleteClass'}));
          }, 3000);
        };
        dispatch(setAlert({ alert: false, alertName: 'deleteClass' }));
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setAlert({ alert: false, alertName: 'deleteClass' }))
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-12" style={{ fontFamily: "var(--paragraph-font)" }}>
        <SidebarProfile></SidebarProfile>

        <div className="green flex flex-col items-center mt-16">
          {course.map((v, i) => (
            <div key={i} className="mb-2">
              <CardClass data={v} editBtn={true} setId={setId} setVote={setVote}></CardClass>
            </div>
          ))}

          <ButtonRecommendation name="Kelas" padding="px-32" action={() => navigate('/recommendations')} />
        </div>
        </div>

      {alert && alertName === 'deleteClass' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}></Alert>}
      {toast && toastName === 'deleteClass' && <Toast message={courseMessage}></Toast>}
      {toast && toastName === 'voteClass' && <Toast message={courseMessage}></Toast>}
    </div>
  );
}

export default UserRecommendationPage;