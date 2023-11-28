import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useContextNullChecker from "../helpers/useContextNullChecker";

export default function Header() {
  // Fetching data from context
  const { searchValue, setSearchValue } = useContextNullChecker();

  // Display style for searchDiv
  const [showSearch, setShowSearch] = useState<boolean>(true);

  // Display style for nav
  const [showMenu, setShowMenu] = useState<boolean>(true);

  // Window width
  const [width, setWidth] = useState<number>(0);

  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  // Router for navigation
  const router = useRouter();

  // searchDiv and nav ref
  const searchDivRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // Setting window height on load
  useEffect(() => {
    setWidth(window.innerWidth);

    const setWindowWidth = (e: Event) => {
      setWidth((e.target as Window).innerWidth);
    };

    window.addEventListener("resize", setWindowWidth);

    return () => window.removeEventListener("resize", setWindowWidth);
  }, []);

  // Hide and show searchDiv
  if (searchDivRef.current) {
    if (width < 601) {
      searchDivRef.current.style.display = showSearch ? "none" : "flex";
    } else {
      searchDivRef.current.style.display = showSearch ? "flex" : "none";
    }
  }

  // Hide and show menu
  if (navRef.current) {
    if (width < 601) {
      navRef.current.style.display = showMenu ? "none" : "flex";

      // Inside menu, onclick event on all lis
      navRef.current.childNodes[0].childNodes.forEach((li) => {
        if (li instanceof HTMLElement) {
          li.onclick = () => setShowMenu((pre) => !pre);
        }
      });
    } else {
      navRef.current.style.display = showMenu ? "flex" : "none";
    }
  }

  // onclick function of search button
  const handleSearchIconClick = () => {
    setShowSearch((pre) => !pre);
    setShowMenu(true);
    setSearchValue("");
  };

  // onclick function of menu button
  const handleMenuIconClick = () => {
    setShowMenu((pre) => !pre);
    setShowSearch(true);
    setSearchValue("");
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/user/logout");
      router.push("/login");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <header className="header">
      <div className="logoAndSearchDiv">
        <Image
          style={{ display: showSearch ? "" : "none" }}
          src={"/assets/images/logo.png"}
          width={80}
          height={35}
          alt="My Note"
          priority={true}
          onClick={() => router.push("/")}
        />

        <div ref={searchDivRef} className="searchDiv">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue.length > 0 && (
            <span
              className="material-symbols-outlined close"
              onClick={() => setSearchValue("")}
            >
              close
            </span>
          )}
        </div>
      </div>

      <div className="iconDiv">
        <span
          className="material-symbols-outlined search"
          onClick={handleSearchIconClick}
        >
          {showSearch ? "search" : " search_off"}
        </span>
        <span
          className="material-symbols-outlined menu"
          onClick={handleMenuIconClick}
        >
          {showMenu ? "menu" : "close"}
        </span>
      </div>

      <nav ref={navRef}>
        <ul>
          <li>
            <button onClick={() => router.push("/trash")}>
              Trash
            </button>
          </li>

          <li>
            <button onClick={logout}>{loading ? "Wait" : "Logout"}</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
