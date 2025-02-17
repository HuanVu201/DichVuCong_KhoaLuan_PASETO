import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { useThayDoiTruongHopThuTucColumn } from "@/features/hoso/hooks/useThayDoiTruongHopXuLy"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { ThayDoiTruongHopThuTuc } from "@/features/hoso/redux/action"
import { ISearchTruongHopThuTuc, ITruongHopThuTuc } from "@/features/truonghopthutuc/models"
import { SearchTruongHopThuTuc } from "@/features/truonghopthutuc/redux/action"
import { AntdModal, AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { IBasePagination } from "@/models"
import { Col, Input, Row } from "antd"
import React, { SetStateAction, useEffect, useMemo, useState } from "react"
import {ThayDoiTruongHopXuLy} from "./ThayDoiTruongHopXuLy"

const ThayDoiTruongHopXuLyModal = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [tenThuTuc, setTenThuTuc] = useState<string>()
    const { datas: hoSos, loading } = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const hoSo = useMemo(() => {
        return hoSos?.find(hoSo => hoSo.id === buttonActionContext.selectedHoSos[0] as string)
    },[hoSos])
    useEffect(() => {
        setTenThuTuc(hoSo?.tenTTHC)
    }, [hoSo])
    

    const handleCancel = () => {
        buttonActionContext.setThayDoiTruongHopXuLyModalVisible(false)
        // buttonActionContext.setSelectedHoSos([])
    }
    return <AntdModal title="THAY ĐỔI TRƯỜNG HỢP XỬ LÝ" visible={true} handlerCancel={handleCancel} footer={null} width={1280} bodyStyle={{padding:50}}>
        <Row gutter={[24,24]}>
            <Col span={24}>
                <div style={{paddingBottom:8}}>
                    <label htmlFor="tenThuTuc" >Thủ tục tiếp nhận</label>
                </div>
                <Input.TextArea rows={4} value={tenThuTuc} id="tenThuTuc"/>
            </Col>
            <ThayDoiTruongHopXuLy setSearchHoSoParams={setSearchHoSoParams}/>
        </Row>
    </AntdModal>
}

export default ThayDoiTruongHopXuLyModal