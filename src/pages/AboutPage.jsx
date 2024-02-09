import { useDispatch } from "react-redux";
import "../index.css";
import { useEffect } from "react";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import "../styles/pages/AboutPage.css";

function AboutPage() {
  // reset footer's text + link
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  const teamMembers = [
    { name: "Khalisa Syahba", image: "https://i.imgur.com/Sa8YLTr.png" },
    { name: "Nur Inayah", image: "https://i.imgur.com/EcdTiHU.png" },
    { name: "Rizqi 'Amaliyyah", image: "https://i.imgur.com/djCaUJp.png" },
    {
      name: "Gloriaza Y. L. Odyardy",
      image: "https://i.imgur.com/QeantAe.jpeg",
    },
  ];

  return (
    <>
      {/* About hero */}
      <div className="about-hero">
        <div className="about-hero-h1">
          <h1>
            Tentang <br /> Skilled Women
          </h1>
        </div>
        <br />
        <div className="paragraph-regular">
          <p>
            Panduan langkah demi langkah untuk mempelajari berbagai keterampilan
            untuk <br /> membantu perempuan mengambil langkah awal dan menjadi
            perempuan bertalenta!
          </p>
        </div>
      </div>

      {/* Apa itu skilled women? */}
      <div className="apa-itu">
        <div className="apa-itu-img">
          <img src="https://imgur.com/sdIleH7.png" alt="about-logo" />
        </div>

        <div className="apa-itu-konten">
          <div>
            <h2 className="heading2">Apa sih Skilled Women itu?</h2>
          </div>
          <div>
            <p className="paragraph-regular">
              Skilled Women adalah website yang menyediakan roadmap pekerjaan
              yang bisa membantu perempuan untuk mempelajari keterampilan baru.
              Memberikan perempuan informasi ringkas tentang keterampilan
              tersebut, serta petunjuk langkah demi langkah tentang apa yang
              harus dipelajari dan kursus yang terkait keterampilan tersebut.
            </p>
          </div>
        </div>
      </div>

      {/* Kenalan anggota */}

      <div className="kenalan">
        <div>
          <h2 className="heading2 mb-4">Kenalan dengan Anggota Tim Kami</h2>
        </div>

        <div className="daftar-anggota">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col justify-center">
              <img
                className="img-anggota"
                src={member.image}
                alt={member.name}
              />
              <p className="mt-2">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutPage;
