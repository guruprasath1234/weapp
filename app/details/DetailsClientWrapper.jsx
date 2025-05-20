// app/details/DetailsClientWrapper.jsx
"use client";

import dynamic from "next/dynamic";

const DetailsClient = dynamic(() => import("./DetailsClient"), {
  ssr: false,
});

export default function DetailsClientWrapper() {
  return <DetailsClient />;
}
