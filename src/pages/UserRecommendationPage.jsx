import React, { useEffect } from "react";
import SidebarProfile from "../components/SidebarProfile";
import CardClass from "../components/CardClass";
import ButtonRecommendation from "../components/ButtonRecommendation";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { deleteClass, getClassUser } from "../redux/slices/courseSlice";
import { useCookies } from "react-cookie";
import Alert from "../components/Alert";

function UserRecommendationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const { course } = useSelector(state => state.course);
  const { alert, alertName } = useSelector(state => state.alert);

  const alertObj = {
    status: false,
    text: `Tindakan ini tidak dapat dibatalkan <br> Apakah Anda yakin ingin menghapusnya?`,
    button: {
      primary: 'Hapus',
      primaryAction: () => {
        // dispatch(deleteClass(data.id));
        dispatch(setAlert({ alert: false, alertName: 'deleteClass' }));
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setAlert({ alert: false, alertName: 'deleteClass' }))
    }
  };

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getClassUser(cookies.token));
  }, [course]);

  return (
    <div>
      <div className="flex flex-row gap-12" style={{ fontFamily: "var(--paragraph-font)" }}>
        <SidebarProfile />

        <div className="green flex flex-col items-center mt-16">
          {course.map((i) => (
            <div key={i.id} className="mb-2">
              <CardClass data={i} editBtn={true}></CardClass>
            </div>
          ))}

          <ButtonRecommendation name="Kelas" padding="px-32" action={() => navigate('/recommendations')} />
        </div>
      </div>

      {alert && alertName === 'deleteClass' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}></Alert>}
    </div>
  );
}

export default UserRecommendationPage;