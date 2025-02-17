import { Form, Input, Space, Row, Col } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { IDonViThuTuc, ISearchDonViThuTuc } from "../models";
import { useCallback, useEffect, useState } from "react";
import { DonViThuTucDetail } from "./DonViThuTucDetail";
import { useDonViThuTucContext } from "../contexts/DonViThuTucContext";
import {
  ICoCauToChuc,
  ISearchCoCauToChuc,
} from "@/features/cocautochuc/models";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { ISearchLinhVuc } from "@/features/linhvuc/models";
import { SearchLinhVuc } from "@/features/linhvuc/redux/action";
import { ISearchDanhMucChung } from "@/features/danhmucdungchung/models";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { coCauToChucService } from "@/features/cocautochuc/services";

export const DanhSachTaiKhoanSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchDonViThuTuc>>;
}) => {
  const dispatch = useAppDispatch();
  const { datas: donVis, count } = useAppSelector((state) => state.cocautochuc);
  const { datas: danhMucChungs } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const [phongBans, setPhongBans] = useState<ICoCauToChuc[]>([]);
  const [selectedDonVis, setSelectedDonVis] = useState<string | undefined>();
  const [searchDonViParams, setSearchDonViParams] =
    useState<ISearchCoCauToChuc>({
      pageNumber: 1,
      pageSize: 5000,
      type: "don-vi",
    });
  const [searchChucVuParams, setSearchChucVuParams] =
    useState<ISearchDanhMucChung>({
      pageNumber: 1,
      pageSize: 1000,
    });
  const [searchPhongBanParams, setSearchPhongBanParams] =
    useState<ISearchCoCauToChuc>({
      pageNumber: 1,
      pageSize: 5000,
    });
  const [form] = Form.useForm();
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
  // handle load phòng ban

  useEffect(() => {
    if (selectedDonVis)
      setSearchPhongBanParams({
        ...searchPhongBanParams,
        ofGroupCode: selectedDonVis,
      });
  }, [selectedDonVis]);
  useEffect(() => {
    (async () => {
      if (searchPhongBanParams.ofGroupCode) {
        var dataPhongBan = await coCauToChucService.Search(
          searchPhongBanParams
        );
        if (dataPhongBan?.data && dataPhongBan?.data?.data) {
          setPhongBans(dataPhongBan?.data?.data);
        } else {
          form.setFieldValue("groupCode", null);
          setPhongBans([]);
        }
      } else {
        form.setFieldValue("groupCode", null);
        setPhongBans([]);
      }
    })();
  }, [searchPhongBanParams]);
  useEffect(() => {
    (async () => {
      await dispatch(SearchDanhMucChung(searchChucVuParams));
    })();
  }, [searchChucVuParams]);
  return (
    <CollapseContent>
      <Form
        name="donViThuTuc"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={[8, 8]}>
          <Col span={12} md={12}>
            <Form.Item label="Đơn vị" name="officeCode">
              <AntdSelect
                onChange={(value) => setSelectedDonVis(value)}
                generateOptions={{
                  model: donVis,
                  label: "groupName",
                  value: "groupCode",
                }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12} md={12}>
            <Form.Item label="Phòng ban" name="groupCode">
              <AntdSelect
                generateOptions={{
                  model: phongBans,
                  label: "groupName",
                  value: "groupCode",
                }}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12} md={12}>
            <Form.Item label="Chức vụ" name="positionName">
              <AntdSelect
                generateOptions={{
                  model: danhMucChungs,
                  label: "tenDanhMuc",
                  value: "tenDanhMuc",
                }}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={12} md={12}>
            <Form.Item label="Họ và tên" name="FullName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} md={12}>
            <Form.Item label="Tài khoản" name="UserName">
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
