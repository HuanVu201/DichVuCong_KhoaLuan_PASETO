import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { resetData } from "@/features/hoso/redux/slice"
import { useEffect, useRef, useState } from "react"
import { Modal } from "antd"
import { ISearchHoSo } from "@/features/hoso/models"
import { KetThucNhieuHoSoTBKM, SearchHoSo, ThuHoiHoSo, UpdateTrangThaiHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { hoSoApi } from "@/features/hoso/services"
import { AntdModal } from "@/lib/antd/components"
import dayjs from "dayjs";
import React from "react"

export const KetThucHoSoTBKMModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const buttonActionContext = useButtonActionContext()
    const ngayHienTai = dayjs();
    let dinhKemKetQua: string;
    const { datas: hoSos } = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    const initialRender = useRef(true);
    const handleCancel = () => {
        buttonActionContext.setKetThucHoSoTBKMModalVisible(false)
        dispatch(resetData())
    }

    const handleError = (data: Record<string, string>): boolean => {
        dispatch(resetData())
        const errorIds = Object.keys(data) || []
        const succeedIds = buttonActionContext.selectedHoSoKeyByTHTTs.filter(x => !errorIds.includes(x))

        buttonActionContext.setSelectedHoSoKeyByTHTTs(errorIds)
        buttonActionContext.setSelectedHoSos((curr) => {
            return curr.filter(x => !succeedIds.includes(x as string))
        })

        if (errorIds.length) {
            const dataKey: Record<string, string> = {}
            hoSos?.forEach(item => {
                if (errorIds.includes(item.id)) {
                    dataKey[item.id] = item.maHoSo
                }
            })
            const toastData = errorIds.map(key => {
                return <p>Hồ sơ <strong>{dataKey[key]}</strong>: {data[key]}</p>
            })
            toast.warn(<>{toastData.map((item, idx) => {
                return <React.Fragment key={idx}>{item}</React.Fragment>
            })}</>, { autoClose: 10000 })
        }
        if (succeedIds.length) {
            toast.success(`Kết thúc thành công ${succeedIds.length} hồ sơ`)
            return true
        }
      
        return false
    }

    console.log(buttonActionContext.selectedHoSoKeyByTHTTs);

    const onOK = async () => {
        try {
            setBtnLoading(true)
            const res = await dispatch(KetThucNhieuHoSoTBKM({
                data: { Ids: buttonActionContext.selectedHoSoKeyByTHTTs, trangThaiHoSoId: "10" }
            })).unwrap()
            // const res = await hoSoApi.KetThucNhieuHoSoTBKM({ data: { Ids: buttonActionContext.selectedHoSoKeyByTHTTs, trangThaiHoSoId: "10" } });
            console.log(res.succeeded);
            
            if (res.succeeded) {
                buttonActionContext.setKetThucHoSoTBKMModalVisible(false)
                setSearchHoSoParams(cur => ({ ...cur }))
                return handleError(res.data)
            }
            return res.succeeded
            setBtnLoading(false)
        } catch (error) {
            console.error(error)
            return false
        }
    }
    return (
        <AntdModal confirmLoading={btnLoading} onOk={onOK} visible={buttonActionContext.ketThucHoSoTBKMModalVisible} title="" handlerCancel={handleCancel} >
            {buttonActionContext.selectedHoSos.length > 1 ?
                <div className="text-center" style={{ color: 'rgb(28 26 18)', fontWeight: 500, textAlign: 'center', fontSize: '18px' }}>Xác định kết thúc các hồ sơ đã chọn</div>
                :
                <div className="text-center" style={{ color: 'rgb(28 26 18)', fontWeight: 500, textAlign: 'center', fontSize: '18px' }}>Xác định kết thúc hồ sơ có Mã hồ sơ: <span style={{ color: '#ad1616', fontWeight: '600' }}>{buttonActionContext.selectedHoSo?.maHoSo}</span></div>

            }
        </AntdModal>
    )
}