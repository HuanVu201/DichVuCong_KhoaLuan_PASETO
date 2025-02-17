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
import { IDonViThuTuc } from "../models";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdUpLoad,
} from "../../../lib/antd/components";
import { UploadOutlined } from "@ant-design/icons";
import {
  AddDonViThuTuc,
  GetDonViThuTuc,
  UpdateDonViThuTuc,
} from "../redux/action";
import { useDonViThuTucContext } from "../contexts/DonViThuTucContext";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { IDonVi, ISearchDonVi } from "@/features/donvi/models";
import { useDonViContext } from "@/features/donvi/contexts/DonViContext";
import { AddDonVi, GetDonVi, UpdateDonVi } from "@/features/donvi/redux/action";
import { SearchTaiKhoanThuHuong } from "@/features/taikhoanthuhuong/redux/action";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { resetDatas as resetTaiKhoanThuHuong } from "@/features/taikhoanthuhuong/redux/slice";
import { resetDatas, resetData } from "@/features/donvi/redux/slice";
import NguoiTiepNhanWrapper from "@/features/donvi/components/NguoiTiepNhanWrapper";
import { ID_SEPARATE } from "@/data";
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

export const DonViThuTucDetail = ({
  setSearchDonViThuTucParams,
}: {
  setSearchDonViThuTucParams: React.Dispatch<
    React.SetStateAction<ISearchDonVi>
  >;
}) => {
  const dispatch = useAppDispatch();
  const { data: donVi } = useAppSelector((state) => state.donvi);
  const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
  const { datas: taiKhoanThuHuongs } = useAppSelector(
    (state) => state.taikhoanthuhuong
  );
  const [nguoiTiepNhanModalVisible, setNguoiTiepNhanModalVisible] =
    useState(false);
  // const donViContext = useDonViThuTucContext()
  const donViContext = useDonViContext();
  const thuTucContext = useThuTucContext();

  const [form] = Form.useForm<IDonVi>();
  const donViId = Form.useWatch("donViId", form);
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
      if (thuTucContext.thuTucId) {
        await dispatch(
          AddDonVi({
            ...formData,
            maTTHC: thuTucContext.thuTucId,
            nguoiTiepNhanId:
              donViContext.selectedUsers?.join(ID_SEPARATE) || "",
          })
        ).unwrap();
      }
    }
    setSearchDonViThuTucParams((cur) => ({ ...cur }));
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
    dispatch(resetTaiKhoanThuHuong());
    dispatch(resetData());
    donViContext.setSelectedUserOptions([]);
    donViContext.setDonViModalVisible(false);
    donViContext.setDonViId(undefined);
    donViContext.setSelectedUsers([]);
  };
  useEffect(() => {
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
      dispatch(SearchTaiKhoanThuHuong({ donViId: donVi.donViId }));
      form.setFieldsValue({ ...donVi });
      // donViContext.setSelectedUsers(donVi.nguoiTiepNhanId.split(ID_SEPARATE))
      donViContext.setSelectedUsers(
        donVi.nguoiTiepNhan?.map((x) => x.id) || []
      );
      const donViOptions = donVi.nguoiTiepNhan?.map((x) => ({
        value: x.id,
        label: x.userName,
      })) as DefaultOptionType[];
      donViContext.setSelectedUserOptions(donViOptions);
    }
  }, [donVi]);
  const onHandleChange = (e: any) => {
    donViContext.setSelectedUsers(
      donViContext.selectedUsers?.filter((x) => x != e)
    );
  };
  const handleCancelNguoiTiepNhanVisible = () => {
    setNguoiTiepNhanModalVisible(false);
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
        initialValues={{ mucDo: "2" }}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item label="Đơn vị" name="donViId">
              <AntdSelect
                showSearch
                options={filterCoCauOptions}
                onChange={onChange}
              ></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Tài khoản thụ hưởng" name="taiKhoanThuHuongId">
              <AntdSelect options={taiKhoanThuHuongOptions}></AntdSelect>
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
                style={{ marginBottom: 3 }}
                mode="multiple"
                onDeselect={onHandleChange}
                value={donViContext.selectedUsers}
                options={donViContext.selectedUserOptions}
              ></AntdSelect>
              {donViId !== undefined ? (
                <Button
                  type="primary"
                  onClick={() => setNguoiTiepNhanModalVisible(true)}
                >
                  Chọn người tiếp nhận
                </Button>
              ) : null}
              {nguoiTiepNhanModalVisible ? (
                <NguoiTiepNhanWrapper
                  handleCancel={handleCancelNguoiTiepNhanVisible}
                ></NguoiTiepNhanWrapper>
              ) : (
                <></>
              )}
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
          <Col md={12} span={24}>
            <Form.Item label="Đường dẫn chuyển tiếp" name="urlRedirect">
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
