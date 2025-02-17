import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo } from "@/features/hoso/models"
import { OCRData, hoSoApi } from "@/features/hoso/services"
import { AntdDivider, AntdModal } from "@/lib/antd/components"
import { SoHoaData, TrichXuatOCRMode, UploadRegularUploadProps } from "@/lib/antd/components/upload/RegularUpload"
import { Eform } from "@/lib/eform"
import { FormInstance, Spin } from "antd"
import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { SoHoaKetQuaProps, SoHoaGiayToModal, SoHoaKetQuaRef } from "./SoHoaGiayToModal"
import { RenderTitle } from "@/components/common"
import { formatDateStringToDate } from "../ultis"
import dayjs from 'dayjs'

const TrichXuatOCRModal = ({ dinhKemSoHoa, handleClose, dinhKem, soHoaData, closePickKetQuaModal }: { closePickKetQuaModal?: () =>void;soHoaData: SoHoaData; dinhKem: string | undefined; dinhKemSoHoa: string | undefined; handleClose: () => void }) => {
    const [ocrData, setOcrData] = useState<OCRData>()
    const [ocrLoading, setOcrLoading] = useState(false)
    const soHoaRef = useRef<SoHoaKetQuaRef>(null)
    useEffect(() => {
        (async () => {
            if (dinhKemSoHoa && soHoaData.maOcr && soHoaData.ketQuaThuTucId) {
                setOcrLoading(true)
                const res = await hoSoApi.GetDuLieuOCR({ id: soHoaData.ketQuaThuTucId, fileUrl: dinhKemSoHoa, maNhanDienOCR: soHoaData.maOcr })
                const data = res.data.data
                if (res.data.succeeded) {
                    const eFormKetQuaData = data.eFormKetQuaData ? JSON.parse(data.eFormKetQuaData) : undefined
                    const eFormKetQua = data.eFormKetQua ? JSON.parse(data.eFormKetQua) : undefined
                    setOcrData({ eFormKetQua: eFormKetQua, eFormKetQuaData: eFormKetQuaData ? eFormKetQuaData : undefined } as any)
                    setOcrLoading(false)
                    const ngayBanHanh = formatDateStringToDate(eFormKetQuaData.data?.NgayBanHanh)
                    soHoaRef.current?.setData({
                        ...eFormKetQuaData.data, 
                        soKyHieu: eFormKetQuaData.data?.SoChungChi ?? eFormKetQuaData.data?.SoKetQua,
                        nguoiKy: eFormKetQuaData.data?.NguoiKy,
                        coQuanBanHanh: eFormKetQuaData.data?.CoQuanBanHanh,
                        ngayBanHanh: ngayBanHanh,
                        thoiHanHieuLuc: dayjs(ngayBanHanh).add(soHoaData.thoiHanMacDinh || 6, soHoaData.loaiThoiHan || "month" as any),
                    })
                }
            }
            // }
        })()
    }, [soHoaData, dinhKemSoHoa])

    const handlerCancel = () => {
        handleClose()
        setOcrData(undefined)
    }

    const onOk = async () => {
        // gọi api cập nhật đã số hóa hồ sơ
        soHoaRef.current?.setOCRData(JSON.stringify(ocrData?.eFormKetQuaData))
        soHoaRef.current?.onSubmit()
        // handlerSave(JSON.stringify(ocrData?.eFormKetQuaData), JSON.stringify(ocrData?.eFormKetQua))
        // handlerCancel()
    }


    return <AntdModal visible={true} title={"TRÍCH XUẤT DỮ LIỆU OCR"} fullsizeScrollable handlerCancel={handlerCancel} cancelText="Đóng" okText="Số hóa" onOk={onOk}>

        <Spin spinning={ocrLoading}>
            {ocrData?.eFormKetQua && ocrData.eFormKetQuaData ?
                <>
                    <RenderTitle title="Dữ liệu trích xuất" />
                    <Eform form={ocrData.eFormKetQua as any} submission={ocrData.eFormKetQuaData as any} ></Eform>
                </>
                : null}
        </Spin>
        <AntdDivider/>
        <RenderTitle title="Thông tin số hóa" />
        <SoHoaGiayToModal closePickKetQuaModal={closePickKetQuaModal} soHoaData={soHoaData} ref={soHoaRef} dinhKem={dinhKem} dinhKemSoHoa={dinhKemSoHoa} hideSubmitBtn={true}/>
    </AntdModal>
}

export default TrichXuatOCRModal