import { RenderTitle } from "@/components/common"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { ISearchHoSo } from "@/features/hoso/models"
import { ISoChungThuc } from "@/features/sochungthuc/models"
import { SoChungThucApi } from "@/features/sochungthuc/services"
import { AntdModal } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, InputNumber, Row, Typography } from "antd"
import { useEffect, useMemo, useState } from "react"
import { ThanhPhanChungThuc } from "./ThanhPhanChungThuc"
import { GetHoSo } from "@/features/hoso/redux/action"
import { getCurrency } from "@/utils"
import { YeuCauThuPhiChungThucParams, hoSoApi } from "@/features/hoso/services"
import { toast } from "react-toastify"


const YeuCauThanhToanChungThuc = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<YeuCauThuPhiChungThucParams>()
    const {data: hoSo} = useAppSelector(state => state.hoso)
    const [soChungThucs, setSoChungThucs] = useState<ISoChungThuc[]>()
    const dispatch = useAppDispatch()

    const tongTien = useMemo(() => {
        let tongTien = 0;
        hoSo?.thanhPhanHoSos?.forEach(item => {
            tongTien += item.tongTien ?? 0
        })
        return tongTien;
    }, [hoSo?.thanhPhanHoSos])

    useEffect(() => {
        if (hoSo != undefined) {
            form.setFieldsValue({ ...hoSo})
        }
    }, [hoSo])
    useEffect(() => {
        if (buttonActionContext.selectedHoSos.length) {
            dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, view: "kySoChungThuc" }))
            // dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string, returnNodeQuyTrinh: true}))
        }
    }, [buttonActionContext.selectedHoSos])
    useEffect(() => {
        (async () => {
            if(hoSo && hoSo.donViId && soChungThucs == undefined) {
                const res = await SoChungThucApi.Search({donVi: hoSo.donViId, pageNumber: 1, pageSize:100})
                if(res.data.data){
                    setSoChungThucs(res.data.data)
                }
            }
        })()
    }, [hoSo, soChungThucs])
    const handleCancel = () => {
        buttonActionContext.setSelectedHoSos([])
        buttonActionContext.setYeuCauThanhToanChungThucModalVisible(false)
    }
    const onOk = async () =>{
        if(hoSo?.maHoSo && tongTien){
            const res = await hoSoApi.YeuCauThuPhiChungThuc({maHoSo: hoSo?.maHoSo, tongTien: tongTien})
            if(res.data.succeeded){
                handleCancel()
                toast.success(res.data.message)
                setSearchHoSoParams((curr) => ({...curr}))
            }
        }
    }
    return <AntdModal fullsizeScrollable  title="YÊU CẦU THANH TOÁN CHỨNG THỰC" visible={true} handlerCancel={handleCancel} onOk={onOk} okText="Gửi yêu cầu">
        <Form form={form}>  
            <Row gutter={8}>
                <Col span={24}>
                    <RenderTitle title="Phí thu" />
                    <Typography.Title level={5} style={{marginTop:5}}>Tổng số tiền: {getCurrency(tongTien, ".")}</Typography.Title>
                </Col>
                {soChungThucs?.length ?  <ThanhPhanChungThuc tongTien={tongTien} soChungThucs={soChungThucs} form={form} thanhPhanHoSos={hoSo?.thanhPhanHoSos}/> : null}
            </Row>
        </Form>
    </AntdModal>
}

export default YeuCauThanhToanChungThuc 