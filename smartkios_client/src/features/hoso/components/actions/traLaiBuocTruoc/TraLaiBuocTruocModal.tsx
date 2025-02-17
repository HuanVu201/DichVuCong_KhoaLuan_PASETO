import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo, TraLaiHoSo } from "@/features/hoso/redux/action"
import { resetData } from "@/features/hoso/redux/slice"
import { AntdModal, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import {  App } from "antd"
import React, { useEffect } from "react"

const TraLaiBuocTruocModal = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const { modal } = App.useApp();
    
    const dispatch = useAppDispatch()
    const handleCancel = () => {
        buttonActionContext.setTraLaiBuocTruocModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
        dispatch(resetData())
    }

    useEffect(() => {
        if(buttonActionContext.traLaiBuocTruocModalVisible){
            modal.confirm({
                okText:"Xác nhận trả",
                content: "Trả lại bước trước",
                // content: <AntdSpace direction="vertical">
                //     <div> Mã bước hiện tại: {hoSo.buocHienTai}</div>
                //     <div>Tên bước hiện tại: {hoSo.tenBuocHienTai}</div>
                //     {/* <div>Mã bước trước: {hoSo.buocXuLyTruoc}</div> */}
                // </AntdSpace>,
                onOk: async () => {
                    if(buttonActionContext.selectedHoSos.length){
                        const res = await dispatch(TraLaiHoSo(buttonActionContext.selectedHoSos[0] as string)).unwrap()
                        if(res.succeeded){
                            setSearchHoSoParams((curr) => ({...curr}))
                            handleCancel()
                        }
                    }
                },
                onCancel: () => {
                    handleCancel()
                }
            })
        }
    }, [buttonActionContext.selectedHoSos.length]) 

    return <></>
}
const TraLaiBuocTruocModalWrapper = ({setSearchHoSoParams} : {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    return <App><TraLaiBuocTruocModal setSearchHoSoParams={setSearchHoSoParams}/></App>
}

export default TraLaiBuocTruocModalWrapper