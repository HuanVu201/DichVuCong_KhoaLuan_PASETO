import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  SelectProps,
  Space,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { IThuTuc } from "../models";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "../../../lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import { AddThuTuc, GetThuTuc, UpdateThuTuc } from "../redux/action";
import { useThuTucContext } from "../contexts/ThuTucContext";
import { resetData } from "../redux/slice";
import dayjs from "dayjs";
import ReactJson from "react-json-view";

const mucDoOptions: SelectProps["options"] = [
  { label: "Dịch vụ công", value: "2" },
  {
    label: "Dịch vụ công trực tuyến một phần",
    value: "3",
  },
  {
    label: "Dịch vụ công trực tuyến toàn trình",
    value: "4",
  },
];

const suDungOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: false },
];

const trangThaiPhiLePhiOptions: SelectProps["options"] = [
  { label: "Có", value: true as any },
  { label: "Không", value: false },
];

export const ThuTucDetail = () => {
  const dispatch = useAppDispatch();
  const { data: ThuTuc, datas: ThuTucs } = useAppSelector(
    (state) => state.thutuc
  );
  const ThuTucContext = useThuTucContext();
  const [selectedDate, setSelectedDate] = useState(null);

  const [form] = Form.useForm<IThuTuc>();
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const onFinish = async () => {
    const formData = form.getFieldsValue();

    if (ThuTucContext?.thuTucId) {
      dispatch(
        UpdateThuTuc({
          id: ThuTucContext.thuTucId,
          data: { ...formData, linhVucId: "", goiTinThuTucQG: null as any }
        })
      );
    } else {
      dispatch(AddThuTuc({ ...formData }));
    }
    handleCancel();
  };
  const handleCancel = () => {
    form.resetFields();
    // dispatch(resetData)
    ThuTucContext.setThuTucModalVisible(false);
    ThuTucContext.setThuTucId(undefined);
  };
  useEffect(() => {
    if (ThuTucContext.thuTucId) {
      dispatch(GetThuTuc(ThuTucContext.thuTucId));
    }
  }, [ThuTucContext.thuTucId]);

  useEffect(() => {
    if (ThuTuc) {
      form.setFieldsValue({
        ...ThuTuc,
        ngayCapNhat: ThuTuc.ngayCapNhat ? dayjs(ThuTuc.ngayCapNhat) : null,
      } as any);
    }
  }, [ThuTuc]);

  return (
    <AntdModal
      title="Cập nhật thủ tục"
      visible={ThuTucContext.thuTucModalVisible}
      handlerCancel={handleCancel}
      footer={null}
      fullsizeScrollable
    >
      <Form
        name="ThuTuc"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={ThuTucContext.thuTucId !== null}
        initialValues={{
          soLuongThuTuc: 0,
          soLuongThuTucCapTinh: 0,
          soLuongThuTucCapHuyen: 0,
          soLuongThuTucCapXa: 0,
        }}
      >
        <Row gutter={[8, 0]}>
          <Col md={6} span={24}>
            <Form.Item
              label="Sử dụng"
              name="suDung"
              valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item
              label="Là thủ tục chứng thực"
              name="laThuTucChungThuc"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item
              label="Là thủ tục tiêu biểu"
              name="laTieuBieu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col md={6} span={24}>
            <Form.Item
              label="Cho phép lấy tệp từ TPHS"
              name="choPhepLayFileTuTHPS"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Thứ tự" name="thuTu">
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Trạng thái phí,lệ phí" name="trangThaiPhiLePhi">
              <AntdSelect options={trangThaiPhiLePhiOptions} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label="Ngày cập nhật" name="ngayCapNhat">
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format="YYYY-MM-DD"
              ></DatePicker>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Mức độ" name="mucDo">
              <Form.Item
                name="mucDo"
              // rules={[{ required: true, message: "Vui lòng chọn mức độ" }]}
              >
                <AntdSelect options={mucDoOptions}></AntdSelect>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Hồ sơ phát sinh trong năm"
              name="hoSoPhatSinhTrongNam"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="IDQG" name="idqg">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Lĩnh vực chính" name="linhVucChinh">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Mã lĩnh vực chính" name="maLinhVucChinh">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Cơ quan thực hiện chính"
              name="coQuanThucHienChinh"
            >
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Mã kết quả chính" name="maKetQuaChinh">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Tên kết quả chính" name="tenKetQuaChinh">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Trạng thái" name="trangThai">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Tên thủ tục" name="tenTTHC">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Loại thủ tục" name="loaiTTHC">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Thời gian giải quyết" name="thoiGianGiaiQuyet">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Liên thông" name="lienThong">
              <Input disabled={true} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Quyết định công bố" name="quyetDinhCongBo">
              <Input.TextArea disabled={true} />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <p
            style={{
              color: "rgba(0, 0, 0, 0.88",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Dữ liệu request Json
          </p>
          <ReactJson
            src={
              ThuTuc?.goiTinThuTucQG != undefined
                ? JSON.parse(ThuTuc.goiTinThuTucQG)
                : {}
            }
          // name="goiTinThuTucQG"
          />
        </div>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Space>
            <AntdButton type="primary" htmlType="submit">
              Xác nhận
            </AntdButton>
            <AntdButton type="default" onClick={handleCancel}>
              Đóng
            </AntdButton>
          </Space>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};
