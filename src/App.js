import React from "react";
import "./App.css";

function App() {
  return (
    <div className="about-page">

     
      <section className="hero">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Our Commitment to Your Health</h1>
          <p>
            Dedicated to providing compassionate, comprehensive, and patient-centric
            care for every member of our community.
          </p>
        </div>
      </section>

      
      <section className="legacy">
        <h2>A Legacy of Care</h2>

        <div className="timeline">
          <div className="item">
            <h4>Clinic Founded</h4>
            <span>2005</span>
            <p>
              HealthClinic was established with a mission to provide accessible,
              high-quality healthcare to the local community.
            </p>
          </div>

          <div className="item">
            <h4>Expanded Services</h4>
            <span>2012</span>
            <p>
              We expanded our facilities to specialized departments for cardiology
              and pediatrics, welcoming new experts to our team.
            </p>
          </div>

          <div className="item">
            <h4>Community Health Award</h4>
            <span>2021</span>
            <p>
              Recognized for our dedication to community wellness and innovative care programs.
            </p>
          </div>
        </div>
      </section>

      
      <section className="doctors">
        <h2>Meet Our Expert Doctors</h2>

        <div className="cards">
          <div className="card">
            <img src="https://via.placeholder.com/260x180?text=Doctor+1" alt="Doctor" />
            <h3>Dr. Evelyn Reed</h3>
            <p className="role">Cardiologist</p>
            <p>Leading expert with over 15 years in cardiovascular care.</p>
            <button>Learn More</button>
          </div>

          <div className="card">
            <img src="https://via.placeholder.com/260x180?text=Doctor+2" alt="Doctor" />
            <h3>Dr. Ben Carter</h3>
            <p className="role">Pediatrician</p>
            <p>Dedicated to compassionate care for children.</p>
            <button>Learn More</button>
          </div>

          <div className="card">
            <img src="https://via.placeholder.com/260x180?text=Doctor+3" alt="Doctor" />
            <h3>Dr. Olivia Chen</h3>
            <p className="role">Dermatologist</p>
            <p>
              Specializes in medical and cosmetic dermatology.
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </section>

      
      <section className="team">
        <h2>Our Caring Team</h2>

        <div className="team-list">
          <div className="team-item">
            <img src="https://via.placeholder.com/180x180?text=Team+1" alt="" />
            <h4>Maria Rodriguez</h4>
            <p>Head Nurse</p>
          </div>

          <div className="team-item">
            <img src="https://via.placeholder.com/180x180?text=Team+2" alt="" />
            <h4>David Kim</h4>
            <p>Lab Technician</p>
          </div>

          <div className="team-item">
            <img src="https://via.placeholder.com/180x180?text=Team+3" alt="" />
            <h4>Jessica Williams</h4>
            <p>Patient Coordinator</p>
          </div>

          <div className="team-item">
            <img src="https://via.placeholder.com/180x180?text=Team+4" alt="" />
            <h4>Tom Chen</h4>
            <p>Physical Therapist</p>
          </div>
        </div>
      </section>

      
      <section className="cta">
        <h2>Ready to Meet Us?</h2>
        <p>
          Schedule your appointment today and take the first step towards better health.
        </p>
        <button>Schedule Your Appointment</button>
      </section>

    </div>
  );
}

export default App;
