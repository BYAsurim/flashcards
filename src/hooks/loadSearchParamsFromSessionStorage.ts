/**
 * Загружает параметры поиска из sessionStorage.
 *
 * @returns {URLSearchParams} Объект URLSearchParams, содержащий загруженные параметры,
 *                            или пустой объект URLSearchParams, если параметры не найдены.
 */
export const loadSearchParamsFromSessionStorage = () => {
  // Получаем строку параметров поиска из sessionStorage по ключу 'deckSearchParams'
  const paramsString = sessionStorage.getItem('deckSearchParams')

  // Если строка параметров существует, возвращаем новый объект URLSearchParams;
  // иначе возвращаем пустой объект URLSearchParams.
  return paramsString ? new URLSearchParams(paramsString) : new URLSearchParams()
}
