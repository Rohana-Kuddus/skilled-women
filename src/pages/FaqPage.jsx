import React, { useState, useEffect } from "react";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { useDispatch } from "react-redux";
import "../styles/pages/FaqPage.css"
import "../index.css";

function FaqPage() {
  const dispatch = useDispatch();

  // resize icon
  const useDeviceWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleScreenResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleScreenResize);
      return () => window.removeEventListener("resize", handleScreenResize);
    }, []);
    return width;
  };

  const deviceWidth = useDeviceWidth();
  let iconSize;
  if (deviceWidth <= 245) {
    iconSize = "64px";
  }

  // reset footer's text + link
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  return (
    <>
      <div class="flex flex-col align-center">
        {/* HERO */}
        <div className="faqHero" style={{ backgroundColor: "var(--primary-color)" }}>
          <h1 className="text-center text-4xl font-bold my-6" style={{ fontFamily: "var(--heading-font)" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontFamily: "var(--paragraph-font)" }}>
            Pertanyaan-pertanyaan yang sering ditanyakan dan perlu kalian
            ketahui jawabannya mengenai Skilled Women
          </p>
        </div>
        {/* QUESTION & ANSWER SECTIONS */}
        <div className="faqSection">
          <div className="faqDropdown group" tabindex="1">
            <div className="faqDropdownSection">
              <span className="heading3"> Apa itu Skilled Women? </span>
              <ArrowRightSLineIcon
                className="faqTransitionContent"
                style={{
                  height: iconSize,
                  minWidth: "24px",
                }}
              />
            </div>
            <div className="faqContent">
              Skilled Women adalah website yang menyediakan roadmap pekerjaan
              yang bisa membantu perempuan mempelajari keterampilan baru dengan
              memberi informasi ringkas serta petunjuk langkah demi langkah
              tentang apa yang harus dipelajari dan kursus terkait keterampilan
              tersebut.
            </div>
          </div>

          <div className="faqDropdown group" tabindex="2">
            <div className="faqDropdownSection">
              <span className="heading3">
                Apa saja fitur yang dimiliki Skilled Women?
              </span>
              <ArrowRightSLineIcon
                className="faqTransitionContent"
                style={{
                  height: iconSize,
                  minWidth: "24px",
                }}
              />
            </div>
            <div className="faqContent">
              Skilled Women memiliki fitur card-card pekerjaan yang dapat
              difilter berdasarkan industri beserta detail mengenai pengenalan
              dan informasi lainnya mengenai pekerjaan tersebut lalu ada fitur
              roadmap untuk melihat langkah-langkah menguasai keterampilan
              sesuai pekerjaan tersebut yang dilengkapi kursus-kursus atau kelas
              dari setiap langkah dalam roadmap.
            </div>
          </div>

          <div className="faqDropdown group" tabindex="3">
            <div className="faqDropdownSection">
              <span className="heading3">
                Bagaimana saya bisa mengakses kelas dari pekerjaan yang dipilih?
              </span>
              <ArrowRightSLineIcon
                className="faqTransitionContent"
                style={{
                  height: iconSize,
                  minWidth: "24px",
                }}
              />
            </div>
            <div className="faqContent">
              Cara mengakses kelas dengan piilh pekerjaan dan klik tombol "Lihat
              Detail" pekerjaan tersebut lalu pilih tab "Roadmap" atau kamu bisa
              klik tombol "Ketahui langkah-langkahnya" setelah video pengenalan
              pekerjaan. Akses kelas dengan klik bagian langkah-langkah
              keterampilan yang ingin kamu pelajari.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FaqPage;