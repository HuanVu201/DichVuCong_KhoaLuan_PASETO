import { Suspense, lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { DaHoanPhiSearch } from "./DaHoanPhiSearch";
import { Button, MenuProps, Spin } from "antd";
import {
  DaHoanPhiProvider,
  useDaHoanPhiContext,
} from "../contexts/DaHoanPhiContext";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { SearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/redux/action";
import { toast } from "react-toastify";
import { useDaHoanPhiColumn } from "../hook/UseDaHoanPhiColumn";
import { useTheoDoiDaHoanPhiColumn } from "../hook/UseTheoDoiDaHoanPhiColumn";

const DA_THANH_TOAN = "Đã hoàn phí";
const TheoDoiDaHoanPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const yeuCauThanhToanContext = useDaHoanPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    trangThai: DA_THANH_TOAN,
    donVi: user?.officeCode,
  });
  const items: MenuProps["items"] = [
    {
      label: <div onClick={() => {}}>Xem thông tin</div>,
      key: "view",
    },
  ];
  const { columns } = useTheoDoiDaHoanPhiColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      //   yeuCauThanhToanContext.setSelectedIds(selectedRowKeys);
    },
    // selectedRowKeys: yeuCauThanhToanContext.selectedIds,
  };

  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <DaHoanPhiSearch setSearchParams={setSearchParams} />
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
  <DaHoanPhiProvider>
    <TheoDoiDaHoanPhiTable />
  </DaHoanPhiProvider>
);
export default HoSoTableWrapper;
