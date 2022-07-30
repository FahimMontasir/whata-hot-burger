const handleDrop = useCallback(
  (acceptedFiles) => {
    setFieldValue(
      "images",
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  },
  [setFieldValue]
);

const handleRemoveAll = () => {
  setFieldValue("images", []);
};

const handleRemove = (file) => {
  const filteredItems = values.images.filter((_file) => _file !== file);
  setFieldValue("images", filteredItems);
};

<UploadMultiFile
  showPreview
  maxSize={3145728}
  accept={{
    "image/png": [".png"],
    "image/jpg": [".jpg"],
    "image/jpeg": [".jpeg"],
  }}
  files={values.images}
  onDrop={handleDrop}
  onRemove={handleRemove}
  onRemoveAll={handleRemoveAll}
  error={Boolean(touched.images && errors.images)}
/>;
