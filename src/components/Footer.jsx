import React from "react";
import DiscordFillIcon from "remixicon-react/DiscordFillIcon"
import TwitterFillIcon from "remixicon-react/TwitterFillIcon"
import Logo from "../assets/logo.svg"
import { useSelector } from "react-redux";
import "../styles/components/Footer.css"

function Footer() {
  const { text, link } = useSelector(state => state.footer);

  return (
    <>
      <footer className="bg-white">
          <div className="footer-container">
                  <div>
                      <img src={Logo} alt="" className="max-w-64"/> 
                      <div> 
                        <p className="paragraph-regular green">Copyright © 2023 Skilled Women</p>
                        <p className="paragraph-regular green">All Rights Reserved</p>
                        <a href={link} className="paragraph-regular green">{text}</a>
                      </div>
                  </div>
                  <div>
                      <div className="grid place-items-start mt-5">
                      <p className="heading3 green">Contact Us</p>
                        <p className="paragraph-regular green underline">skilledwomen@gmail.com</p>
                        <p className="paragraph-regular green">+62 8123 4567 8901</p>
                        <p className="paragraph-regular green">Jl Mawar No C XIV/123, Jakarta</p>
                      </div>
                  </div>
                  <div>
                      <div className="grid place-items-start mt-5 ">
                      <p className="heading3 green">Follow Us</p>
                        <TwitterFillIcon className="green"></TwitterFillIcon>
                        <DiscordFillIcon className="green"></DiscordFillIcon>
                      </div>
                  </div>
          </div>
      </footer>
    </>
  );
}

export default Footer;