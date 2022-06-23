import { Link } from "react-router-dom";
import "./landingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="linkButton">
        <Link to="/home">
          <button className="button">Ir a la página principal</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
