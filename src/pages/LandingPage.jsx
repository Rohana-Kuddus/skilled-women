import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import CardJob from "../components/CardJob";
import { useState } from "react";

function LandingPage() {

  const Industry = ['Kreatif','Agrikultur' , 'Bisnis', 'Teknologi'];

  const [jobsData, setJobsData] = useState([
    {
      "title": "Graphic Designer",
      "image": "https://source.unsplash.com/tuned-on-macbook-CGpifH3FjOA",
      "industry": "Kreatif",
      "description": "Ciptakan kreasi desain art kamu secara digital!",
      "id": "1"
    },
    {
      "title": "Petani Hidroponik",
      "image": "https://source.unsplash.com/text-s_AgJxMc4zk",
      "industry": "Agrikultur",
      "description": "Cocok untuk kamu yang ingin membuka usaha tanaman hidroponik atau berkebun sendiri ~",
      "id": "2"
    },
    {
      "title": "Fotografer",
      "image": "https://source.unsplash.com/person-holding-canon-dslr-camera-hfk6xOjQlFk",
      "industry": "Kreatif",
      "description": "Hobi foto-foto atau suka fotoin temen kamu? Yuk belajar menjadi fotografer handal!",
      "id": "3"
    },
    // {
    //   "title": "Digital Marketing Consoultant",
    //   "image": "https://source.unsplash.com/person-writing-on-white-paper-U33fHryBYBU",
    //   "industry": "Bisnis",
    //   "description": "Bantu konsultasi tim marketing kamu dengan menjadi digital marketing consoultant",
    //   "id": "4"
    // },
    // {
    //   "title": "Video Editor ",
    //   "image": "https://source.unsplash.com/black-flat-screen-tv-turned-on-displaying-game-B4f_Kx5jvpg",
    //   "industry": "Kreatif",
    //   "description": "Jago ngedit video? Jadi Video editor aja!",
    //   "id": "5"
    // },
    // {
    //   "title": "Pilot Drone",
    //   "image": "https://source.unsplash.com/brown-and-black-wooden-table-U9vKDttdNLA",
    //   "industry": "Teknologi",
    //   "description": "Hobi main game console & pesawat? Jadi pilot drone yuk! ",
    //   "id": "6"
    // }
  ]);

  return (
    <>
      {/* Hero section */}

      <div className="bg-[#4F6C6A] text-[#FFF] flex ">
        <div>
          <h1 className="heading1">
            Ingin mempelajari keterampilan baru tetapi tidak tahu harus mulai
            dari mana?
          </h1>
          <p className="paragraph-reguler">
            Temukan panduan langkah demi langkah untuk mempelajari berbagai
            keterampilan dan memulai langkahmu menjadi seorang perempuan
            bertalenta!
          </p>

          <div className="">
            <button className="flex center my-3 rounded-lg bg-[#FFF] py-2 px-4 paragraph-regular green transition-all hover:opacity-95 focus:opacity-95 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none gap-1">
              Mulai jelajahi
              <ArrowRightLineIcon />
            </button>
          </div>
        </div>

        <div className="rounded-full">
          <img src="https://imgur.com/dEyAXJg.png" alt="" />
        </div>
      </div>

      {/* Hero section */}

      {/* Fitur info section */}

      <div className="heading1 green ">
        <h1 className="text-center">Berbagai Fitur di Skilled Women </h1>

        <div className="flex justify-center">
          <div>
            <div className="">
              <img src="https://imgur.com/dEyAXJg.png" alt="" />
              <h3 className="heading3">Roadmap</h3>
              <p className="paragraph-small ">
                Menyediakan roadmap yang bisa diikuti pengguna untuk <br />{" "}
                mempelajari keterampilan baru. Cocok bagi pemula untuk <br />{" "}
                mengetahui langkah demi langkah apa yang harus <br />{" "}
                dipelajari. Di setiap langkah menampilkan kursus yang <br />{" "}
                bersesuaian.
              </p>
            </div>

            <div className="">
              <img src="https://imgur.com/dEyAXJg.png" alt="" />
              <h3 className="heading3">Rekomendasi kursus </h3>
              <p className="paragraph-small ">
                Untuk setiap langkah proses pembelajaran menampilkaan <br />{" "}
                berbagai kursus dari penyedia berbeda, sehingga <br /> pengguna
                dapat menemukan yang paling sesuai dengan <br /> kebutuhan
                mereka.
              </p>
            </div>
          </div>

          <div>
            <div className="">
              <img src="https://imgur.com/dEyAXJg.png" alt="" />
              <h3 className="heading3">Informasi keterampilan</h3>
              <p className="paragraph-small ">
                Menyediakan informasi ringkas untuk perempuan yang <br /> ingin
                mempelajari keterampilan baru dan membantu <br /> perempuan
                mempelajari keterampilan baru dengan cepat <br /> dan efisien.
              </p>
            </div>

            <div className="">
              <img src="https://imgur.com/dEyAXJg.png" alt="" />
              <h3 className="heading3">Daftar pekerjaan</h3>
              <p className="paragraph-small ">
                Menampilkan pekerjaan atau keterampilan yang up-to-
                <br />
                date dan sedang dibutuhkan di berbagai industri yang bisa <br />{" "}
                dipelajari oleh perempuan.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Fitur info section */}

      {/* Benefit section */}

      <div className="bg-[#4F6C6A] text-[#fff]">
        <h1 className="heading1 text-center">
          Manfaat menggunakan Skilled Women{" "}
        </h1>

        <div className="flex justify-center">
          <img src="https://imgur.com/dEyAXJg.png" alt="" />

          <div className="heading2">
            <h2>Ketahui lebih banyak tentang pekerjaan yang kamu minati</h2>
            <p className="paragraph-regular">
              Kamu bisa mengakses berbagai informasi tentang <br /> pekerjaan
              yang diminati, mulai dari kelibihan dan <br /> kekurangannya,
              perkiraan gaji dan lain-lain. Kamu juga <br /> bisa mengetahui
              keterampilan apa saja yang perlu <br /> dipelajari melalui roadmap
              pekerjaan. selain itu di setiap <br /> langkah roadmap kamu bisa
              melihat daftar kursus online <br /> yang bersesuaian.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="heading2">
            <h2>
              Pelajari keterampilan-
              <br />
              keterampilan yang up-to-date
            </h2>
            <p className="paragraph-regular">
              Kamu bisa melihat berbagai macam pekerjaan di banyak <br />
              industri berbeda yang bisa kamu pelajari.
            </p>
          </div>
          <img src="https://imgur.com/dEyAXJg.png" alt="" />
        </div>
      </div>

      {/* Benefit section */}

      {/* Roadmap section */}

      <div className="green">
        <h1 className="text-center heading1">
          Roadmap Pekerjaan di Skilled Women{" "}
        </h1>

        <div className= "grid gap-y-15 grid-cols-2">
          <div>
            <h2 className="heading2">Roadmap pekerjaan untuk kamu!</h2>
            <p className="paragraph-regular">
              Pelajari Berbagai Alur Keterampilan dan <br /> langkah Langkah
              untuk Meningkatkan <br /> Keahlian kamu!
            </p>
            <ButtonPrimary buttonText="Lihat Semua" />
          </div>

          <div className="flex flex-row gap-6">
            {jobsData.map((job) => (
              <CardJob key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>

      {/* Geser list job -- belum bisa */}
      {/* <div>
        <button></button>
      </div> */}
    </>
  );
}

export default LandingPage;
