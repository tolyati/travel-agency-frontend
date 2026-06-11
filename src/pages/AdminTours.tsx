import { useEffect, useState } from "react";
import type { PageProps } from "../types";
import { apiRequest } from "../api/client";

interface Tour {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  description?: string;
  imageUrl?: string;
}

const emptyTour: Tour = {
  id: 0,
  name: "",
  price: 0,
  categoryId: 1,
  description: "",
  imageUrl: "",
};

export default function AdminTours({ setPage }: PageProps) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [form, setForm] = useState<Tour>(emptyTour);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadTours() {
    try {
      const data = await apiRequest<Tour[]>("/tour/getAll");
      setTours(data);
    } catch {
      alert("Ошибка загрузки туров");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTours();
  }, []);

  function handleChange(field: keyof Tour, value: string | number) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function createTour() {
    try {
      await apiRequest("/tour", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          price: form.price,
          categoryId: form.categoryId,
          description: form.description,
          imageUrl: form.imageUrl,
        }),
      });

      alert("Тур добавлен");
      setForm(emptyTour);
      loadTours();
    } catch (e: any) {
      console.log(e);
      alert(e.message);
    }
  }

  async function updateTour() {
    try {
      await apiRequest("/tour", {
        method: "PUT",
        body: JSON.stringify({
          id: form.id,
          name: form.name,
          price: form.price,
          categoryId: form.categoryId,
          description: form.description,
          imageUrl: form.imageUrl,
        }),
      });

      alert("Тур обновлён");
      setEditing(false);
      setForm(emptyTour);
      loadTours();
    } catch (e: any) {
      console.log(e);
      alert(e.message);
    }
  }

  async function deleteTour(id: number) {
    if (!confirm("Удалить тур?")) return;

    try {
      await apiRequest(`/tour/${id}`, {
        method: "DELETE",
      });

      loadTours();
    } catch (e: any) {
      console.log(e);
      alert(e.message);
    }
  }

  function startEdit(tour: Tour) {
    setForm(tour);
    setEditing(true);
  }

  return (
    <div className="space-y-8 text-white">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Admin Tours</h1>
        <button onClick={() => setPage("travel")}>
          Назад
        </button>
      </div>

      <div className="bg-zinc-900 p-4 rounded space-y-2">
        <input
          className="w-full p-2 bg-zinc-800"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
        />

        <input
          className="w-full p-2 bg-zinc-800"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) =>
            handleChange("price", Number(e.target.value))
          }
        />

        <input
          className="w-full p-2 bg-zinc-800"
          placeholder="CategoryId"
          type="number"
          value={form.categoryId}
          onChange={(e) =>
            handleChange(
              "categoryId",
              Number(e.target.value)
            )
          }
        />

        <input
          className="w-full p-2 bg-zinc-800"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            handleChange("description", e.target.value)
          }
        />

        <input
          className="w-full p-2 bg-zinc-800"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            handleChange("imageUrl", e.target.value)
          }
        />

        <button
          onClick={editing ? updateTour : createTour}
          className="bg-blue-600 px-4 py-2"
        >
          {editing ? "Update" : "Create"}
        </button>
      </div>

      <div className="space-y-2">
        {loading ? (
          <p>Loading...</p>
        ) : (
          tours.map((t) => (
            <div
              key={t.id}
              className="bg-zinc-800 p-3 flex justify-between"
            >
              <div>
                <div>{t.name}</div>
                <div>{t.price} €</div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(t)}
                  className="bg-yellow-600 px-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTour(t.id)}
                  className="bg-red-600 px-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}