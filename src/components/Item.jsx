export default function Item({ producto }) {
  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(producto.precio);

  return (
    <article className="tarjeta-producto">
      <div className="producto-visual">
        <span role="img" aria-label={producto.nombre}>
          {producto.emoji}
        </span>
      </div>

      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="precio">{precioFormateado}</p>
        <p>Stock disponible: {producto.stock}</p>
      </div>
    </article>
  );
}