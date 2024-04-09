import React from "react";
import "./index.css";
import { Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo1.png";
import { FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { FaPhoneFlip } from "react-icons/fa6";

const quick_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/support",
    display: "Support",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const quick_links2 = [
  {
    path: "/recent_workplaces",
    display: "Workplaces",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer">
        <div className="footerRow">
          <Col lg="3">
            <div className="logo">
              <div className="footerLogo">
              <img src={logo} alt="" />
              <h1>IntegraAlly</h1>
              </div>
              
              <p>
              IntegraAllay is a cutting-edge server designed to revolutionize integration testing for front-end developers. 
              </p>

              <div className="social_links">
                <span>
                  <Link to="#">
                    <FaYoutube />
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <FaGithub />
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <FaFacebook />
                  </Link>
                </span>
                <span>
                  <Link to="#">
                    <FaInstagramSquare />
                  </Link>
                </span>
              </div>

            </div>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Discover</h5>

            <ListGroup className="footer_quick-links">
              {quick_links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Quick Links</h5>

            <ListGroup className="footer_quick-links">
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer_link-title">Contact</h5>

            <ListGroup className="footer_quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="details">
                  <span>
                    <MdLocalPostOffice />
                  </span>
                  Address:
                </h6>

                <p className="details">Belihuloya, Balangoda</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="details">
                  <span>
                    <IoMail />
                  </span>
                  Email:
                </h6>

                <p className="details">info@integraAlly.com</p>
              </ListGroupItem>
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="details">
                  <span>
                    <FaPhoneFlip />
                  </span>
                  Phone:
                </h6>
                <p className="details">+941122565</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          </div>
          <Col lg='12' className="text-center">
            <p className="copyright">Copyrights {year} All rights reserved</p>
          </Col>
      </div>
    </footer>
  );
};

export default Footer;