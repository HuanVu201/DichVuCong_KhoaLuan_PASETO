import { ConvertDocxToPdfEXTType, ConvertDocxToPdfParams, fileApi } from "@/features/file/services";

export async function getUrlFromBlob(url: string) {
  const response =  await fileApi.GetFile({path:url})
  const fileURL = window.URL.createObjectURL(response.data);
  return fileURL
}

export async function getFile(url: string){
  const response =  await fileApi.GetFile({path:url})
  return response.data
}

export async function addPagePDF(url: string){
  const response = await fileApi.AddPagePdf({path: url})
  return response.data
}

export async function getPdfFileUrlFromBlob(base64: string, fileUrl: string, openWhenDone: boolean = true) {
  
  
  const response =  await fileApi.ConvertDocxToPdf({data:base64, fileUrl})
  const fileURL = window.URL.createObjectURL(response.data);
  let tab = window.open();
  if(tab && openWhenDone){
      tab.location.href = fileURL;
      tab.focus()
      tab.print()
  }
}

export async function uploadBase64DocxAsPdfToServer(base64: string, fileUrl: string, folderName: string, onDone: (fileUploadedName: string) => void) {
  const response =  await fileApi.UploadDocxAsPdf({folderName, fileUrl, data: base64})
  
  if(response.data?.data){
    onDone(response.data.data)
  }
}

export async function callApiAndDisplayFile(filePath: string) {
    // Gọi API để nhận file stream
    try {
        
        const fileURL = await getUrlFromBlob(filePath)
        let tab = window.open();
        if(tab){
            tab.location.href = fileURL;

        }
      } catch (error) {
        console.error('Error:', error);
      }
}