/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef } from 'react';
import './AvatarUploader.scss';

export default function AvatarUploader({ onChange, defaultImage }) {
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const fileInput = useRef(null);

  useEffect(() => {
    if (defaultImage !== currentImage) {
      setCurrentImage(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setCurrentImage(reader.result);
        onChange(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };

  const handleChooseFile = () => {
    fileInput.current.click();
  };

  return (
    <div className="uploader">
      <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
      <button className="button-download" type="button" onClick={handleChooseFile} />
      {currentImage && <img className="uploaded-avatar" src={currentImage} alt="Аватар" />}
    </div>
  );
}
