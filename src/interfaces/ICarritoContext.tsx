import { Pocion } from "../types/Pocion";

export interface ICarritoContext {
  carrito: Pocion[];
  pociones: Pocion[];
  total: number;
  gems: number;
  addProducto: (pocion: Pocion) => void;
  removeProducto: (pocion: Pocion) => void;
  clearCarrito: () => void;
}
