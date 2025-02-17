import {
  AntdButton,
  AntdDivider,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdUpLoad,
} from "@/lib/antd/components";
import { Col, Form, Input, InputNumber, Row } from "antd";
import { RenderTitle } from "../../../../../components/common/RenderTitle";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import {
  CapNhatKetQuaHoSo,
  DangKyNhanKqQuaBCCI,
  GetHoSo,
} from "@/features/hoso/redux/action";
import { toast } from "react-toastify";
import { useEffect, useMemo, useRef, useState } from "react";
import { resetData } from "@/features/hoso/redux/slice";
import { resetDatas } from "@/features/thanhphanhoso/redux/slice";
import {
  RegularUpload,
  RegularUploadRef,
  TrichXuatOCRMode,
} from "@/lib/antd/components/upload/RegularUpload";
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
import { SearchDanhMucDiaBan } from "@/features/danhmucdiaban/redux/action";
import { getCurrency } from "@/utils";

const DangKyNhanKetQuaBCCIModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const formatter = (value: number | undefined) =>
    value ? getCurrency(value) : "0";
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const dinhKem = Form.useWatch("dinhKemKetQua", form);
  const [btnLoading, setBtnLoading] = useState(false)
  const dispatch = useAppDispatch();
  const { datas: danhmucdiabans } = useAppSelector(
    (state) => state.danhmucdiaban
  );
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])

  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length > 1) {
      toast.warning("Không yêu cầu nhiều hồ sơ");
    } else {
      var id = buttonActionContext.selectedHoSos[0] as string;
      dispatch(GetHoSo({ id }));
    }
  }, [buttonActionContext.selectedHoSos]);
  const eFormKetQuaData = Form.useWatch("eFormKetQuaData", form);
  const regularUploadRef = useRef<RegularUploadRef>(null);
  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length) {
      dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string }));
    }
  }, [buttonActionContext.selectedHoSos]);

  useEffect(() => {
    if (hoSo != undefined && hoSo.dangKyNhanHoSoQuaBCCIData && maTinh) {
      var dangKyNhanHoSoQuaBCCIData = JSON.parse(
        hoSo.dangKyNhanHoSoQuaBCCIData
      );
      form.setFieldsValue({ ...dangKyNhanHoSoQuaBCCIData, tinhThanh: maTinh });
    } else {
      if (hoSo && maTinh) {
    
        form.setFieldsValue({
          hoVaTen: hoSo?.nguoiUyQuyen ?? hoSo?.chuHoSo,
          soDienThoai: hoSo?.soDienThoaiNguoiUyQuyen ?? hoSo?.soDienThoaiChuHoSo,
          email: hoSo?.emailNguoiUyQuyen ?? hoSo?.emailChuHoSo,
          diaChi: hoSo?.diaChiNguoiUyQuyen ?? hoSo?.diaChiChuHoSo,
          tinhThanh: maTinh
        });
      }
    }
  }, [hoSo, maTinh]);
  const handleCancel = async () => {
    form.resetFields();
    dispatch(resetData());
    dispatch(resetDatas());
    buttonActionContext.setDangKyNhanKetQuaBCCIModalVisible(false);
    buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    try {
      setBtnLoading(true)
      const formData = await form.validateFields();
      var strDangKyNhanKqQuaBCCIData = JSON.stringify(form.getFieldsValue());

      if (buttonActionContext.selectedHoSos.length) {
        const res = await dispatch(
          DangKyNhanKqQuaBCCI({
            DangKyNhanKqQuaBCCIData: strDangKyNhanKqQuaBCCIData,
            id: buttonActionContext.selectedHoSos[0] as string,
          })
        ).unwrap();

        setSearchHoSoParams((curr) => ({ ...curr, pageNumber: 1 }));
        handleCancel();
        setBtnLoading(false)
      }
      setBtnLoading(false)
    } catch (error) {

      setBtnLoading(false)
    } finally {
      setBtnLoading(false)
    }
  };
  return (
    <AntdModal
      title={"ĐĂNG KÝ NHẬN KẾT QUẢ QUA BCCI"}
      visible={true}
      handlerCancel={handleCancel}
      width={1280}
      footer={
        <AntdSpace>
          <AntdButton onClick={handleCancel} key={"1"}>
            Đóng
          </AntdButton>
          {/* {eFormKetQuaData ? <AntdButton onClick={onExtractDataModify} key={"2"}>Sửa dữ liệu trích xuất OCR</AntdButton> : null} */}
          <AntdButton loading={btnLoading} onClick={onOk} key={"3"} type="primary">
            Cập nhật
          </AntdButton>
        </AntdSpace>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="DangKyNhanKetQuaBCCIModal"
        
      >
        <Row gutter={8}>
          <Col span={24}>
            <RenderTitle title="Đăng ký nhận kết quả qua BCCI" />
            <Row gutter={[4, 8]}>
              <Col span={12}>
                <Form.Item
                  name="hoVaTen"
                  label="Họ và tên"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="soDienThoai"
                  label="Số điện thoại"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="email" label="Thư điện tử">
                  <Input />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Địa chỉ chi tiết"
                  name="diaChi"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={8} span={24}>
                <Form.Item
                  label="Xã/phường"
                  name="tenXaPhuong"
                  
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col md={8} span={24}>
                <Form.Item
                  label="Quận/huyện"
                  name="tenQuanHuyen"
                 
                >
                   <Input disabled />
                </Form.Item>
              </Col>
              <Col md={8} span={24}>
                <Form.Item
                  label="Tỉnh/thành"
                  name="tenTinhThanh"
               
                >
                    <Input disabled />
                </Form.Item>
              </Col>
              <Col md={12} span={24}>
                <Form.Item
                  label="Phí thu hộ (VNĐ)"
                  name="phiThuHo"

                >
                  <InputNumber
                  defaultValue={0}
                  formatter={formatter}
                  style={{ width: "100%", textAlign:"right"}}/>
                </Form.Item>
              </Col>
            </Row>
            <AntdDivider />
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};

export default DangKyNhanKetQuaBCCIModal;
