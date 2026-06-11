import { useState } from "react";
import AdminCrudPage from "./AdminCrudPage";

type Entity =
  | "tours"
  | "hotels"
  | "spaServices"
  | "spaSalons"
  | "packages"
  | "places"
  | "users"
  | "hotelBookings"
  | "tourBookings"
  | "spaBookings";

export default function AdminPage() {
  const [entity, setEntity] = useState<Entity>("tours");

  return (
    <div className="flex gap-6 text-white">
      
      {/* SIDEBAR */}
      <div className="w-60 bg-zinc-900 p-3 space-y-2">
        {[
            "tours",
            "hotels",
            "spaServices",
            "spaSalons",
            "packages",
            "places",
            "users",
            "hotelBookings",
            "tourBookings",
            "spaBookings",
        ].map((e) => (
          <button
            key={e}
            onClick={() => setEntity(e as Entity)}
            className="block w-full text-left p-2 bg-zinc-800 hover:bg-zinc-700"
          >
            {e}
          </button>
        ))}
      </div>

      <div className="flex-1">
        <AdminCrudPage entity={entity} />
      </div>
    </div>
  );
}