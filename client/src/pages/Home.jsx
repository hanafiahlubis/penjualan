import { useOutletContext } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Navigate, useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();
  if (user?.role === "Pengirim") {
    return (
      <>
        <Header />
        <h1>pengirim</h1>
        <Footer />
      </>
    );
  } else if (user?.role === "Penerima") {
    <Navigate to="/penerima" />;
  } else {
    return <Navigate to="/login" />;
  }
}
