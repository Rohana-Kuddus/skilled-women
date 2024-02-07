import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarProfile from "../components/SidebarProfile";
import CardClass from "../components/CardClass";
import ButtonRecommendation from "../components/ButtonRecommendation";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { useDispatch } from "react-redux";
import "../index.css";
import "../styles/pages/UserRecommendationPage.css"

function UserRecommendationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // dummy data
  const classData = {
    classes: [
      {
        id: 1,
        image: "https://dummyimage.com/400x400/000/fff.jpg&text=Class+Image",
        username: "janedoe3",
        name: "Introduction to Graphic Design 1",
        paid: true,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, culpa.",
        link: "https://course.com/course",
        rating: 4.5,
      },
      {
        id: 2,
        image: "https://dummyimage.com/400x400/000/fff.jpg&text=Class+Image",
        username: "janedoe3",
        name: "Introduction to Graphic Design 2",
        paid: false,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, culpa.",
        link: "https://course.com/course",
        rating: 4.3,
      },
    ],
  };

  // reset footer's text + link
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);
  

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
              {classData.classes.map((i) => (
                <div key={i.id} className="mb-2 w-full">
                  <CardClass data={i} editBtn={false}/>
                </div>
              ))}
            {/* button recommendation */}
            <div className="flex justify-center w-full">
              <ButtonRecommendation
                name="Kelas"
                padding="px-4 md:px-8 lg:px-[16.5em] xl:px-[24.5em]"
                action={() => navigate("/recommendations")}
              />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRecommendationPage;