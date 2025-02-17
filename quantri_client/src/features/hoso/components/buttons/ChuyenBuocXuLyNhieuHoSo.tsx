import { AntdButton, AntdDivider, AntdModal, AntdSpace } from "@/lib/antd/components"
import { useCallback, useMemo, useState } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"
import { Col, Collapse, Modal, Radio, RadioChangeEvent, Row, Typography } from "antd"
import { IHoSo } from "../../models"
import React from "react"
import { CaretRightOutlined } from "@ant-design/icons"
import { validateHoSoDVCLT, validateHoSoLLTPVNeID } from "../ultis/validate"

export interface ChuyenBuocXuLyNhieuHoSoProps extends BaseActionProps {
    actionName: string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const ChuyenBuocXuLyNhieuHoSoWrapper = (props: ChuyenBuocXuLyNhieuHoSoProps) => {

    return <ChuyenBuocXuLyNhieuHoSo {...props}></ChuyenBuocXuLyNhieuHoSo>
}

const ChuyenBuocXuLyNhieuHoSo = ({ actionName, iconName, colorCode }: ChuyenBuocXuLyNhieuHoSoProps) => {
    const buttonActionContext = useButtonActionContext()
    const { datas: hoSos } = useAppSelector(state => state.hoso)
    const [visible, setVisible] = useState(false)
    const danhSachTruongHopHoSo = useMemo(() => {
        const danhSachTruongHopHoSo: Record<string, IHoSo[]> = {}
        const selectedHoSos = hoSos?.filter(hoSo => buttonActionContext.selectedHoSos.includes(hoSo.id))
        selectedHoSos?.forEach((hoSo) => {
            const currHoSo = danhSachTruongHopHoSo[hoSo.maTruongHop] || []
            danhSachTruongHopHoSo[hoSo.maTruongHop] = currHoSo?.concat(hoSo)
        })
        return danhSachTruongHopHoSo
    }, [hoSos, buttonActionContext.selectedHoSos])
    const onClick = () => {
        if (!buttonActionContext.selectedHoSos.length) {
            toast.info("Vui lòng chọn hồ sơ trước")
            return
        } 
        const selectedHoSo = hoSos?.find(x => x.id == buttonActionContext.selectedHoSos[0])
            if(!selectedHoSo){
                toast.info("Vui lòng chọn hồ sơ trước")
                return;
            }
            console.log(selectedHoSo);
            
            if(selectedHoSo.loaiDuLieuKetNoi && validateHoSoDVCLT(selectedHoSo.loaiDuLieuKetNoi)){
                return;
            }
            if(selectedHoSo.loaiDuLieuKetNoi && validateHoSoLLTPVNeID(selectedHoSo.loaiDuLieuKetNoi)){
                return;
        }
        const soLuongChuyen = import.meta.env.VITE_SOLUONGCHUYENNHIEUHOSO || 3
        console.log(typeof soLuongChuyen);
        
        if(buttonActionContext.selectedHoSos.length > soLuongChuyen){
            toast.info(`Vui lòng chọn tối đa ${soLuongChuyen} hồ sơ`)
            return
        }
        
        if (Object.keys(danhSachTruongHopHoSo).length > 1) {
            setVisible(true)
            return
        }


        if (buttonActionContext.selectedHoSos.length > 1) {
            buttonActionContext.setChuyenBuocXuLyNhieuHoSoModalVisible(true)
            buttonActionContext.setSelectedHoSoKeyByTHTTs(buttonActionContext.selectedHoSos as string[])
        } else if(buttonActionContext.selectedHoSos.length == 1) {
            buttonActionContext.setChuyenBuocXuLyModalVisible(true)
            buttonActionContext.setSelectedHoSoKeyByTHTTs(buttonActionContext.selectedHoSos as string[])
        }
    }
    return <>
        <AntdButton onClick={onClick} style={{ backgroundColor: colorCode, color: "#fff" }} icon={iconName ? ICON_HOLDER[iconName] : undefined} >{actionName}</AntdButton>
        {visible ? <ChonTruongHopChuyenBuoc danhSachTruongHopHoSo={danhSachTruongHopHoSo} setVisible={setVisible} visible={visible}/> : null}
    </>
}


const ChonTruongHopChuyenBuoc = ({ danhSachTruongHopHoSo, visible, setVisible}: { danhSachTruongHopHoSo: Record<string, IHoSo[]>; visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const buttonActionContext = useButtonActionContext()

    const onChange = (e: RadioChangeEvent) => {
        const value = danhSachTruongHopHoSo[e.target.value]
        buttonActionContext.setSelectedHoSoKeyByTHTTs([...value.flatMap(x => x.id) ])
    }
    const onOk = () => {
        if (!buttonActionContext.selectedHoSoKeyByTHTTs.length) {
            toast.info("Vui lòng chọn một trong các trường hợp xử lý")
            return;
        }
        buttonActionContext.setChuyenBuocXuLyNhieuHoSoModalVisible(true)
    }
    const handlerCancel = () => {
        setVisible(false)
        buttonActionContext.setSelectedHoSoKeyByTHTTs([])
    }

    return (
        <AntdModal 
            title={<Typography.Title level={4}>Vui lòng chọn các hồ sơ thuộc một trong các trường hợp xử lý sau để tiếp tục</Typography.Title>}
            visible={visible}
            handlerCancel={handlerCancel}
            okText={"Tiếp tục với danh sách hồ sơ đã chọn"}
            cancelText={"Đóng"}
            width={1200}
            closable={true}
            onOk={onOk}
            onCancel={handlerCancel}
            >
            <AntdSpace direction="vertical" style={{display:"block"}}>
                <Radio.Group name="truongHopThuTuc" onChange={onChange} style={{display:"block"}}>
                    {(Object.keys(danhSachTruongHopHoSo) as Array<keyof typeof danhSachTruongHopHoSo>).map((key, idx) => {
                        const value = danhSachTruongHopHoSo[key]                      
                        return <AntdSpace direction="vertical" key={idx} style={{ display: "block" }}>
                            <Radio value={key} >
                                <Typography.Title level={5}>{value[0].tenTTHC} - {value[0].tenTruongHop}</Typography.Title>
                            </Radio>
                            <DanhSachHoSoCollapse hoSos={value} />
                            <AntdDivider />
                        </AntdSpace>
                    })}
                </Radio.Group>
            </AntdSpace>

        </AntdModal>
    )
}
const DanhSachHoSoCollapse = ({ hoSos }: { hoSos: IHoSo[] }) => {
    return (<>
        <Collapse
            style={{ display: "block" }}
            bordered={false}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            items={[{
                key: "1",
                label: "Danh sách hồ sơ",
                children:
                    <Row>
                        {hoSos.map((hoSo, idx2) => {
                            return (<Col lg={6} md={12} span={24}>
                                <Typography.Text key={idx2}>
                                    {hoSo.maHoSo} - {hoSo.chuHoSo}
                                </Typography.Text>
                            </Col>)
                        })}
                    </Row>,
            }]}>
        </Collapse>
    </>)
}