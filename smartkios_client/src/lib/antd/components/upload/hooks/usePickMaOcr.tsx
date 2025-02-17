import { IKetQuaThuTuc } from "@/features/ketquathutuc/models"
import { ketQuaThuTucService } from "@/features/ketquathutuc/services"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AntdModal, AntdSpace } from "../.."
import { Radio } from "antd"
import { RadioChangeEvent } from "antd/lib"
import { SoHoaData } from "../RegularUpload"


export const usePickMaOCR = ({maTTHC, showTrichXuatModal, showSoHoaModal, setSoHoaData, soHoaData, setDinhKemOCR}: {maTTHC: string | undefined; showTrichXuatModal: () => void; showSoHoaModal: () => void, setSoHoaData: React.Dispatch<React.SetStateAction<SoHoaData | undefined>>; soHoaData: SoHoaData | undefined, setDinhKemOCR: React.Dispatch<React.SetStateAction<string| undefined>>}) => {
    const [ketQuas, setKetQuas] = useState<IKetQuaThuTuc[]>()
    const [ketQuaThuTucVisible, setKetQuaThuTucVisible] = useState(false)
    useEffect(() => {
        (async () => {
            if(maTTHC) {
                const res = await ketQuaThuTucService.Search({maTTHC})
                if(res.data.data){
                    setKetQuas(res.data.data)
                }
            }
        })()
    }, [maTTHC])

    const onChangeKetQua = useCallback((e: RadioChangeEvent) => {
        const currentTarget = e.target as any
        
        setSoHoaData({
            maOcr: currentTarget["data-maocr"],
            eFormKetQua: currentTarget["data-eformketqua"],
            maKetQua: currentTarget.value,
            ketQuaThuTucId: currentTarget["data-id"],
            tenGiayTo: currentTarget["data-tengiayto"],
            loaiThoiHan: currentTarget["data-loaithoihan"],
            thoiHanMacDinh: currentTarget["data-thoihanmacdinh"],
        })
    }, [ketQuas])
    const handlerCancel = () => {
        setKetQuaThuTucVisible(false)
    }
    const onOk = () => {
        handlerCancel()
        if(soHoaData?.maOcr){
            showTrichXuatModal()
        } else {
            showSoHoaModal()
        }
    }
    

    const KetQuaThuTucModal = useMemo(() => {
        return ketQuaThuTucVisible && maTTHC ? <AntdModal handlerCancel={handlerCancel} visible={true} title={"CHỌN LOẠI KẾT QUẢ"} okText="Xác nhận" onOk={onOk}>
         <Radio.Group onChange={onChangeKetQua} >
            <AntdSpace direction="vertical">
                {ketQuas?.map((ketQua, idx) => {
                    return <Radio key={idx} value={ketQua.maKetQua} data-loaithoihan={ketQua.loaiThoiHan} data-thoihanmacdinh={ketQua.thoiHanMacDinh} data-tengiayto={ketQua.tenKetQua} data-id={ketQua.id} data-eformketqua={ketQua.eFormKetQua} data-maocr={ketQua.maNhanDienOCR}>{ketQua.maKetQua} - {ketQua.tenKetQua}</Radio>
                })}
            </AntdSpace>
        </Radio.Group>
        </AntdModal> : null
    }, [ketQuas, ketQuaThuTucVisible, maTTHC, soHoaData])

    const showKetQuaThuTuc = (fileOCR: string | undefined) => {
        setDinhKemOCR(fileOCR)
        setKetQuaThuTucVisible(true)
    }

    return {KetQuaThuTucModal, showKetQuaThuTuc}
}