import React, { useEffect } from "react";
import SidebarProfile from "../components/SidebarProfile";
import CardClass from "../components/CardClass";
import ButtonRecommendation from "../components/ButtonRecommendation";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getClassUser } from "../redux/slices/courseSlice";

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
        className="flex flex-row gap-12"
        style={{ fontFamily: "var(--paragraph-font)" }}
      >
        {/* sidebar */}
        <div>
          <SidebarProfile />
        </div>
        {/* user's class recommendation (card) */}
        <div className="green flex flex-col items-center mt-16">
          {course.map((i) => (
            <div key={i.id} className="mb-2">
              <CardClass data={i} editBtn={true}></CardClass>
            </div>
          ))}
          {/* button recommendation */}
          <div>
            <ButtonRecommendation
              name="Kelas"
              padding="px-32"
              action={() => navigate('/recommendations')}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRecommendationPage;