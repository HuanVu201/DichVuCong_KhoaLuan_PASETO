import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { DuLieuTraCuuBTP, hoSoApi } from "@/features/hoso/services"
import { AntdButton, AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Spin, Tag, Typography } from "antd"
import React from "react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useColumn } from "./hooks/useColumn"
import { ISearchHoSo } from "@/features/hoso/models"
import dayjs from "dayjs"
import { FORMAT_DATE } from "@/data"
import { setThoiGianTraCuuBTP } from "@/features/hoso/redux/slice"

const TraCuuBTP = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const [datas, setDatas] = useState<DuLieuTraCuuBTP[]>()
    const [searchParams, setSearchParams] = useState<ISearchHoSo>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumn()
    const handlerCancel = () => {
        buttonActionContext.setTraCuuBTPHoSoModalVisible(false);
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        if(buttonActionContext.selectedHoSos.length){
            const maHoSos = hoSos?.filter(x => buttonActionContext.selectedHoSos.includes(x.id)).flatMap(x => x.maHoSo);
            if(maHoSos){
                try {
                    setLoading(true)
                    const res = await hoSoApi.LayKetQuaBTP(maHoSos)
                    const resData = res.data.data
                    if(res.data.data){
                        dispatch(setThoiGianTraCuuBTP(dayjs().format()))
                        setDatas(resData)
                        setSearchHoSoParams((curr) => ({...curr}))
                        buttonActionContext.setSelectedHoSos([])
                    }
                    setLoading(false)
                } catch (error) {
                    setLoading(false)
                    console.log(error);
                }
            } else {
                toast.warn("có lỗi xảy ra trong quá trình lấy mã hồ sơ")
            }
        }
    }
    return <AntdModal confirmLoading={loading} 
        footer={<AntdSpace direction="horizontal">
            <AntdButton key={"1"} onClick={handlerCancel}>Hủy</AntdButton>       
            <AntdButton key={"2"} onClick={onOk} type="primary" disabled={datas != undefined}>Thực hiện tra cứu</AntdButton>       
        </AntdSpace>}
        width={1400} title={"TRA CỨU DỮ LIỆU HỒ SƠ LIÊN THÔNG BTP"} visible={true} handlerCancel={handlerCancel}>
        <AntdTable
            loading={loading}
            columns={columns as any}
            dataSource={datas as any}
            pagination={{
              total: datas?.length,
            }}
            rowKey={"maHoSoMCDT"}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => {}}
          />
    </AntdModal>
}

export default TraCuuBTP