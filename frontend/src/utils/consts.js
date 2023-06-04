export const RegExLogin = '[da-zA-Zа-яА-ЯЁё/_.+-]+';
export const RegExEmail = '[da-zA-Z_.@-]+';
export const RegExName = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExSurname = '[^d!@#$%|^&*\\/()_+\n\t]+';
export const RegExPassword = '[da-zA-Z_ .!"#$%&,-]+';
export const RegExPhone = '[d+()]+';
export const RegExSpendOperationName = '[a-zA-Zа-яА-ЯЁё]+';
export const RegExEarnOperationName = '[a-zA-Zа-яА-ЯЁё‐— -]+';
export const RegExOperationAmount = '[d]+';

export const RequirementsLogin =
  'Прописные и строчные латинские буквы, цифры, _, ., +, -, без пробелов, минимальное количество символов - 2, максимальное - 25';
export const RequirementsEmail =
  'Цифры, латинские буквы, специальные символы: -, _, .,  минимальное количество символов - 7, максимальное - 129';
export const RequirementsPassword =
  'Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру';
export const RequirementsNameAndSurname =
  'Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру';
