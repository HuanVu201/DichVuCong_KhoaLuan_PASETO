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
import { useTheoDoiThuPhiLePhiColumn } from "../hook/UseTheoDoiHuyThuPhiLePhiColumn";

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
    donVi: user?.officeCode,
  });

  const { columns } = useTheoDoiThuPhiLePhiColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      yeuCauThanhToanContext.setSelectedIds(selectedRowKeys);
    },
    selectedRowKeys: yeuCauThanhToanContext.selectedIds,
  };

  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
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
    </>
  );
};
const HoSoTableWrapper = () => (
  <HuyThuPhiProvider>
    <HuyThuPhiTable />
  </HuyThuPhiProvider>
);
export default HoSoTableWrapper;
