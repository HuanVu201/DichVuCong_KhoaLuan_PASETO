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
      </Suspense>
    </>
  );
};
const HoSoTableWrapper = () => (
  <ChoThuPhiProvider>
    <ChoThuPhiTable />
  </ChoThuPhiProvider>
);
export default HoSoTableWrapper;
