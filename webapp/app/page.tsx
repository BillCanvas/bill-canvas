"use client";

import Link from "next/link";
import React from "react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pastel-pink to-pastel-blue">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-300 mb-3">
        Welcome to <span className="text-green-500">Bill Canvas</span>
      </h1>
      <p className="text-lg md:text-xl text-center text-gray-400 mb-12">
        Paint a clearer financial picture
      </p>
      <Link href="/pages/create" className="flex justify-center items-center bg-red-500 px-2 py-5 rounded-lg hover:shadow-lg hover:scale-90 transition-all duration-300">
        Start Creating!
      </Link>
    </div>
  );
}