import {
  Button,
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
import { IDonVi } from "../models";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "../../../lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import { AddDonVi, GetDonVi, UpdateDonVi } from "../redux/action";
import { useDonViContext } from "../contexts/DonViContext";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { resetData } from "@/features/donvithutuc/redux/slice";
import { resetData as resetDataDonVi } from "@/features/donvi/redux/slice";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { SearchTaiKhoanThuHuong } from "@/features/taikhoanthuhuong/redux/action";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import NguoiTiepNhanWrapper from "./NguoiTiepNhanWrapper";
import { ID_SEPARATE } from "@/data";
import Item from "antd/es/list/Item";
import { DefaultOptionType } from "antd/es/select";

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

export const DonViDetail = () => {
  const dispatch = useAppDispatch();
  const { data: donVi, datas: donVis } = useAppSelector((state) => state.donvi);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { datas: taiKhoanThuHuongs } = useAppSelector(
    (state) => state.taikhoanthuhuong
  );
  const { datas: thuTucs } = useAppSelector((state) => state.thutuc);

  const donViContext = useDonViContext();
  const [nguoiTiepNhanModalVisible, setNguoiTiepNhanModalVisible] =
    useState(false);
  const [form] = Form.useForm<IDonVi>();

  const filterCoCauOptions = useMemo((): SelectProps["options"] => {
    const filteredOptions = coCauToChucs?.map((item) => ({
      label: item.groupName,
      value: item.groupCode,
    }));
    return filteredOptions || [];
  }, [coCauToChucs]);
  const taiKhoanThuHuongOptions = useMemo((): SelectProps["options"] => {
    const filteredOptions = taiKhoanThuHuongs?.map((item) => ({
      label: `${item.tenTKThuHuong}-${item.tkThuHuong}`,
      value: item.id,
    }));
    return filteredOptions || [];
  }, [taiKhoanThuHuongs]);

  const onFinish = async () => {
    const formData = form.getFieldsValue();
    if (donViContext?.donViId) {
      await dispatch(
        UpdateDonVi({
          id: donViContext.donViId,
          data: {
            ...formData,
            nguoiTiepNhanId: donViContext.selectedUsers?.join(ID_SEPARATE),
          },
        })
      ).unwrap();
    } else {
      await dispatch(
        AddDonVi({
          ...formData,
          nguoiTiepNhanId: donViContext.selectedUsers?.join(ID_SEPARATE) || "",
        })
      ).unwrap();
    }

    handleCancel();
  };
  const onChange = async (e: any) => {
    const res = await dispatch(
      SearchTaiKhoanThuHuong({ donViId: e, pageNumber: 1, pageSize: 1100 })
    ).unwrap();
    if (res.data == null) {
      form.setFieldValue("taiKhoanThuHuongId", undefined);
    }
  };
  const handleCancel = () => {
    form.resetFields();
    dispatch(resetData());
    dispatch(resetDataDonVi());
    donViContext.setDonViModalVisible(false);
    donViContext.setDonViId(undefined);
    donViContext.setSelectedUsers([]);
  };
  const handleCancelNguoiTiepNhanVisible = () => {
    setNguoiTiepNhanModalVisible(false);
  };
  const selectedUserOptions = useMemo(() => {
    return donViContext.selectedUsers?.map((x): DefaultOptionType => {
      return {
        value: x,
        label: x,
      };
    });
  }, [donViContext.selectedUsers]);
  useEffect(() => {
    // dispatch(SearchTaiKhoanThuHuong({}))
    dispatch(SearchThuTuc({}));
    dispatch(
      SearchCoCauToChuc({ type: "don-vi", pageNumber: 1, pageSize: 1100 })
    );
  }, []);
  useEffect(() => {
    if (donViContext.donViId) {
      dispatch(GetDonVi(donViContext.donViId));
    }
  }, [donViContext.donViId]);

  useEffect(() => {
    if (donVi) {
      form.setFieldsValue({ ...donVi });
      donViContext.setSelectedUsers(donVi?.nguoiTiepNhanId.split(ID_SEPARATE));
    }
  }, [donVi]);
  const onHandleChange = (e: any) => {
    donViContext.setSelectedUsers(
      donViContext.selectedUsers?.filter((x) => x != e)
    );
  };

  return (
    <AntdModal
      title={
        donViContext.donViId
          ? "Chi tiết đơn vị thủ tục"
          : "Thêm mới đơn vị thủ tục"
      }
      visible={true}
      handlerCancel={handleCancel}
      footer={null}
    >
      <Form
        name="donvi"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={donViContext.donViId !== null}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Đơn vị"
              name="donViId"
              rules={[{ required: true, message: "Vui lòng chọn đơn vị" }]}
            >
              <AntdSelect
                showSearch
                onChange={onChange}
                generateOptions={{
                  model: coCauToChucs,
                  label: "groupName",
                  value: "groupCode",
                }}
              ></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Tài khoản thụ hưởng"
              name="taiKhoanThuHuongId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tài khoản thụ hưởng",
                },
              ]}
            >
              <AntdSelect options={taiKhoanThuHuongOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Thủ tục"
              name="maTTHC"
              rules={[{ required: true, message: "Vui lòng chọn mã TTHC" }]}
            >
              <AntdSelect
                generateOptions={{
                  model: thuTucs,
                  label: "tenTTHC",
                  value: "maTTHC",
                }}
              ></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Mức độ"
              name="mucDo"
              rules={[{ required: true, message: "Vui lòng chọn mức độ" }]}
            >
              <AntdSelect options={mucDoOptions}></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Người tiếp nhận"
              name="nguoiTiepNhanId"
              rules={[
                { required: true, message: "Vui lòng chọn người tiếp nhận" },
              ]}
            >
              <AntdSelect
                mode="multiple"
                onDeselect={onHandleChange}
                value={donViContext.selectedUsers}
                options={selectedUserOptions}
              ></AntdSelect>
              <Col>
                <Button
                  type="primary"
                  onClick={() => setNguoiTiepNhanModalVisible(true)}
                >
                  Chọn người tiếp nhận
                </Button>
                {nguoiTiepNhanModalVisible ? (
                  <NguoiTiepNhanWrapper
                    handleCancel={handleCancelNguoiTiepNhanVisible}
                  ></NguoiTiepNhanWrapper>
                ) : (
                  <></>
                )}
              </Col>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đường dẫn chuyển tiếp" name="urlRedirect">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Đơn vị mã số thuế" name="donViMaSoThue">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Mã số thuế" name="maSoThue">
              <Input />
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
