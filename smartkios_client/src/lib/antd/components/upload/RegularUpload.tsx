import { FormInstance, Upload, UploadProps } from "antd";
import { getToken } from "@/lib/axios";
import { API_VERSION, HOST_PATH, UPLOADFILE_ENDPOINT } from "@/data";
import { AntdButton } from "../button/Button";
import { UploadOutlined } from "@ant-design/icons";
import { AntdSpace, FileUploadConfig } from "..";
import { useRegularUpload } from "./hooks/useRegularUpload";
import { ElementRef, Ref, useImperativeHandle, useState, RefObject, useMemo } from "react";
import React from "react";
import { usePickMaOCR } from "./hooks/usePickMaOcr";
import { useAppSelector } from "@/lib/redux/Hooks";
import { RcFile } from "antd/es/upload";
import { toast } from "react-toastify";
import { Service } from "@/services";
import { useLocation } from "react-router-dom";
import { SoHoaKetQuaProps } from "./components/SoHoaGiayToModal";
export type TrichXuatOCRMode = "fetch" | "modify";
export interface UploadRegularUploadProps extends UploadProps {
    fieldName: string;
    folderName: string;
    kySoToken? : boolean;
    kySoNEAC? : boolean;
    dinhKem?: string;
    form: FormInstance<any>
    extraElement?: React.ReactNode;
    hideUpload?: boolean;
    useSoHoa?:boolean;
    maTTHC?: string;
    dinhKemSoHoa?: string;
}

export type RegularUploadRef = {
    setTrichXuatDuLieuOCRModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SoHoaData = {
    maOcr: string | undefined;
    maKetQua: string | undefined;
    eFormKetQua: string | undefined;
    ketQuaThuTucId: string | undefined;
    tenGiayTo: string | undefined;
    loaiThoiHan: string | undefined;
    thoiHanMacDinh: number | undefined;
}

export const RegularUpload = React.forwardRef<RegularUploadRef, UploadRegularUploadProps>((props, ref) => {
    const {fieldName, folderName, kySoToken, kySoNEAC, dinhKem, form, extraElement, dinhKemSoHoa, hideUpload, maxCount, useSoHoa, maTTHC, accept} = props
    const [trichXuatDuLieuOCRModalVisible, setTrichXuatDuLieuOCRModalVisible] = useState<boolean>(false);
    const [soHoaVisible, setSoHoaVisible] = useState<boolean>(false);
    const [detailSoHoaDataVisible, setDetailSoHoaDataVisible] = useState<boolean>(false);
    const [soHoaData, setSoHoaData] = useState<SoHoaData>()
    const [dinhKemOCR, setDinhKemOCR] = useState<string>();
    const {publicModule} = useAppSelector(state => state.config)
    const {pathname} = useLocation()

    const beforeUploadConfig = useMemo(() : FileUploadConfig => {
        const fileConfig = publicModule?.find(x => x.code == "file_upload")?.content
        return fileConfig ? JSON.parse(fileConfig) : undefined
    }, [publicModule])

    const beforeUpload = (file: RcFile) => {
        if(!beforeUploadConfig){
            return true
        }
        const accept = beforeUploadConfig.accept
        const fileSize = beforeUploadConfig.size
        // const isCorrectFileType = file.type === 'image/jpeg' || file.type === 'image/png';
        const isCorrectFileType = pathname.includes(Service.primaryRoutes.portaldvc.root) ? accept.includes(file.type) : true;
        if (!isCorrectFileType) {
          toast.error(`Vui lòng chọn đúng định dạng tệp ${accept.join(", ")}`);
        }
        const isCorrectFileSize = file.size / 1024 / 1024 < fileSize;
        if (!isCorrectFileSize) {
            toast.error(`Vui lòng chọn tệp đính kèm có kích thước nhỏ hơn ${fileSize} MB`);
        }
        return isCorrectFileType && isCorrectFileSize;
      };

    
    const {KetQuaThuTucModal, showKetQuaThuTuc} = usePickMaOCR({
        maTTHC,
        showTrichXuatModal: () => setTrichXuatDuLieuOCRModalVisible(true),
        showSoHoaModal: () => setSoHoaVisible(true),
        setSoHoaData,
        soHoaData,
        setDinhKemOCR,
    })
    const {danhSachDinhKems, onChangeDinhKem, TrichXuatOCR, SoHoaKetQuaModal, ThongTinSoHoaModal} = useRegularUpload({
        dinhKemOCR, 
        setDinhKemOCR,
        fieldName, 
        soHoaData, 
        soHoaVisible, 
        showKetQuaThuTuc, 
        folderName, 
        kySoToken, 
        kySoNEAC, 
        dinhKem, 
        form, 
        hideUpload, 
        trichXuatDuLieuOCRModalVisible, 
        setTrichXuatDuLieuOCRModalVisible, 
        useSoHoa,
        closePickKetQuaModal: () => {
            setTrichXuatDuLieuOCRModalVisible(false)
            setSoHoaVisible(false)
        },
        setSoHoaVisible,
        dinhKemSoHoa,
        setDetailSoHoaDataVisible,
        detailSoHoaDataVisible,
    })
    useImperativeHandle(ref, () => ({
        setTrichXuatDuLieuOCRModalVisible,
        // setModeTrichXuat
    }), []);
    

    const onUploadFile: UploadProps["onChange"] = (info) => {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            onChangeDinhKem(info.file.response.data, undefined, "add")

        } else if (info.file.status === 'error') {
            // form.setFieldValue(fieldName, info.file.response.data)
        }
    }

    
    return <AntdSpace direction="vertical">
    {hideUpload ? null : <AntdSpace direction="horizontal">
        <Upload 
        accept={accept ? accept : beforeUploadConfig?.accept && pathname.includes(Service.primaryRoutes.portaldvc.root) ? beforeUploadConfig?.accept.join(", ") : "*/*"}
        name='Files'
        action={HOST_PATH + API_VERSION + UPLOADFILE_ENDPOINT} headers={{
            Authorization: `Bearer ${getToken()}`
        }} 
        beforeUpload={beforeUpload}
        showUploadList={false}
        maxCount={maxCount ?? 10} 
        data={{ FolderName: folderName }}
        onChange={onUploadFile} >
            <AntdButton icon={<UploadOutlined />}>Chọn tệp</AntdButton>
        </Upload>
        {extraElement}
    </AntdSpace>}
   
    {danhSachDinhKems}
    {TrichXuatOCR}
    {SoHoaKetQuaModal}
    {KetQuaThuTucModal}
    {ThongTinSoHoaModal}
</AntdSpace>
})