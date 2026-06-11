import { useEffect, useState } from "react";
import {
  getAll,
  create,
  update,
  remove,
  confirmBooking,
  AdminEntity,
} from "../../api/adminApi";
import { getCategories, getSpaSalons, getCountries } from "../../api/referenceApi";

type Props = {
  entity: AdminEntity;
};

const templates: Record<string, any> = {
  tours: {
    name: "",
    shortDescription: "",
    fullDescription: "",
    categoryId: 0,
    price: 0,
    images: [],
    status: "",
  },

  users: {
    userName: "",
    email: "",
    contacts: "",
    dob: "",
    gender: "",
    role: "",
  },

  hotels: {
    name: "",
    address: "",
    city: "",
    country: "",
    shortDescription: "",
    fullDescription: "",
    rating: 0,
    phone: "",
    basePrice: 0,
    images: [],
  },

  packages: {
    name: "",
    shortDescription: "",
    fullDescription: "",
    durationDays: 1,
    price: 0,
    images: [],
  },

  places: {
    name: "",
    shortDescription: "",
    fullDescription: "",
    price: 0,
    countryId: 0,
    images: [],
  },

  spaSalons: {
    name: "",
    address: "",
    phone: "",
    shortDescription: "",
    fullDescription: "",
  },

  spaServices: {
    name: "",
    description: "",
    price: 0,
    spaSalonId: 0,
    images: [],
  },

  hotelBookings: {
    userId: 0,
    hotelId: 0,
    dateFrom: "",
    dateTo: "",
    status: "",
    totalPrice: 0,
  },

  tourBookings: {
    userId: 0,
    tourId: 0,
    dateFrom: "",
    dateTo: "",
    status: "",
  },

  spaBookings: {
    userId: 0,
    spaSalonId: 0,
    date: "",
    time: "",
    status: "",
    totalPrice: 0,
  },
};

export default function AdminCrudPage({ entity }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<any>({});
  const [editing, setEditing] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [spaSalons, setSpaSalons] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const isBooking =
  entity === "hotelBookings" ||
  entity === "tourBookings" ||
  entity === "spaBookings";

  const template = templates[entity] ?? {};


  async function load() {
    try {
      const data = await getAll(entity);
      setItems(data);
    } catch (e: any) {
      console.log("LOAD ERROR:", e?.message);
      console.log(e);
    }
  }

  useEffect(() => {
    setForm(template ?? {});
    setEditing(false);
    load();
  }, [entity]);

useEffect(() => {
  async function loadRefs() {
    try {
      const [cats, spas, coun] = await Promise.all([
        getCategories().catch(() => []),
        getSpaSalons().catch(() => []),
        getCountries().catch(() => []),
      ]);

      setCategories(cats);
      setSpaSalons(spas);
      setCountries(coun);
    } catch (e) {
      console.error(e);
    }
  }

  loadRefs();
}, []);

  function handleChange(key: string, value: any) {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

async function handleSave() {
  try {
    const payload = {
      ...form,
      images: Array.isArray(form.images) ? form.images : [],
    };

    if (editing) {
      await update(entity, payload);
    } else {
      await create(entity, payload);
    }

    setForm(template ?? {});
    setEditing(false);
    load();
  } catch (e: any) {
    console.log(e?.response?.data || e);
    alert("Save error");
  }
}

  async function handleDelete(id: number) {
    if (!confirm("Delete item?")) return;

    try {
      await remove(entity, id);
      load();
    } catch (e) {
      console.log(e);
      alert("Delete error");
    }
  }

  function renderField(key: string) {
  if (key === "categoryId") {
  return (
    <select
      value={form[key] ?? 0}
      onChange={(e) => handleChange(key, Number(e.target.value))}
      className="w-full p-2 bg-zinc-800"
    >
      <option value={0}>Select category</option>

      {categories.map((c) => {
        const id = c.id ?? c.Id;
        const name = c.name ?? c.Name;

        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      })}
    </select>
  );
}

  if (key === "spaSalonId") {
  return (
    <select
      value={form[key] ?? 0}
      onChange={(e) => handleChange(key, Number(e.target.value))}
      className="w-full p-2 bg-zinc-800"
    >
      <option value={0}>Select spa salon</option>

      {spaSalons.map((s) => {
        const id = s.id ?? s.Id;
        const name = s.name ?? s.Name;

        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      })}
    </select>
  );
}

  if (key === "countryId") {
  return (
    <select
      value={form[key] ?? 0}
      onChange={(e) => handleChange(key, Number(e.target.value))}
      className="w-full p-2 bg-zinc-800"
    >
      <option value={0}>Select country</option>

      {countries.map((c) => {
        const id = c.id ?? c.Id;
        const name = c.name ?? c.Name;

        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      })}
    </select>
  );
}

  return (
    <input
      className="w-full p-2 bg-zinc-800"
      placeholder={key}
      value={form?.[key] ?? ""}
      onChange={(e) => handleChange(key, e.target.value)}
    />
  );
}

  function handleEdit(item: any) {
    setForm(item);
    setEditing(true);
  }

  const keys = Object.keys(template ?? {});

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-2xl font-bold">Admin: {entity}</h1>

      {/* FORM */}
      <div className="bg-zinc-900 p-4 space-y-2">
        {keys.length > 0 ? (
          keys.map((key) => (
          <div key={key}>
            {renderField(key)}
          </div>
        ))
        ) : (
          <p className="text-gray-400">No fields defined</p>
        )}

        <button onClick={handleSave} className="bg-blue-600 px-4 py-2">
          {editing ? "Update" : "Create"}
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-800 p-3 flex justify-between"
          >
            <div>
              <div>ID: {item.id}</div>
              <pre className="text-xs text-gray-300">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)}>
  Edit
</button>

{isBooking ? (
  <>
    <button
      onClick={() => confirmBooking(entity, item.id)}
      className="bg-green-600 px-2"
    >
      Confirm
    </button>

    <button
      onClick={() => handleDelete(item.id)} 
      className="bg-red-600 px-2"
    >
      Cancel
    </button>
  </>
) : (
  <button
    onClick={() => handleDelete(item.id)}
    className="bg-red-600 px-2"
  >
    Delete
  </button>
)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}