import { ConvertDocxToPdfEXTType, ConvertDocxToPdfParams, fileApi } from "@/features/file/services";
import axios from "axios";
import { getFileName } from "./format";

export async function getUrlFromBlob(url: string) {
  const response = await fileApi.GetFileByte({ path: url })
  const fileURL = window.URL.createObjectURL(response.data);
  return fileURL
}


export async function getUrlFromBlobPublic(url: string) {
  const response = await axios.get(url, { responseType: "blob" });

  const fileURL = window.URL.createObjectURL(response.data);

  return fileURL
}

export async function getBase64UrlFromBlob(url: string) {
  const response = await fileApi.GetFileByte({path: url});

  const base64Url = await blobToBase64Url(response.data);

  return base64Url;
}

function blobToBase64Url(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // Base64 URL
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
}

export async function getFile(url: string) {
  const response = await fileApi.GetFileByte({ path: url })
  return response.data
}

export async function addPagePDF(url: string) {
  const response = await fileApi.AddPagePdf({ path: url })
  return response.data
}

export function jsonToXml(json: any, rootElement: string = "root"): string {
  let xml = `<${rootElement}>`;

  for (let key in json) {
      if (json.hasOwnProperty(key)) {
          if (typeof json[key] === "object" && !Array.isArray(json[key])) {
              xml += jsonToXml(json[key], key);
          } else if (Array.isArray(json[key])) {
              json[key].forEach((item: any) => {
                  xml += `<${key}>`;
                  xml += jsonToXml(item, key);
                  xml += `</${key}>`;
              });
          } else {
              xml += `<${key}>${json[key]}</${key}>`;
          }
      }
  }

  xml += `</${rootElement}>`;
  return xml;
}

export function downloadXmlFile(data: any, fileName: string = "file.xml") {
  // Chuyển đổi dữ liệu JSON thành chuỗi XML
  const xmlString = jsonToXml(data);

  // Tạo đối tượng Blob từ chuỗi XML
  const blob = new Blob([xmlString], { type: "application/xml" });

  // Tạo URL từ Blob
  const fileURL = window.URL.createObjectURL(blob);

  // Tạo thẻ <a> và thiết lập thuộc tính tải xuống
  const link = document.createElement("a");
  link.href = fileURL;
  link.download = fileName; // Tên file bạn muốn tải xuống, mặc định là 'file.xml'

  // Thêm thẻ <a> vào document body
  document.body.appendChild(link);

  // Kích hoạt sự kiện click để tải xuống file
  link.click();

  // Xóa thẻ <a> sau khi đã tải xuống
  document.body.removeChild(link);

  // Thu hồi URL object sau khi tải xuống để giải phóng bộ nhớ
  window.URL.revokeObjectURL(fileURL);
}

export function blobToBase64(blob: Blob) {
  return new Promise((resolve: (value: string | ArrayBuffer | null) => void, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function downloadJsonFile(data: any, fileName: string = 'file.json') {
  const jsonString = JSON.stringify(data, null, 2); 

  const blob = new Blob([jsonString], { type: 'application/json' });

  const fileURL = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = fileURL;
  link.download = fileName; 

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(fileURL);
}

export async function getPdfFileUrlFromBlob(base64: string, fileUrl: string, openWhenDone: boolean = true, fileName?: string) {

  const response = await fileApi.ConvertDocxToPdf({ data: base64, fileUrl })
  const fileURL = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = fileURL;
  link.download = fileName as any;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  var tab;
  if (!fileName)
     tab = window.open();
  if (tab && openWhenDone) {
    tab.location.href = fileURL;
    tab.focus()
    tab.print()
  }
  window.URL.revokeObjectURL(fileURL);

}

export async function uploadBase64DocxAsPdfToServer(base64: string, fileUrl: string, folderName: string, onDone: (fileUploadedName: string) => void) {
  const response = await fileApi.UploadDocxAsPdf({ folderName, fileUrl, data: base64 })

  if (response.data?.data) {
    onDone(response.data.data)
  }
}

export async function callApiAndDisplayFile(filePath: string) {
  // Gọi API để nhận file stream
  try {
    const fileURL = await getUrlFromBlob(filePath)
    let tab = window.open();
    if (tab) {
      // if(filePath.toLowerCase().endsWith(".pdf")){
      //   tab.location.href = fileURL;
      //   var a = document.createElement("a");
      //   document.body.appendChild(a);
      //   a.href = fileURL;
      //   a.download = getFileName(filePath);
      //   a.click();
      // } else {
      //   tab.location.href = fileURL;
      // }
      tab.location.href = fileURL;
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function callApiAndDownload(filePath: string) {
  // Gọi API để nhận file stream
  try {
    const fileURL = await getUrlFromBlob(filePath)
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = fileURL;
    a.download = getFileName(filePath);
    a.click();
    URL.revokeObjectURL(fileURL)
  } catch (error) {
    console.error('Error:', error);
  }
}
export async function callApiAndDisplayPublicFile(filePath: string) {
  // Gọi API để nhận file stream
  try {
    let tab = window.open();
    if (tab) {
      tab.location.href = filePath;

    }
  } catch (error) {
    console.error('Error:', error);
  }
}