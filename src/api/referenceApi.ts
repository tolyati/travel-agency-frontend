import { apiRequest } from "./client";

export function getCategories() {
  return apiRequest<any[]>("/category/getAll");
}

export function getSpaSalons() {
  return apiRequest<any[]>("/spa/getAll");
}

export function getCountries() {
  return apiRequest<any[]>("/country/getAll");
}