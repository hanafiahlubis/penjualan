import { FaShippingFast } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { api } from "../utils";
// import { pages } from "../main";

export default function Header() {
  return (
    <header className="flex justify-between bg-blue-200 px-4 h-16 items-center flex-shrink-0">
      <Link to="/" className="flex gap-2 items-center text-lg  font-bold">
        <FaShippingFast size={24} className="text-blue-600" />
        <div>AL-GO</div>
      </Link>
      <nav>
        {/* {pages.map((page) => {
          const Icon = page.icon;
          return (
            <NavLink key={page.path} to={page.path}>
              <Icon size={24} />
              {page.title}
            </NavLink>
          ); 
        >
          Keluar
        </button>
        })} */}
      </nav>
      <Button
        onClick={async () => {
          const messege = await api.post("/login/logout");
          alert(messege);
          location.reload();
        }}
      >
        Logout
      </Button>
    </header>
  );
}
