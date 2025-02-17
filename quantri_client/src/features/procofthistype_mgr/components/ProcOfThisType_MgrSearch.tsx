import { Form, Input, Space, Row, Col } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { useAppDispatch ,useAppSelector} from "../../../lib/redux/Hooks";
import { IProcOfThisType_Mgr, ISearchProcOfThisType_Mgr } from "../models";
import { useCallback } from "react";
import { ProcOfThisType_MgrDetail } from "./ProcOfThisType_MgrDetail";
import { useProcOfThisType_MgrContext } from "../contexts/ProcOfThisType_MgrContext";
import { toast } from "react-toastify";
import { useTypeOfProc_MgrContext } from "@/features/typeOfProc_Mgr/contexts/TypeOfProc_MgrContext"

export const ProcOfThisType_MgrSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchProcOfThisType_Mgr>>;
}) => {
  const procOfThisType_MgrContext = useProcOfThisType_MgrContext();
  const { datas: ThuTucs, data:ThuTuc } = useAppSelector((state) => state.thutuc);
  const [form] = Form.useForm();
  const onFinish = (values: ISearchProcOfThisType_Mgr) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };

  const typeOfProc_MgrContext = useTypeOfProc_MgrContext();
  const resetSearchParams = useCallback(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50,loaithutucid:typeOfProc_MgrContext.typeOfProc_MgrId });
    form.resetFields();
  }, []);
  
  
  return (
    <CollapseContent
      extraButtons={[
        <AntdButton
          onClick={() => {
            procOfThisType_MgrContext.setProcOfThisType_MgrModalVisible(true);
            //console.log("thêm mới: "+ procOfThisType_MgrContext.procOfThisType_MgrModalVisible);
          }}
        >
          Thêm mới
        </AntdButton>,
        
      ]}
    >
      <Form
        name="ProcOfThisType_MgrSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col md={24} span={24}>
          <Form.Item
                        label="Thủ tục"
                        name="thuTucID"
                        style={{ marginBottom: '16px' }}
                    >
                        <AntdSelect
                            placeholder="Chọn thủ tục"
                            allowClear
                            generateOptions={{ model: ThuTucs, label: 'tenTTHC', value: 'id' }}
                            style={{ width: '100%' }}
                        />
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
