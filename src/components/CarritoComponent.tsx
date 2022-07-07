import { useCarritoContext } from "../context/CarritoContext";

export const CarritoComponent = (props: { setShowCarrito: Function }) => {
  const volver = () => {
    props.setShowCarrito(false);
  };
  const { carrito, clearCarrito, removeProducto } = useCarritoContext();
  const comprar = async () => {
    const itemsId: number[] = carrito.map((p: any) => p.id);

    const res = await fetch("http://localhost:3001/compras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemsId }),
    });
    const data = res.status;
    if (data < 400) {
      clearCarrito();
      props.setShowCarrito(false);
    } else {
      console.log("Error");
    }
  };
  return (
    <div>
      <button
        onClick={volver}
        className="bg-violet-600 rounded-full m-2 p-1 px-8 "
      >
        <span className="text-white font-bold mx-4">Volver</span>
      </button>
      <ul>
        {carrito.map((producto) => (
          <li
            key={producto.id}
            className="w-100 bg-stone-600 flex flex-row align-center content-center justify-between border-b-2 border-b-stone-500"
          >
            <img
              className="inline-block mt-2 mb-2 ml-4 h-10 rounded-full bg-stone-800"
              src={producto.imagen}
              alt=""
            ></img>
            <p className="text-white font-semibold mx-4 mt-4 h-100">
              {producto.nombre}
            </p>
            <button
              className="text-stone-800 mr-4"
              onClick={() => {
                removeProducto(producto);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={comprar}
        className="bg-violet-600 rounded-full m-2 p-1 px-8 "
      >
        <span className="text-white font-bold mx-4">Comprar</span>
      </button>
    </div>
  );
};
