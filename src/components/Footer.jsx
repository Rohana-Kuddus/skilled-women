import DiscordFillIcon from "remixicon-react/DiscordFillIcon"
import TwitterFillIcon from "remixicon-react/TwitterFillIcon"
import Logo from "../assets/logo.svg"

function Footer() {
  return ( 
    <div>
      <footer className="bg-white">
          <div className="container px-6 py-12 mx-auto">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                  <div className="sm:col-span-2">
                      <img src={Logo} alt="" className="max-w-64"/> 

                      <div className=" mt-3 pl-2"> 
                        <p className="paragraph-regular green">Copyright © 2023 Skilled Women</p>
                        <p className="paragraph-regular green">All Rights Reserved</p>
                      </div>
                  </div>

                  <div>
                      <p className="heading3 green">Contact Us</p>

                      <div className="flex flex-col items-start mt-5 space-y-2">
                        <p className="paragraph-regular green underline">skilledwomen@gmail.com</p>
                        <p className="paragraph-regular green">+62 8123 4567 8901</p>
                        <p className="paragraph-regular green">Jl Mawar No C XIV/123, Jakarta</p>
                      </div>
                  </div>

                  <div>
                      <p className="heading3 green">Follow Us</p>

                      <div className="flex items-start mt-5 space-x-4">
                        <TwitterFillIcon className="green"></TwitterFillIcon>
                        <DiscordFillIcon className="green"></DiscordFillIcon>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
    </div>
  );
}

export default Footer;