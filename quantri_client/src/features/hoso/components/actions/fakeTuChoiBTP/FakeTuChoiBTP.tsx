import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { hoSoApi } from "@/features/hoso/services"
import { AntdModal } from "@/lib/antd/components"
import React from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { ISearchHoSo } from "@/features/hoso/models"
import { useAppSelector } from "@/lib/redux/Hooks"

const FakeTuChoiBTP = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const [loading, setLoading] = useState(false)
    const handlerCancel = () => {
        buttonActionContext.setFakeTuChoiBTPHoSoModalVisible(false);
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        if(buttonActionContext.selectedHoSos.length && buttonActionContext.selectedHoSos.length == 1){
            try {
                setLoading(true)
                const maHoSo = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])?.maHoSo
                if(!maHoSo){
                    toast.info("Có lỗi xảy ra khi lấy mã hồ sơ")
                    return 
                }
                const res = await hoSoApi.FakeTuChoiBTP(maHoSo)
                if(res.data.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    buttonActionContext.setSelectedHoSos([])
                    buttonActionContext.setFakeTuChoiBTPHoSoModalVisible(false)
                    toast.success(res.data.data)
                } else {
                    toast.info(res.data.message || "Thao tác thất bại")
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
    }
    return <AntdModal confirmLoading={loading} okText={"Xác nhận"} cancelText="Hủy" maskClosable={false} onOk={onOk}
         title={"XÁC NHẬN TỪ CHỐI HỒ SƠ LIÊN THÔNG KHAI SINH KHAI TỬ ĐÃ TIẾP NHẬN"} visible={true} handlerCancel={handlerCancel}>
    </AntdModal>
}

export default FakeTuChoiBTP