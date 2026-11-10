
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL = "https://backend-2-ukog.onrender.com";

function getVisitorId() {
  const key = "ds_visitor_id";

  try {
    let visitorId = localStorage.getItem(key);

    if (!visitorId) {
      visitorId =
        window.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      localStorage.setItem(key, visitorId);
    }

    return visitorId;
  } catch {
    return null;
  }
}

export default function VisitorTracking() {
  const location = useLocation();

  useEffect(() => {
    const visitorId = getVisitorId();
    if (!visitorId) return;

    fetch(`${API_URL}/api/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId,
        page: location.pathname,
        referrer: document.referrer || "",
      }),
      keepalive: true,
    }).catch((error) => {
      console.error("Visitor tracking failed:", error);
    });
  }, [location.pathname]);

  return null;
}
