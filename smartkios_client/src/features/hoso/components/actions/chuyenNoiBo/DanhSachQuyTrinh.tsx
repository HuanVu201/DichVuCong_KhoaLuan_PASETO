import { SearchNguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/redux/action"
import { IQuyTrinhXuLy } from "@/features/quytrinhxuly/models"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useCallback, useEffect, useState } from "react"
import { Edge, Node } from "reactflow"
import { resetData } from "@/features/nhomnguoidung/redux/slice"
import React from "react"
import { Checkbox, CheckboxProps, Col, Row, Typography } from "antd"
import { AntdDivider, AntdSpace } from "@/lib/antd/components"
import { GetByHoSoId } from "@/features/truonghopthutuc/redux/action"
import { FormInstance } from "antd/lib"
import { ID_SEPARATE } from "@/data"
import { resetQuyTrinhXuLy } from "@/features/truonghopthutuc/redux/slice"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ChuyenNoiBoFormParam } from "./ChuyenNoiBoModal"
import { userService } from "@/features/user/services"
import { IUser } from "@/features/user/models"

export const DanhSachQuyTrinh = ({ form }: { form: FormInstance<ChuyenNoiBoFormParam> }) => {
    // const { datas: nguoiDungNhomNguoiDungs } = useAppSelector(state => state.nguoidungnhomnguoidung)
    const { quyTrinhXuLy } = useAppSelector(state => state.truonghopthutuc)
    const {data: user} = useAppSelector(state => state.user)
    const [nguoiDungNhomNguoiDungs, setNguoiDungNhomNguoiDungs] = useState<IUser[]>([])
    const [quyTrinh, setQuyTrinh] = useState<IQuyTrinhXuLy>()
    const [selectedNguoiDungs, setSelectedNguoiDungs] = useState<string[]>([])
    const dispatch = useAppDispatch()
    const buttonActionContext = useButtonActionContext()

    useEffect(() => {
        if (!quyTrinhXuLy) {
            dispatch(GetByHoSoId(buttonActionContext.selectedHoSos[0] as string))
        }
        return () => {
            dispatch(resetQuyTrinhXuLy())
        }
    }, [buttonActionContext.selectedHoSos])

    useEffect(() => {
        (async () => {
            if (quyTrinhXuLy !== undefined && user) {
                const res = getNode(node => node.id === quyTrinhXuLy.buocHienTai)
                if (res) {
                    const { currentNode } = res
                    setQuyTrinh(currentNode)
                    const resp = await userService.Search({pageNumber:1, pageSize: 100, groupCode: user.groupCode})
                    setNguoiDungNhomNguoiDungs(resp.data?.data || [])
                    // dispatch(SearchNguoiDungNhomNguoiDung({ nhomNguoiDungId: currentNode.nhomNguoiDungId }))
                }
            }
        })()
        
        return () => {
            setQuyTrinh(undefined)
            setSelectedNguoiDungs([])
            dispatch(resetData())
        }
    }, [quyTrinhXuLy, user])

    const getNode = useCallback((condition: (node: Node) => boolean): { currentNode: IQuyTrinhXuLy } | undefined => {
        if (quyTrinhXuLy) {
            const { nodeQuyTrinh, edgeQuyTrinh, buocHienTai } = quyTrinhXuLy
            const nodes: Node[] = JSON.parse(nodeQuyTrinh)
            const edges: Edge[] = JSON.parse(edgeQuyTrinh)
            const currentNode = nodes.find(condition)
            if (currentNode) {
                return { currentNode: currentNode.data }
            }
        }
    }, [quyTrinhXuLy])

    const onSelectNguoiDung: CheckboxProps["onChange"] = (e) => {
        setSelectedNguoiDungs((curr) => {
            let newArr = [...curr]
            if (e.target.checked) {
                newArr.push(e.target.id!)
            } else {
                newArr = newArr.filter(x => x !== e.target.id)
            }

            return [...new Set(newArr)]
        })
    }

    useEffect(() => {
        form.setFieldValue("chuyenToiNguoiDungIds", selectedNguoiDungs.join(ID_SEPARATE))
    }, [selectedNguoiDungs])

    // const onClickNextQuyTrinh = async (quyTrinh: IQuyTrinhXuLy) => {
    //     const formData = await form.validateFields() as ChuyenNoiBoFormParam
    //     if (selectedNguoiDungs.length) {
    //         if(buttonActionContext.selectedHoSos.length){
    //             await dispatch(ChuyenNoiBo({ id: buttonActionContext.selectedHoSos[0] as string, 
    //                 chuyenToiNguoiDungIds: selectedNguoiDungs.join(ID_SEPARATE), ...formData })).unwrap()
    //         }
    //         dispatch(SearchHoSo({ pageNumber: 1, pageSize: 10, reFetch: true, byCurrentUser: true }))
    //         // setSearchParams((curr) => ({...curr}))
    //         buttonActionContext.setChuyenBuocXuLyModalVisible(false)
    //     } else {
    //         toast.info("Vui lòng chọn người dùng xử lý tiếp theo")
    //     }
    // }

    return <Row gutter={8}  align="middle" justify="center">
        {quyTrinh != undefined ?
            <React.Fragment >
                {/* <Col span={12} >
                    <AntdSpace direction="vertical" >
                        <Typography.Text>{quyTrinh?.tenNhomNguoiDung}</Typography.Text>
                        <Typography.Text>{quyTrinh.tenBuocXuLy}</Typography.Text>
                        <Typography.Text>Thời gian: {quyTrinh?.thoiGianXuLy} giờ {quyTrinh?.loaiThoiGian ? `(theo ${quyTrinh.loaiThoiGian})` : ""}</Typography.Text>
                        <Typography.Text>Trạng thái: {quyTrinh?.tenTrangThaiHoSo} ({quyTrinh?.loaiBuoc})</Typography.Text>
                    </AntdSpace>
                </Col> */}
                <Col span={24}>
                    <AntdSpace direction="vertical">
                        {nguoiDungNhomNguoiDungs?.filter(x => x.id !== user?.id).map((nguoiDung, idx2) => {
                            return <div key={idx2}>
                                <label style={{ marginRight: 8 }} htmlFor={nguoiDung.id}>{nguoiDung.fullName}</label>
                                <Checkbox checked={selectedNguoiDungs.includes(nguoiDung.id)} id={nguoiDung.id} onChange={onSelectNguoiDung} ></Checkbox>
                            </div>
                        })}
                    </AntdSpace>
                </Col>
                <AntdDivider />
            </React.Fragment> : null}
    </Row>
}