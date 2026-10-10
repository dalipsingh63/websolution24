
import { useEffect, useState } from "react";
import {
  FaMoon,
  FaSun,
  FaCompressAlt,
  FaExpandAlt,
  FaMagic,
  FaUndo,
  FaInfoCircle,
  FaCheckCircle,
  FaCog,
} from "react-icons/fa";

import AdminPageHeader from "../../components/admin/AdminPageHeader";

const STORAGE_KEY = "websolutionAdminPreferences";

const DEFAULT_SETTINGS = {
  theme: "light",
  density: "comfortable",
  animations: true,
};

function readSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return DEFAULT_SETTINGS;

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(saved),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function SettingCard({ icon: Icon, title, description, children }) {
  return (
    <section className="settings-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lime-50 text-lime-700">
          <Icon size={19} />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChoiceButton({ active, onClick, icon: Icon, title, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-24 w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
        active
          ? "border-lime-400 bg-lime-50 ring-1 ring-lime-400"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <Icon className={active ? "mt-1 text-lime-700" : "mt-1 text-slate-500"} />

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-slate-900">
          {title}
        </span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      </span>

      {active && <FaCheckCircle className="mt-1 shrink-0 text-lime-700" />}
    </button>
  );
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(readSettings);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    document.documentElement.dataset.adminTheme = settings.theme;
    document.documentElement.dataset.adminDensity = settings.density;
    document.documentElement.dataset.adminAnimations = String(
      settings.animations
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSavedMessage("Preference updated successfully.");
  };

  const resetSettings = () => {
    setSettings({ ...DEFAULT_SETTINGS });
    setSavedMessage("Settings restored to defaults.");
  };

  return (
    <div className="admin-settings-page mx-auto max-w-6xl">
      <AdminPageHeader
        title="Settings"
        description="Customize your WebSolution admin panel. No backend required."
      />

      {savedMessage && (
        <div
          role="status"
          className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
        >
          <FaCheckCircle />
          {savedMessage}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        <SettingCard
          icon={FaSun}
          title="Appearance"
          description="Choose how your admin panel looks. Your choice is saved in this browser."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              active={settings.theme === "light"}
              onClick={() => updateSetting("theme", "light")}
              icon={FaSun}
              title="Light mode"
              description="Bright background and light cards."
            />

            <ChoiceButton
              active={settings.theme === "dark"}
              onClick={() => updateSetting("theme", "dark")}
              icon={FaMoon}
              title="Dark mode"
              description="Dark background for comfortable viewing."
            />
          </div>
        </SettingCard>

        <SettingCard
          icon={FaCompressAlt}
          title="Layout Preferences"
          description="Choose the spacing used across the admin interface."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              active={settings.density === "comfortable"}
              onClick={() => updateSetting("density", "comfortable")}
              icon={FaExpandAlt}
              title="Comfortable"
              description="More space between sections."
            />

            <ChoiceButton
              active={settings.density === "compact"}
              onClick={() => updateSetting("density", "compact")}
              icon={FaCompressAlt}
              title="Compact"
              description="Less spacing to fit more content."
            />
          </div>
        </SettingCard>

        <SettingCard
          icon={FaMagic}
          title="Interface Animations"
          description="Turn interface transitions on or off."
        >
          <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
            <div>
              <p className="font-bold text-slate-800">
                Enable animations
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {settings.animations
                  ? "Transitions are enabled."
                  : "Transitions are disabled."}
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={settings.animations}
              aria-label="Enable interface animations"
              onClick={() =>
                updateSetting("animations", !settings.animations)
              }
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                settings.animations ? "bg-lime-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  settings.animations ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </SettingCard>

        <SettingCard
          icon={FaUndo}
          title="Reset Preferences"
          description="Restore the default appearance, spacing and animation options."
        >
          <button
            type="button"
            onClick={resetSettings}
            className="inline-flex items-center gap-2 rounded-xl bg-[#18181b] px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            <FaUndo />
            Reset to Defaults
          </button>
        </SettingCard>
      </div>

      <section className="settings-card mt-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-700">
            <FaInfoCircle size={19} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">About WebSolution</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Admin dashboard for managing your website's services,
              portfolio and leads.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">
              Project
            </p>
            <p className="mt-1 font-bold text-slate-900">WebSolution</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">
              Panel
            </p>
            <p className="mt-1 font-bold text-slate-900">Admin Dashboard</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-500">
              Preferences
            </p>
            <p className="mt-1 font-bold text-slate-900">
              Saved in this browser
            </p>
          </div>
        </div>
      </section>

      <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
        <FaCog className="mt-0.5 shrink-0" />
        These are local interface preferences only. They do not change
        website content, lead data, portfolio data or database settings.
      </p>
    </div>
  );
}
