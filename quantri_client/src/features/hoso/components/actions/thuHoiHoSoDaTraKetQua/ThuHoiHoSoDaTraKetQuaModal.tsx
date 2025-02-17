import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { resetData } from "@/features/hoso/redux/slice"
import { useEffect, useRef, useState } from "react"
import { Modal } from "antd"
import { ISearchHoSo } from "@/features/hoso/models"
import { SearchHoSo, ThuHoiHoSo, UpdateTrangThaiHoSo } from "@/features/hoso/redux/action"
import { toast } from "react-toastify"
import { hoSoApi } from "@/features/hoso/services"
import { AntdModal } from "@/lib/antd/components"

export const ThuHoiHoSoDaTraKetQuaModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const initialRender = useRef(true);
    const [btnLoading, setBtnLoading] = useState(false)

    const handleCancel = () => {
        buttonActionContext.setThuHoiHoSoDaTraKetQuaModalVisible(false)
        dispatch(resetData())
    }

    const onOK = async () => {
        try {
            setBtnLoading(true)
            const res = await hoSoApi.UpdateTrangThaiHoSo({ id: buttonActionContext.selectedHoSo?.id, trangThaiHoSoId: "9" });
            if (res.data) {
                toast.success("Thu hồi hồ sơ thành công")
                handleCancel()
                setSearchHoSoParams(cur => ({ ...cur }))
            }
            setBtnLoading(false)
        } catch (error) {
            setBtnLoading(false)
            console.log(error);
        }
    }
    return (
        <AntdModal onOk={onOK} confirmLoading={btnLoading} visible={buttonActionContext.thuHoiHoSoDaTraKetQuaModalVisible} title="" handlerCancel={handleCancel} >
            <div className="text-center" style={{ color: 'rgb(28 26 18)', fontWeight: 500, textAlign: 'center', fontSize: '18px' }}>Xác định thu hồi hồ sơ có Mã hồ sơ: <span  style={{color : '#ad1616',fontWeight : '600'}}>{buttonActionContext.selectedHoSo?.maHoSo}</span></div>
        </AntdModal>
    )
}