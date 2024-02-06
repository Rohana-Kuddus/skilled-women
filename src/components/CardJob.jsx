import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import "../styles/components/CardJob.css"

function CardJob({ job }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-68 mx-auto">
      <div className="shadow-md border-2 border-gray-200 rounded-3xl max-w-80">
        <img
          className="card-img rounded-t-3xl w-full h-48 object-cover"
          src={job.image}
        />
        <div className="flex flex-col justify-between p-5 h-72">
          <div>
            <p className="paragraph-regular black">{job.industry}</p>
            <p className="heading2 black font-bold text-balance">{job.title}</p>
            <p className="paragraph-regular green text-left desc">
              {job.description}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ButtonPrimary buttonText="Lihat Detail" onClick={() => navigate(`/jobs/${job.id}`)} 
              padding="px-16 lg:px-24" className="primaryBtn"></ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardJob;
