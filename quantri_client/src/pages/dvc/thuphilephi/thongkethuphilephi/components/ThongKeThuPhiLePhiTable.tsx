import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";

import { AntdSpace, AntdTable } from "@/lib/antd/components";

import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";
import { Button, MenuProps, Spin, Table } from "antd";

import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchThongKeThuPhiLePhi, SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";

import { toast } from "react-toastify";

import {
  DollarCircleOutlined,
  EyeOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  PrinterOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { HoSoTableActions } from "../../hosodathuphitructuyen/hooks/HoSoDaThuPhiTrucTuyenColumn";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { ThongKeThuPhiLePhiSearch } from "./ThongKeThuPhiLePhiSearch";
import {
  ThongKeThuPhiLePhiProvider,
  useThongKeThuPhiLePhiContext,
} from "../contexts/ThongKeThuPhiLePhiContext";
import { useThongKeThuPhiLePhiColumn } from "../hook/ThongKeThuPhiLePhiColumn";
import { downloadPhieuWord } from "@/pages/dvc/MauPhieu/documents/pdf/ExportHtmlToWord";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { XuatThongkeThuPhiLePhi } from "./XuatThongKeThuPhiLePhi";
import { getCurrency } from "@/utils";

const ThongKeThuPhiLePhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: yeucauthanhtoans,
    count,
    loading,
  } = useAppSelector((state) => state.yeucauthanhtoan);
  const yeuCauThanhToanContext = useThongKeThuPhiLePhiContext();

  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.DA_THANH_TOAN,
    khacHinhThucThus: ["Đối tượng miễn phí"],
    donViThu: user?.officeCode,
  });
  useEffect(() => {
    if (user) {
      setSearchParams((curr) => ({ ...curr, donViThu: user?.officeCode }));
    }
  }, [user]);
  const items: HoSoTableActions[] = useMemo(() => [], []);
  const { columns } = useThongKeThuPhiLePhiColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );


  const [totalPhi, totalLePhi, totalSoTien] = useMemo(() => {
    var tmpPhi = 0;
    var tmpLePhi = 0;
    var tmpSoTien = 0;

    yeucauthanhtoans?.map((item) => {
      tmpPhi += item?.phi ? parseInt(item?.phi) : 0;
      tmpLePhi += item?.lePhi ? parseInt(item?.lePhi) : 0;
    
    });
    tmpSoTien = tmpPhi+tmpLePhi;
    return [tmpPhi, tmpLePhi, tmpSoTien];
  }, [yeucauthanhtoans]);
console.log(searchParams)
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
            style={{ flexWrap: "wrap", float: "right" }}
          >
            <Button
              onClick={() => {
                downloadPhieuExcel("Bảng thống kê thu phí lệ phí");
              }}
            >
              <FileExcelOutlined style={{ color: "#36a3f7" }} /> In thống kê
            </Button>
          </AntdSpace>
          <Spin spinning={loading}>
            <ThongKeThuPhiLePhiSearch
              setSearchParams={setSearchParams}
              extraButtons={buttons}
            />
            <AntdTable
              columns={columns}
              dataSource={yeucauthanhtoans}
              pagination={{
                total: count,
                pageSizeOptions: ["5", "10", "20", "50", "100", "600", "1000"],
              }}
              // rowSelection={rowSelection}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) =>
                user ? dispatch(SearchThongKeThuPhiLePhi(params)) : null
              }

              summary={(pageData: any) => {
                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={7} align="center">
                      <strong >Tổng số (VNĐ)</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <strong>{getCurrency(totalPhi ?? "0")}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">
                      <strong> {getCurrency(totalLePhi ?? "0")}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} align="right">
                      <strong>{getCurrency(totalPhi + totalLePhi)}</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    
                  </Table.Summary.Row>
                );
              }}

            />
          </Spin>
        </AntdSpace>
        <XuatThongkeThuPhiLePhi yeucauthanhtoans={yeucauthanhtoans} searchParams={searchParams} totalPhi={totalPhi} totalLePhi={totalLePhi} />
      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <ThongKeThuPhiLePhiProvider>
    <ButtonActionProvider>
      <ThongKeThuPhiLePhiTable />
    </ButtonActionProvider>
  </ThongKeThuPhiLePhiProvider>
);
export default HoSoTableWrapper;
