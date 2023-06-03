/**
 * shuffleArray
 * @param {Array<T>} arr
 * @param {boolean} isCreateCopy
 * @returns Array<T>
 */
export function shuffleArray(arr, isCreateCopy = false) {
  if (isCreateCopy) arr = arr.slice()
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.random() * (i + 1) | 0
    if (i !== j) [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
