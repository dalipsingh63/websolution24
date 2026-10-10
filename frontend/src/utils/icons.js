import {
  FaGlobe,
  FaShoppingCart,
  FaPaintBrush,
  FaTools,
  FaGoogle,
  FaBullhorn,
} from "react-icons/fa";

const iconMap = {
  FaGlobe,
  FaShoppingCart,
  FaPaintBrush,
  FaTools,
  FaGoogle,
  FaBullhorn,
};

export const getServiceIcon = (iconName) => {
  return iconMap[iconName] || FaGlobe;
};