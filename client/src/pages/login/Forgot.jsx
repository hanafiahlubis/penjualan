import { Link } from "react-router-dom";
import { api2 } from "../../utils";
import { useState } from "react";
import Rubric from "../../components/Rubric";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const [forgout, setForgout] = useState({});
  const [openPassword, setOpenPassword] = useState(false);
  let temp = useRef(0);
  const naviget = useNavigate();
  return (
    <div className="flex-col sm:flex-row  flex items-center gap-4 h-screen justify-evenly w-full bg-[#AEC3AE]">
      <Rubric />
      <form
        className="w-[80%] sm:w-[46%] lg:w-[34%] flex flex-col gap-6 bg-[#94A684] p-12 rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          if (temp.current === 1) {
            api2("/login/forgot", "PUT", forgout).then(() => {
              alert("Berhasil Mengubah Sandi");
              setOpenPassword(!openPassword);
              temp.current = 0;
              setForgout({});
              naviget("/login");
            });
          } else if (temp.current === 0) {
            fetch(`http://localhost:3000/api/login/check`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(forgout),
            })
              .then((res) => {
                console.log(res.ok);
                if (res.ok) {
                  setOpenPassword(!openPassword);
                  temp.current++;
                } else {
                  alert("Username Anda salah Coba Lagi");
                  setForgout({});
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      >
        <h3 className="text-3xl  text-center">Forgot</h3>

        {!openPassword ? (
          <label className="flex flex-col">
            username
            <input
              type="text"
              required
              autoFocus
              className="border border-black"
              value={forgout.username ?? ""}
              onChange={(e) =>
                setForgout({ ...forgout, username: e.target.value })
              }
            />
          </label>
        ) : (
          <label className="flex flex-col">
            NEW Password
            <input
              type="password"
              autoFocus
              required
              className="border border-black"
              value={forgout.password ?? ""}
              onChange={(e) =>
                setForgout({ ...forgout, password: e.target.value })
              }
            />
          </label>
        )}
        <button className="hover:bg-[#E4E4D0] hover:w-28 hover:rounded-2xl m-auto">
          SUBMIT
        </button>
        <div className="flex justify-between w-full">
          <Link
            to="/login"
            className="hover:bg-[#E4E4D0]  hover:rounded-2xl m-auto text-center w-[40%]"
          >
            Login
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
