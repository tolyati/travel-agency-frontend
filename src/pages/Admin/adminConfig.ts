export type FieldType =
  | "text"
  | "number"
  | "select"
  | "array"
  | "textarea";

export interface AdminField {
  name: string;
  label: string;
  type: FieldType;
  source?: string; 
}

export interface AdminEntityConfig {
  endpoint: string;
  listEndpoint: string;
  fields: AdminField[];
}

export const adminConfig: Record<string, AdminEntityConfig> = {
  tours: {
    endpoint: "/tour",
    listEndpoint: "/tour/getAll",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "price", label: "Price", type: "number" },
      { name: "categoryId", label: "Category", type: "select", source: "categories" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "images", label: "Images", type: "array" }
    ]
  },

  hotels: {
    endpoint: "/hotel",
    listEndpoint: "/hotel/getAll",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "address", label: "Address", type: "text" },
      { name: "description", label: "Description", type: "textarea" }
    ]
  },

  spaServices: {
    endpoint: "/spaService",
    listEndpoint: "/spaService/getAll",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "price", label: "Price", type: "number" },
      { name: "spaSalonId", label: "Spa Salon", type: "select", source: "spaSalons" }
    ]
  },

  spaSalons: {
    endpoint: "/spaSalon",
    listEndpoint: "/spaSalon/getAll",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "location", label: "Location", type: "text" }
    ]
  },

  packages: {
    endpoint: "/package",
    listEndpoint: "/package/getAll",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "price", label: "Price", type: "number" }
    ]
  },

  places: {
    endpoint: "/place",
    listEndpoint: "/place/getAll",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "countryId", label: "Country", type: "select", source: "countries" }
    ]
  },

  users: {
    endpoint: "/user",
    listEndpoint: "/user/getAll",
    fields: [
      { name: "userName", label: "Username", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "role", label: "Role", type: "select" }
    ]
  }
};