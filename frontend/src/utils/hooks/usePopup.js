import { useDispatch, useSelector } from 'react-redux';
import { togglePopup } from '../../store/slices/togglePopupSlice';

const usePopup = (popupType) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isOpen);

  const handleOpenPopup = () => {
    dispatch(togglePopup({ popupType, isOpen: true }));
  };

  const handleClosePopup = () => {
    dispatch(togglePopup({ popupType, isOpen: false }));
  };

  return { isOpen: isOpen[popupType], openPopup: handleOpenPopup, closePopup: handleClosePopup };
};

export default usePopup;
