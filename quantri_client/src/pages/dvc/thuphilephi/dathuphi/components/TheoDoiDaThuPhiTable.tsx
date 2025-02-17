import { Suspense, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { DaThuPhiSearch } from "./DaThuPhiSearch";
import { Button, MenuProps, Spin } from "antd";
import {
  DaThuPhiProvider,
  useDaThuPhiContext,
} from "../contexts/DaThuPhiContext";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { useDaThuPhiColumn } from "../hook/UseDaThuPhiColumn";
import { BienLaiDienTuDetail } from "@/pages/dvc/bienlaithanhtoan/components/BienLaiDienTuDetail";
import { HoSoTableActions } from "../../hosodathuphitructuyen/hooks/HoSoDaThuPhiTrucTuyenColumn";
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
import { toast } from "react-toastify";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { XuatDanhSachDaThuPhi } from "./XuatDanhSachDaThuPhi";

const TheoDoiDaThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const yeuCauThanhToanContext = useDaThuPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.DA_THANH_TOAN,
    donVi: user?.officeCode,
  });
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <AuditOutlined
            title="Biên lai phí"
            onClick={() => {
              yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
                ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
                loaiPhi: "phi",
              });
              yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
            }}
          />
        ),
      },
      {
        icon: (
          <AuditOutlined
            title="Biên lai lệ phí"
            onClick={() => {
              yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
                ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
                loaiPhi: "lephi",
              });
              yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
            }}
          />
        ),
      },
    ],
    []
  );
  const { columns } = useDaThuPhiColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      yeuCauThanhToanContext.setSelectedIds(selectedRowKeys);
    },
    selectedRowKeys: yeuCauThanhToanContext.selectedIds,
  };
  var buttons = [
    <Button
      onClick={() => {
        downloadPhieuExcel("Bảng thống kê thu phí lệ phí", "tableToExcel");
      }}
    >
      <FileExcelOutlined style={{ color: "#36a3f7" }} /> In thống kê
    </Button>,
  ];
  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <AntdSpace
            direction="horizontal"
            style={{ flexWrap: "wrap" }}
          ></AntdSpace>
          <DaThuPhiSearch setSearchParams={setSearchParams} buttons={buttons} />
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
        <Suspense
          fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}
        >
          {yeuCauThanhToanContext.viewBienLaiThanhToanVisible ? (
            <BienLaiDienTuDetail
              bienLai={{
                idYeuCauThanhToan:
                  yeuCauThanhToanContext.selectedIds[0].toString(),
                loaiPhi:
                  yeuCauThanhToanContext.searchBienLaiThanhToanParams.loaiPhi,
              }}
              handleCancel={() => {
                yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({});
                yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(false);
              }}
            />
          ) : null}
          {yeuCauThanhToanContext.refundYeuCauThanhToanVisible ? (
            <HoanPhi
              handleCancel={() =>
                yeuCauThanhToanContext.setRefundYeuCauThanhToanVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
            ></HoanPhi>
          ) : null}
        </Suspense>
        <XuatDanhSachDaThuPhi yeucauthanhtoans={yeucauthanhtoans} />
      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <DaThuPhiProvider>
    <ButtonActionProvider>
      <TheoDoiDaThuPhiTable />
    </ButtonActionProvider>
  </DaThuPhiProvider>
);
export default HoSoTableWrapper;
