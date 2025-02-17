import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { ChoThuPhiSearch } from "./ChoThuPhiSearch";
import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";
import { Affix, Button, MenuProps, Spin } from "antd";
import {
  ChoThuPhiProvider,
  useChoThuPhiContext,
} from "../contexts/ChoThuPhiContext";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { useYeuCauThanhToanColumn } from "../hook/UseThuPhiLePhiColumn";
import { toast } from "react-toastify";
import { ThanhToan } from "./ThanhToan";
import { HuyThanhToan } from "./HuyThanhToan";
import { HoanPhi } from "./HoanPhi";
import {
  DollarCircleOutlined,
  EyeOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { HoSoTableActions } from "../../hosodathuphitructuyen/hooks/HoSoDaThuPhiTrucTuyenColumn";
import {
  ButtonActionProvider,
  useButtonActionContext,
} from "@/features/hoso/contexts/ButtonActionsContext";
import { LazyActions } from "@/features/hoso/components/actions/LazyActions";
import { SuaYeuCauThanhToanModal } from "./SuaYeuCauThanhToan";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { XuatDanhSachChoThuPhi } from "./XuatDanhSachChoThuPhi";
import { ThanhToanNhieuHoSo } from "./ThanhToanNhieuHoSo";
const ChoThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: yeucauthanhtoans,
    count,
    loading,
  } = useAppSelector((state) => state.yeucauthanhtoan);
  const yeuCauThanhToanContext = useChoThuPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.CHO_THANH_TOAN,
    // laNguoiTiepNhan: true,
    donViThu: user?.officeCode,
  });

  const items: HoSoTableActions[] = useMemo(
    () => [
      // {
      //   icon: (
      //   ),
      // },
      // {
      //   icon: (
      //     <DollarCircleOutlined
      //       style={{ fontSize: "16px" }}
      //       title="Thanh toán"
      //       onClick={() =>
      //         yeuCauThanhToanContext.setPayYeuCauThanhToanVisible(true)
      //       }
      //     />
      //   ),
      // },
      // {
      //   label: (
      //     <div
      //       onClick={() => {
      //         yeuCauThanhToanContext.setPayYeuCauThanhToanVisible(true);
      //       }}
      //     >
      //       Thanh toán
      //     </div>
      //   ),
      //   key: "view",
      // },
      // {
      //   label: (
      //     <div
      //       onClick={() => {
      //         yeuCauThanhToanContext.setRefundYeuCauThanhToanVisible(true);
      //       }}
      //     >
      //       Hoàn phí
      //     </div>
      //   ),
      //   key: "view",
      // },
    ],
    []
  );
  const { columns } = useYeuCauThanhToanColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    items
  );
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      yeuCauThanhToanContext.setSelectedIds(selectedRowKeys);
    },
    selectedRowKeys: yeuCauThanhToanContext.selectedIds,
  };

  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <Affix offsetTop={75}>
          <AntdSpace direction="horizontal" style={{ flexWrap: "wrap" }}>
            <Button
              onClick={() => {
                if (yeuCauThanhToanContext.selectedIds.length == 1) {
                  yeuCauThanhToanContext.setCancelYeuCauThanhToanVisible(true);
                } else {
                  toast.warning("Không có yêu cầu thanh toán nào được chọn");
                }
              }}
              style={{ backgroundColor: "#D84A38", color: "white" }}
            >
              Huỷ thanh toán
            </Button>
            <Button
              onClick={() => {
                if (yeuCauThanhToanContext.selectedIds.length == 1) {
                  yeuCauThanhToanContext.setPayYeuCauThanhToanVisible(true);
                } else if (yeuCauThanhToanContext.selectedIds.length > 1) {
                  toast.warning("Không thanh toán nhiều hồ sơ");
                } else {
                  toast.warning("Không có yêu cầu thanh toán nào được chọn");
                }
              }}
              style={{ backgroundColor: "#4B8DF8", color: "white" }}
            >
              Thanh toán
            </Button>
            <Button
              onClick={() => {
                if (yeuCauThanhToanContext.selectedIds.length == 1) {
                  yeuCauThanhToanContext.setEditYeuCauThanhToanVisible(true);
                } else if (yeuCauThanhToanContext.selectedIds.length > 1) {
                  toast.warning("Không sửa nhiều yêu cầu thanh toán");
                } else {
                  toast.warning("Không có yêu cầu thanh toán nào được chọn");
                }
              }}
              style={{ backgroundColor: "#FFB848", color: "white" }}
            >
              Sửa yêu cầu thanh toán
            </Button>
            <Button
              onClick={() => {
                if (yeuCauThanhToanContext.selectedIds.length >= 1) {
                  yeuCauThanhToanContext.setPayNhieuYeuCauThanhToansVisible(true);
                } else {
                  toast.warning("Không có yêu cầu thanh toán nào được chọn");
                }
              }}
              style={{ backgroundColor: "#4B8DF8", color: "white" }}
            >
              Thanh toán nhiều hồ sơ
            </Button>
            <Button
              onClick={() => {
                downloadPhieuExcel(
                  "Bảng thống kê thu phí lệ phí",
                  "tableToExcel"
                );
              }}
            >
              <FileExcelOutlined style={{ color: "#36a3f7" }} /> Xuất file excel
            </Button>
            ,
          </AntdSpace>
        </Affix>

        <ChoThuPhiSearch setSearchParams={setSearchParams} />
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
        <Suspense
          fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}
        >
          {yeuCauThanhToanContext.payYeuCauThanhToanVisible ? (
            <ThanhToan
              handleCancel={() =>
                yeuCauThanhToanContext.setPayYeuCauThanhToanVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
            ></ThanhToan>
          ) : null}
           {yeuCauThanhToanContext.payNhieuYeuCauThanhToanVisible ? (
            <ThanhToanNhieuHoSo
              handleCancel={() =>
                yeuCauThanhToanContext.setPayNhieuYeuCauThanhToansVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
            ></ThanhToanNhieuHoSo>
          ) : null}
          {yeuCauThanhToanContext.cancelYeuCauThanhToanVisible ? (
            <HuyThanhToan
              handleCancel={() =>
                yeuCauThanhToanContext.setCancelYeuCauThanhToanVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
            ></HuyThanhToan>
          ) : null}
          {yeuCauThanhToanContext.editYeuCauThanhToanVisible ? (
            <SuaYeuCauThanhToanModal
              handleCancel={() =>
                yeuCauThanhToanContext.setEditYeuCauThanhToanVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
            ></SuaYeuCauThanhToanModal>
          ) : null}
        </Suspense>
        <XuatDanhSachChoThuPhi yeucauthanhtoans={yeucauthanhtoans} />
      </LazyActions>
    </>
  );
};
const HoSoTableWrapper = () => (
  <ChoThuPhiProvider>
    <ButtonActionProvider>
      <ChoThuPhiTable />
    </ButtonActionProvider>
  </ChoThuPhiProvider>
);
export default HoSoTableWrapper;
