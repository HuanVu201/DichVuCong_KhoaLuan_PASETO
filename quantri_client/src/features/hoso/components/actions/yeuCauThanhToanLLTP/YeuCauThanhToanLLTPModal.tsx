import { RenderTitle } from "@/components/common"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { GetHoSo, YeuCauThuPhi } from "@/features/hoso/redux/action"
import { AntdDivider, AntdModal, AntdUpLoad } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row } from "antd"
import { useEffect, useMemo, useState } from "react"
import { PhiLePhi } from "../../PhiLePhi"
import { LOAIPHILEPHI_PAYMENT_OPTIONS } from "@/features/hoso/data/formData"
import { YeuCauThanhToan } from "../../YeuCauThanhToan"
import { IPhiLePhi } from "@/features/philephi/models"
import { YeuCauThuPhiParams } from "@/features/hoso/services"
import { resetData } from "@/features/hoso/redux/slice"
import { v4 as uuid } from 'uuid'

const YeuCauThanhToanLLTPModal = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<YeuCauThuPhiParams>()
    const buttonActionContext = useButtonActionContext()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const dispatch = useAppDispatch()
    const [btnLoading, setBtnLoading] = useState(false)
    useEffect(() => {
        if(buttonActionContext.selectedHoSos.length){
            dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string, view: "yeuCauThanhToan"}))
        }
    }, [buttonActionContext.selectedHoSos])
    const handleCancel = () => {
        buttonActionContext.setYeuCauThanhToanLLTPModalVisible(false)
        dispatch(resetData())
        // buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields()
        if(buttonActionContext.selectedHoSos.length){
           try {
                setBtnLoading(true)
                const res = await dispatch(YeuCauThuPhi({id: buttonActionContext.selectedHoSos[0] as string, data: {
                    ...formData, phiLePhi: hoSo?.phiLePhis ?? []
                }})).unwrap()
                if(res.succeeded) {
                    setSearchHoSoParams((curr) => ({...curr}))
                    handleCancel()
                }
                setBtnLoading(false)
           } catch (error) {
                setBtnLoading(false)
                console.log(error);
           }
        }
    }

    const hoSoPhiLePhi = useMemo(() => {
        let soLuongCapThem = 0
        let soTienCapThemLonHon2 = 5000; 
        let tongTien = 0;
        const eFormDataParsed : {SoLuongCapThem : {Name: string, Code: string}} = hoSo && hoSo.eFormData ? JSON.parse(hoSo.eFormData) : undefined
        
        if(eFormDataParsed && "SoLuongCapThem" in eFormDataParsed){
            soLuongCapThem = +eFormDataParsed.SoLuongCapThem.Code
        }

        if(soLuongCapThem > 2){
            tongTien = (soLuongCapThem - 2) * soTienCapThemLonHon2
        }else {
            tongTien = 0
        }

        const newRow: any = {
            id: uuid(),
            ten: "Phiếu thu thêm kể từ phiếu thứ 3 trở đi, số tiền: 5,000 (năm nghìn đồng) trên mỗi phiếu cấp thêm",
            loai: "Phí",
            soTien: tongTien,
        }
        
        if(tongTien == 0){
            return hoSo?.phiLePhis || []
        } else if (tongTien > 0){
            if(hoSo?.phiLePhis?.length){
                return [newRow, ...hoSo.phiLePhis]
            } else {
                return [newRow]
            }
        }
    }, [hoSo?.eFormData])

    return <AntdModal confirmLoading={btnLoading} title={"YÊU CẦU THU PHÍ, LỆ PHÍ HỒ SƠ" + ` ${hoSo?.maHoSo ?? ""} ${hoSo?.chuHoSo ? `(${hoSo.chuHoSo})` : ""}`} visible={true} handlerCancel={handleCancel} 
    onOk={onOk} okText="Xác nhận" fullsizeScrollable>
    <Form form={form} layout="vertical" name="TraKetQuaHoSoModal" >
        <Row gutter={[8,16]}>
            <Col span={24}>
                <h4 style={{marginBottom:2}}>{hoSo?.chuHoSo}</h4>
                <span style={{marginBottom:2}}>{hoSo?.trichYeuHoSo}</span>
            </Col>
            <Col span={24}>
                <RenderTitle title="Thu phí lệ phí" />
                {hoSoPhiLePhi ? <PhiLePhi hasCharge={["Thu trước", "Thu sau"]} form={form} hinhThucThuOptions={LOAIPHILEPHI_PAYMENT_OPTIONS} phiLePhis={hoSoPhiLePhi}/> : null}
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

export default YeuCauThanhToanLLTPModal