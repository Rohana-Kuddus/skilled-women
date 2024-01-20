import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

function CardJob({ job }) {
  const navigate = useNavigate();

  return (
    <div>
      <div class="max-w-45 mx-auto">

        <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-80">
          <a href="#">
            <img class="rounded-t-lg" src={job.image} alt="" />
          </a>
          <div class="p-5">
            <p className="paragraph-regular black text-md">
              {job.industry}
            </p>
            <p className="heading2 black font-bold text-md">
              {job.title}
            </p>
            <p className="paragraph-regular green text-md max-w-60">
              {job.description}
            </p>

            <ButtonPrimary buttonText="Lihat Detail" onClick={() => navigate(`/jobs/${job.id}`)}></ButtonPrimary>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CardJob;