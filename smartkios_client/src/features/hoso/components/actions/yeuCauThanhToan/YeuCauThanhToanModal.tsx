import { RenderTitle } from "@/components/common"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo, YeuCauThuPhi } from "@/features/hoso/redux/action"
import { AntdDivider, AntdModal, AntdUpLoad } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row } from "antd"
import { useEffect } from "react"
import { PhiLePhi } from "../../PhiLePhi"
import { LOAIPHILEPHI_PAYMENT_OPTIONS } from "@/features/hoso/data/formData"
import { YeuCauThanhToan } from "../../YeuCauThanhToan"
import { IPhiLePhi } from "@/features/philephi/models"
import { YeuCauThuPhiParams } from "@/features/hoso/services"


const YeuCauThanhToanModal = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<YeuCauThuPhiParams>()
    const buttonActionContext = useButtonActionContext()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string, returnPhiLePhi: true, returnYeuCauThanhToan: true}))
        }
    }, [buttonActionContext.selectedHoSos])
    const handleCancel = () => {
        buttonActionContext.setYeuCauThanhToanModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields()
        if(buttonActionContext.selectedHoSos.length){
            const res = await dispatch(YeuCauThuPhi({id: buttonActionContext.selectedHoSos[0] as string, data: {
                ...formData, phiLePhi: hoSo?.phiLePhis ?? []
            }})).unwrap()
            if(res.succeeded) {
                setSearchHoSoParams((curr) => ({...curr}))
                handleCancel()
            }
        }
    }
    return <AntdModal title="YÊU CẦU THU PHÍ, LỆ PHÍ HỒ SƠ" visible={true} handlerCancel={handleCancel} 
    onOk={onOk} okText="Xác nhận" fullsizeScrollable>
    <Form form={form} layout="vertical" name="TraKetQuaHoSoModal" >
        <Row gutter={[8,16]}>
            <Col span={24}>
                <h4 style={{marginBottom:2}}>{hoSo?.chuHoSo}</h4>
                <span style={{marginBottom:2}}>{hoSo?.trichYeuHoSo}</span>
            </Col>
            <Col span={24}>
                <RenderTitle title="Thu phí lệ phí" />
                <PhiLePhi hasCharge={["Thu trước", "Thu sau"]} form={form} hinhThucThuOptions={LOAIPHILEPHI_PAYMENT_OPTIONS} phiLePhis={hoSo?.phiLePhis}/>
                <AntdDivider />
            </Col>
            <Col span={24}>
                <RenderTitle title="Yêu cầu thanh toán" />
                <YeuCauThanhToan yeuCauThanhToans={hoSo?.yeuCauThanhToans} />
                <AntdDivider />
            </Col>
        </Row>
    </Form>
</AntdModal>
}

export default YeuCauThanhToanModal