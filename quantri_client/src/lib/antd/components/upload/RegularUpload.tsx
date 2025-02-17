import { FormInstance, Upload, UploadProps } from "antd";
import { getToken } from "@/lib/axios";
import { API_VERSION, HOST_PATH, HOST_PATH_FILE, UPLOADFILE_ENDPOINT } from "@/data";
import { AntdButton } from "../button/Button";
import { FileAddFilled, UploadOutlined } from "@ant-design/icons";
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
import { PickNameScanPC } from "./modals/PickNameScanPC";
import { scanPCHandler } from "@/utils/scanpc";
import axiosInstanceFile, { uploadFile } from "@/lib/axios/fileInstance";
export type TrichXuatOCRMode = "fetch" | "modify";
export interface UploadRegularUploadProps extends UploadProps {
    fieldName: string;
    folderName: string;
    scanPC?: boolean
    kySoToken?: boolean;
    kySoNEAC?: boolean;
    dinhKem?: string;
    form: FormInstance<any>
    extraElement?: (loading: boolean) => React.ReactNode;
    hideUpload?: boolean;
    useSoHoa?: boolean;
    maTTHC?: string;
    dinhKemSoHoa?: string;
    addKhoTaiLieuCaNhanVisible?: boolean
    maLinhVuc?: string
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
    const { fieldName, scanPC, folderName, kySoToken, kySoNEAC, dinhKem, form, extraElement, dinhKemSoHoa, hideUpload, maxCount, useSoHoa, maTTHC, accept, addKhoTaiLieuCaNhanVisible, maLinhVuc } = props
    const [trichXuatDuLieuOCRModalVisible, setTrichXuatDuLieuOCRModalVisible] = useState<boolean>(false);
    const [soHoaVisible, setSoHoaVisible] = useState<boolean>(false);
    const [detailSoHoaDataVisible, setDetailSoHoaDataVisible] = useState<boolean>(false);
    const [soHoaData, setSoHoaData] = useState<SoHoaData>()
    const [dinhKemOCR, setDinhKemOCR] = useState<string>();
    const { publicModule } = useAppSelector(state => state.config)
    const { pathname } = useLocation()
    const [btnLoading, setBtnLoading] = useState(false)
    const { data: user } = useAppSelector(state => state.user)
    const beforeUploadConfig = useMemo((): FileUploadConfig => {
        const fileConfig = publicModule?.find(x => x.code == "file_upload")?.content
        return fileConfig ? JSON.parse(fileConfig) : undefined
    }, [publicModule])

    const beforeUpload = (file: RcFile) => {
        if (!beforeUploadConfig) {
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


    const { KetQuaThuTucModal, showKetQuaThuTuc } = usePickMaOCR({
        maTTHC,
        showTrichXuatModal: () => setTrichXuatDuLieuOCRModalVisible(true),
        showSoHoaModal: () => setSoHoaVisible(true),
        setSoHoaData,
        soHoaData,
        setDinhKemOCR,
    })
    const { danhSachDinhKems, onChangeDinhKem, TrichXuatOCR, SoHoaKetQuaModal, ThongTinSoHoaModal } = useRegularUpload({
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
        closePickKetQuaModal: (data) => {
            setTrichXuatDuLieuOCRModalVisible(false)
            setSoHoaVisible(false)
        },
        setSoHoaVisible,
        dinhKemSoHoa,
        setDetailSoHoaDataVisible,
        detailSoHoaDataVisible,
        addKhoTaiLieuCaNhanVisible: addKhoTaiLieuCaNhanVisible,
        maLinhVuc: maLinhVuc,
    })
    useImperativeHandle(ref, () => ({
        setTrichXuatDuLieuOCRModalVisible,
        // setModeTrichXuat
    }), []);


    const onUploadFile: UploadProps["onChange"] = (info) => {
        if (info.file.status == "uploading") {
            setBtnLoading(true)
        }
        else if (info.file.status === 'done') {
            onChangeDinhKem(info.file.response.data, undefined, "add")
            setBtnLoading(false)
        }
        else if (info.file.status == "error") {
            setBtnLoading(false)
        }
    }
    const onScanFile = (fileName: string) => {
        if (folderName) {
            scanPCHandler(fileName ?? "scanned-file.pdf", folderName, (newFile) => {
                onChangeDinhKem(newFile, undefined, "add")
            })
        } else {
            console.error("không tìm thấy file đã tải lên")
        }
    }

    return <div style={{ display: "flex", flexDirection: "column" }}>
        {hideUpload ? null : <AntdSpace direction="horizontal">
            <Upload
                accept={accept ? accept : beforeUploadConfig?.accept && pathname.includes(Service.primaryRoutes.portaldvc.root) ? beforeUploadConfig?.accept.join(", ") : "*/*"}
                name='Files'
                customRequest={({file, onSuccess, onError}) => uploadFile(file as RcFile, folderName, onSuccess, onError)}
                // action={HOST_PATH_FILE + API_VERSION + UPLOADFILE_ENDPOINT} headers={{
                //     Authorization: `Bearer ${getToken()}`
                // }}
                beforeUpload={beforeUpload}
                showUploadList={false}
                maxCount={maxCount ?? 35}
                data={{ FolderName: folderName }}
                onChange={onUploadFile} >
                <AntdButton icon={<UploadOutlined />} loading={btnLoading}>Chọn tệp</AntdButton>
            </Upload>
            {extraElement ? extraElement(btnLoading) : null}
            {scanPC ? <PickNameScanPC onScanFile={onScanFile} loading={btnLoading}></PickNameScanPC> : null}
        </AntdSpace>}

        {beforeUploadConfig?.size && !hideUpload ? <i className='warningDungLuong' style={{ fontSize: 13, color: "tomato", marginTop: 0 }}>Dung lượng tối đa: {beforeUploadConfig.size} MB</i> : null}
        {danhSachDinhKems}
        {TrichXuatOCR}
        {SoHoaKetQuaModal}
        {KetQuaThuTucModal}
        {ThongTinSoHoaModal}



    </div>
})