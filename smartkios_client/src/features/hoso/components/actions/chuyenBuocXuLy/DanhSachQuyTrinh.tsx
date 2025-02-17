import { SearchNguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/redux/action"
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { Edge, Node } from "reactflow"
import { resetData } from "@/features/nhomnguoidung/redux/slice"
import React from "react"
import { Checkbox, CheckboxProps, Col, Row, Typography } from "antd"
import { AntdButton, AntdDivider, AntdSpace } from "@/lib/antd/components"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { ChuyenTiepBuocXuLy, SearchHoSo } from "@/features/hoso/redux/action"
import { GetByHoSoId } from "@/features/truonghopthutuc/redux/action"
import { toast } from "react-toastify"
import { FormInstance } from "antd/lib"
import { ID_SEPARATE } from "@/data"
import { resetQuyTrinhXuLy } from "@/features/truonghopthutuc/redux/slice"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ChuyenBuocXuLyHoSo } from "@/features/hoso/services"
import { NguoiDungNhomNguoiDung } from "../../NguoiDungNhomNguoiDung"
import { ISearchHoSo } from "@/features/hoso/models"
import { IResult } from "@/models"

interface IQuyTrinhWithNodeEdges extends IQuyTrinhXuLy {
    tenLienKet: string
}
export const DanhSachQuyTrinh = ({form, setSearchHoSoParams, submitHandler}: {submitHandler?: (formData: any) => Promise<boolean>;form: FormInstance<ChuyenBuocXuLyHoSo>, setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    // const { quyTrinhXuLy } = useAppSelector(state => state.truonghopthutuc)
    const {data: hoSo} = useAppSelector(state=> state.hoso)
    const [quyTrinhs, setQuyTrinhs] = useState<IQuyTrinhWithNodeEdges[]>()
    const [selectedQuyTrinh, setSelectedQuyTrinh] = useState<IQuyTrinhWithNodeEdges>()
    const [selectedNguoiDungs, setSelectedNguoiDungs] = useState<string[]>([])
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()

    // useEffect(() => {
    //     if(quyTrinhXuLy === undefined){
    //         dispatch(GetByHoSoId(buttonActionContext.selectedHoSos[0] as string)) //thtt
    //     }
    //     return () => {
    //         dispatch(resetQuyTrinhXuLy())
    //     }
    // }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        if (hoSo !== undefined) {
            const res = getNextNode(node => node.id === hoSo.buocHienTai)
            if(res){
                const {nextNodeIds, nextNodes} = res
                setQuyTrinhs(nextNodes)
                if (nextNodes.length) {
                    setSelectedQuyTrinh(nextNodes[0])
                    // dispatch(SearchNguoiDungNhomNguoiDung({ nhomNguoiDungIds: nextNodeIds }))
                }
            }
        }
        return () => {
            setQuyTrinhs([])
            setSelectedQuyTrinh(undefined)
            setSelectedNguoiDungs([])
            dispatch(resetData())
        }
    }, [hoSo])

    const getNextNode = useCallback((condition: (node: Node) => boolean) : {nextNodeIds: string[],nextNodes: IQuyTrinhWithNodeEdges[]} | undefined => {
        if(hoSo){
            const { nodeQuyTrinh, edgeQuyTrinh, buocHienTai } = hoSo
            const nodes: Node[] = JSON.parse(nodeQuyTrinh ?? "{}")
            const edges: Edge[] = JSON.parse(edgeQuyTrinh ?? "{}")
            const currentNode = nodes.find(condition)
            if(currentNode){
                const startNodeEdges = edges.filter(edge => edge.source === currentNode.id)
                const nextNodeIds = startNodeEdges.map(x => x.target)
                const nextNodes = nodes.filter(node => nextNodeIds.includes(node.id)).map((x): IQuyTrinhWithNodeEdges => {
                    const tenLienKet = startNodeEdges.find(edge => edge.target === x.id)?.label || ""
                    return { ...x.data, tenLienKet, id: x.id }
                })
                return {nextNodeIds, nextNodes}
            }
        }
    }, [hoSo])

    const onClick = (quyTrinh: IQuyTrinhWithNodeEdges) => {
        if (selectedQuyTrinh?.id === quyTrinh.id) {
            setSelectedQuyTrinh(undefined)
        } else {
            setSelectedQuyTrinh(quyTrinh)
        }
        setSelectedNguoiDungs([])
    }

    // const onSelectNguoiDung: CheckboxProps["onChange"] = (e) => {
    //     setSelectedNguoiDungs((curr) => {
    //         let newArr = [...curr]
    //         if (e.target.checked) {
    //             newArr.push(e.target.id!)
    //         } else {
    //             newArr = newArr.filter(x => x !== e.target.id)
    //         }

    //         return [...new Set(newArr)]
    //     })
    // }

    const onClickNextQuyTrinh = async (quyTrinh: IQuyTrinhWithNodeEdges) =>{
        const formData = await form.validateFields() as ChuyenBuocXuLyHoSo
        const cloneFormData = {...formData}
        if(selectedNguoiDungs.length){
            // cloneFormData.thoiHanBuocXuLy = quyTrinh.thoiGianXuLy
            // cloneFormData.loaiThoiHanBuocXuLy = quyTrinh.loaiThoiGian
            // cloneFormData.tenBuocHienTai = quyTrinh.tenLienKet
            cloneFormData.maTrangThaiHoSo = quyTrinh.maTrangThaiHoSo
            cloneFormData.buocHienTai = quyTrinh.id // bước hiện tại sau khi cập nhật
            cloneFormData.nguoiXuLyTiep = selectedNguoiDungs.join(ID_SEPARATE)
            const res = getNextNode(node=> node.id === quyTrinh.id)
            if(res){
                const {nextNodeIds} = res
                cloneFormData.buocXuLyTiep = nextNodeIds.join(ID_SEPARATE)
                cloneFormData.nodeQuyTrinh = nextNodeIds.join(ID_SEPARATE)
            }
            if(submitHandler){
                try {
                    const res = await submitHandler({data: cloneFormData, id: buttonActionContext.selectedHoSos[0] as string})
                    if(res){
                        setSearchHoSoParams((curr) => ({...curr}))
                        buttonActionContext.setChuyenBuocXuLyModalVisible(false)
                        buttonActionContext.setSelectedHoSos([])
                    }
                } catch (error) {
                }
                
            } else {
                const res = await dispatch(ChuyenTiepBuocXuLy({data: cloneFormData, id: buttonActionContext.selectedHoSos[0] as string})).unwrap()
                if(res.succeeded){
                    setSearchHoSoParams((curr) => ({...curr}))
                    buttonActionContext.setChuyenBuocXuLyModalVisible(false)
                    buttonActionContext.setSelectedHoSos([])
                }
            }
            
        }else {
            toast.info("Vui lòng chọn người dùng xử lý tiếp theo")
        }
    }

    return <Row gutter={8}>
        {quyTrinhs?.map((quyTrinh, index) =>
            <React.Fragment key={index}>
                <Col span={12} >
                    <AntdSpace direction="vertical" onClick={() => onClick(quyTrinh)} style={{ cursor: "pointer", borderLeft: selectedQuyTrinh?.id === quyTrinh.id ? "4px solid #3498db" : "", padding: 5 }} >
                        <Typography.Text>{quyTrinh?.tenNhomNguoiDung} </Typography.Text>
                        <Typography.Text>{quyTrinh.tenBuocXuLy}</Typography.Text>
                        <Typography.Text>Thời gian: {quyTrinh?.thoiGianXuLy} giờ {quyTrinh?.loaiThoiGian ? `(theo ${quyTrinh.loaiThoiGian})` : ""}</Typography.Text>
                        <Typography.Text>Trạng thái: {quyTrinh?.tenTrangThaiHoSo} ({quyTrinh?.loaiBuoc})</Typography.Text>
                    </AntdSpace>
                </Col>
                <Col span={12}>
                    <AntdSpace direction="vertical">
                        <NguoiDungNhomNguoiDung setSelectedNguoiDungs={setSelectedNguoiDungs} selectedNguoiDungs={selectedNguoiDungs} 
                        loaiBuoc={quyTrinh.loaiBuoc} nhomNguoiDungId={quyTrinh.nhomNguoiDungId} form={form}
                         disabled={selectedQuyTrinh?.id !== quyTrinh.id} maTrangThaiHoSo={quyTrinh.maTrangThaiHoSo} donViTiepNhan={hoSo?.donViId || null}/>
                        <AntdButton onClick={() => onClickNextQuyTrinh(quyTrinh)} type="primary" disabled={selectedQuyTrinh?.id !== quyTrinh.id} >{quyTrinh.tenLienKet}</AntdButton>
                    </AntdSpace>
                </Col>
                <AntdDivider />
            </React.Fragment>)}
    </Row>
}