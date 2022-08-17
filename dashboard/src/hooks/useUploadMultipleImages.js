import { useState } from "react";
import axios from "axios";

const useUploadMultiImages = () => {
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState(null);

  const handleDrop = (acceptedFiles) => {
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
        setUrls((p) => [...p, response.data.data.display_url]);
        return response.data.data.display_url;
      } catch (error) {
        setError(error);
        setUploading(false);
        console.log(error);
      }
    });
  };

  const handleRemoveAll = () => {
    setUrls([]);
  };

  const handleRemove = (file) => {
    const filteredItems = urls.filter((_file) => _file !== file);
    setUrls(filteredItems);
  };

  return { uploading, error, handleDrop, handleRemoveAll, handleRemove, urls };
};
export default useUploadMultiImages;
