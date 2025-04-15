"use client";
import React from "react";

const themes = ["light", "dark", "cupcake", "dracula", "synthwave"];

export default function ThemeSwitcher() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {themes.map((theme) => (
        <button
          key={theme}
          className="btn btn-xs"
          onClick={() => document.documentElement.setAttribute("data-theme", theme)}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  );
}