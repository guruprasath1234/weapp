// app/details/page.jsx (Server Component)
import { Suspense } from "react";
import DetailsClientWrapper from "./DetailsClientWrapper";

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading weather details...</div>}>
      <DetailsClientWrapper />
    </Suspense>
  );
}
