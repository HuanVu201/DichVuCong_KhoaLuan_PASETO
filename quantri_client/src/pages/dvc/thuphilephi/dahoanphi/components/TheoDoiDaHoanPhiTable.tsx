import { Suspense, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { DaHoanPhiSearch } from "./DaHoanPhiSearch";
import { Button, MenuProps, Spin } from "antd";
import {
  DaHoanPhiProvider,
  useDaHoanPhiContext,
} from "../contexts/DaHoanPhiContext";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { useDaHoanPhiColumn } from "../hook/UseDaHoanPhiColumn";
import { BienLaiDienTuDetail } from "@/pages/dvc/bienlaithanhtoan/components/BienLaiDienTuDetail";

import {
  AuditOutlined,
  DollarCircleOutlined,
  FileExcelOutlined,
  FilterOutlined,
  RedoOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { HoanPhi } from "../../chothuphi/components/HoanPhi";
import { ButtonActionProvider } from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { HoSoTableActions } from "../../hosodathuphitructuyen/hooks/HoSoDaThuPhiTrucTuyenColumn";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";
import { XuatDanhSachHoanPhi } from "./XuatDanhSachDaHoanPhi";

const TheoDoiDaHoanPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );

  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.HOAN_PHI,
    donVi: user?.officeCode,
  });
  const items: HoSoTableActions[] = useMemo(() => [], []);
  const { columns } = useDaHoanPhiColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  var buttons = [
    <Button
      onClick={() => {
        downloadPhieuExcel("Bảng thống kê thu phí lệ phí", "tableToExcel");
      }}
    >
      <FileExcelOutlined style={{ color: "#36a3f7" }} /> In thống kê
    </Button>,
  ];
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
          <DaHoanPhiSearch
            setSearchParams={setSearchParams}
            buttons={buttons}
          />
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
        <XuatDanhSachHoanPhi yeucauthanhtoans={yeucauthanhtoans} />
      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <DaHoanPhiProvider>
    <ButtonActionProvider>
      <TheoDoiDaHoanPhiTable />
    </ButtonActionProvider>
  </DaHoanPhiProvider>
);
export default HoSoTableWrapper;
