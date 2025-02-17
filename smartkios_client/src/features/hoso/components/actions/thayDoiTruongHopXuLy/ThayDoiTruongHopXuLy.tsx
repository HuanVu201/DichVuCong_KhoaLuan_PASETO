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

const ThayDoiTruongHopXuLy = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [tenThuTuc, setTenThuTuc] = useState<string>()
    const { datas: truongHopThuTucs } = useAppSelector(state => state.truonghopthutuc)
    const { datas: hoSos, loading } = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchTruongHopThuTuc>({ pageNumber: 1, pageSize: 10, reFetch: true})
    const hoSo = useMemo(() => {
        return hoSos?.find(hoSo => hoSo.id === buttonActionContext.selectedHoSos[0] as string)
    },[hoSos])
    const onThayDoiTruongHopThuTuc = async (truongHopThuTucId: string) => {
        if(buttonActionContext.selectedHoSos.length){
            const res = await dispatch(ThayDoiTruongHopThuTuc({hoSoId: buttonActionContext.selectedHoSos[0] as string, truongHopThuTucId})).unwrap()
            if(res.succeeded){
                setSearchHoSoParams((curr) => ({...curr}))
            }
        }
    }
    const columns = useThayDoiTruongHopThuTucColumn({onThayDoiTruongHopThuTuc, maTruongHopHienTai: hoSo?.maTruongHop, loading})
    
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            setTenThuTuc(hoSo?.tenTTHC)
            setSearchParams((curr) => ({...curr, thuTucId: hoSo?.maTTHC }))
        }
    }, [buttonActionContext.selectedHoSos])

    const handleCancel = () => {
        buttonActionContext.setThayDoiTruongHopXuLyModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    return <AntdModal title="THAY ĐỔI TRƯỜNG HỢP XỬ LÝ" visible={true} handlerCancel={handleCancel} footer={null} width={1280} bodyStyle={{padding:50}}>
        <Row gutter={[24,24]}>
            <Col span={24}>
                <div style={{paddingBottom:8}}>
                    <label htmlFor="tenThuTuc" >Thủ tục tiếp nhận</label>
                </div>
                <Input.TextArea rows={4} value={tenThuTuc} id="tenThuTuc"/>
            </Col>
            <Col span={24}>
                {searchParams.thuTucId ? <AntdTable
                    columns={columns} 
                    dataSource={truongHopThuTucs}
                    onSearch={(params) => dispatch(SearchTruongHopThuTuc(params))} 
                    searchParams={searchParams} 
                    setSearchParams={setSearchParams}/>: null}
                
            </Col>
        </Row>
    </AntdModal>
}

export default ThayDoiTruongHopXuLy