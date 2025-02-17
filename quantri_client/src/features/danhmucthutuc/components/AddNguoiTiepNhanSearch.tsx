import { AntdButton, AntdSelect } from "@/lib/antd/components";
import { useCallback, useEffect } from "react";
import { Col, Form, Input, Row, SelectProps, Space, Spin } from "antd";
import { ISearchUser, IUser } from "@/features/user/models";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";

export const AddNguoiTiepNhanSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchUser>>;
}) => {
  const [form] = Form.useForm<ISearchUser>();
  const {
    datas: users,
    data: user,
    count,
    loading,
  } = useAppSelector((state) => state.user);
  const { datas: donVis } = useAppSelector((state) => state.cocautochuc);
  const onFinish = (values: ISearchUser) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      reFetch: true,
      donViQuanLy: user?.officeCode,
    });
    form.resetFields();
    form.setFieldValue('donViQuanLy', user?.officeCode)
  }, []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      SearchCoCauToChuc({
        pageNumber: 1,
        pageSize: 5000,
        reFetch: true,
        type: 'don-vi',
        // orderBy: ["GroupOrder", "GroupCode"],
        // groupCode: user?.officeCode,
        // getAllChildren: true,
        donViQuanLy: user?.officeCode || undefined,
      })
    );
  }, []);
  useEffect(()=> {
    if(user?.officeCode){
      form.setFieldValue('donViQuanLy', user.officeCode)
    }
  }, [user])
  return (
    <>
      <Form
        className="mt-3"
        name="NguoiDungSearch"
        layout="horizontal"
        onFinish={onFinish}
        form={form}
      >
        <div style={{ justifyContent: "center", display: "flex" }}>
          <Row gutter={[8, 8]}>
            <Col md={8} span={24}>
              <Form.Item label="Đơn vị" name="donViQuanLy">
                <AntdSelect
                  allowClear={false}
                  generateOptions={{
                    model: donVis,
                    label: "groupName",
                    value: "groupCode",
                  }}
                  style={{ width: "300px" }}
                ></AntdSelect>
              </Form.Item>
            </Col>
            <Col md={8} span={24}>
              <Form.Item label="Họ tên" name="fullName">
                <Input style={{ width: "300px" }} />
              </Form.Item>
            </Col>

            <Col md={8} span={24}>
              <Form.Item label="Tài khoản" name="userName">
                <Input style={{ width: "300px" }} />
              </Form.Item>
            </Col>
          </Row>
        </div>

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
    </>
  );
};
