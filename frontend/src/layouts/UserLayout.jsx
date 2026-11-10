
import { Outlet } from "react-router-dom";

import OfferBar from "../components/OfferBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VisitorTracking from "../components/VisitorTracking";

export default function UserLayout() {
  return (
    <>
      <VisitorTracking />

      <OfferBar />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
