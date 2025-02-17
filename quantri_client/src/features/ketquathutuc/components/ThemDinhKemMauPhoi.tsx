import { Col, Form, Input, Row, InputNumber, Space, Spin, Upload, Select, Modal } from "antd"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"
import { IKetQuaThuTuc, ISearchKetQuaThuTuc } from "../models"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { AntdButton, AntdModal, AntdSelect, AntdUpLoad } from "../../../lib/antd/components"
import { UploadOutlined } from "@ant-design/icons"
import { useKetQuaThuTucContext } from "../contexts/KetQuaThuTucProvider"
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext"
import { ketQuaThuTucService } from "../services"
import EformModal from "./modals/Eform"
import { toast } from "react-toastify"
import { SearchThuTuc } from "@/features/thutuc/redux/action"
import { filterOptions } from "@/utils"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"



export const ThemDinhKemMauPhoi = ({ setSearchParams }: { setSearchParams: React.Dispatch<React.SetStateAction<ISearchKetQuaThuTuc>> }) => {
  const dispatch = useAppDispatch()
  const ketQuaThuTucContext = useKetQuaThuTucContext()
  const thuTucContext = useThuTucContext()
  const [form] = Form.useForm<IKetQuaThuTuc>()
  const [ketQuaThuTuc, setKetQuaThuTuc] = useState<IKetQuaThuTuc>()
  const dinhKemPhoi = Form.useWatch('dinhKemPhoi', form)
  const onFinish = async () => {
    const formData = await form.validateFields()
    if (ketQuaThuTucContext?.maKetQuaThuTuc) {
      const res = await ketQuaThuTucService.Update({ id: ketQuaThuTucContext.maKetQuaThuTuc, data: { ...formData, dinhKemPhoi: formData.dinhKemPhoi ?? "" } })
      if (res.data.succeeded) {
        toast.success("Cập nhật thành công")
      }
    } else {

    }
    setSearchParams(cur => ({ ...cur }))
    resetState()
  }

  const resetState = () => {
    form.resetFields();
    ketQuaThuTucContext.setDinhKemMauPhoiModalVisible(false)
    ketQuaThuTucContext.setMaKetQuaThuTuc(undefined)
  }
  const handleCancel = () => {
    resetState()
  };
  useEffect(() => {
    (async () => {
      if (ketQuaThuTucContext.maKetQuaThuTuc) {
        const res = await ketQuaThuTucService.Get(ketQuaThuTucContext.maKetQuaThuTuc)
        setKetQuaThuTuc(res.data.data)
      }
    })()
  }, [ketQuaThuTucContext.maKetQuaThuTuc])

  useEffect(() => {
    if (ketQuaThuTuc) {
      form.setFieldsValue({ ...ketQuaThuTuc })
    }
  }, [ketQuaThuTuc])

  return (
    <Spin spinning={false}>
      <AntdModal title="Cấu hình trích xuất dữ liệu eForm ra kết quả thủ tục để số hóa" visible={true} handlerCancel={handleCancel} footer={<>
        <AntdButton key={"1"} onClick={(handleCancel)}>Đóng</AntdButton>
        <AntdButton key={"3"} type="primary" onClick={onFinish}>Xác nhận</AntdButton>
      </>}>
        <Form name='ketquathutuc' layout="horizontal" form={form} requiredMark={ketQuaThuTucContext.maKetQuaThuTuc !== null}
          initialValues={{ thoiHanMacDinh: 6, loaiThoiHan: "month" }}>

          <Row gutter={[8, 8]}>

            <Col md={24} span={24}>
              <Form.Item
                label="Mẫu phôi"
                name="dinhKemPhoi"
                rules={[{ required: true, message: 'Vui lòng chọn phôi' }]}
              >
                <RegularUpload
                  form={form}
                  fieldName="dinhKemPhoi"
                  folderName={`MauPhoi`}
                  dinhKem={dinhKemPhoi}
                />

              </Form.Item>
            </Col>

          </Row>
        </Form>
      </AntdModal>

    </Spin>
  )
}