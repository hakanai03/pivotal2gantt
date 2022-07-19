
export const readFile  = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = (err) => {
      reject(err)
    }
  })
}
