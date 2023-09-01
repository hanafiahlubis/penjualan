import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import Rubric from "../../components/Rubric";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../../utils.js";
export default function Login() {
  const [login, setLogin] = useState({});
  const navigate = useNavigate();
  const [user, setUser] = useOutletContext();

  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="flex-col sm:flex-row  flex items-center gap-4 h-screen justify-evenly w-full bg-[#AEC3AE]">
        <Rubric />
        <form
          className="w-[80%] sm:w-[46%] lg:w-[34%] flex flex-col gap-6 bg-[#94A684] p-12 rounded-lg "
          onSubmit={async (e) => {
            e.preventDefault();
            console.log(login);
            const response = await fetch(`http://localhost:3000/api/login`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(login),
            });
            if (response.ok) {
              const chek = await api.get("/login/me");
              console.log(chek);
              if (chek.role === "pengirim") {
                setUser(chek);
                navigate("/");
              } else {
                setUser(chek);
                navigate("/penerima");
              }
            } else {
              const message = await response.text();
              alert(message);
            }
          }}
        >
          <h3 className="text-3xl text-center">Login</h3>
          <label className="flex flex-col">
            Username
            <input
              autoFocus
              type="text"
              required
              maxLength={30}
              className="border border-black "
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
            />
          </label>
          <label className="flex flex-col">
            Password
            <input
              type="password"
              maxLength={30}
              required
              className="border border-black"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </label>
          <button className="hover:bg-[#E4E4D0] hover:w-28 hover:rounded-2xl m-auto">
            SUBMIT
          </button>
          <div className="flex justify-between w-full">
            <Link
              to="/forgout"
              className="hover:bg-[#E4E4D0]  hover:rounded-2xl m-auto text-center w-[40%]"
            >
              Forgot
            </Link>
            <Link
              to="/register"
              className="hover:bg-[#E4E4D0]  w-[40%] hover:rounded-2xl m-auto text-center"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
