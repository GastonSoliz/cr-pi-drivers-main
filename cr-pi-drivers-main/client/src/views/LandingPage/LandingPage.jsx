import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>PRUEBA LANDING PAGE</h1>
      <Link to="/home">
        <button>HOME</button>
      </Link>
    </div>
  );
}
