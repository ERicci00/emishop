import { useState } from "react";

const valoresIniciales = {
  id: "",
  nombre: "",
  precio: "",
  stock: "",
};

export default function FormularioProducto() {
  const [datos, setDatos] = useState(valoresIniciales);
  const [imagen, setImagen] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [urlImagen, setUrlImagen] = useState("");

  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setDatos((anteriores) => ({
      ...anteriores,
      [name]: value,
    }));
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();
    setMensaje("");
    setError("");
    setUrlImagen("");

    if (!datos.id.trim() || !datos.nombre.trim()) {
      setError("Completá el ID y el nombre del producto.");
      return;
    }

    if (!apiKey.trim() || !imagen) {
      setError("Ingresá tu clave de ImgBB y seleccioná una imagen.");
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(imagen.type)) {
      setError("Seleccioná una imagen JPG, PNG o WebP.");
      return;
    }

    if (imagen.size > 5 * 1024 * 1024) {
      setError("La imagen debe pesar como máximo 5 MB.");
      return;
    }

    setEnviando(true);

    try {
      console.log("Subiendo imagen a Imgbb...");
      setMensaje("Subiendo imagen a ImgBB...");

      const formularioImagen = new FormData();
      formularioImagen.append("image", imagen);

      const respuesta = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey.trim())}`,
        {
          method: "POST",
          body: formularioImagen,
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.success || !resultado.data?.url) {
        throw new Error(
          "No se pudo subir la imagen. Revisá tu clave de ImgBB e intentá nuevamente."
        );
      }

      const productoCompleto = {
        id: datos.id.trim(),
        nombre: datos.nombre.trim(),
        precio: datos.precio,
        stock: datos.stock,
        urlImagen: resultado.data.url,
      };

      console.log("Imagen subida con éxito.");
      console.log("URL:", productoCompleto.urlImagen);
      console.log(
        "Enviando los siguientes datos COMPLETOS a la API:",
        productoCompleto
      );

      setUrlImagen(productoCompleto.urlImagen);
      setMensaje(
        "¡Imagen subida! Los datos completos del producto se mostraron en la consola."
      );
    } catch (error) {
      setMensaje("");
      setError(
        error instanceof TypeError
          ? "No se pudo conectar con ImgBB. Revisá tu conexión e intentá nuevamente."
          : error.message
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="formulario" className="seccion">
      <h2>Agregar producto</h2>
      <p>
        Subí una imagen a ImgBB y simulá el envío de los datos del producto.
      </p>

      <form className="formulario" onSubmit={enviarFormulario}>
        <fieldset disabled={enviando}>
          <div className="campos-formulario">
            <label htmlFor="producto-id">
              ID
              <input
                id="producto-id"
                name="id"
                value={datos.id}
                onChange={cambiarCampo}
                placeholder="Ejemplo: 4"
                required
              />
            </label>

            <label htmlFor="producto-nombre">
              Nombre
              <input
                id="producto-nombre"
                name="nombre"
                value={datos.nombre}
                onChange={cambiarCampo}
                placeholder="Ejemplo: Monitor"
                required
              />
            </label>

            <label htmlFor="producto-precio">
              Precio
              <input
                id="producto-precio"
                name="precio"
                type="number"
                min="0"
                step="0.01"
                value={datos.precio}
                onChange={cambiarCampo}
                required
              />
            </label>

            <label htmlFor="producto-stock">
              Stock
              <input
                id="producto-stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={datos.stock}
                onChange={cambiarCampo}
                required
              />
            </label>
          </div>

          <label htmlFor="producto-imagen">
            Imagen del producto
            <input
              id="producto-imagen"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(evento) => {
                setImagen(evento.target.files?.[0] ?? null);
                setUrlImagen("");
              }}
              required
            />
          </label>
          <p className="ayuda">JPG, PNG o WebP. Máximo 5 MB.</p>

          <label htmlFor="imgbb-clave">
            Clave API de ImgBB
            <input
              id="imgbb-clave"
              type="password"
              value={apiKey}
              onChange={(evento) => setApiKey(evento.target.value)}
              autoComplete="off"
              placeholder="Ingresá tu clave"
              required
            />
          </label>
          <p className="ayuda">
            La imagen seleccionada se enviará a ImgBB al presionar el botón.
            La clave no se guarda en el proyecto.
          </p>

          <button className="boton" type="submit">
            {enviando ? "Subiendo imagen..." : "Enviar producto"}
          </button>
        </fieldset>

        <div aria-live="polite">
          {mensaje && <p className="mensaje-exito">{mensaje}</p>}
        </div>

        {error && <p role="alert" className="mensaje-error">{error}</p>}

        {urlImagen && (
          <div className="resultado-imagen">
            <img src={urlImagen} alt={datos.nombre} />
            <a href={urlImagen} target="_blank" rel="noreferrer">
              Ver imagen subida
            </a>
          </div>
        )}
      </form>
    </section>
  );
}