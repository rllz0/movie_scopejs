import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <header className="about-header">
          <h1>About MovieScope</h1>
          <p className="about-subtitle">
            Your ultimate movie discovery platform
          </p>
        </header>

        <div className="about-content">
          <section className="about-section">
            <h2>What is MovieScope?</h2>
            <p>
              MovieScope is a modern movie discovery application that helps you
              explore, search movies. Built with React and powered by The Movie
              Database (TMDB) API, it provides a seamless experience for movie
              enthusiasts.
            </p>
          </section>

          <section className="about-section">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🎬 Movie Categories</h3>
                <p>
                  Browse movies by categories like Now Playing, Popular, Top
                  Rated, and Upcoming.
                </p>
              </div>
              <div className="feature-card">
                <h3>🔍 Smart Search</h3>
                <p>
                  Search for movies with debounced input and paginated results
                  for better performance.
                </p>
              </div>
              <div className="feature-card">
                <h3>📱 Responsive Design</h3>
                <p>
                  Enjoy a seamless experience across all devices with our
                  responsive design.
                </p>
              </div>
              <div className="feature-card">
                <h3>⚡ Fast Loading</h3>
                <p>
                  Optimized with skeleton loaders and efficient API calls for
                  smooth browsing.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <strong>Frontend:</strong> React, React Router, Custom Hooks
              </div>
              <div className="tech-item">
                <strong>API:</strong> The Movie Database (TMDB) API
              </div>
              <div className="tech-item">
                <strong>Styling:</strong> CSS3, Responsive Design
              </div>
              <div className="tech-item">
                <strong>Performance:</strong> Debouncing, Pagination, Request
                Cancellation
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Data Source</h2>
            <p>
              All movie data, images, and information are provided by{" "}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="tmdb-link"
              >
                The Movie Database (TMDB)
              </a>
              . This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </p>
          </section>

          <section className="about-section">
            <h2>Developer</h2>
            <p>
              MovieScope was built as a learning project to demonstrate modern
              React development practices including custom hooks, routing, API
              integration, and responsive design.
            </p>
          </section>
        </div>

        <div className="about-actions">
          <Link to="/" className="back-home-btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
