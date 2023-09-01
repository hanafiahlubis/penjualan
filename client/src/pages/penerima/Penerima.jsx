import { useOutletContext } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../../utils";
import Button from "../../components/Button";

export default function Penerima() {
  const [user, setUser] = useOutletContext();
  const [openAdd, setOpenAdd] = useState(false);
  const [data, setData] = useState({ priority: 1 });
  const [allPengirim, setAllPengirim] = useState([]);
  useEffect(() => {
    api.get("/pengirim").then((p) => {
      setData({ ...data, id_penerima: p[0].id });
      setAllPengirim(p);
    });
  });

  if (user?.role === "Penerima") {
    return (
      <>
        {openAdd && (
          <form
            className="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              setTimeout(() => {
                let temp = allPengirim.filter(
                  (p) => p.id_penerima === data.id_penerima
                );
                setData({ ...data, alamat: `${user.alamat} - ${temp.alamat}` });
              }, 500);
              console.log(data);
              api.post("/pengirim", data);
              setData(undefined);
            }}
          >
            <h1> Add Al-GO</h1>
            <label>
              Tujuan
              <select
                onChange={(e) =>
                  setData({ ...data, id_penerima: e.target.value })
                }
              >
                {allPengirim.map((pengirim) => (
                  <option key={pengirim.id} value={pengirim.id}>
                    {pengirim.alamat}
                  </option>
                ))}
              </select>
            </label>
            <label>
              GO
              <select
                onChange={(e) => {
                  setData({ ...data, priority: e.target.value });
                  let temp = allPengirim.filter(
                    (p) => p.id_penerima === data.id_penerima
                  );
                  setData({
                    ...data,
                    alamat: `${user.alamat} - ${temp.alamat}`,
                  });
                }}
              >
                <option value="1">Fast 1</option>
                <option value="2">Fast 2</option>
                <option value="3">Fast 3</option>
                <option value="4">Fast 4</option>
                <option value="5">Fast 5</option>
              </select>
            </label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="reset"
                variant="tonal"
                onClick={() => {
                  setOpenAdd(!openAdd);
                  setData(undefined);
                }}
              >
                Batal
              </Button>
              <Button>Simpan</Button>
            </div>
          </form>
        )}
        <Header />
        <h1>Penerima</h1>
        <button
          onClick={() => {
            setOpenAdd(!openAdd);
          }}
        >
          <AiOutlinePlusCircle size={24} />
        </button>
        <Footer />
      </>
    );
  } else if (user?.role === "Pengirim") {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/login" />;
  }
}
