export default function Header() {
    return (
    <header className="header">
        <a className="marca" href="#inicio">
        EmiShop
        </a>

        <nav aria-label="Navegación principal">
        <a href="#productos">Productos</a>
        <a href="#formulario">Agregar producto</a>
        <a href="#equipo">Equipo</a>
        </nav>
    </header>
    );
}