"use client";

import WeatherApp from "@/components/WeatherApp";

export default function Home() {
  return (

    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-300 to-blue-700">
      {/* weather components */}
      <WeatherApp/>
    </div>
  );
}
