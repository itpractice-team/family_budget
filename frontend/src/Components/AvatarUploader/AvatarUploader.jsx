/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useRef } from 'react';

export default function AvatarUploader({ label, onChange, defaultImage, className }) {
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
    <div className={className}>
      <label>{label}</label>
      <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleFileChange} />
      <button type="button" onClick={handleChooseFile}>
        Выбрать файл
      </button>
      {currentImage && <img src={currentImage} alt="Аватар" />}
    </div>
  );
}
// Mark
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useState, useEffect, useRef } from 'react';

// export default function FileInput({ label, onChange, file = null }) {
//   const [currentFile, setCurrentFile] = useState(file);
//   const fileInput = useRef(null);
//   // eslint-disable-next-line no-unused-vars
//   useEffect(
//     (_) => {
//       if (file !== currentFile) {
//         setCurrentFile(file);
//       }
//     },
//     [file],
//   );

//   // eslint-disable-next-line no-shadow
//   const getBase64 = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       setCurrentFile(reader.result);
//       onChange(reader.result);
//     };
//     reader.onerror = function (error) {
//       console.log('Error: ', error);
//     };
//   };

//   return (
//     <div className="div">
//       <label className="label">{label}</label>
//       <input
//         className="fileInput"
//         type="file"
//         ref={fileInput}
//         onChange={(e) => {
//           // eslint-disable-next-line no-shadow
//           const file = e.target.files[0];
//           getBase64(file);
//         }}
//       />
//       <div
//         onClick={(_) => {
//           fileInput.current.click();
//         }}
//         className="button"
//         type="button"
//       >
//         Выбрать файл
//       </div>
//       {currentFile && (
//         <div
//           className="image"
//           style={{
//             backgroundImage: `url(${currentFile})`,
//           }}
//         />
//       )}
//     </div>
//   );
// }

// Andrey
// import { useState, useEffect, useRef } from 'react'

// export default function FileInput  ({ label, onChange, file = null, className })  {
//   const [ currentFile, setCurrentFile ] = useState(file)
//   const fileInput = useRef(null)
//   useEffect(_ => {
//     if (file !== currentFile) {
//       setCurrentFile(file)
//     }
//   }, [file])

//   const getBase64 = (file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//       setCurrentFile(reader.result)
//       onChange(reader.result)
//     };
//     reader.onerror = function (error) {
//       console.log('Error: ', error);
//     }
//   }

//   return <div className={cn(styles.container, className)}>
//     <label className={styles.label}>
//       {label}
//     </label>
//     <input
//       className={styles.fileInput}
//       type='file'
//       ref={fileInput}
//       onChange={e => {
//         const file = e.target.files[0]
//         getBase64(file)
//       }}
//     />
//     <div
//       onClick={_ => {
//         fileInput.current.click()
//       }}
//       className={styles.button}
//       type='button'
//     >
//       Выбрать файл
//     </div>
//     {currentFile && <div className={styles.image} style={{
//       backgroundImage: `url(${currentFile})`
//     }} />}
//   </div>
// }
