import { Suspense, lazy, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";

import { useButtonActions } from "@/features/hoso/hooks/useButtonActions";
import { screenType } from "@/features/hoso/data";
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
import { toast } from "react-toastify";
import { useDaThuPhiColumn } from "../hook/UseDaThuPhiColumn";
import { BienLaiDienTuDetail } from "@/pages/dvc/bienlaithanhtoan/components/BienLaiDienTuDetail";

const DaThuPhiTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { datas: yeucauthanhtoans, count } = useAppSelector(
    (state) => state.yeucauthanhtoan
  );
  const yeuCauThanhToanContext = useDaThuPhiContext();
  const [searchParams, setSearchParams] = useState<ISearchYeuCauThanhToan>({
    pageNumber: 1,
    pageSize: 10,
    reFetch: true,
    trangThai: TRANGTHAITHUPHI.DA_THANH_TOAN,
    donViThu: user?.officeCode,
  });
  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => {
            yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
              ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
              loaiPhi: "phi",
            });
            yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
          }}
        >
          Biên lai phí
        </div>
      ),
      key: "viewBienLaiPhi",
    },
    {
      label: (
        <div
          onClick={() => {
            yeuCauThanhToanContext.setSearchBienLaiThanhToanParams({
              ...yeuCauThanhToanContext.searchBienLaiThanhToanParams,
              loaiPhi: "lephi",
            });
            yeuCauThanhToanContext.setViewBienLaiThanhToanVisible(true);
          }}
        >
          Biên lai lệ phí
        </div>
      ),
      key: "viewBienLaiLePhi",
    },
  ];
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
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <AntdSpace
          direction="horizontal"
          style={{ flexWrap: "wrap" }}
        ></AntdSpace>
        <DaThuPhiSearch setSearchParams={setSearchParams} />
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
      </Suspense>
    </>
  );
};
const HoSoTableWrapper = () => (
  <DaThuPhiProvider>
    <DaThuPhiTable />
  </DaThuPhiProvider>
);
export default HoSoTableWrapper;
