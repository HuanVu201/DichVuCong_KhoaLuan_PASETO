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

export const ThayDoiTruongHopXuLy = ({setSearchHoSoParams, onChangeSuccess}: {onChangeSuccess?: () => void; setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const {data: user} = useAppSelector(state => state.user)
    const { datas: truongHopThuTucs } = useAppSelector(state => state.truonghopthutuc)
    const { datas: hoSos, loading } = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useState<ISearchTruongHopThuTuc>({ pageNumber: 1, pageSize: 1000, reFetch: true})
    const hoSo = useMemo(() => {
        return hoSos?.find(hoSo => hoSo.id === buttonActionContext.selectedHoSos[0] as string)
    },[hoSos])
    const onThayDoiTruongHopThuTuc = async (truongHopThuTucId: string) => {
        if(buttonActionContext.selectedHoSos.length){
            const res = await dispatch(ThayDoiTruongHopThuTuc({hoSoId: buttonActionContext.selectedHoSos[0] as string, truongHopThuTucId})).unwrap()
            if(res.succeeded){
                setSearchHoSoParams((curr) => ({...curr}))
                onChangeSuccess ? onChangeSuccess() : undefined
            }
        }
    }
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            setSearchParams((curr) => ({...curr, thuTucId: hoSo?.maTTHC, donViTiepNhan: user?.officeCode }))
        }
    }, [buttonActionContext.selectedHoSos])
    const columns = useThayDoiTruongHopThuTucColumn({onThayDoiTruongHopThuTuc, maTruongHopHienTai: hoSo?.maTruongHop, loading})

    return <Col span={24}>
        {searchParams.thuTucId ? <AntdTable
            columns={columns} 
            dataSource={truongHopThuTucs}
            onSearch={(params) => dispatch(SearchTruongHopThuTuc(params))} 
            searchParams={searchParams} 
            setSearchParams={setSearchParams}/>: null}
    </Col>
}
