import { Popconfirm, Spin } from "antd"
import { SoHoaData, TrichXuatOCRMode, UploadRegularUploadProps } from "../RegularUpload"
import { ID_SEPARATE } from "@/data"
import { Suspense, useCallback, useMemo, useState } from "react"
import { AntdModal, AntdSpace } from "../.."
import { CheckCircleFilled, DeleteOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons"
import { callApiAndDisplayFile } from "@/utils"
import { btnSignClick } from "@/utils/common"
import React from "react"
import { toast } from "react-toastify"
import { fileApi } from "@/features/file/services"
import { SoHoaGiayToModal, SoHoaKetQuaProps } from "../components/SoHoaGiayToModal"
import { usePickMaOCR } from "./usePickMaOcr"
import { ThongTinSoHoa } from "../components/ThongTinSoHoa"
import { validateDigitalSignatureFiles } from "@/features/hoso/components/ultis/validate"

const TrichXuatOCRModalLazy = React.lazy(() => import("@/lib/antd/components/upload/components/TrichXuatOCRModal"))

export const useRegularUpload = (props: Pick<UploadRegularUploadProps, "fieldName" | "maTTHC" | "folderName" | "kySoToken" | "kySoNEAC" | "dinhKem" | "form" | "hideUpload" | "useSoHoa"> & {
    trichXuatDuLieuOCRModalVisible?: boolean;
    setTrichXuatDuLieuOCRModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    soHoaVisible?: boolean;
    setSoHoaVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    showKetQuaThuTuc?: (dinhKemORC: string | undefined) => void;
    soHoaData?: SoHoaData; 
    dinhKemOCR?: string | undefined;
    setDinhKemOCR?: React.Dispatch<React.SetStateAction<string | undefined>>;
    dinhKemSoHoa?: string;
    closePickKetQuaModal?: () => void;
    setDetailSoHoaDataVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    detailSoHoaDataVisible?: boolean;
    
}) => {
    const { folderName, dinhKemSoHoa, setDinhKemOCR, closePickKetQuaModal, setDetailSoHoaDataVisible, detailSoHoaDataVisible, dinhKemOCR, kySoToken, useSoHoa, soHoaData, showKetQuaThuTuc, maTTHC, kySoNEAC, dinhKem, hideUpload, fieldName, form, trichXuatDuLieuOCRModalVisible, setTrichXuatDuLieuOCRModalVisible, soHoaVisible, setSoHoaVisible } = props
    const onRemoveFile = async (fileName: string) => {
        // const res = await fileApi.RemoveFile({
        //     path: fileName
        // })
        // if (res.status === 200) {
            onChangeDinhKem(fileName, undefined, "remove")
            // setFileList ? setFileList((curr) => {
            //     return curr?.filter(file => file.response.data != fileName)
            // }) : null
        // }
    }
    const onChangeDinhKem = (fileName: string, oldFileName?: string, flag: "add" | "remove" | "override" = "add") => {
        const dinhKem: string | undefined = form.getFieldValue(fieldName)
        let newDinhKem = undefined;
        const danhSachDinhKem = dinhKem?.split(ID_SEPARATE)

        if (flag == "add") {
            newDinhKem = dinhKem ? dinhKem + ID_SEPARATE + fileName : fileName
        } else if (flag == "override" && oldFileName !== undefined) { // ký số thành công
            newDinhKem = danhSachDinhKem?.map(dinhKem => dinhKem == oldFileName ? fileName : dinhKem).join(ID_SEPARATE)
        } else if (flag == "remove") {
            newDinhKem = danhSachDinhKem?.filter(x => x != fileName).join(ID_SEPARATE)
        }
        form.setFieldValue(fieldName, newDinhKem ? newDinhKem : undefined)
    }

    const onSignKySoToken = useCallback(async (fileName: string) => {

        // const file = fileList?.find(file => file.response.data == fileName)
        if (fileName) {
            await btnSignClick(fileName, "KySo_" + folderName, (urlFileSigned, oldFileUrl) => {

                onChangeDinhKem(urlFileSigned, oldFileUrl, "override")

            })
        } else {
            console.error("không tìm thấy file đã tải lên")
        }
    }, [])
    const onClickSoHoa = useCallback(async (filePath: string) => {
        if (dinhKemSoHoa?.includes(filePath)){ // đã số hóa
            setDinhKemOCR ? setDinhKemOCR(filePath) : null
            setDetailSoHoaDataVisible ? setDetailSoHoaDataVisible(true) : null;
            return;
        }
        const isValid = await validateDigitalSignatureFiles(filePath);
        if(!isValid){
            return;
        }

        if (!filePath.toLowerCase().endsWith(".pdf")) {
            toast.info("Vui lòng tải tệp định dạng PDF")
            return;
        }
        showKetQuaThuTuc ? showKetQuaThuTuc(filePath) : null
    }, [soHoaData, dinhKemSoHoa])    

    const danhSachDinhKems = useMemo(() => {
        const danhSach: string[] = dinhKem ? dinhKem?.split(ID_SEPARATE) : []
        return <AntdSpace direction="vertical">
            {danhSach?.map((fileName, index) => {
                const daSoHoa = dinhKemSoHoa?.includes(fileName)
                return <AntdSpace direction="horizontal" key={index}>
                    <AntdSpace direction="horizontal" role="button" onClick={() => callApiAndDisplayFile(fileName)}>
                        <LinkOutlined />
                        <>{fileName.substring(fileName.lastIndexOf("/") + 1)}</>
                    </AntdSpace>
                    {hideUpload ? null : <Popconfirm
                        title='Xoá?'
                        onConfirm={() => {
                            onRemoveFile(fileName)
                        }}
                        okText='Xoá'
                        cancelText='Huỷ'
                    >
                        <DeleteOutlined style={{ color: "tomato" }} />
                    </Popconfirm>}
                    {kySoToken && !daSoHoa ? <span role="button" onClick={async () => await onSignKySoToken(fileName)} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45 }}>
                        <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span id={`check_daKySo_${fileName || ""}`}>Ký số</span></span>
                    </span> : null}
                    {/* {soHoaData?.maOcr && fileName.toLowerCase().endsWith(".pdf") ? <span role="button" onClick={() => onClickTrichXuatOCR(fileName)} style={{ backgroundColor: "#1677ff", borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45 }}>
                        <span style={{ whiteSpace: "nowrap" }}><EditOutlined /><span>Trích xuất OCR</span></span>
                    </span> : null} */}
                    {useSoHoa ? <span role="button" onClick={() => onClickSoHoa(fileName)} style={{ backgroundColor: daSoHoa ? "#10a338" : `#1677ff`, borderRadius: 4, padding: "0 4px", color: "#fff", minWidth: 45 }}>
                        <span style={{ whiteSpace: "nowrap" }}>{daSoHoa ? <CheckCircleFilled/> : <EditOutlined />}<span>{daSoHoa ? `Đã số hóa` : "Số hóa"}</span></span>
                    </span> : null}
                </AntdSpace>
            })}

        </AntdSpace>

    }, [dinhKem, hideUpload, soHoaData, dinhKemSoHoa])

    // dùng lại SoHoaKetQuaModal và tự động điền các thông tin lấy được từ api vào SoHoaKetQuaModal
    const TrichXuatOCR = useMemo(() => {
        return <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
            {trichXuatDuLieuOCRModalVisible && soHoaData?.maOcr ?
                <TrichXuatOCRModalLazy
                    handleClose={() => setTrichXuatDuLieuOCRModalVisible ? setTrichXuatDuLieuOCRModalVisible(false) : null}
                    dinhKemSoHoa={dinhKemOCR}
                    dinhKem={dinhKem}
                    soHoaData={soHoaData}
                    closePickKetQuaModal={closePickKetQuaModal}
                    />
                : null}
        </Suspense>
    }, [dinhKemOCR, trichXuatDuLieuOCRModalVisible, dinhKem, soHoaData])

    // base form kết quả số hóa (chưa dùng trích xuất), cung cấp các hooks qua ref để TrichXuatOCR dùng, là comps chính thực hiện
    // submit form
    const SoHoaKetQuaModal = useMemo(() => {
        return <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
            {soHoaVisible && !soHoaData?.maOcr && useSoHoa ?
                <AntdModal visible={true} title={"SỐ HÓA GIẤY TỜ"} footer={null} handlerCancel={() => setSoHoaVisible ? setSoHoaVisible(false) : null}>
                    <SoHoaGiayToModal closePickKetQuaModal={closePickKetQuaModal} soHoaData={soHoaData} hideSubmitBtn={false} dinhKem={dinhKem}dinhKemSoHoa={dinhKemOCR}/>
                </AntdModal>
                : null}
        </Suspense>
    }, [dinhKem, soHoaVisible, soHoaData, dinhKemOCR, closePickKetQuaModal, setSoHoaVisible])

    // hiển thị kết quả số hóa khi đã số hóa xong
    const ThongTinSoHoaModal = useMemo(() => {
        return <Suspense fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}>
            {detailSoHoaDataVisible && useSoHoa && dinhKemOCR?
                    <ThongTinSoHoa fileUrl={dinhKemOCR} handleClose={() => {
                        setDinhKemOCR ? setDinhKemOCR(undefined) : null
                        setDetailSoHoaDataVisible ? setDetailSoHoaDataVisible(false) : null
                    }}/>
                : null}
        </Suspense>
    }, [detailSoHoaDataVisible, dinhKemOCR])


    return { onChangeDinhKem, danhSachDinhKems, TrichXuatOCR, SoHoaKetQuaModal, ThongTinSoHoaModal }
}