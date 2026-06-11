import { apiRequest } from "./client";
import { safeLower } from "../utils/safe";

export type AdminEntity =
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

const endpoints: Record<AdminEntity, string> = {
  tours: "/tour",
  hotels: "/hotel",
  spaServices: "/spa-service",
  spaSalons: "/spa",
  packages: "/package",
  places: "/place",
  users: "/user",

  hotelBookings: "/hotel-booking",
  tourBookings: "/tour-booking",
  spaBookings: "/spa-booking",
};

// GET ALL
export function getAll(entity: AdminEntity) {
  return apiRequest<any[]>(`${endpoints[entity]}/getAll`);
}

// DELETE
export function remove(entity: AdminEntity, id: number) {
  const isBooking =
    entity.includes("Booking") ||
    safeLower(entity ?? "").includes("booking");

  if (isBooking) {
    // вместо DELETE → CANCEL
    return apiRequest(`${endpoints[entity]}/cancel/${id}`, {
      method: "PUT",
    });
  }

  return apiRequest(`${endpoints[entity]}/${id}`, {
    method: "DELETE",
  });
}

// CREATE
export function create(entity: AdminEntity, data: any) {
    //console.log("GET ALL:", data);
  return apiRequest(`${endpoints[entity]}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function confirmBooking(entity: AdminEntity, id: number) {
  const isBooking =
    entity.includes("Booking") ||
    safeLower(entity ?? "").includes("booking");

  if (!isBooking) return Promise.reject("Not booking entity");

  return apiRequest(`${endpoints[entity]}/confirm/${id}`, {
    method: "PUT",
  });
}

// UPDATE
export function update(entity: AdminEntity, data: any) {
  return apiRequest(`${endpoints[entity]}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  
}