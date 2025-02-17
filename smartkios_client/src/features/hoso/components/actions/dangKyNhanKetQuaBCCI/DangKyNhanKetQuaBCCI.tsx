import {
  AntdButton,
  AntdDivider,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdUpLoad,
} from "@/lib/antd/components";
import { Col, Form, Input, Row } from "antd";
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

const DangKyNhanKetQuaBCCIModal = ({
  setSearchHoSoParams,
}: {
  setSearchHoSoParams: React.Dispatch<React.SetStateAction<ISearchHoSo>>;
}) => {
  const [form] = Form.useForm();
  const buttonActionContext = useButtonActionContext();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const dinhKem = Form.useWatch("dinhKemKetQua", form);
  const dispatch = useAppDispatch();
  const { datas: danhmucdiabans } = useAppSelector(
    (state) => state.danhmucdiaban
  );
  const eFormKetQuaData = Form.useWatch("eFormKetQuaData", form);
  const regularUploadRef = useRef<RegularUploadRef>(null);
  const [searchDanhMucDiaBanParams, setSearchDanhMucDiaBanParams] =
    useState<ISearchDanhMucChung>({
      pageNumber: 1,
      pageSize: 200000,
    });
  const selectedTinh = Form.useWatch("tinhThanh", form);
  const selectedHuyen = Form.useWatch("quanHuyen", form);
  useEffect(() => {
    if (buttonActionContext.selectedHoSos.length) {
      dispatch(GetHoSo({ id: buttonActionContext.selectedHoSos[0] as string }));
    }
  }, [buttonActionContext.selectedHoSos]);

  useEffect(() => {
    if (hoSo != undefined && hoSo.dangKyNhanHoSoQuaBCCIData) {
      var dangKyNhanHoSoQuaBCCIData = JSON.parse(
        hoSo.dangKyNhanHoSoQuaBCCIData
      );

      form.setFieldsValue(dangKyNhanHoSoQuaBCCIData);
    }
  }, [hoSo]);
  useEffect(() => {
    (async () => {
      await dispatch(SearchDanhMucDiaBan(searchDanhMucDiaBanParams));
    })();
  }, [searchDanhMucDiaBanParams]);
  const tinhs = useMemo(() => {
    return danhmucdiabans?.filter((x) => x.maTinh && !x.maHuyen && !x.maXa);
  }, [danhmucdiabans]);
  const huyens = useMemo(() => {
    if (selectedTinh)
      return (
        danhmucdiabans?.filter(
          (x) => x.maTinh == selectedTinh && x.maHuyen && !x.maXa
        ) ?? []
      );
    return [];
  }, [selectedTinh]);
  const xas = useMemo(() => {
    if (selectedTinh)
      return (
        danhmucdiabans?.filter((x) => x.maHuyen == selectedHuyen && x.maXa) ??
        []
      );
    return [];
  }, [selectedHuyen]);
  const handleCancel = async () => {
    form.resetFields();
    dispatch(resetData());
    dispatch(resetDatas());
    buttonActionContext.setDangKyNhanKetQuaBCCIModalVisible(false);
    buttonActionContext.setSelectedHoSos([]);
  };
  const onOk = async () => {
    const formData = await form.validateFields();
    var strDangKyNhanKqQuaBCCIData = JSON.stringify(form.getFieldsValue());

    if (buttonActionContext.selectedHoSos.length) {
      const res = await dispatch(
        DangKyNhanKqQuaBCCI({
          DangKyNhanKqQuaBCCIData: strDangKyNhanKqQuaBCCIData,
          id: buttonActionContext.selectedHoSos[0] as string,
        })
      ).unwrap();

      if (res.succeeded) {
        // form.setFieldValue("dinhKemKetQua", undefined); // clean func của antdUpLoad sẽ xóa gọi api xóa file nếu dinhKemKetQua != undefined
        setSearchHoSoParams((curr) => ({ ...curr }));
        handleCancel();
      }
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
          <AntdButton onClick={onOk} key={"3"} type="primary">
            Cập nhật
          </AntdButton>
        </AntdSpace>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="DangKyNhanKetQuaBCCIModal"
        onValuesChange={(changedvalues: any, values: any) => {
          if (changedvalues?.tinhThanh) {
            form.setFieldValue("quanHuyen", undefined);
            form.setFieldValue("xaPhuong", undefined);
          }
          if (changedvalues?.quanHuyen) {
            form.setFieldValue("xaPhuong", undefined);
          }
        }}
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
                  label="Mã tỉnh"
                  name="tinhThanh"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <AntdSelect
                    generateOptions={{
                      model: tinhs,
                      value: "maTinh",
                      label: "tenDiaBan",
                    }}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col md={8} span={24}>
                <Form.Item
                  label="Mã huyện"
                  name="quanHuyen"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <AntdSelect
                    generateOptions={{
                      model: huyens,
                      value: "maHuyen",
                      label: "tenDiaBan",
                    }}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col md={8} span={24}>
                <Form.Item
                  label="Mã xã"
                  name="xaPhuong"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <AntdSelect
                    generateOptions={{
                      model: xas,
                      value: "maXa",
                      label: "tenDiaBan",
                    }}
                    showSearch
                    allowClear
                  />
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
