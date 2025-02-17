import { useAppDispatch } from "../../../lib/redux/Hooks";
import { IDonViThuTuc } from "../models";
import { useDonViThuTucContext } from "../contexts/DonViThuTucContext";

import { Form, Input, Space, Row, Popconfirm } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton } from "../../../lib/antd/components";
import { ISearchDonViThuTuc } from "../models";
import { useCallback } from "react";
import { DonViThuTucDetail } from "./DonViThuTucDetail";
import { useDonViContext } from "@/features/donvi/contexts/DonViContext";
import { toast } from "react-toastify";
import { DeleteMultiDonViThuTuc } from "../redux/action";

export const DonViThuTucSearch = ({
  setSearchParams,
  onReload,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchDonViThuTuc>>;
  onReload: () => void;
}) => {
  const donViContext = useDonViContext();

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const onFinish = (values: ISearchDonViThuTuc) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams({ reFetch: true });
    form.resetFields();
  }, []);
  return (
    <CollapseContent
      extraButtons={[
        <AntdButton
          onClick={() => {
            donViContext.setAddMultiDonViModalVisible(true);
          }}
        >
          Thêm mới
        </AntdButton>,

        <AntdButton
          onClick={() => {
            // donViContext.setAddMultiDonViModalVisible(true);
          }}
        >
          <Popconfirm
            title="Xóa đơn vị thủ tục"
            description="Xác nhận xóa danh sách đơn vị thủ tục?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={async () => {
              // donViContext.setAddMultiDonViModalVisible(true);
              if (donViContext.selectedDonViThuTucs.length > 0) {
                await dispatch(
                  DeleteMultiDonViThuTuc({
                    Ids: donViContext.selectedDonViThuTucs,
                    ForceDelete: false,
                  })
                );
              } else {
                toast.error("Bạn chưa chọn đơn vị thủ tục");
              }
              onReload();
            }}
          >
            Xóa
          </Popconfirm>
        </AntdButton>,

        <AntdButton
          onClick={() => {
            // donViContext.setAddMultiDonViModalVisible(true);
            if (donViContext.selectedDonViThuTucs.length > 0) {
              donViContext.setChonMucDoModalVisible(true);
            } else {
              toast.error("Bạn chưa chọn đơn vị thủ tục");
            }
          }}
        >
          Chỉnh sửa mức độ nhiều đơn vị
        </AntdButton>,
      ]}
    >
      <Form
        name="donViThuTuc"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item label="Tên dịch vụ" name="title">
          <Input />
        </Form.Item>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit">
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
      {donViContext.donViModalVisible ? (
        <DonViThuTucDetail setSearchDonViThuTucParams={setSearchParams} />
      ) : null}
    </CollapseContent>
  );
};
