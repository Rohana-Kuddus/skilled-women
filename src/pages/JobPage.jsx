import SearchLineIcon from "remixicon-react/SearchLineIcon"
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon"
import ButtonRecommendation from "../components/ButtonRecommendation";
import { useState } from "react";

function JobPage() {
  const [open, setOpen] = useState(false);
  const Industry = ['Kreatif','Agrikultur' , 'Bisnis', 'Teknologi'];

  return ( 
    <div>

      {/* section filter */}
      <div className="flex flex-row justify-between">
        <div className="flex gap-4"> 

          {/* search bar */}
          <div className="pt-2 relative mx-auto green">
              <input className="border-2 border-gray-300 paragraph-regular black bg-white h-10 px-5 pr-16 rounded-md text-sm w-72 focus:outline-none"
                type="search" name="search" placeholder="Cari Berdasarkan Pekerjaan"/>
              <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
                <SearchLineIcon className="green"></SearchLineIcon>
              </button>
          </div>

          {/* dropdown industri */}
          <div className="relative pt-2 ">

            <button onClick={() => setOpen(!open)} className="inline-flex justify-start px-4 py-2 w-40 paragraph-regular bg-white border border-gray-300 rounded-md shadow-sm">
              <span className="mr-2 green">Pilih Industri</span>
              <ArrowDownSLineIcon className="green"></ArrowDownSLineIcon>
            </button>

            {open && (
                <div className=" bg-white p-4 w-40 shadow-lg">
                  <ul>
                    {
                      Industry.map((industry) => (
                        <li 
                          onClick={() => setOpen(false)}
                          className="p-2 paragraph-regular green cursor-pointer rounded-md hover:bg-green-800 hover:text-white" 
                          key={industry}>
                            {industry}
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )}

          </div>
        
        </div>

        <div className="basis-1/4 pt-2 ">
          <ButtonRecommendation name={'Pekerjaan'}></ButtonRecommendation>
        </div>
      </div> 

      {/* section cards */}
      <div>
        section cards
      </div>

    </div>
  );
}

export default JobPage;