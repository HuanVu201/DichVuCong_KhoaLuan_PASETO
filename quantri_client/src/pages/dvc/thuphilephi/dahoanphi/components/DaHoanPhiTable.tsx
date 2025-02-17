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
import { useChoThuPhiContext } from "../../chothuphi/contexts/ChoThuPhiContext";
import { YeuCauThanhToanLaiModal } from "../../chothuphi/components/YeuCauThanhToanLai";
import { HoSoTableActions } from "../../hosodathuphitructuyen/hooks/HoSoDaThuPhiTrucTuyenColumn";
import { XuatDanhSachHoanPhi } from "./XuatDanhSachDaHoanPhi";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";

const DaHoanPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: yeucauthanhtoans,
    count,
    loading,
  } = useAppSelector((state) => state.yeucauthanhtoan);
  const yeuCauThanhToanContext = useDaHoanPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.HOAN_PHI,
    donViThu: user?.officeCode,
  });
  var buttons = [
    <Button
      onClick={() => {
        downloadPhieuExcel("Bảng thống kê thu phí lệ phí", "tableToExcel");
      }}
    >
      <FileExcelOutlined style={{ color: "#36a3f7" }} /> In thống kê
    </Button>,
  ];
  const items: HoSoTableActions[] = useMemo(
    () => [
      // {
      //   icon: (
      //   ),
      // },
    ],
    []
  );
  const { columns } = useDaHoanPhiColumn(
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
          <DaHoanPhiSearch
            setSearchParams={setSearchParams}
            buttons={buttons}
          />
          <Spin spinning={loading}>
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
          </Spin>
        </AntdSpace>
        <Suspense
          fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}
        >
          {yeuCauThanhToanContext.yeuCauLaiYeuCauThanhToanVisible ? (
            <YeuCauThanhToanLaiModal
              handleCancel={() =>
                yeuCauThanhToanContext.setYeuCauLaiYeuCauThanhToanVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
            ></YeuCauThanhToanLaiModal>
          ) : null}
        </Suspense>
        <XuatDanhSachHoanPhi yeucauthanhtoans={yeucauthanhtoans} />
      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <DaHoanPhiProvider>
    <ButtonActionProvider>
      <DaHoanPhiTable />
    </ButtonActionProvider>
  </DaHoanPhiProvider>
);
export default HoSoTableWrapper;
