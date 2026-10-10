import { Routes, Route } from "react-router-dom";

import UserLayout from "../../layouts/UserLayout";

import Home from "../Home";
import Services from "../Services";
import Portfolio from "../Portfolio";
import About from "../About";
import Contact from "../Contact";

export default function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}