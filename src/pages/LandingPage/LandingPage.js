import React, { useState } from "react"
import "./LandingPage.css"
import historyPush from "pages/HistoryPush/HistoryPush"
import bg from "../../assets/images/bg.jpg"

const LandingPage = () => {
  const [redirect, setRedirect] = useState(false)
  return (
    <div>
      <header className="hero-section" style={{ backgroundImage: `${bg}` }}>
        <div className="hero-container">
          <div className="hero-inner">
            <div className="hero-inner-text">
              <h1 className="hero-inner-title">
                Looking for <span className="text-focus">Employee?</span>
                <br /> <span className="text-focus">You </span>
                are at the right place.
              </h1>
              <div className="hero-inner-subtitle">
                <p>You know who you're looking for.</p>
                <p>We'll help you find them.</p>
              </div>
            </div>
            <div className="hero-inner-button">
              <button
                className=""
                type="button"
                onClick={() => setRedirect(true)}
              >
                Find a new employee
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="hero-cards">
        <div className="hero-card">
          <div className="hero-card-header">
            <h3>1</h3>
          </div>
          <div className="hero-card-body">
            <h4>Create your free account</h4>
            <p>
              All you need is your email address to create an account and start
              building your job post.
            </p>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-header">
            <h3>2</h3>
          </div>
          <div className="hero-card-body">
            <h4> Post your job</h4>
            <p>
              Then just fill your job requirements, and you're ready to go. one
              of our specialist will get in touch with you a few moments later
            </p>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-header">
            <h3>3</h3>
          </div>

          <div className="hero-card-body">
            <h4>Rate our service</h4>
            <p>
              After you find the desired talent, let’s us know how you find our
              service and what you would like for the future.
            </p>
          </div>
        </div>
      </div>

      <section className="features-section-main">
        <div className="hero-container">
          <div className="features-section-title">
            <h2>Save time and effort in your hiring journey.</h2>
            <p className="lead">
              Finding the best fit for the job shouldn’t be a full-time job.
              Indeed’s simple and powerful tools let you source, screen, and
              hire faster.
            </p>
          </div>
          <div className="feature-section-main">
            <div className="features-section-row">
              <div className="features-section-card">
                <div className="features-section-card-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="features-section-card-text">
                  <h4>Save time, save money</h4>
                  <p>Pay only when you find desired employee.</p>
                </div>
              </div>
              <div className="features-section-card">
                <div className="features-section-card-icon">
                  <i className="fal fa-award"></i>
                </div>
                <div className="features-section-card-text">
                  <h4>Find qualified candidates</h4>
                  <p>
                    we provide criminal records checks and background check.
                  </p>
                </div>
              </div>
            </div>
            <div className="features-section-row">
              <div className="features-section-card">
                <div className="features-section-card-icon">
                  <i className="fal fa-badge-check"></i>
                </div>
                <div className="features-section-card-text">
                  <h4>Dedicated service</h4>
                  <p> you will get assisted in all steps.</p>
                </div>
              </div>
              <div className="features-section-card">
                <div className="features-section-card-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="features-section-card-text">
                  <h4>You are part of something very big</h4>
                  <p>
                    by using our service, you provide job to one of million
                    woman in the world
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="features-section-footer">
            <div className="footer-button-main">
              <button className="features-section-footer-button" type="button">
                Get started
              </button>
            </div>
            <p className="features-section-footer-text">
              You control your posts 24/7—edit, add, pause, or close them
              whenever you want. Learn more about posting
            </p>
          </div>
        </div>
      </section>
      {redirect && historyPush("/login")}
    </div>
  )
}

export default LandingPage
