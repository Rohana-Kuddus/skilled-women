import "../index.css";
import Footer from "../components/Footer";
import ButtonPrimary from "../components/ButtonPrimary";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import CardJob from "../components/CardJob";
// import CardJob

// const LandingPage = () => {
function LandingPage() {
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

          {/* <ButtonPrimary
            buttonText="Mulai jelajahi"
            backgroundColor="#fff"
            textColor="#4F6C6A"
          /> */}
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

        <h2 className="heading2">Roadmap pekerjaan untuk kamu!</h2>
        <p className="paragraph-regular">
          Pelajari Berbagai Alur Keterampilan dan <br /> langkah Langkah untuk
          Meningkatkan <br /> Keahlian kamu!
        </p>
        <ButtonPrimary buttonText="Lihat Semua" />
      </div>

      <div>
        <CardJob />
        <CardJob />
        <CardJob />
      </div>

      <Footer></Footer>
    </>
  );
}

export default LandingPage;
