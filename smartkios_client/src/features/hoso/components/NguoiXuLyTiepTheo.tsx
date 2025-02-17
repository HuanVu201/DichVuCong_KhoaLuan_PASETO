import { ID_SEPARATE } from "@/data"
import { IHoSo } from "@/features/hoso/models"
import { SearchNguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/redux/action"
import { resetData } from "@/features/nhomnguoidung/redux/slice"
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models"
import { AntdDivider, AntdSpace } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Checkbox, CheckboxProps, Col, Row, Tag, Typography } from "antd"
import { FormInstance } from "antd/lib"
import React from "react"
import { useEffect, useState } from "react"
import { Edge, Node } from "reactflow"
import { NguoiDungNhomNguoiDung } from "./NguoiDungNhomNguoiDung"
import { ITruongHopThuTuc } from "@/features/truonghopthutuc/models"

interface IQuyTrinhWithNodeEdges extends IQuyTrinhXuLy{
    tenLienKet: string
}

export const NguoiXuLyTiepTheo = ({ form, truongHopThuTuc }: { form: FormInstance<IHoSo>; truongHopThuTuc: ITruongHopThuTuc | undefined }) => {
    const { datas: nguoiDungNhomNguoiDungs } = useAppSelector(state => state.nguoidungnhomnguoidung)
    const {data: hoSo} = useAppSelector(state=> state.hoso)
    const [quyTrinhs, setQuyTrinhs] = useState<IQuyTrinhWithNodeEdges[]>()
    const [selectedQuyTrinh, setSelectedQuyTrinh] = useState<IQuyTrinhWithNodeEdges>()
    const [selectedNguoiDungs, setSelectedNguoiDungs] = useState<string[]>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (truongHopThuTuc) {
            const { nodeQuyTrinh, edgeQuyTrinh } = truongHopThuTuc
            const nodes: Node[] = JSON.parse(nodeQuyTrinh|| "[]")
            const edges: Edge[] = JSON.parse(edgeQuyTrinh || "[]")
            
            const startNode = nodes.find(node => node.type === "startNode")
            if (startNode) {
                form.setFieldValue("tenBuocHienTai", startNode.data?.tenBuocXuLy || "Tiếp nhận hồ sơ")
                form.setFieldValue("buocHienTai", startNode.id)
                const startNodeEdges = edges.filter(edge => edge.source === startNode.id)
                const nextNodeIds = startNodeEdges.map(x => x.target)
                const nextNodes = nodes.filter(node => nextNodeIds.includes(node.id)).map((x): IQuyTrinhWithNodeEdges => {
                    const tenLienKet = startNodeEdges.find(edge => edge.target === x.id)?.label || ""
                    return {...x.data, tenLienKet, id: x.id}
                })
                setQuyTrinhs(nextNodes)
                if (nextNodes.length) {
                    setSelectedQuyTrinh(nextNodes[0])
                    form.setFieldValue("buocXuLyTiep", nextNodes[0].id)
                }
            }
        }
        return () => {
            setQuyTrinhs([])
            setSelectedQuyTrinh(undefined)
            dispatch(resetData())
        }
    }, [truongHopThuTuc])

    useEffect(() => {
        if(selectedQuyTrinh){
            form.setFieldValue("thoiHanBuocXuLy", selectedQuyTrinh?.thoiGianXuLy)
            form.setFieldValue("loaiThoiHanBuocXuLy", selectedQuyTrinh?.loaiThoiGian)
        }
        form.setFieldValue("nodeQuyTrinh", selectedQuyTrinh?.id)
        return () => {
            form.setFieldValue("thoiHanBuocXuLy", undefined)
            form.setFieldValue("loaiThoiHanBuocXuLy", undefined)
            form.setFieldValue("nodeQuyTrinh", undefined)
        }
    }, [selectedQuyTrinh])

    const onClick = (quyTrinh: IQuyTrinhWithNodeEdges) => {
        if (selectedQuyTrinh?.id === quyTrinh.id) {
            setSelectedQuyTrinh(undefined)
            form.setFieldValue("buocXuLyTiep", undefined)
        } else {
            form.setFieldValue("buocXuLyTiep", quyTrinh.id)
            setSelectedQuyTrinh(quyTrinh)
        }
        setSelectedNguoiDungs([])
    }


    return <Row gutter={[4, 24]}>
        <Col span={24}>Chọn quy trình tiếp theo:</Col>
        {quyTrinhs?.map((quyTrinh, index) =>
            <React.Fragment key={index}>
                <Col span={12} >
                    <AntdSpace direction="vertical" onClick={() => onClick(quyTrinh)} style={{ cursor: "pointer", borderLeft: selectedQuyTrinh?.id === quyTrinh.id ? "4px solid #3498db" : "", padding: 5 }} >
                        <Typography.Text>{quyTrinh?.tenNhomNguoiDung}</Typography.Text>
                        <Typography.Text>{quyTrinh.tenBuocXuLy}</Typography.Text>
                        <Typography.Text>Thời gian: {quyTrinh?.thoiGianXuLy} giờ {quyTrinh?.loaiThoiGian ? `(theo ${quyTrinh.loaiThoiGian})` : ""}</Typography.Text>
                        <Typography.Text>Trạng thái: {quyTrinh?.tenTrangThaiHoSo} ({quyTrinh?.loaiBuoc})</Typography.Text>
                    </AntdSpace>
                </Col>
                <Col span={12}>
                    <AntdSpace direction="vertical">
                        <NguoiDungNhomNguoiDung setSelectedNguoiDungs={setSelectedNguoiDungs} selectedNguoiDungs={selectedNguoiDungs} 
                        loaiBuoc={quyTrinh.loaiBuoc} nhomNguoiDungId={quyTrinh.nhomNguoiDungId} form={form}
                         disabled={selectedQuyTrinh?.id !== quyTrinh.id} maTrangThaiHoSo={quyTrinh.maTrangThaiHoSo} donViTiepNhan={null}/>
                        <Tag color="cyan" style={{padding:5}}>{quyTrinh.tenLienKet}</Tag>
                    </AntdSpace>
                </Col>
                <AntdDivider />
            </React.Fragment>)}
    </Row>
}