import { RenderTitle } from "@/components/common"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdButton, AntdModal, AntdUpLoad } from "@/lib/antd/components"
import { Col, DatePicker, Divider, Form, Input, Row, Typography } from "antd"
import { DinhKemBoSungHoSo } from "../../DinhKemBoSungHoSo"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetHoSo, MotCuaCapNhatBoSung, MotCuaGuiBoSung } from "@/features/hoso/redux/action"
import { SearchThanhPhanHoSo } from "@/features/thanhphanhoso/redux/action"
import { resetData } from "@/features/hoso/redux/slice"
import { resetDatas as resetThanhPhanHoSoDatas } from "@/features/thanhphanhoso/redux/slice"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { DinhKemHoSoBoSung, hoSoApi } from "@/features/hoso/services"
import dayjs from 'dayjs'
import { FORMAT_DATE } from "@/data"

const BoSungHoSoGuiVBDLISModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
  const buttonActionContext = useButtonActionContext()
  const [form] = Form.useForm<DinhKemHoSoBoSung>()
  const [hoSo, setHoSo] = useState<IHoSo & { hanBoSung?: string }>()
  const [loading, setLoading] = useState<boolean>(false)
  const dinhKem = Form.useWatch("dinhKemBoSung", form)
  // const {datas: thanhPhanHoSos} = useAppSelector(state => state.thanhphanhoso)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      if (buttonActionContext.selectedHoSos.length) {
        // dispatch(GetHoSo({id: buttonActionContext.selectedHoSos[0] as string}))
        const res = await hoSoApi.GetHoSoYeuCauBoSung(buttonActionContext.selectedHoSos[0] as string)
        const data = res.data.data
        if (data) {
          setHoSo(data)
          form.setFieldsValue({ ...data, hanBoSung: data.hanBoSung ? dayjs(data.hanBoSung) : undefined } as any)
          form.setFieldValue("thongTinTiepNhanBoSung", data.thongTinTiepNhanBoSung)
        }
      }
    })()
  }, [buttonActionContext.selectedHoSos.length])

  const handleCancel = () => {
    dispatch(resetData())
    dispatch(resetThanhPhanHoSoDatas())
    buttonActionContext.setSelectedHoSos([])
    buttonActionContext.setBoSungHoSoGuiVBDLISModalVisible(false)
  }

  const onSave = async () => {
    const formData = await form.validateFields()
    setLoading(true)
    const thanhPhanBoSung = formData.danhSachGiayToBoSung.filter(x => !x.laThanhPhanMoi);
    const thanhPhanHoSo = formData.danhSachGiayToBoSung.filter(x => x.laThanhPhanMoi)
    const res = await dispatch(MotCuaCapNhatBoSung({ id: buttonActionContext.selectedHoSos[0] as string, data: { ...formData, danhSachGiayToBoSung: thanhPhanBoSung, danhSachGiayToBoSungMoi: thanhPhanHoSo } })).unwrap()
    if (res.succeeded) {
      setSearchHoSoParams((curr) => ({ ...curr }))
      handleCancel()
    }
    setLoading(false)
  }
  const onSaveAndForward = async () => {
    const formData = await form.validateFields()
    setLoading(true)
    const thanhPhanBoSung = formData.danhSachGiayToBoSung.filter(x => !x.laThanhPhanMoi);
    const thanhPhanHoSo = formData.danhSachGiayToBoSung.filter(x => x.laThanhPhanMoi)
    const res = await dispatch(MotCuaGuiBoSung({ id: buttonActionContext.selectedHoSos[0] as string, data: { ...formData, danhSachGiayToBoSung: thanhPhanBoSung, danhSachGiayToBoSungMoi: thanhPhanHoSo } })).unwrap()
    if (res.succeeded) {
      setSearchHoSoParams((curr) => ({ ...curr }))
      handleCancel()
    }
    setLoading(false)
  }
  return <AntdModal title="CÁN BỘ MỘT CỬA BỔ SUNG HỒ SƠ" handlerCancel={handleCancel} visible={true} fullsizeScrollable footer={<>
    <AntdButton key="1" onClick={handleCancel}>Đóng</AntdButton>
    <AntdButton key="2" loading={loading} onClick={onSave}>Lưu lại</AntdButton>
    <AntdButton key="3" loading={loading} onClick={onSaveAndForward}>Lưu và chuyển xử lý tiếp</AntdButton>
  </>}>
    <Form form={form} layout="vertical" name="CapNhatBoSoHoSoModal" >
      <Form.Item name="danhSachGiayToBoSung" hidden><Input></Input></Form.Item>
      <Form.Item name="danhSachGiayToBoSungMoi" hidden><Input></Input></Form.Item>
      <Row gutter={[16, 8]}>
        <Col span={8}>
          <Typography.Title level={5}>{hoSo?.chuHoSo}</Typography.Title>
          <Typography.Text >{hoSo?.trichYeuHoSo}</Typography.Text>
        </Col>
        <Col span={16}>
          <Form.Item name="thongTinTiepNhanBoSung" label="Thông tin bổ sung" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
            <Input.TextArea rows={4} maxLength={500} showCount />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Divider orientation="left">Thông tin yêu cầu bổ sung</Divider>
        <Col span={12}>
          <Form.Item name="lyDoBoSung" label="Lý do bổ sung">
            <Input.TextArea rows={4} disabled />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="dinhKemBoSung" label="Đính kèm bổ sung" >
            {/* <AntdUpLoad maxCount={10} formInstance={form} fieldName="dinhKemBoSung" folderName="YeuCauBoSung" listType="text" showUploadList={true} useDefaultCustomEvent/> */}
            {hoSo?.maHoSo ? <RegularUpload
              hideUpload
              dinhKem={dinhKem}
              fieldName={"dinhKemBoSung"}
              folderName={hoSo.maHoSo}
              form={form} /> : null}
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="hanBoSung" label="Hạn bổ sung hồ sơ" >
            <DatePicker disabled format={FORMAT_DATE} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <RenderTitle title={"Tệp đính kèm"} />
          <DinhKemBoSungHoSo form={form} thanhPhanHoSos={hoSo?.thanhPhanHoSos} maHoSo={hoSo?.maHoSo} />
        </Col>
      </Row>
    </Form>
  </AntdModal>
}

export default BoSungHoSoGuiVBDLISModal