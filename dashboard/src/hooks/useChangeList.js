import { useState } from "react";

const useChangeList = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return { page, size, handleSize, handleNext, handlePrevious };
};

export default useChangeList;
