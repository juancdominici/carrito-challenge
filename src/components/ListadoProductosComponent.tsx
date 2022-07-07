import { useCarritoContext } from "../context/CarritoContext";
import { Pocion } from "../types/Pocion";

export const ListadoProductosComponent = (props: { productos: Pocion[] }) => {
  const { addProducto, total, carrito } = useCarritoContext();
  return (
    <div className="flex flex-wrap gap-5">
      {props.productos.map((p: Pocion) => {
        return (
          <div
            key={p.id}
            className="w-60 p-3 rounded-xl bg-stone-700 border-transparent border-2 hover:border-violet-600"
          >
            <div className="flex justify-end">
              <div className="rounded-full bg-green-600 px-4 py-1">
                <p className="text-white font-bold text-xs">
                  {p.precio} {p.precio > 1 ? "Gemas" : "Gema"}
                </p>
              </div>
            </div>
            <img
              className="mt-4 mb-2 w-16 h-16 rounded-full mx-auto"
              src={p.imagen}
              alt=""
            ></img>
            <div className="mx-4 px-4 space-y-4">
              <h1 className="font-bold">{p.nombre}</h1>
              <p className="text-stone-500 font-semibold">{p.descripcion}</p>
            </div>
            <div className="mt-4 w-100 flex justify-center">
              <button
                className="bg-violet-600 rounded-full p-1 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  addProducto(p);
                }}
                disabled={
                  total + p.precio > 3 ||
                  carrito.includes(p) ||
                  !!carrito.find((p2) => p2.categoria === p.categoria)
                }
              >
                <span className="text-white font-bold mx-4">Agregar</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
