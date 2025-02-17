import { Suspense, lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";

import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { AdminYeuCauThanhToanSearch } from "./AdminYeuCauThanhToanSearch";
import { Button, MenuProps, Spin } from "antd";
import {
  AdminYeuCauThanhToanProvider,
  useAdminYeuCauThanhToanContext,
} from "../contexts/AdminYeuCauThanhToanContext";
import { ISearchYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import {
  SearchYeuCauThanhToan,
  UpdateYeuCauThanhToan,
} from "@/features/yeucauthanhtoan/redux/action";
import { useYeuCauThanhToanColumn } from "../hook/UseThuPhiLePhiColumn";
import { toast } from "react-toastify";
import { useAdminYeuCauThanhToanColumn } from "../hook/UseAdminYeuCauThanhToanColumn";
import { UpdateYeuCauThanhToanModal } from "./UpdateYeuCauThanhToanModal";

const AdminYeuCauThanhToanTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => {
            yeuCauThanhToanContext.setViewYeuCauThanhToanVisible(true);
          }}
        >
          Chỉnh sửa
        </div>
      ),
      key: "view",
    },
  ];
  const yeuCauThanhToanContext = useAdminYeuCauThanhToanContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
  });

  const { columns } = useAdminYeuCauThanhToanColumn(
    {
      pageNumber: searchParams.pageNumber,
      pageSize: searchParams.pageSize,
    },
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
        <AdminYeuCauThanhToanSearch setSearchParams={setSearchParams} />
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
        {yeuCauThanhToanContext.viewYeuCauThanhToanVisible ? (
          <UpdateYeuCauThanhToanModal
            handleCancel={() =>
              yeuCauThanhToanContext.setViewYeuCauThanhToanVisible(false)
            }
            reFetch={() => {
              setSearchParams({ ...searchParams });
            }}
            YeuCauThanhToanId={yeuCauThanhToanContext.selectedIds}
          />
        ) : null}
      </AntdSpace>
    </>
  );
};
const HoSoTableWrapper = () => (
  <AdminYeuCauThanhToanProvider>
    <AdminYeuCauThanhToanTable />
  </AdminYeuCauThanhToanProvider>
);
export default HoSoTableWrapper;
