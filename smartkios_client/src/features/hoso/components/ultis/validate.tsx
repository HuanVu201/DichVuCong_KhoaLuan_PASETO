import { ID_SEPARATE } from "@/data";
import { fileApi } from "@/features/file/services";
import { getFileName } from "@/utils";
import { findWordFiles, findPDFFiles } from "@/utils/common"
import { toast } from "react-toastify";

export const validateDigitalSignatureFiles = async (filePaths: string) => {
    const pdfFiles = findPDFFiles(filePaths)
    const dinhKems = filePaths.split(ID_SEPARATE)
    if(!pdfFiles.length){
        toast.warn(<>
            <span>Vui lòng ký số trước khi số hoá.</span>
            {/* {wordFiles.map((file, idx) => (<p key={idx}>- {getFileName(file)}</p>))} */}
        </>)
        return false;
    }
    try {
        const { data: {
            data: {
                hasDigitalSinature
            }
        }} = await fileApi.VerifyDigitalSignature(dinhKems)
        if(!hasDigitalSinature){
            toast.warn(<>
                <span>Vui lòng ký số trước khi số hoá.</span>
            </>)
            return false
        }
    } catch {
        toast.warn(<>
            <span>Vui lòng ký số trước khi số hoá.</span>
        </>)
        return false;
    }
    
    // if(normalFiles.length > 0){
    //     toast.warn(<>
    //         <span>Không thể thực hiện số hóa do các tệp sau chưa ký số:</span>
    //         {normalFiles.map((file, idx) => (<p key={idx}>- {getFileName(file)}</p>))}
    //     </>)
    //     return false;
    // }
    return true
}