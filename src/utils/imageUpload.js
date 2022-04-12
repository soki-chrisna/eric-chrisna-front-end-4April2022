export const setUploadedImagePreview = ({
  imageFile, callback
}) => {
  let imageURL;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    imageURL = reader.result;
    callback(imageURL);
  });
  reader.readAsDataURL(imageFile);
};
