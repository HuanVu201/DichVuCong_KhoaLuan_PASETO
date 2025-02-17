import { Form, Input, Space, Row, Col } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton } from "../../../lib/antd/components";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { ITypeOfProc_Mgr, ISearchTypeOfProc_Mgr } from "../models";
import { useCallback } from "react";
import { TypeOfProc_MgrDetail } from "./TypeOfProc_MgrDetail";
import { useTypeOfProc_MgrContext } from "../contexts/TypeOfProc_MgrContext";
import { toast } from "react-toastify";
import { useProcGroup_MgrContext } from "@/features/proGruop_Mgr/contexts/ProcGroup_MgrContext";

export const TypeOfProc_MgrSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchTypeOfProc_Mgr>>;
}) => {
  const typeOfProc_MgrContext = useTypeOfProc_MgrContext();
  const ProcGroup_MgrContext = useProcGroup_MgrContext();
  const [form] = Form.useForm();
  const onFinish = (values: ISearchTypeOfProc_Mgr) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };

  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, nhomthutucid: ProcGroup_MgrContext.procGroup_MgrId, reFetch: true });
    form.resetFields();
  }, []);
  
  return (
    <CollapseContent
      extraButtons={[
        <AntdButton
          onClick={() => {
            typeOfProc_MgrContext.setTypeOfProc_MgrModalVisible(true);
            //console.log("thêm mới: "+ typeOfProc_MgrContext.typeOfProc_MgrModalVisible);
          }}
        >
          Thêm mới
        </AntdButton>,
        
      ]}
    >
      <Form
        name="TypeOfProc_MgrSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col md={24} span={24}>
            <Form.Item label="Tên loại thủ tục" name="ten">
              <Input />
            </Form.Item>
          </Col>
        </Row>
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
    </CollapseContent>
  );
};
