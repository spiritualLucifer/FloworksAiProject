'use client'
import React from "react";

const NoWeatherReport: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="/no_report_cloud2.png" alt="cloud" className="w-72" />
      <div className="text-2xl font-bold text-cyan-900">
        Check Weather of Desired City
      </div>
    </div>
  );
};

export default NoWeatherReport;
