import { Form, Input, Space, Row, Col } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { IDonViThuTuc, ISearchDonViThuTuc } from "../models";
import { useCallback, useEffect, useState } from "react";
import { DonViThuTucDetail } from "./DonViThuTucDetail";
import { useDonViThuTucContext } from "../contexts/DonViThuTucContext";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ISearchLinhVuc } from "@/features/linhvuc/models";
import { SearchLinhVuc, SearchLinhVucTheoDonVi } from "@/features/linhvuc/redux/action";

export const DonViThuTucSearch = ({
  setSearchParams,
  inDanhSach
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchDonViThuTuc>>;
  inDanhSach: () => void
}) => {
  const dispatch = useAppDispatch();
  const { datas: donVis, count } = useAppSelector((state) => state.cocautochuc);
  const { datas: linhVucs } = useAppSelector((state) => state.linhvuc);
  const [searchDonViParams, setSearchDonViParams] =
    useState<ISearchCoCauToChuc>({
      pageNumber: 1,
      pageSize: 5000,
      type: "don-vi",
    });
  const [searchLinhVucParams, setSearchLinhVucParams] =
    useState<ISearchLinhVuc>({
      pageNumber: 1,
      pageSize: 1000,
    });
  const [form] = Form.useForm();
  const donViId = Form.useWatch("donViId", form)
  const onFinish = (values: ISearchDonViThuTuc) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };
  const resetSearchParams = useCallback(() => {
    setSearchParams({ reFetch: true });
    form.resetFields();
  }, []);


  useEffect(() => {
    (async () => {
      await dispatch(SearchCoCauToChuc(searchDonViParams));
    })();
  }, [searchDonViParams]);

  useEffect(() => {
    if (donViId)
      setSearchLinhVucParams(cur => ({ ...cur, donViId: donViId }))
  }, [donViId])
  useEffect(() => {
    (async () => {
      await dispatch(SearchLinhVucTheoDonVi(searchLinhVucParams));
    })();
  }, [searchLinhVucParams]);
  return (
    <CollapseContent>
      <Form
        name="donViThuTuc"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row>
          <Col span={12}>
            <Form.Item label="Đơn vị" name="donViId">
              <AntdSelect
                showSearch
                generateOptions={{
                  model: donVis,
                  label: "groupName",
                  value: "groupCode",
                }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Lĩnh vực" name="maLinhVuc">
              <AntdSelect
                showSearch
                generateOptions={{
                  model: linhVucs,
                  label: "ten",
                  value: "ma",
                }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Sử dụng" name="suDung">
              <AntdSelect
                showSearch
                defaultValue={''}
                options={[
                  { label: "Tất cả", value: '' },
                  { label: "Sử dụng", value: 'true' },
                  { label: "Không sử dụng", value: 'false' },
                ]}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Từ khóa" name="searchKeys">
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
              <AntdButton type="primary" onClick={inDanhSach}>
                In danh sách
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  );
};
