import { useState } from "react";

export default function useIncDec(prevQ) {
  const [q, setQ] = useState(prevQ || 1);

  const incrementQuantity = () => {
    setQ(q + 1);
  };
  const decrementQuantity = () => {
    setQ(q - 1);
  };

  return { q, incrementQuantity, decrementQuantity };
}
