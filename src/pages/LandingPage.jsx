import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import CardJob from "../components/CardJob";
import { useEffect } from "react";
import "../styles/pages/LandingPage.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { useNavigate } from "react-router-dom";
import { getJobList } from "../redux/slices/jobSlice";
import "../styles/pages/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { job } = useSelector(state => state.job);

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getJobList({ limit: 4 }));
  }, []);

  return (
    <div className="flex flex-col justify-center">
      {/* Hero section */}
      <div className="hero m-0">
        <div className="div-1 flex-initial md:w-2/4">
          <div className="div-2">
            <h1 className="div-h1">
              Ingin mempelajari keterampilan baru tetapi tidak tahu harus mulai
              dari mana?
            </h1>
          </div>
          <p className="div-paragraph">
            Temukan panduan langkah demi langkah untuk mempelajari berbagai
            keterampilan dan memulai langkahmu menjadi seorang perempuan
            bertalenta!
          </p>
          <div className="div-3">
            <a href="#fitur" className="div-button">
              Mulai Jelajahi
              <ArrowRightLineIcon className="div-arrowright" />
            </a>
          </div>
        </div>

        <div className="">
          <img src="https://imgur.com/wp3X00G.png" alt="img" className="div-imgHero" />
        </div>
      </div>

      {/* Fitur section */}
      <div className="fitur" id="fitur">
        <div className="fitur-h1">
          <h1>Berbagai Fitur di Skilled Women</h1>
        </div>

        <div className="fitur-list">
          <div className="fitur-roadmap">
            <div className="fitur-roadmap-img">
              <img src="https://imgur.com/ADp6mRl.png" alt="fitur1" />
            </div>
            <div className="fitur-roadmap-h3">
              <h3>Roadmap</h3>
            </div>
            <div className="paragraph-regular text-[#4F6C6A]">
              <p>
                Menyediakan roadmap yang bisa diikuti pengguna untuk mempelajari
                keterampilan baru. Cocok bagi pemula untuk mengetahui langkah
                demi langkah apa yang harus dipelajari. Di setiap langkah
                menampilkan kursus yang bersesuaian.
              </p>
            </div>
          </div>

          <div className="fitur-info">
            <div className="fitur-info-img">
              <img src="https://imgur.com/EehpzFZ.png" alt="fitur1" />
            </div>
            <div className="fitur-info-h3">
              <h3>Informasi keterampilan</h3>
            </div>
            <div className="fitur-info-p">
              <p>
                Menyediakan informasi ringkas untuk perempuan yang ingin
                mempelajari keterampilan baru dan membantu perempuan mempelajari
                keterampilan baru dengan cepat dan efisien.
              </p>
            </div>
          </div>

          <div className="fitur-rekomendasi">
            <div className="fitur-rekomendasi-img">
              <img src="https://imgur.com/gaOVDIu.png" alt="fitur1" />
            </div>
            <div className="fitur-rekomendasi-h3">
              <h3>Rekomendasi kursus</h3>
            </div>
            <div className="fitur-rekomendasi-p">
              <p>
                Untuk setiap langkah proses pembelajaran menampilkaan berbagai
                kursus dari penyedia berbeda, sehingga pengguna dapat menemukan
                yang paling sesuai dengan kebutuhan mereka.
              </p>
            </div>
          </div>

          <div className="fitur-daftar">
            <div className="fitur-daftar-img">
              <img src="https://imgur.com/pgxsPLj.png" alt="fitur1" />
            </div>
            <div className="fitur-daftar-h3">
              <h3>Daftar pekerjaan</h3>
            </div>
            <div className="fitur-daftar-p">
              <p>
                Menampilkan pekerjaan atau keterampilan yang up-to-date dan
                sedang dibutuhkan di berbagai industri yang bisa dipelajari oleh
                perempuan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefit section */}
      <div className="benefit">
        <h1 className="benefit-h1">Manfaat menggunakan Skilled Women</h1>

        <div className="benefit-1">
          <div className="benefit-1-img">
            <img src="https://imgur.com/889iW6i.png" alt="img" />
          </div>

          <div className="benefit-1-konten">
            <h2 className="benefit-h2">Ketahui lebih banyak tentang pekerjaan yang kamu minati</h2>
            <p className="benefit-p">
              Kamu bisa mengakses berbagai informasi tentang pekerjaan yang
              diminati, mulai dari kelibihan dan kekurangannya, perkiraan gaji
              dan lain-lain. Kamu juga bisa mengetahui keterampilan apa saja
              yang perlu dipelajari melalui roadmap pekerjaan. Selain itu di
              setiap langkah roadmap kamu bisa melihat daftar kursus online
              yang bersesuaian.
            </p>
          </div>
        </div>

        <div className="benefit-2">
          <div className="benefit-2-konten">
            <h2 className="benefit-h2">Pelajari keterampilan-keterampilan yang up-to-date</h2>
            <p className="benefit-p">
              Kamu bisa melihat berbagai macam pekerjaan di banyak industri
              berbeda yang bisa kamu pelajari.
            </p>
          </div>
          <div className="benefit-2-img">
            <img src="https://imgur.com/r7joNG1.png" alt="img" />
          </div>
        </div>
      </div>

      {/* Roadmap section */}
      <div className="roadmap">
        <div className="roadmap-h1">
          <h1>Roadmap Pekerjaan di Skilled Women</h1>
        </div>

        <div className="roadmap-list sm:flex items-center">
          <div className="roadmap-konten">
            <div className="roadmap-text">
              <h2 className="roadmap-h2-p paragraph-reguler justify-text">
                Roadmap pekerjaan untuk kamu!
              </h2>
              <p>
                Pelajari Berbagai Alur Keterampilan dan langkah Langkah untuk
                meningkatkan Keahlian kamu!
              </p>
            </div>

            <ButtonPrimary buttonText="Lihat Semua" onClick={() => navigate('/jobs')} />
          </div>

          <div className="m-auto">
            <Swiper
              breakpoints={{
                340: {
                  slidesPerView: 1,
                  spaceBetween: 15
                },
                700: {
                  slidesPerView: 3,
                  spaceBetween: 15
                }
              }}

              pagination={{
                clickable: true
              }}

              navigation
              modules={[Navigation, Pagination]}
              className="max-w-[16rem] sm:max-w-[36rem] md:max-w-[46rem] lg:max-w-[60rem]"
            >
              {
                job.map((val) => (
                  <SwiperSlide key={val.id}>
                    <div>
                      <CardJob job={val}></CardJob>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
