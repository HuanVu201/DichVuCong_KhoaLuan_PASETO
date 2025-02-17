import { RenderTitle } from "@/components/common"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"
import { IHoSo, ISearchHoSo } from "@/features/hoso/models"
import { AntdButton, AntdModal, AntdUpLoad } from "@/lib/antd/components"
import { Col, DatePicker, Divider, Form, Input, Row, Spin, Typography } from "antd"
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
import { BoSungHoSoGuiVBDLISAction } from "@/features/lienthongvbdlis/redux/action"
import { IBoSungHoSoGuiVBDLISParams } from "@/features/lienthongvbdlis/services"

const ThucHienNghiaVuTaiChinhGuiVBDLISModal = ({ setSearchHoSoParams }: { setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>> }) => {
  const buttonActionContext = useButtonActionContext()
  const [form] = Form.useForm<IBoSungHoSoGuiVBDLISParams>()
  const [loading, setLoading] = useState<boolean>(false)
  const { data: hoSo, loading: loadingHoSo } = useAppSelector(state => state.hoso)
  // const {datas: thanhPhanHoSos} = useAppSelector(state => state.thanhphanhoso)
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      if (buttonActionContext.selectedHoSos.length) {
        dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string }))

      }
    })()
  }, [buttonActionContext.selectedHoSos.length])

  const handleCancel = () => {
    dispatch(resetData())
    dispatch(resetThanhPhanHoSoDatas())
    buttonActionContext.setSelectedHoSos([])
    buttonActionContext.setThucHienNghiaVuTaiChinhVBDLISModalVisible(false)
  }
  useEffect(() => {
    form.setFieldsValue({ ...hoSo })
  }, [hoSo])

  const onSaveAndForward = async () => {
    const formData = await form.validateFields()
    setLoading(true)

    const res = await dispatch(BoSungHoSoGuiVBDLISAction({ maHoSo: formData.maHoSo })).unwrap()
    if (res.succeeded) {
      setSearchHoSoParams((curr) => ({ ...curr }))
      handleCancel()
    }
    setLoading(false)
  }
  return <Spin spinning={loading && loadingHoSo}><AntdModal title="CHUYỂN TIẾP VBDLIS" handlerCancel={handleCancel} visible={true} footer={<>
    <AntdButton key="1" onClick={handleCancel}>Đóng</AntdButton>

    <AntdButton key="3" loading={loading} onClick={onSaveAndForward}>Xác nhận</AntdButton>
  </>}>
    <Form form={form} layout="vertical" name="CapNhatBoSoHoSoModal" >
      XÁC NHẬN ĐÃ THỰC HIỆN NGHĨA VỤ TÀI CHÍNH VÀ CHUYỂN TIẾP HỆ THỐNG VBDLIS
      <Form.Item name="maHoSo" hidden={true}>
        <Input />
      </Form.Item>
    </Form>
  </AntdModal>
  </Spin>
}

export default ThucHienNghiaVuTaiChinhGuiVBDLISModal