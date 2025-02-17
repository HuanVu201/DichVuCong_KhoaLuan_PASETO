import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchPublicConfig } from "../config/redux/action";
import { fileApi } from "../file/services";

const Filepublic = () => {
    const [filePublic, setFilePublic] = useState<Blob>()
    const [searchQuerys, setSearchQuerys] = useSearchParams();
    const pathFilePublic = searchQuerys.get('filepublic')
    // /dichvucong/2024/8/27/H56.14-240823-0001/64418eda-fee6-4dd8-b54f-01e5f3dd9c37/response_(1).pdf
    useEffect(() => {
        if (pathFilePublic) {
            const valueGetDocx = fileApi.GetFilePublicByte({ path: pathFilePublic })
            valueGetDocx.then(function (result) {
                console.log(result.data)
                setFilePublic(result.data)
            }).catch(function (error) {
                console.log(error);
            });
        }

    }, [pathFilePublic])

    return (
        <div style={{
            border: '1px solid #333', borderRadius: '8px', display: 'flex',
            justifyContent: 'center', alignItems: 'center', minHeight: '100px'
        }}>
            {filePublic ?
                <iframe
                    src={URL.createObjectURL(filePublic)}
                    width="100%"
                    height="1000px"
                    title="PDF Preview"
                />
                : <center><b>(Không có)</b></center>
            }

        </div>
    )
}

export default Filepublic


