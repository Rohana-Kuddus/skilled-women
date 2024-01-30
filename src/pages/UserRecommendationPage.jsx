import React from "react";

import SidebarProfile from "../components/SidebarProfile";
import CardClass from "../components/CardClass";
import ButtonRecommendation from "../components/ButtonRecommendation";

import { useNavigate } from "react-router-dom";

import "../index.css";

function UserRecommendationPage() {
  const navigate = useNavigate();
  // dummy data
  const classData = [
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
  ];

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
        <div className="green mt-6 flex flex-col align-middle justify-center">
          {classData.map((i) => (
            <div key={i.id} className="mb-2">
              <CardClass data={i} editBtn={true}></CardClass>
            </div>
          ))}
          {/* button recommendation */}
          <div>
            <ButtonRecommendation
              name="Kelas"
              padding="px-4"
              action={() => navigate("/recommendations")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRecommendationPage;