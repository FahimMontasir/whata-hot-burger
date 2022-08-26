import { useState } from "react";
import axios from "axios";

const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = (acceptedFiles, setFieldValue, v = "photoUrl") => {
    const file = acceptedFiles[0];
    if (file) {
      setUploading(true);
      const imgData = new FormData();
      imgData.set("key", "4ee92500539aec53d74737b7e5955151");
      imgData.append("image", file);

      axios
        .post("https://api.imgbb.com/1/upload", imgData)
        .then((response) => {
          setFieldValue(v, response.data.data.display_url);
          setUploading(false);
        })
        .catch((err) => setError(err))
        .finally(() => setUploading(false));
    }
  };

  return { uploading, error, uploadImage };
};
export default useUploadImage;
