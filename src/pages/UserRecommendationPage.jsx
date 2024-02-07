import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarProfile from "../components/SidebarProfile";
import CardClass from "../components/CardClass";
import ButtonRecommendation from "../components/ButtonRecommendation";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getClassUser } from "../redux/slices/courseSlice";
import "../index.css";
import "../styles/pages/UserRecommendationPage.css"

function UserRecommendationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector(state => state.course);

  // dummy token
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJqb2huZG9lQGVtYWlsLmNvbSIsImlhdCI6MTcwNjc0ODg0NX0.HDhf3ah9l5abgcoRIdF_G6yK8UVJ7_ddmFYuwVf88Qg';
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getClassUser(token));
  }, [course]);

  return (
    <>
      <div
        className="flex flex-row"
        style={{ fontFamily: "var(--paragraph-font)" }}
      >
        {/* sidebar */}
          <SidebarProfile/>
        {/* user's class recommendation (card) */}
        <div className="reqCard">
          {course.map((i) => (
            <div key={i.id} className="mb-2 w-full">
              <CardClass data={i} editBtn={true}></CardClass>
            </div>
          ))}
          {/* button recommendation */}
          <div className="flex justify-center w-full">
            <ButtonRecommendation
              name="Kelas"
              padding="px-4 md:px-8 lg:px-[16.5em] xl:px-[24.5em]"
              action={() => navigate('/recommendations')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRecommendationPage;