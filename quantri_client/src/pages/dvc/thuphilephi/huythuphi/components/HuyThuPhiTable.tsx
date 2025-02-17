import { Suspense, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { HuyThuPhiSearch } from "./HuyThuPhiSearch";
import { MenuProps, Spin } from "antd";
import {
  HuyThuPhiProvider,
  useHuyThuPhiContext,
} from "../contexts/HuyThuPhiContext";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { useHuyThuPhiColumn } from "../hook/UseHuyThuPhiLePhiColumn";
import { BienLaiDienTuDetail } from "@/pages/dvc/bienlaithanhtoan/components/BienLaiDienTuDetail";

import {
  AuditOutlined,
  DollarCircleOutlined,
  FilterOutlined,
  RedoOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { HoanPhi } from "../../chothuphi/components/HoanPhi";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";

const HuyThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );

  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.HUY_THANH_TOAN,
    donViThu: user?.officeCode,
  });
  const items: MenuProps["items"] = useMemo(() => [], []);
  const { columns } = useHuyThuPhiColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      //   yeuCauThanhToanContext.setSelectedIds(selectedRowKeys);
    },
  };

  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <AntdSpace
            direction="horizontal"
            style={{ flexWrap: "wrap" }}
          ></AntdSpace>
          <HuyThuPhiSearch setSearchParams={setSearchParams} />
          <AntdTable
            columns={columns}
            dataSource={yeucauthanhtoans}
            pagination={{
              total: count,
            }}
            rowSelection={rowSelection}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSearch={(params) => dispatch(SearchYeuCauThanhToan(params))}
          />
        </AntdSpace>
      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <HuyThuPhiProvider>
    <ButtonActionProvider>
      <HuyThuPhiTable />
    </ButtonActionProvider>
  </HuyThuPhiProvider>
);
export default HoSoTableWrapper;
