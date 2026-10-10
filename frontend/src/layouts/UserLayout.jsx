import { Outlet } from "react-router-dom";

import OfferBar from "../components/OfferBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserLayout() {
  return (
    <>
      <OfferBar />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}