const equipo = [
    { id: 1, nombre: "Ana López", rol: "Atención al cliente" },
    { id: 2, nombre: "Lucas Pérez", rol: "Ventas" },
    { id: 3, nombre: "Sofía García", rol: "Logística" },
];

export default function Footer() {
    return (
    <footer id="equipo" className="footer">
        <div className="contenedor">
        <h2>Nuestro equipo</h2>
        <p>En EmiShop te ayudamos a encontrar tu próximo accesorio.</p>

        <div className="equipo">
            {equipo.map((persona) => (
            <article className="tarjeta-equipo" key={persona.id}>
                <h3>{persona.nombre}</h3>
                <p>{persona.rol}</p>
            </article>
            ))}
        </div>

        <p className="copyright">
            © {new Date().getFullYear()} EmiShop · Tienda de tecnología
        </p>
        </div>
    </footer>
    );
}