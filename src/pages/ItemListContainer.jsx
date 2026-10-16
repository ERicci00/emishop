import { useEffect, useState } from "react";
import Item from "../components/Item";

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        const respuesta = await fetch(
          `${import.meta.env.BASE_URL}productos.json`,
          { signal: controller.signal }
        );

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError("Ocurrió un error al cargar el catálogo.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => controller.abort();
  }, []);

  return (
    <section id="productos" className="seccion">
      <h2>Nuestros productos</h2>
      <p>Accesorios para trabajar, jugar y disfrutar.</p>

      {cargando && <p role="status">Cargando productos...</p>}
      {error && <p role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="catalogo">
          {productos.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </section>
  );
}