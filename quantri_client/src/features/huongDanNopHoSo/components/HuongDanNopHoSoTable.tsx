import { useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchHuongDanNopHoSo } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { SearchHuongDanNopHoSo } from "../redux/action";
import { HuongDanNopHoSoSearch } from "./HuongDanNopHoSoSearch";
import {
  HuongDanNopHoSoProvider,
  useHuongDanNopHoSoContext,
} from "../contexts/HuongDanNopHoSoContext";
import { HuongDanNopHoSoDetail } from "./HuongDanNopHoSoDetail";
import PhieuHuongDanModal from "@/features/hoso/components/documentActions/PhieuHuongDanModal";
import PhieuTuChoiModal from "@/features/hoso/components/documentActions/PhieuTuChoiModal";

const HuongDanNopHoSoTable = () => {
  const dispatch = useAppDispatch();
  const { datas: huongDanNopHoSos, count } = useAppSelector(
    (state) => state.huongdannophoso
  );
  const huongDanNopHoSoContext = useHuongDanNopHoSoContext();
  const [searchParams, setSearchParams] = useState<ISearchHuongDanNopHoSo>({
    pageNumber: 1,
    pageSize: 10,
  });
  const { columns } = useColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <HuongDanNopHoSoSearch setSearchParams={setSearchParams} />
        <AntdTable
          columns={columns}
          dataSource={huongDanNopHoSos}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchHuongDanNopHoSo(params))}
        />
      </AntdSpace>
      {huongDanNopHoSoContext.huongDanNopHoSoModalVisible ? (
        <HuongDanNopHoSoDetail />
      ) : null}
      {huongDanNopHoSoContext.xuatPhieuTuChoiModalVisible ? (
        <PhieuTuChoiModal />
      ) : null}
      {huongDanNopHoSoContext.xuatPhieuHuongDanNopHoSoModalVisible ? (
        <PhieuHuongDanModal />
      ) : null}
    </>
  );
};
const HuongDanNopHoSoWrapper = () => (
  <HuongDanNopHoSoProvider>
    <HuongDanNopHoSoTable />
  </HuongDanNopHoSoProvider>
);
export default HuongDanNopHoSoWrapper;
