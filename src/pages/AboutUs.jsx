import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">

     
      <div className="about-hero">
        <img
          src="/hero.jpg"
          alt="Clinic"
          className="hero-img"
        />
        <div className="hero-text">
          <h1>Our Commitment to Your Health</h1>
          <p>
            Dedicated to providing compassionate, comprehensive, and
            patient-centric care for every member of our community.
          </p>
        </div>
      </div>

     
      <section className="legacy">
        <h2>A Legacy of Care</h2>

        <div className="legacy-items">

          <div className="legacy-card">
            <h3>Clinic Founded – 2005</h3>
            <p>
              HealthClinic was established with a mission to provide accessible,
              high-quality healthcare to the local community.
            </p>
          </div>

          <div className="legacy-card">
            <h3>Expanded Services – 2012</h3>
            <p>
              We expanded our facilities to include cardiology,
              pediatrics, and more, expanding our team.
            </p>
          </div>

          <div className="legacy-card">
            <h3>Community Health Award – 2020</h3>
            <p>
              Recognized for our dedication to community wellness and
              innovative care programs.
            </p>
          </div>

        </div>
      </section>

      
      <section className="doctors">
        <h2>Meet Our Expert Doctors</h2>

        <div className="doctor-grid">

          <div className="doctor-card">
            <img src="/doctor1.png" alt="Dr Evelyn Reed" />
            <h3>Dr. Evelyn Reed</h3>
            <p>Cardiologist with 15+ years of experience.</p>
            <button>Learn More</button>
          </div>

          <div className="doctor-card">
            <img src="/doctor2.png" alt="Dr Ben Carter" />
            <h3>Dr. Ben Carter</h3>
            <p>Pediatric specialist providing compassionate care.</p>
            <button>Learn More</button>
          </div>

          <div className="doctor-card">
            <img src="/doctor3.png" alt="Dr Olivia Chen" />
            <h3>Dr. Olivia Chen</h3>
            <p>Dermatologist with expertise in advanced skincare.</p>
            <button>Learn More</button>
          </div>

        </div>
      </section>

      
      <section className="team">
        <h2>Our Caring Team</h2>

        <div className="team-grid">
          <div className="team-card"><img src="/team1.png" /><p>Maria Rodriguez – Head Nurse</p></div>
          <div className="team-card"><img src="/team2.png" /><p>David Kim – Lab Technician</p></div>
          <div className="team-card"><img src="/team3.png" /><p>Jessica Williams – Patient Coordinator</p></div>
          <div className="team-card"><img src="/team4.png" /><p>Tom Chen – Physical Therapist</p></div>
        </div>
      </section>

    
      <div className="cta">
        <h2>Ready to Meet Us?</h2>
        <p>Schedule your appointment today...</p>
        <button>Schedule Your Appointment</button>
      </div>

    </div>
  );
};

export default AboutUs;
