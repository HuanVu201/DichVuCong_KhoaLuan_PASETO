import axiosInstance from "@/lib/axios";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IResult } from "@/models";
import { Service } from "@/services";

export type VerifyDigitalSignatureResponse = {
    hasDigitalSinature: boolean;
    digitalSignatureFiles: string[];
    normalFiles: string[];
}

export const ConvertDocxToPdfEXTType = {
    ".doc" : 0,
    ".docx" : 2,
} as const

export type ConvertDocxToPdfParams = {
    data: string,
    fileUrl : string
}

class FileService extends Service.BaseApi {
    constructor() {
        super("files")
    }
    private GetFileName(fileUrl: string) {
        const fileName = fileUrl.toLowerCase().substring(fileUrl.lastIndexOf("/") + 1)
        return fileName
    }
    GetFile(params: { path: string }): AxiosResponseWrapper<any> {
        return axiosInstance.get(this._urlSuffix + "/getfilebucket", { params, responseType: "blob" })
    }
    AddPagePdf(params: { path: string }): AxiosResponseWrapper<any> {
        return axiosInstance.get(this._urlSuffix + "/addpagepdf", { params, responseType: "blob" })
    }

    RemoveFile(params: { path: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post(this._urlSuffix + "/removefilebucket", params)
    }
    ConvertDocxToPdf(params: ConvertDocxToPdfParams): AxiosResponseWrapper<any> {
        return axiosInstance.post(this._urlSuffix + "/convertdocxtopdf", {data: params.data, fileName: this.GetFileName(params.fileUrl)}, { responseType: "blob" })
    }
    UploadDocxAsPdf(params: { data: string, fileUrl: string, folderName: string }): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.post<IResult<any>>(this._urlSuffix + "/uploadpdfbucket", {...params, fileName: this.GetFileName(params.fileUrl)})
    }
    VerifyDigitalSignature(filePath: string[]): AxiosResponseWrapper<IResult<VerifyDigitalSignatureResponse>> {
        return axiosInstance.post<IResult<VerifyDigitalSignatureResponse>>(this._urlSuffix + "/verifydigitalsignature", { filePaths: filePath }, {
            paramsSerializer: {
                indexes: null
            }
        })
    }
}

export const fileApi = new FileService()