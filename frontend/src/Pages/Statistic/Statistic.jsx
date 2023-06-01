/* eslint-disable jsx-a11y/control-has-associated-label */
import './Statistic.scss';
import { useState } from 'react';
// import Loader from '../../Components/Loader/Loader';
import AvatarUploader from '../../Components/AvatarUploader/AvatarUploader';
import { getCookie } from '../../utils/cookies';

export default function Statistic() {
  const [recipeFile, setRecipeFile] = useState(null);

  // const handleAvatarChange = async (imageData) => {
  //   try {
  //     const data = { avatar: imageData };

  //     const response = await fetch('https://familybudget.ddns.net/api/users/me/', {
  //       method: 'PATCH',
  //       headers: {
  //         authorization: `Token ${getCookie('token')}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (response.ok) {
  //       console.log('Аватар успешно изменен');
  //     } else {
  //       throw new Error('Ошибка при изменении аватара');
  //     }
  //   } catch (error) {
  //     console.error('Ошибка при изменении аватара:', error);
  //   }
  // };

  return (
    <section className="statistic">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            first_name: 'Mashulya',
            avatar: recipeFile,
          };
          const response = fetch('https://familybudget.ddns.net/api/users/me/', {
            method: 'PATCH',
            headers: {
              authorization: `Token ${getCookie('token')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            console.log('Аватар успешно изменен');
          } else {
            throw new Error('Ошибка при изменении аватара');
          }
        }}
      >
        <AvatarUploader
          label="Загрузить фото"
          onChange={(file) => {
            setRecipeFile(file);
          }}
        />
        <button type="submit" className="form__button form__button_submit">
          Изменить аватар
        </button>
      </form>
    </section>
  );
}
