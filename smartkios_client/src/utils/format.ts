
export const getCurrency = (value: string | number, separate: string = ",") => {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separate) ?? 0
  }

export const getFileName = (filePath: string) => {
  return filePath?.substring(filePath.lastIndexOf("/") + 1)
}
export const leading0 = (so: number) => {
  if (so < 10) {
      return "0" + so;
  } else {
      return so.toString();
  }
}