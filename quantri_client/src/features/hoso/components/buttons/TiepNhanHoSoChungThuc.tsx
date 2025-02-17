import { AntdButton, AntdDivider, AntdModal, AntdSpace } from "@/lib/antd/components"
import { useCallback, useMemo, useState } from "react"
import { useButtonActionContext } from "../../contexts/ButtonActionsContext"
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext"
import { toast } from "react-toastify"
import { BaseActionProps } from "./type"
import { ICON_HOLDER } from "@/data"
import { useAppSelector } from "@/lib/redux/Hooks"
import { IHoSo, TRANGTHAITHUPHI } from "../../models"
import { Col, Collapse, Radio, RadioChangeEvent, Row, Tag, Typography } from "antd"
import { CaretRightOutlined } from "@ant-design/icons"

export interface TiepNhanHoSoChungThucProps extends BaseActionProps{
    actionName : string
}
// sử dụng comp này bọc ngoài do không thể sử dụng customhook, và các hook bth ở trong useMemo, useEffect
export const TiepNhanHoSoChungThucWrapper = (props: TiepNhanHoSoChungThucProps) => {
    
    return <TiepNhanHoSoChungThuc {...props}></TiepNhanHoSoChungThuc>
}

const TiepNhanHoSoChungThuc = ({actionName, colorCode, iconName}: TiepNhanHoSoChungThucProps) => {
    const buttonActionContext = useButtonActionContext()
    const {datas: hoSos} = useAppSelector(state => state.hoso)
    const [visible, setVisible] = useState(false)

    const [danhSachTruongHopHoSo, selectedHoSos] = useMemo(() => {
        const danhSachTruongHopHoSo: Record<string, IHoSo[]> = {}
        const selectedHoSos = hoSos?.filter(hoSo => buttonActionContext.selectedHoSos.includes(hoSo.id))
        selectedHoSos?.forEach((hoSo) => {
            const currHoSo = danhSachTruongHopHoSo[hoSo.maTruongHop] || []
            danhSachTruongHopHoSo[hoSo.maTruongHop] = currHoSo?.concat(hoSo)
        })
        return [danhSachTruongHopHoSo, selectedHoSos]
    }, [hoSos, buttonActionContext.selectedHoSos])

    const setTiepNhanHoSoIds = (ids: string[]) => {
        if(!ids?.length){
            toast.info("Vui lòng chọn một trong các trường hợp xử lý")
            return;
        }
        const danhSachIds =  selectedHoSos?.filter(hoSo => ids.includes(hoSo.id) && !hoSo.trangThaiThuPhi?.includes(TRANGTHAITHUPHI["Chờ thanh toán"])).flatMap(x => x.id);
        
        if(!danhSachIds?.length){
            if(ids.length == 1){
                toast.info("Vui lòng thanh toán phí/lệ phí trước khi tiếp nhận")
                return;
            }
            toast.info("Vui lòng thanh toán phí/lệ phí các hồ sơ trong danh sách trước khi tiếp nhận")
            return;
        }
        buttonActionContext.setSelectedHoSoKeyByTHTTs(danhSachIds)
        buttonActionContext.setTiepNhanHoSoChungThucModalVisible(true)
    }

    const onClick = () => {
        if(!buttonActionContext.selectedHoSos.length){
            toast.info("Vui lòng chọn hồ sơ trước")
            return;
        }
        const soLuongChuyen = import.meta.env.VITE_SOLUONGTIEPNHANNHIEUHOSO || 5
        console.log(typeof soLuongChuyen);
        
        if(buttonActionContext.selectedHoSos.length > soLuongChuyen){
            toast.info(`Vui lòng chọn tối đa ${soLuongChuyen} hồ sơ`)
            return
        }
        if (Object.keys(danhSachTruongHopHoSo).length > 1) {
            setVisible(true)
            return
        }
        if(buttonActionContext.selectedHoSos.length){
            setTiepNhanHoSoIds(buttonActionContext.selectedHoSos as string[])
        }
    }
    return <>
    <AntdButton onClick={onClick} style={{backgroundColor: colorCode, color: "#000"}} icon={iconName ? ICON_HOLDER[iconName] : undefined} >{actionName}</AntdButton>
    {visible ? <ChonTruongHopTiepNhan setTiepNhanHoSoIds={setTiepNhanHoSoIds} danhSachTruongHopHoSo={danhSachTruongHopHoSo} setVisible={setVisible} visible={visible}/> : null}
    </>
}
const ChonTruongHopTiepNhan = ({ danhSachTruongHopHoSo, visible, setVisible, setTiepNhanHoSoIds}: {setTiepNhanHoSoIds: (ids: string[]) => void; danhSachTruongHopHoSo: Record<string, IHoSo[]>; visible: boolean; setVisible: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const buttonActionContext = useButtonActionContext()

    const onChange = (e: RadioChangeEvent) => {
        const value = danhSachTruongHopHoSo[e.target.value]
        buttonActionContext.setSelectedHoSoKeyByTHTTs([...value.flatMap(x => x.id) ])
    }
    const onOk = () => {
        setTiepNhanHoSoIds(buttonActionContext.selectedHoSoKeyByTHTTs);
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
                <Tag color="orange-inverse" style={{marginBottom:12}}>Lưu ý: Các hồ sơ đang Chờ thanh toán sẽ không được tiếp nhận</Tag>
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
                                <Typography.Text key={idx2} style={{color:`${hoSo.trangThaiThuPhi?.includes(TRANGTHAITHUPHI["Chờ thanh toán"]) ? "orange" : ""}`}}>
                                    {hoSo.maHoSo} - {hoSo.chuHoSo}
                                </Typography.Text>
                            </Col>)
                        })}
                    </Row>,
            }]}>
        </Collapse>
    </>)
}