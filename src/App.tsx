import { useState } from "react";
import { CarritoComponent } from "./components/CarritoComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { ListadoProductosComponent } from "./components/ListadoProductosComponent";
import { useCarritoContext } from "./context/CarritoContext";

function App() {
  const [showCarrito, setShowCarrito] = useState(false);
  const { pociones, gems, carrito, total } = useCarritoContext();
  return (
    <div
      className="min-h-full bg-fixed"
      style={{ backgroundImage: "url(background.webp)" }}
    >
      <HeaderComponent
        gemCount={gems - total}
        prodCount={carrito.length}
        setShowCarrito={setShowCarrito}
      />
      <div className="flex justify-center min-h-full">
        <div className="max-w-lg w-full py-16">
          {showCarrito ? (
            <CarritoComponent setShowCarrito={setShowCarrito} />
          ) : (
            <ListadoProductosComponent productos={pociones} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
