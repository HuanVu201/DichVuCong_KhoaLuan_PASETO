import { Suspense, lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { HuyThuPhiSearch } from "./HuyThuPhiSearch";
import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";
import { Button, MenuProps, Spin } from "antd";
import {
  HuyThuPhiProvider,
  useHuyThuPhiContext,
} from "../contexts/HuyThuPhiContext";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { useYeuCauThanhToanColumn } from "../hook/UseHuyThuPhiLePhiColumn";
import { toast } from "react-toastify";

const HuyThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const yeuCauThanhToanContext = useHuyThuPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.HUY_THANH_TOAN,
    // laNguoiTiepNhan: true,
    donViThu: user?.officeCode,
  });
  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => {
            yeuCauThanhToanContext.setPayYeuCauThanhToanVisible(true);
          }}
        >
          Thanh toán
        </div>
      ),
      key: "view",
    },
    {
      label: (
        <div
          onClick={() => {
            yeuCauThanhToanContext.setRefundYeuCauThanhToanVisible(true);
          }}
        >
          Hoàn phí
        </div>
      ),
      key: "view",
    },
  ];
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
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <AntdSpace direction="horizontal" style={{ flexWrap: "wrap" }}>
          <Button
            onClick={() => {
              if (yeuCauThanhToanContext.selectedIds.length > 0) {
                yeuCauThanhToanContext.setCancelYeuCauThanhToanVisible(true);
              } else toast.warning("Không có yêu cầu thanh toán nào được chọn");
            }}
          >
            Huỷ thanh toán
          </Button>
          {/* <Button
            onClick={() => {
              if (yeuCauThanhToanContext.selectedIds.length > 0) {
                yeuCauThanhToanContext.setCancelYeuCauThanhToanVisible(true);
              } else toast.warning("Không có yêu cầu thanh toán nào được chọn");
            }}
          >
            Hoàn phí
          </Button> */}
        </AntdSpace>
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
      <Suspense
        fallback={<Spin spinning={true} rootClassName="suspense-spin"></Spin>}
      ></Suspense>
    </>
  );
};
const HoSoTableWrapper = () => (
  <HuyThuPhiProvider>
    <HuyThuPhiTable />
  </HuyThuPhiProvider>
);
export default HoSoTableWrapper;
