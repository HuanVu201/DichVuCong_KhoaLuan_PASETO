import { AntdModal, AntdSelect } from "@/lib/antd/components";
import { Col, DatePicker, Form, FormProps, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import dayjs from "dayjs";
import {
  GetYeuCauThanhToan,
  PayYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/redux/action";
import { SelectProps } from "antd/lib";
import { IYeuCauThanhToan } from "@/pages/dvc/thuphilephi/models/YeuCauThanhToan";
import {
  AdminUpdateYeuCauThanhToanParams,
  IAdminYeuCauThanhToan,
} from "@/features/adminHoSo/models/AdminYeuCauThanhToanDto";
import {
  AdminGetYeuCauThanhToan,
  AdminUpdateYeuCauThanhToan,
} from "@/features/adminHoSo/redux/action";
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ISearchUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { FORMAT_DATE } from "@/data/constant";
const HINH_THUC_THANH_TOAN: SelectProps["options"] = [
  { value: "tien-mat", label: "Tiền mặt" },
  { value: "chuyen-khoan", label: "Chuyển khoản" },
  { value: "truc-tuyen", label: "Trực tuyến" },
];
export const UpdateYeuCauThanhToanModal = ({
  handleCancel,
  reFetch,
  YeuCauThanhToanId,
}: {
  handleCancel: () => void;
  reFetch: () => void;
  YeuCauThanhToanId: React.Key[];
}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<any>();
  const { datas: hinhThucThanhToan } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const { datas: groups } = useAppSelector((state) => state.cocautochuc);
  const { datas: users } = useAppSelector((state) => state.user);
  const [searchUserParams, setSearchuserParams] = useState<ISearchUser>({
    pageNumber: 1,
    pageSize: 200000,
  });
  const [searchDanhMucs, SetSearchDanhMucs] = useState<ISearchDanhMucChung>({
    pageNumber: 1,
    pageSize: 1000,
    type: "hinh-thuc-thanh-toan",
  });
  const [searchGroups, SetSearchGroups] = useState<ISearchCoCauToChuc>({
    pageNumber: 1,
    pageSize: 10000,
  });
  const onOk: FormProps["onFinish"] = async () => {
    var postData = {
      id: YeuCauThanhToanId.toString(),
      data: form.getFieldsValue(),
    };
    var res = await dispatch(AdminUpdateYeuCauThanhToan(postData));
    // var resPay = await dispatch(PayYeuCauThanhToan(postData)).unwrap();
    reFetch();
    handleCancel();
  };
  useEffect(() => {
    (async () => {
      await dispatch(SearchDanhMucChung(searchDanhMucs));
      await dispatch(SearchUser(searchUserParams));
      await dispatch(SearchCoCauToChuc(searchGroups));
      var yeuCauThanhToan = await dispatch(
        AdminGetYeuCauThanhToan(YeuCauThanhToanId.toString())
      ).unwrap();
      form.setFieldsValue({
        ...yeuCauThanhToan.data,
        ngayYeuCau: yeuCauThanhToan?.data?.ngayYeuCau
          ? dayjs(yeuCauThanhToan?.data?.ngayYeuCau)
          : undefined,
      });
    })();
  }, []);
  return (
    <AntdModal
      title="Chỉnh sửa yêu cầu thanh toán"
      visible={true}
      handlerCancel={handleCancel}
      onOk={onOk}
      okText="Xác nhận"
      fullsizeScrollable
    >
      <Form form={form} layout="vertical">
        <Row gutter={[8, 0]}>
          <Col md={12} span={24}>
            <Form.Item name="maHoSo" label="Mã hồ sơ">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="nguoiYeuCau" label="Người yêu cầu">
              <AntdSelect
                generateOptions={{
                  model: users,
                  label: "fullName",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayYeuCau" label="Ngày yêu cầu">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="hinhThucThu" label="Hình thức thu">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="trangThai" label="Trạng thái">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="donVi" label="Đơn vị">
              <AntdSelect
                generateOptions={{
                  model: groups,
                  value: "groupCode",
                  label: "groupName",
                }}
                placeholder="Chọn hình thức thanh toán"
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="donViThu" label="Đơn vị thu">
              <AntdSelect
                generateOptions={{
                  model: groups,
                  value: "groupCode",
                  label: "groupName",
                }}
                placeholder="Chọn hình thức thanh toán"
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="nguoiThuPhi" label="Người thu phí">
              <AntdSelect
                generateOptions={{
                  model: users,
                  label: "fullName",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayThuPhi" label="Ngày thu phí">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="hinhThucThanhToan" label="Hình thức thanh toán">
              <AntdSelect
                generateOptions={{
                  model: hinhThucThanhToan,
                  value: "code",
                  label: "tenDanhMuc",
                }}
                placeholder="Chọn hình thức thanh toán"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayHoanPhi" label="Ngày hoàn phí">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item name="nguoiHoanPhi" label="Người hoàn phí">
              <AntdSelect
                generateOptions={{
                  model: users,
                  label: "fullName",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="lyDoHoanPhi" label="Lý do hoàn phí">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ngayHuy" label="Ngày huỷ">
              <DatePicker
                placeholder="Chọn ngày"
                format={FORMAT_DATE}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item name="nguoiHuy" label="Người huỷ">
              <AntdSelect
                generateOptions={{
                  model: users,
                  label: "fullName",
                  value: "id",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item name="lyDoHuy" label="Lý do huỷ">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col md={12} span={24}></Col>
          <Col md={8} span={24}>
            <Form.Item name="phi" label="Phí">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item name="lePhi" label="Lệ phí">
              <Input />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item name="soTien" label="Thành tiền">
              <Input />
            </Form.Item>
          </Col>
          <Col md={24} span={24}>
            <Form.Item name="ghiChu" label="Ghi chú">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntdModal>
  );
};
