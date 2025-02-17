import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  SelectProps,
  Space,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { IHoSo } from "../../hoso/models";
import { useEffect, useMemo, useRef } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "../../../lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import { AddHoSoTrucTiep, GetHoSo, UpdateHoSo } from "../../hoso/redux/action";
import { useTheoDoiHoSoContext } from "../contexts/TheoDoiHoSoContext";
import { resetData } from "../../hoso/redux/slice";
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload";

export const TheoDoiHoSoDetail = () => {
  const dispatch = useAppDispatch();
  const { data: hoSo } = useAppSelector((state) => state.hoso);
  const theoDoiHoSoContext = useTheoDoiHoSoContext();
  const [form] = Form.useForm<IHoSo>();
  const dinhKem = Form.useWatch("dinhKem", form)
  const onFinish = async () => {
    const formData = form.getFieldsValue();
    if (theoDoiHoSoContext?.TheoDoiHoSoId) {
      dispatch(
        UpdateHoSo({
          id: theoDoiHoSoContext.TheoDoiHoSoId,
          data: { ...formData },
        })
      );
    } else {
      dispatch(AddHoSoTrucTiep({ ...formData }));
    }
    handleCancel();
  };
  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    theoDoiHoSoContext.setDetailTheoDoiHoSoModalVisible(false);
    theoDoiHoSoContext.setTheoDoiHoSoId(undefined);
  };
  useEffect(() => {
    if (theoDoiHoSoContext.TheoDoiHoSoId) {
      dispatch(GetHoSo({ id: theoDoiHoSoContext.TheoDoiHoSoId }));
    }
  }, [theoDoiHoSoContext.TheoDoiHoSoId]);

  useEffect(() => {
    if (hoSo) {
      form.setFieldsValue({ ...hoSo });
    }
  }, [hoSo]);

  return (
    <AntdModal
      title="Thêm mới dịch vụ"
      visible={theoDoiHoSoContext.detailTheoDoiHoSoModalVisible}
      handlerCancel={handleCancel}
      footer={null}
    >
      <Form
        name="HoSo"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={theoDoiHoSoContext.TheoDoiHoSoId === null}
        initialValues={{ thuTu: 1 }}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên dịch vụ"
              name="tenHoSo"
              rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Tóm tắt" name="tomTat">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Thứ tự hiển thị"
              name="thuTu"
              rules={[
                { required: true, message: "Vui lòng nhập thứ tự hiển thị" },
              ]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Ảnh đại diện" name="imageUrl">
              {hoSo?.maHoSo ?  <RegularUpload fieldName={"imageUrl"} folderName={hoSo.maHoSo} form={form} dinhKem={dinhKem}/> : null}
             

              {/* <AntdUpLoad
                formInstance={form}
                folderName={hoSo}
                fieldName="imageUrl"
                accept="image/png, image/jpeg"
                listType="picture"
              /> */}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <AntdButton type="primary" onClick={onFinish}>
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
