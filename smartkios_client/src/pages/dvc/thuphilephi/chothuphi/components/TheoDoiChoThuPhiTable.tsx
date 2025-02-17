import { Suspense, lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { ChoThuPhiSearch } from "./ChoThuPhiSearch";
import { TRANGTHAITHUPHI } from "../../constants/TrangThaiConstant";
import { Button, MenuProps, Spin } from "antd";
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
import { useTheoDoiThuPhiLePhiColumn } from "../hook/UseTheoDoiThuPhiLePhiColumn";

const ChoThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const yeuCauThanhToanContext = useChoThuPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.CHO_THANH_TOAN,
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
        <ChoThuPhiSearch setSearchParams={setSearchParams} />
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
  <ChoThuPhiProvider>
    <ChoThuPhiTable />
  </ChoThuPhiProvider>
);
export default HoSoTableWrapper;
