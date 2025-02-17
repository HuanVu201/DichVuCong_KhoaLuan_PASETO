import { ISearchHoSo } from "@/features/hoso/models"
import { ComponentProps, SetStateAction } from "react"
import ChuyenBuocXuLyModal from "../chuyenBuocXuLy/ChuyenBuocXuLyModal"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { ChuyenBuocXuLyNhieuHoSo } from "@/features/hoso/redux/action"
import { resetData } from "@/features/hoso/redux/slice"
import { toast } from "react-toastify"
import React from "react"

const ChuyenBuocXuLyNhieuHoSoComp = (props: ComponentProps<typeof ChuyenBuocXuLyModal>) => {
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos } = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const handleCancel = (data: Record<string, string>) : boolean => {
        dispatch(resetData())
        const errorIds = Object.keys(data) || []
        const succeedIds = buttonActionContext.selectedHoSoKeyByTHTTs.filter(x => !errorIds.includes(x))

        buttonActionContext.setSelectedHoSoKeyByTHTTs(errorIds)
        buttonActionContext.setSelectedHoSos((curr) => {
            return curr.filter(x => !succeedIds.includes(x as string))
        })
        if(errorIds.length){
            const dataKey : Record<string, string> = {}
            hoSos?.forEach(item => {
                if(errorIds.includes(item.id)){
                    dataKey[item.id] = item.maHoSo
                }
            })
            const toastData = errorIds.map(key => {
                return <p>Hồ sơ <strong>{dataKey[key]}</strong>: {data[key]}</p>
            })
            toast.warn(<>{toastData.map((item, idx) => {
                return <React.Fragment key={idx}>{item}</React.Fragment>
            })}</>, {autoClose: 10000})
        } 
        if(succeedIds.length) {
            toast.success(`Chuyển xử lý thành công ${succeedIds.length} hồ sơ`)
            return true
        } 
        return false
    }
    const submitMultipleHandler = async (formData: any): Promise<boolean> => {
        try{
            const res = await dispatch(ChuyenBuocXuLyNhieuHoSo({
                data: {...formData.data, Ids: buttonActionContext.selectedHoSoKeyByTHTTs}
            })).unwrap()
            if(res.succeeded){
                return handleCancel(res.data)
            }
            return res.succeeded
        } catch(error){
            console.error(error)
            return false
        }
    }
    return (
        <ChuyenBuocXuLyModal {...props}
        submitMultipleHandler={submitMultipleHandler}
        onClose={() => {
            buttonActionContext.setChuyenBuocXuLyNhieuHoSoModalVisible(false)
        }}
        />
    )
}

export default ChuyenBuocXuLyNhieuHoSoComp