import React from "react";
import  ArrowRightSLineIcon  from 'remixicon-react/ArrowRightSLineIcon';
import "../index.css";

function FaqPage() {
  return (
    <>
      <div class="flex flex-col align-center">
        {/* HERO */}
        <div className="text-white text-center text-balance py-16 px-2"
        style={{backgroundColor:"var(--primary-color)"}}
        >
          <h1 className="text-center text-4xl font-bold my-6"
            style={{fontFamily:"var(--heading-font)"}}
          >
            Frequently Asked Questions
          </h1>
          <p style={{fontFamily:"var(--paragraph-font)"}}>Pertanyaan-pertanyaan yang sering ditanyakan dan perlu kalian ketahui jawabannya mengenai Skilled Women</p>
        </div>
        {/* QUESTION & ANSWER SECTIONS */}
        <div className="my-12 mx-40 space-y-2">
          <div
            className="group flex flex-col gap-2 bg-white dark p-5 border-2 border-gray-300 rounded-md"
            tabindex="1"
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className="heading3"> Apa itu Skilled Women? </span>
              <ArrowRightSLineIcon className="h-8 transition-all duration-500 group-focus:-rotate-90"/>
            </div>
            <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 paragraph-regular font-extralight">
              SKilled Women adalah website yang menyediakan roadmap pekerjaan yang bisa membantu perempuan mempelajari keterampilan baru dengan memberikan informasi ringkas serta petunjuk langkah demi langkah tentang apa yang harus dipelajari dan kursus yang terkait keterampilan tersebut.
            </div>
          </div>

          <div
            className="group flex flex-col gap-2 bg-white dark p-5 border-2 border-gray-300 rounded-md"
            tabindex="2"
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className="heading3"> Apa saja fitur yang dimiliki Skilled Women? </span>
              <ArrowRightSLineIcon className="h-8 transition-all duration-500 group-focus:-rotate-90"/>
            </div>
            <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 paragraph-regular font-extralight">
              Skilled Women memiliki fitur card-card pekerjaan yang dapat difilter berdasarkan industri beserta detail mengenai pengenalan dan informasi lainnya mengenai pekerjaan tersebut lalu ada fitur roadmap untuk melihat langkah-langkah untuk menguasai keterampilan sesuai pekerjaan tersebut dilengkapi kursus-kursus atau kelas dari setiap langkah dalam roadmap.
            </div>
          </div>

          <div
            className="group flex flex-col gap-2 bg-white dark p-5 border-2 border-gray-300 rounded-md"
            tabindex="3"
          >
            <div className="flex cursor-pointer items-center justify-between">
              <span className="heading3"> Bagaimana saya bisa mengakses kelas dari pekerjaan yang dipilih? </span>
              <ArrowRightSLineIcon className="h-8 transition-all duration-500 group-focus:-rotate-90"/>
            </div>
            <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000 paragraph-regular font-extralight">
              Cara mengakses kelas dari pekerjaan yang telah kamu pilih dapat melalui halaman detail pekerjaan di tab "Roadmap" atau kamu bisa klik tombol "Ketahui langkah-langkahnya" setelah video pengenalan pekerjaan. Akses kelas dengan klik bagian langkah-langkah keterampilan yang ingin kamu pelajari.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FaqPage;