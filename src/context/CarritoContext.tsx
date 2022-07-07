import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { ICarritoContext } from "../interfaces/ICarritoContext";
import { Pocion } from "../types/Pocion";

const CarritoContext = createContext<ICarritoContext>({
  carrito: [],
  pociones: [],
  total: 0,
  gems: 0,
  addProducto: () => {},
  removeProducto: () => {},
  clearCarrito: () => {},
});

export const CarritoProvider = (props: any) => {
  const [carrito, setCarrito] = useState([] as Pocion[]);
  const [pociones, setPociones] = useState([] as Pocion[]);
  const [total, setTotal] = useState(0);
  const [gems, setGems] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3001/productos");
      const data = await res.json();
      setPociones(data);
      setGems(3);
    }
    fetchData();
  }, []);

  const addProducto = (pocion: Pocion) => {
    setCarrito([...carrito, pocion]);
    setTotal(total + pocion.precio);
  };

  const removeProducto = (pocion: Pocion) => {
    setCarrito(carrito.filter((p: Pocion) => p.id !== pocion.id));
    setTotal(total - pocion.precio);
  };

  const clearCarrito = () => {
    setCarrito([]);
    setTotal(0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        total,
        gems,
        pociones,
        addProducto,
        removeProducto,
        clearCarrito,
      }}
      {...props}
    />
  );
};

export function useCarritoContext() {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
