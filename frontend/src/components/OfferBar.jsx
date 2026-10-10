
import { Link } from "react-router-dom";

export default function OfferBar() {
  return (
    <div className="relative border-b border-lime-400/20 bg-[#09090b] text-white">
      <div
        className="
          container-page
          flex
          min-h-12
          flex-wrap
          items-center
          justify-center
          gap-x-3
          gap-y-2
          px-3
          py-2.5
          text-center
          sm:gap-4
        "
      >
        {/* OFFER BADGE */}
        <span
          className="
            inline-flex
            shrink-0
            items-center
            gap-1.5
            rounded-full
            border
            border-lime-400/30
            bg-lime-400/10
            px-3
            py-1.5
            text-[10px]
            font-black
            tracking-wide
            text-lime-400
            transition-all
            duration-300
            hover:border-lime-400/60
            hover:bg-lime-400/15
            sm:text-xs
          "
        >
          <span>🚀</span>
          DIGITAL GROWTH
        </span>

        {/* OFFER TEXT */}
        <p
          className="
            hidden
            items-center
            gap-1.5
            text-sm
            font-medium
            text-slate-300
            sm:flex
          "
        >
          Websites
          <span className="text-lime-400">•</span>
          Google Ads
          <span className="text-lime-400">•</span>
          <span className="font-bold text-white">
            Digital Marketing
          </span>
        </p>

        {/* MOBILE TEXT */}
        <p className="text-[11px] font-medium text-slate-300 sm:hidden">
          Grow your business online
        </p>

        {/* CTA BUTTON */}
        <Link
          to="/contact"
          className="
            group
            inline-flex
            shrink-0
            items-center
            gap-1.5
            rounded-lg
            border
            border-lime-400/40
            bg-lime-400
            px-3.5
            py-2
            text-xs
            font-black
            text-[#09090b]
            shadow-[0_0_15px_rgba(163,230,53,0.10)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-lime-300
            hover:bg-lime-300
            hover:shadow-[0_0_20px_rgba(163,230,53,0.25)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-lime-400
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#09090b]
          "
        >
          Baat Karein
          <span
            className="
              inline-block
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          >
            ↗
          </span>
        </Link>
      </div>
    </div>
  );
}
