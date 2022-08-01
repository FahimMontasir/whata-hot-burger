import { useState } from "react";
import axios from "axios";

const useUploadMultiImages = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleDrop = (acceptedFiles, setFieldValue) => {
    setFieldValue(
      "photoUrls",
      acceptedFiles.map(async (file) => {
        setUploading(true);
        const imgData = new FormData();
        imgData.set("key", "4ee92500539aec53d74737b7e5955151");
        imgData.append("image", file);

        try {
          const response = await axios.post(
            "https://api.imgbb.com/1/upload",
            imgData
          );
          setUploading(false);
          console.log(response.data.data.display_url);
          return response.data.data.display_url;
        } catch (error) {
          setError(error);
          setUploading(false);
          console.log(error);
        }
      })
    );
  };

  const handleRemoveAll = (setFieldValue) => {
    setFieldValue("photoUrls", []);
  };

  const handleRemove = (file, values, setFieldValue) => {
    const filteredItems = values.photoUrls.filter((_file) => _file !== file);
    setFieldValue("photoUrls", filteredItems);
  };

  return { uploading, error, handleDrop, handleRemoveAll, handleRemove };
};
export default useUploadMultiImages;
