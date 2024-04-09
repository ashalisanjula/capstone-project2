import React from 'react';
import Navbar from '../../Components/NavBar';
import icon1 from '../../Assets/a.jpeg'; 
import icon2 from '../../Assets/b.jpeg'; 
import icon3 from '../../Assets/c.jpeg'; 
import icon4 from '../../Assets/d.jpg'; 
import icon5 from '../../Assets/e.jpeg';
import logo2 from "../../Assets/logo2.png";
import './index.css';

const About = () => {

  const featureBoxesContainer = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  };

  const featureBoxStyle = {
    border: '1px solid #ddd',
    color: 'white',
    padding: '15px',
    margin: '5px',
    borderRadius: '50%', // Change from 100% to 50%
    backgroundColor: '#090E2E',
    textAlign: 'center',
    fontSize: '8px',
    fontWeight: 'bold',
    width: '210px',
    height: '210px', // Increase height to match width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the content
  };

  const iconStyle = {
    width: '80%', // Adjust the width as needed
    height: 'auto',
    margin: '8px',
    borderRadius: '50%', // Add border radius to make the image circular
  };

  const logoStyle2 = {
    width: '10%',
    height: 'auto',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
    alignContent: 'center'

  };
  

  return (
    <div>
      <Navbar />


              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={logo2}
            alt="IntegraAllay Logo - Mock-Ready Integration Server"
            style={{ ...logoStyle2, alignContent: 'center' }}
          />
        </div>

                
      <div className="title-section1">
        <h2 className="title">About IntegraAllay</h2>
        <p>IntegraAllay is a cutting-edge server designed to revolutionize integration testing for front-end developers. 
  Our platform empowers developers to create mock back-end services, simulate API responses, 
  and thoroughly test their front-end applications.
  In situations where the actual back-end is under development, undergoing maintenance, or simply not available for testing, 
  IntegraAllay steps in as a reliable solution.

</p>
      </div>


      <div className="title-section3">
        <h3 className="title">Pioneering Features for Front-End Developers</h3>
        <p>
          At IntegraAllay, we are committed to transparency, innovation, and customer satisfaction. Our team collaborates seamlessly to deliver features that cater to the evolving needs of front-end developers. We believe in continuous improvement, and your feedback is invaluable in shaping the future of our platform.
        </p>
      </div>

      <div className="title-section2">
        <h2 className="title">Meet the IntegraAllay Team</h2>
        <p>We are a dedicated group of second-year undergraduates embarking on an exciting journey with our capstone project, IntegraAllay. Our team is passionate about reshaping the landscape of front-end integration testing, driven by a collective vision to empower developers with innovative tools.
As students at Sabaragamuwa University, we bring a fresh perspective and enthusiasm to the field of software development. IntegraAllay is not just a capstone project for us; it's a commitment to excellence and a testament to our dedication to the craft.
Currently, in our second year, we recognize the challenges faced by front-end developers in dealing with integration testing and aim to provide effective solutions through our platform. Our collaborative efforts have laid the foundation for a unique approach to integration testing, with a focus on user-centric design and seamless solutions.
We see this capstone project as a stepping stone for future endeavors. As we continue to develop and refine IntegraAllay, our aspirations extend beyond the academic realm. We envision a more official and refined version of our platform, contributing meaningfully to the world of front-end development.
Together, we look forward to a future where IntegraAllay becomes an integral part of the developer's toolkit.

</p>
      </div>

      <div style={featureBoxesContainer}>
        <div style={featureBoxStyle}>
          <img src={icon1} alt="User-Created Collections Icon" style={iconStyle} />
          <p>W.P.D.I.Perera
            dinethperera@gmailcom
          </p>
        </div>
        <div style={featureBoxStyle}>
          <img src={icon2} alt="User-Created Collections Icon" style={iconStyle} />
          <p>Front-End Testing without a Functional Back-End</p>
        </div>
        <div style={featureBoxStyle}>
          <img src={icon3} alt="User-Created Collections Icon" style={iconStyle} />
          <p>Extensive Request Validation</p>
        </div>
        <div style={featureBoxStyle}>
          <img src={icon4} alt="User-Created Collections Icon" style={iconStyle} />
          <p>W.P.T.Navodya Pathiranage
            ttharushipathiranage@gmail.com
          </p>
        </div>
        <div style={featureBoxStyle}>
          <img src={icon5} alt="User-Created Collections Icon" style={iconStyle} />
          <p>Efficient and Confident Development</p>
        </div>
      </div>




      <div className="vision-section">
        <h3 className="title">Our Vision</h3>
        <p>
          As a team, we share a common vision to empower front-end developers with tools that enhance their testing capabilities, irrespective of the challenges posed by back-end dependencies. We believe in fostering a collaborative and dynamic environment that fuels creativity, innovation, and a relentless pursuit of excellence.
        </p>
      </div>

      <div className="commitment-section">
        <h3 className="title">Our Commitment</h3>
        <p>
          At IntegraAllay, we are committed to transparency, innovation, and customer satisfaction. Our team collaborates seamlessly to deliver features that cater to the evolving needs of front-end developers. We believe in continuous improvement, and your feedback is invaluable in shaping the future of our platform.
        </p>
      </div>

      <div className="join-us-section">
        <div>
          <h3 className="title">Join Us on the Journey</h3>
          <p>
            Curious about the faces behind IntegraAllay? Connect with us on social media, follow our blog, and stay updated on the latest developments. We're excited to have you join us on this journey of revolutionizing front-end integration testing.
          </p>
        </div>
        <div className="social-media-links">
        <button className="buttonStyle" onClick={() => window.location.href = "https://twitter.com"}>Follow Us on Twitter</button>
        <button className="buttonStyle" onClick={() => window.location.href = "https://linkedin.com"}>Connect on LinkedIn</button>
        <button className="buttonStyle" onClick={() => window.location.href = "https://blog.example.com"}>Read Our Blog</button>
      </div>

    </div>
    </div>
  );
};

export default About;
