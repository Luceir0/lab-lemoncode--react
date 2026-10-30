import { useEffect, useState } from "react";
import { CoffeeCard } from "./coffee-card";
import type { Coffee } from "./model";

export function App() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Coffee[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/coffees.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<Coffee[]>;
      })
      .then((data) => {
        setCoffees(data);
        setLoading(false);
      })
      .catch(() => {
        // Una petición cancelada al desmontar no es un error de carga.
        if (controller.signal.aborted) return;
        setError("No se han podido cargar los cafés. Inténtalo de nuevo más tarde.");
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const filteredCoffees = coffees.filter((coffee) =>
    coffee.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const bagCount = cart.length;
  const total = cart.reduce((sum, coffee) => sum + coffee.price, 0);

  const addToCart = (coffee: Coffee) => {
    setCart((previous) => [...previous, coffee]);
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <main>
      <h1>Tueste</h1>
      <section
        aria-label="Carrito"
        className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
      >
        <p aria-live="polite">
          <strong>{bagCount}</strong> bolsas · <strong>{total.toFixed(2)}</strong> €
        </p>
        <button type="button" onClick={emptyCart} disabled={bagCount === 0}>
          Vaciar
        </button>
      </section>
      <div className="flex flex-col gap-1">
        <label htmlFor="search">Buscar por nombre</label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {loading ? (
        <p role="status">Cargando…</p>
      ) : error ? (
        <p role="alert" className="rounded-lg bg-red-100 p-4 text-red-800">
          {error}
        </p>
      ) : (
        <>
          <p>{coffees.length} cafés este mes</p>
          {filteredCoffees.length === 0 ? (
            <p>Sin resultados</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {filteredCoffees.map((coffee) => (
                <li key={coffee.id}>
                  <CoffeeCard coffee={coffee} onAdd={addToCart} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
