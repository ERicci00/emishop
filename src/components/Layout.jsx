import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main id="inicio" className="contenedor">
        {children}
      </main>
      <Footer />
    </>
  );
}