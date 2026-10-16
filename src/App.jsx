import Layout from "./components/Layout";
import ItemListContainer from "./pages/ItemListContainer";
import FormularioProducto from "./components/FormularioProducto";
import "./App.css";

export default function App() {
  return (
    <Layout>
      <section className="presentacion">
        <span className="etiqueta">TECNOLOGÍA PARA TU DÍA A DÍA</span>
        <h1>Tu próximo upgrade empieza acá, en EmiShop.</h1>
        <p>
          Encontrá accesorios para equipar tu espacio con comodidad y estilo.
        </p>
        <a className="boton" href="#productos">
          Explorar productos
        </a>
      </section>

      <ItemListContainer />
      <FormularioProducto />
    </Layout>
  );
}