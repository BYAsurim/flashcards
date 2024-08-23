/**
 * Сохраняет объект URLSearchParams в sessionStorage в формате query строки.
 * @param {URLSearchParams} params - Объект URLSearchParams для сохранения.
 */
export const saveSearchParamsToSessionStorage = (params: URLSearchParams) => {
  params.forEach((value, key) => {
    // Сохраняем каждый параметр в sessionStorage под ключом key
    sessionStorage.setItem(key, value)
  })
}
