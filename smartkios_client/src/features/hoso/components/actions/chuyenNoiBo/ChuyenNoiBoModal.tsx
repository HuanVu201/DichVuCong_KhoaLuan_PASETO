import { RenderTitle } from "@/components/common"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { ChuyenNoiBo } from "@/features/hoso/redux/action"
import { AntdDivider, AntdModal, AntdUpLoad } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Col, Form, Input, Row } from "antd"
import { DanhSachQuyTrinh } from "./DanhSachQuyTrinh"
import { ChuyenNoiBoParam } from "@/features/hoso/services"
import { useMemo } from "react"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"

export type ChuyenNoiBoFormParam = Omit<ChuyenNoiBoParam, "id">

const ChuyenNoiBoModal = ({setSearchHoSoParams}: {setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>}) => {
    const [form] = Form.useForm<ChuyenNoiBoFormParam>()
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch()
    const { loading, datas: hoSos} = useAppSelector(state => state.hoso)
    const dinhKem = Form.useWatch("dinhKemYKienNguoiChuyenXuLy", form)
    const handleCancel = () => {
        buttonActionContext.setChuyenNoiBoModalVisible(false)
        buttonActionContext.setSelectedHoSos([])
    }
    const onOk = async () => {
        const formData = await form.validateFields() as ChuyenNoiBoFormParam
        if(buttonActionContext.selectedHoSos.length){
            const res = await dispatch(ChuyenNoiBo({ id: buttonActionContext.selectedHoSos[0] as string, ...formData})).unwrap()
            if(res.succeeded){
                // form.setFieldValue("dinhKemYKienNguoiChuyenXuLy", undefined)
                setSearchHoSoParams((curr) => ({...curr}))
                handleCancel()
            }
        }
    }
    const maHoSo = useMemo(() => {
        return hoSos?.find(hoSo => hoSo.id == buttonActionContext.selectedHoSos[0] as string)?.maHoSo
    }, [buttonActionContext.selectedHoSos])

    return <AntdModal confirmLoading={loading} title="CHUYỂN BƯỚC NỘI BỘ" visible={true} handlerCancel={handleCancel} width={1280}
    onOk={onOk} okText="Xác nhận">
    <Form form={form} layout="vertical" name="ChuyenNoiBoHoSo" >
        <Form.Item name="chuyenToiNguoiDungIds" hidden><Input/></Form.Item>
        <Row gutter={8}>
            <Col span={24}>
                <RenderTitle title="Chuyển xử lý hồ sơ"/>
                <Row gutter={[4,8]}>
                    <Col span={16}>
                        <Form.Item name="yKienNguoiChuyenXuLy" label="Nội dung chuyển xử lý">
                            <Input.TextArea rows={3}/>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="dinhKemYKienNguoiChuyenXuLy" label="Đính kèm chuyển xử lý">
                            {maHoSo ? <RegularUpload
                                    dinhKem={dinhKem}
                                    fieldName={"dinhKemYKienNguoiChuyenXuLy"}
                                    folderName={maHoSo}
                                    form={form}/> : null}
                            {/* <AntdUpLoad formInstance={form} fieldName="dinhKemYKienNguoiChuyenXuLy" folderName="DinhKemYKienNguoiChuyenXuLy" listType="text" showUploadList={true} useDefaultCustomEvent/> */}
                        </Form.Item>
                    </Col>
                </Row>
                <AntdDivider/>
            </Col>
            <Col span={24}>
                <DanhSachQuyTrinh form={form}/>
            </Col>
        </Row>
    </Form>
</AntdModal>
}

export default ChuyenNoiBoModal