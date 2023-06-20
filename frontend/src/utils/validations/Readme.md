## Валидация на двух китах: yup и react-hook-form.  

yup https://www.npmjs.com/package/yup  
react-hook-form https://react-hook-form.com/ 

**работа и подключение**  
react-hook-form - Хук, который подключается непосредственно в компоненте с формой. Под капотом сразу вшит весь набор для подключения к инпутам. По факту компонент чистенький и без лишнего кода, а вся обработка идёт под капотом хука.
yup - классическая библиотека валидации. Выбрал... ну потому что с joi тоже игрался и разницы не увидел. 

*и так. Как же добавляем?*

В utils/validation содержатся все функции ручной валидации и обработка yup-ом.
В Компоненте подключаем:

 - import { useForm } from 'react-hook-form'; ----------хук
 - import { yupResolver } from '@hookform/resolvers/yup';  ------------сцепка yup и хука 
 - import ...Validation from '../../utils/validations/...Validation';  - ручные функции и константы yup
 - Добавляется примерно следующий "регистр" от хука, где и происходит вся валидация:  
   const {  
    register,       /////////Функция register будет принимать значение, которое пользователь ввел в каждое поле, и проверять его.   
                    /////////register также передаст каждое значение в функцию, которая будет вызвана при отправке формы.  
    formState:      //////// описываем что у нас будет с формой  
    { errors, isValid }, //////// ошибки валидации, приходящие из yup и кастом функций, и общее значение нашей формы   
    handleSubmit,        //////// отправка формы. Она идёт через хук, а уже из этой функции вызов всей остальной логики   
                         //////// (например отправка данных на сервер вызовется через handleSubmit)  
    watch,              ТУТ включаются дополнительная функция(anotherValidationFunc,),  
                         //////// например, запрет на одинаковые поля. Описание включения функции ниже  
  } = useForm({          //////// Когда призываем логику и чем обрабатываем  
    mode: 'onChange',    //////// Тут при любом изменении (ещё пачка вариантов в документации)  
    resolver: yupResolver(.....Validation),     ////// проверяет всё yup и кусто-функции  
  });  

*В разметке:*

<input   
    {...register('loginOrEmail')}   
/> ///Вызвали регистр (т.е. хук), передали имя валидируемого? по которому отрабатыввает yup  
<span className={`error ${errors.loginOrEmail ? 'form__active' : ''}`}>  
{errors?.loginOrEmail && errors?.loginOrEmail?.message}  
</span> Вывод ошибки, если есть текст ошибки  

<button  
        className={`form__button ${(!isValid || !errors) && 'form__button_disabled'}`}  
        disabled={!isValid || !errors}  
>   ////Блок кнопки и формы при ошибке валидации  


**Вот такой хитрый способ добавления кустомных функций в хук (Увы, но лучше не нашёл)(плак)**
  useEffect(() => {  
    const subscription = watch((value) => {  
      if (user.name === value.name && user.email === value.email) {  
        setMessage("Необходимо внести изменения");  
        setDisableButton(true);  
        return;  
      } else if (disableButton) {  
        setDisableButton(false);  
      }  
    });  
    return () => subscription.unsubscribe();  
  }, [watch]);
