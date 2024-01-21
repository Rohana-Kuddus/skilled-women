import SearchLineIcon from "remixicon-react/SearchLineIcon"
import ButtonRecommendation from "../components/ButtonRecommendation";
import { useState } from "react";
import CardJob from "../components/CardJob";

function JobPage() {
  const Industry = [
      {
        "id": 1 ,
        "name": "Kreatif"
      },
      {
        "id": 2 ,
        "name": "Agrikultur"
      },
      {
        "id": 3 ,
        "name": "Bisnis"
      },
      {
        "id": 4 ,
        "name": "Teknologi"
      }
  ];

  const jobs = [
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
    {
      "title": "Digital Marketing Consoultant",
      "image": "https://source.unsplash.com/person-writing-on-white-paper-U33fHryBYBU",
      "industry": "Bisnis",
      "description": "Bantu konsultasi tim marketing kamu dengan menjadi digital marketing consoultant",
      "id": "4"
    },
    {
      "title": "Video Editor ",
      "image": "https://source.unsplash.com/black-flat-screen-tv-turned-on-displaying-game-B4f_Kx5jvpg",
      "industry": "Kreatif",
      "description": "Jago ngedit video? Jadi Video editor aja!",
      "id": "5"
    },
    {
      "title": "Pilot Drone",
      "image": "https://source.unsplash.com/brown-and-black-wooden-table-U9vKDttdNLA",
      "industry": "Teknologi",
      "description": "Hobi main game console & pesawat? Jadi pilot drone yuk! ",
      "id": "6"
    }
  ]


  //filter by search
  const [searchTerm, setSearchTerm] = useState("")

  //filter by industry
  const [selected, setSelected] = useState([])

  const filterHandler = (e) => {
      //akan hit api pekerjaan sesuai industry id
      const data = jobs.filter(val => val.industry === e.target.value)
      setSelected(data)
    }

  return ( 
    <div>

      {/* section filter */}
      <section className=" px-7">
        <div className="flex flex-row justify-between">
          <div className="flex gap-4"> 

            {/* search bar */}
            <div className="pt-2 relative mx-auto green">
                <input className="border-2 border-gray-300 paragraph-regular black bg-white h-10 px-5 pr-16 rounded-md text-sm w-72 focus:outline-none"
                  type="search" name="search" placeholder="Cari Berdasarkan Pekerjaan"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}/>
                <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
                  <SearchLineIcon className="green"></SearchLineIcon>
                </button>
            </div>

            {/* dropdown industri */}
            <div className="relative pt-2 ">

            <select onChange={filterHandler} name="jobIndustry" className="inline-flex justify-start px-4 py-2 w-40 paragraph-regular bg-white border border-gray-300 rounded-md shadow-sm">
              <option value="Pilih Industri">Pilih Industri</option>
                {
                  Industry.map((industry) => {
                   return <option value={industry.name} key={industry.id}>{industry.name}</option>
                  })
                }
              </select>

            </div>
          
          </div>

          <div className="basis-1/4 pt-2 ">
            <ButtonRecommendation name={'Pekerjaan'}></ButtonRecommendation>
          </div>
        </div> 
      </section>
      
      {/* section cards */}
      <section className="  px-7">
        <div className="container mt-10">
          
          <div className="flex flex-wrap -mx-4 gap-4">
            { 
            
              selected.length > 0 ? 

                selected.map((val) => (
                  <CardJob job={val} key={val.id}></CardJob>
                ))

                : 
                
                jobs
                .filter((val) => {
                  if(searchTerm == "") {
                    return val;
                  } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                  }
                })
                
                .map((val) => (
                  
                  <CardJob job={val} key={val.id}></CardJob>
                ))
              
            }
          </div>
        </div>
      </section>

    </div>
  );
}

export default JobPage;