import React from "react"
import "./LandingPage.css"
import { useHistory } from "react-router-dom"

const LandingPage = () => {
  const history = useHistory()
  return (
    <div>
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-inner">
            <div className="hero-inner-text">
              <h1 className="hero-inner-title">
                Let's <span className="text-focus">make</span> your next great{" "}
                <span className="text-focus">hire.</span> <em>Fast.</em>
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
                onClick={() => history.push("/login")}
              >
                Post a job
              </button>
            </div>
          </div>
          <div className="hero-cards">
            <div className="hero-card">
              <div className="hero-card-header">
                <i className="far fa-edit"></i>
              </div>
              <div className="hero-card-body">
                <h4>Create your free account</h4>
                <p>
                  All you need is your email address to create an account and
                  start building your job post.
                </p>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-header">
                <i className="far fa-clipboard"></i>
              </div>
              <div className="hero-card-body">
                <h4> Build your job post</h4>
                <p>
                  Then just add a title, description, and location to your job
                  post, and you're ready to go.
                </p>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-card-header">
                <i class="fal fa-money-check-edit"></i>
              </div>

              <div className="hero-card-body">
                <h4>Post your job</h4>
                <p>
                  After you post your job use our state of the art tools to help
                  you find dream talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
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
                  <h4>Get more visibility</h4>
                  <p>
                    Sponsor your job to ensure it gets seen by the right people.
                  </p>
                </div>
              </div>
              <div className="features-section-card">
                <div className="features-section-card-icon">
                  <i className="fal fa-award"></i>
                </div>
                <div className="features-section-card-text">
                  <h4>Find quality applicants</h4>
                  <p>
                    List your required skills for the job so relevant candidates
                    apply.
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
                  <h4>Get more visibility</h4>
                  <p>
                    Sponsor your job to ensure it gets seen by the right people.
                  </p>
                </div>
              </div>
              <div className="features-section-card">
                <div className="features-section-card-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="features-section-card-text">
                  <h4>Organize your candidates</h4>
                  <p>
                    View and sort resumes, send messages, and schedule
                    interviews—all on Indeed.
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
    </div>
  )
}

export default LandingPage
