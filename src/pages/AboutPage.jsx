import { useDispatch } from "react-redux";
import "../index.css";
import { useEffect } from "react";
import { setFooterAnchor } from "../redux/slices/footerSlice";

function AboutPage() {
  // reset footer's text + link
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);
  return (
    <>
      <div className="bg-[#4F6C6A] text-[#FFF] text-center p-10">
        <div className=" heading1 ">
          <h1>Tentang </h1>
          <h1>Skilled Women</h1>
        </div>
        <br />
        <div className="paragraph-regular">
          <p>
            Panduan langkah demi langkah untuk mempelajari berbagai keterampilan
            untuk
          </p>
          <p>
            membantu perempuan mengambil langkah awal dan menjadi perempuan
            bertalenta!
          </p>
        </div>
      </div>

      <div>
        <div className="p-32 flex gap-x-5">
          <div className="rounded-full">
            <img src="https://imgur.com/dEyAXJg.png" alt="" />{" "}
          </div>

          <div className="green ">
            <div>
              <h2 className="heading2">Apa sih Skilled Women itu?</h2>
            </div>
            <br />
            <div>
              <p className="paragraph-regular">
                Skilled Women adalah website yang menyediakan roadmap pekerjaan
                yang bisa membantu perempuan untuk mempelajari keterampilan
                baru. Memberikan perempuan informasi ringkas tentang
                keterampilan tersebut, serta petunjuk langkah demi langkah
                tentang apa yang harus dipelajari dan kursus yang terkait
                keterampilan tersebut.
              </p>
            </div>
          </div>
        </div>

        <div className="green text-center">
          <h2 className=" heading2">Kenalan dengan Anggota Tim Kami</h2><br/>

          <div className="flex paragraph-small justify-center">
            <div>
              <img
                className="rounded-full"
                src="https://imgur.com/dEyAXJg.png"
                alt=""
              />
              <p>Khalisa Syahba</p>
            </div>
            <div>
              <img
                className="rounded-full"
                src="https://imgur.com/dEyAXJg.png"
                alt=""
              />
              <p>Nur Inayah</p>
            </div>
            <div>
              <img
                className="rounded-full"
                src="https://imgur.com/dEyAXJg.png"
                alt=""
              />
              <p>Rizqi &apos;Amaliyyah</p>
            </div>
            <div>
              <img
                className="rounded-full"
                src="https://imgur.com/dEyAXJg.png"
                alt=""
              />
              <p>
                Gloriaza Yemima <br /> Lawrance Odyardy
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default AboutPage;
