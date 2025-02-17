import { Suspense, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { DaThuPhiSearch } from "./DaThuPhiSearch";
import { Affix, Button, MenuProps, Popconfirm, Spin } from "antd";
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
import { XuatDanhSachDaThuPhi } from "./XuatDanhSachDaThuPhi";
import { downloadPhieuExcel } from "@/pages/dvc/MauPhieu/documents/excel/exportTableToExcel";
import { toast } from "react-toastify";
import { SuaBienLai } from "./SuaBienLai";
import { XuatLaiBienLai } from "./XuatLaiBienLai";
import { BienLaiPaymentPlatformDetail } from "@/pages/dvc/bienlaithanhtoan/components/BienLaiPaymentPlatform";

const DaThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: yeucauthanhtoans,
    count,
    loading,
  } = useAppSelector((state) => state.yeucauthanhtoan);
  const yeuCauThanhToanContext = useDaThuPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 50,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.DA_THANH_TOAN,
    donViThu: user?.officeCode,
  });
  const { publicModule: config } = useAppSelector(state => state.config)
  const [maTinh, setMaTinh] = useState<string>();
  useEffect(() => {
    config?.map((item: any) => {
      if (item.code == 'ma-tinh') {
        setMaTinh(item.content)
      }
    })
  }, [config])
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
    () => {

      return [
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
          key: 'phi'
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
          key: 'lePhi'
        },
        {
          icon: (
            <AuditOutlined
              title="Biên lai phí, lệ phí"
              onClick={() => {
                yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
                  ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
                  loaiPhi: "phiLephi",
                });
                yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
              }}
            />
          ),
          key: 'phiLephi'
        },

        {
          icon: (
            <RedoOutlined
              title=" Hoàn phí"
              onClick={() =>
                yeuCauThanhToanContext.setRefundYeuCauThanhToanVisible(true)
              }
            />
          ),
          key: 'hoanPhi'
        },
        {
          icon: (
            <AuditOutlined
              title="Biên lai Payment Platform"
              onClick={() => {
                yeuCauThanhToanContext.setViewBienLaiPaymentPlatform(true);
              }}
            />
          ),
          key: 'paymentPlatform'
        },
      ]
    },
    [maTinh]
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

  return (
    <>
      <LazyActions setSearchParams={setSearchParams}>
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <Affix offsetTop={75}>
            <AntdSpace direction="horizontal" style={{ flexWrap: "wrap" }}>
              <Button
                onClick={() => {
                  if (yeuCauThanhToanContext.selectedIds.length == 1) {
                    yeuCauThanhToanContext.setReInitBienLaiPhiVisible(true);
                  } else if (yeuCauThanhToanContext.selectedIds.length > 1) {
                    toast.warning("Không xuất lại nhiều biên lai");
                  } else {
                    toast.warning("Không có yêu biên lai được chọn");
                  }
                }}
                style={{ backgroundColor: "#4B8DF8", color: "white" }}
              >
                Xuất lại biên lai phí
              </Button>
              <Button
                onClick={() => {
                  if (yeuCauThanhToanContext.selectedIds.length == 1) {
                    yeuCauThanhToanContext.setReInitBienLaiLePhiVisible(true);
                  } else if (yeuCauThanhToanContext.selectedIds.length > 1) {
                    toast.warning("Không xuất lại nhiều biên lai");
                  } else {
                    toast.warning("Không có yêu biên lai được chọn");
                  }
                }}
                style={{ backgroundColor: "#4B8DF8", color: "white" }}
              >
                Xuất lại biên lai lệ phí
              </Button>
              <Button
                onClick={() => {
                  if (yeuCauThanhToanContext.selectedIds.length == 1) {
                    yeuCauThanhToanContext.setUpdateBienLaiPhiVisible(true);
                  } else if (yeuCauThanhToanContext.selectedIds.length > 1) {
                    toast.warning("Không sửa nhiều biên lai ");
                  } else {
                    toast.warning("Không có biên lai nào được chọn");
                  }
                }}
                style={{ backgroundColor: "#FFB848", color: "white" }}
              >
                Sửa biên lai phí
              </Button>
              <Button
                onClick={() => {
                  if (yeuCauThanhToanContext.selectedIds.length == 1) {
                    yeuCauThanhToanContext.setUpdateBienLaiLePhiVisible(true);
                  } else if (yeuCauThanhToanContext.selectedIds.length > 1) {
                    toast.warning("Không sửa nhiều biên lai");
                  } else {
                    toast.warning("Không có biên lai nào được chọn");
                  }
                }}
                style={{ backgroundColor: "#FFB848", color: "white" }}
              >
                Sửa biên lai lệ phí
              </Button>
            </AntdSpace>
          </Affix>
          <DaThuPhiSearch setSearchParams={setSearchParams} buttons={buttons} />
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
          {yeuCauThanhToanContext.viewBienLaiPaymentPlatform && yeuCauThanhToanContext.selectedMaGiaoDich ? (
            <BienLaiPaymentPlatformDetail
              maGiaoDich={yeuCauThanhToanContext.selectedMaGiaoDich}
              handleCancel={() => {
                yeuCauThanhToanContext.setViewBienLaiPaymentPlatform(false);
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
          {yeuCauThanhToanContext.reInitBienLaiPhiVisible ? (
            <XuatLaiBienLai
              handleCancel={() =>
                yeuCauThanhToanContext.setReInitBienLaiPhiVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
              loaiPhi="phi"
            ></XuatLaiBienLai>
          ) : null}
          {yeuCauThanhToanContext.reInitBienLaiLePhiVisible ? (
            <XuatLaiBienLai
              handleCancel={() =>
                yeuCauThanhToanContext.setReInitBienLaiLePhiVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
              loaiPhi="lephi"
            ></XuatLaiBienLai>
          ) : null}
          {yeuCauThanhToanContext.updateBienLaiPhiVisible ? (
            <SuaBienLai
              handleCancel={() =>
                yeuCauThanhToanContext.setUpdateBienLaiPhiVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
              loaiPhi="phi"
            ></SuaBienLai>
          ) : null}
          {yeuCauThanhToanContext.updateBienLaiLePhiVisible ? (
            <SuaBienLai
              handleCancel={() =>
                yeuCauThanhToanContext.setUpdateBienLaiLePhiVisible(false)
              }
              reFetch={() => {
                setSearchParams({ ...searchParams });
              }}
              YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
              loaiPhi="lephi"
            ></SuaBienLai>
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
      <DaThuPhiTable />
    </ButtonActionProvider>
  </DaThuPhiProvider>
);
export default HoSoTableWrapper;
