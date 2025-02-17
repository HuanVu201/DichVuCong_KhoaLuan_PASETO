import { useEffect, useMemo, useState } from "react";

import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { screenType } from "@/features/hoso/data";

import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { EyeOutlined, FileExcelOutlined } from "@ant-design/icons";

import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";

import { useDanhSachYeuCauThanhToansTheoBaoCaoColumn } from "@/features/yeucauthanhtoan/hooks/useDanhSachYeuCauThanhToansTheoBaoCaoColumn";
import { useYeuCauThanhToanContext } from "@/features/yeucauthanhtoan/contexts/useYeuCauThanhToansContext";
import {
  SearchHoSoTheoBaoCaoTTTT,
  SearchYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/redux/action";
import { XuatDonDocThanhToanTrucTuyenTable } from "./exportElements/XuatDonDocThanhToanTrucTuyen";
import { XuatDanhSachHoSoTheoBaoCaoTongHopModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTheoBaoCaoTongHop";
import { XuatDanhSachHoSoTTTTModal } from "@/features/hoSoTheoBaoCaoTongHop/exportElements/XuatDanhSachHoSoTTTT";
import { Button, Table } from "antd";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/ExportExcel/exportTableToExcel";
import { getCurrency } from "@/utils";
// import { XuatDanhSachHoSoTable } from "@/features/thongKe/components/XuatDanhSachHoSoTable";

const DanhSachYeuCauThanhToansTheoBaoCaoTable = ({
  title, donViThongKe, tuNgay, denNgay
}: {
  title?: string,
  donViThongKe?: string;
  tuNgay?: string,
  denNgay?: string
}) => {

  const dispatch = useAppDispatch();
  const buttonActionContext = useButtonActionContext();
  const {
    datas: yeuCauThanhToans,
    count,
    loading,
  } = useAppSelector((state) => state.yeucauthanhtoan);

  const yeuCauThanhToanContext = useYeuCauThanhToanContext();
  const items: HoSoTableActions[] = useMemo(
    () => [
      {
        icon: (
          <EyeOutlined
            title="Xem chi tiết"
            onClick={() => buttonActionContext.setChiTietHoSoModalVisible(true)}
          />
        ),
      },
    ],
    []
  );

  const { columns } = useDanhSachYeuCauThanhToansTheoBaoCaoColumn(
    {
      pageNumber: yeuCauThanhToanContext.searchParams.pageNumber,
      pageSize: yeuCauThanhToanContext.searchParams.pageSize,
    },
    items
  );
  const [totalPhi, totalLePhi] = useMemo(() => {
    var tmpPhi = 0;
    var tmpLePhi = 0;

    yeuCauThanhToans?.map((item) => {
      tmpPhi += item?.phi ? parseInt(item?.phi) : 0;
      tmpLePhi += item?.lePhi ? parseInt(item?.lePhi) : 0;
    });
    return [tmpPhi, tmpLePhi];
  }, [yeuCauThanhToans]);
  useEffect(() => {
    dispatch(SearchHoSoTheoBaoCaoTTTT(yeuCauThanhToanContext.searchParams));
  }, [yeuCauThanhToanContext.searchParams]);
  return (
    <AntdModal
      visible={true}
      title={"Danh sách hồ sơ"}
      fullsizeScrollable
      footer={null}
      handlerCancel={() =>
        yeuCauThanhToanContext.setYeuCauThanhToanModalVisible(false)
      }
    >
      <LazyActions setSearchParams={yeuCauThanhToanContext.setSearchParams}>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <AntdSpace direction="horizontal" style={{ flexWrap: "wrap" }}>
            <Button
              onClick={() => {
                downloadPhieuExcel(
                  "Danh sách nộp phí, lệ phí",
                  "danhSachHoSoTable"
                );
              }}
            >
              <FileExcelOutlined style={{ color: "#36a3f7" }} /> In danh sách
            </Button>
          </AntdSpace>
          <div>
            <center><b>
              {title}<br />
              (Từ ngày {tuNgay || '...'} đến ngày {denNgay || '...'})
            </b></center>
            {/* <b>Đơn vị thống kê: {donViThongKe}</b> */}
          </div>
          <AntdTable
            columns={columns}
            dataSource={yeuCauThanhToans}
            pagination={{
              total: count,
              pageSizeOptions: ["5", "10", "20", "50", "100", "600", "1000"],
            }}
            summary={(pageData: any) => {
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={9} align="center">
                    <strong >Tổng số (VNĐ)</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} align="center">
                    <strong>{getCurrency(totalPhi ?? "0")}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} align="center">
                    <strong> {getCurrency(totalLePhi ?? "0")}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} align="center">
                    <strong>{getCurrency(totalPhi + totalLePhi)}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}></Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
            loading={loading}
            searchParams={yeuCauThanhToanContext.searchParams}
            setSearchParams={yeuCauThanhToanContext.setSearchParams}
            onSearch={(params) => { }}
          />
        </AntdSpace>
        <XuatDanhSachHoSoTTTTModal title={title} donViThongKe={donViThongKe} tuNgay={tuNgay} denNgay={denNgay} data={yeuCauThanhToans ?? []} />
      </LazyActions>
    </AntdModal>
  );
};
const DanhSachYeuCauThanhToansTheoBaoCaoWrapper = ({
  title, donViThongKe, tuNgay, denNgay
}: {
  title?: string,
  donViThongKe?: string;
  tuNgay?: string,
  denNgay?: string
}) => (
  <ButtonActionProvider>
    <DanhSachYeuCauThanhToansTheoBaoCaoTable title={title} donViThongKe={donViThongKe} tuNgay={tuNgay} denNgay={denNgay} />
  </ButtonActionProvider>
);
export default DanhSachYeuCauThanhToansTheoBaoCaoWrapper;
