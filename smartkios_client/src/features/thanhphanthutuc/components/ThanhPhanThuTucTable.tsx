import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AntdTable,
  AntdSpace,
  IAntdTableProps,
} from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { SearchThanhPhanThuTuc } from "../redux/action";
import { ThanhPhanThuTucSearch } from "./ThanhPhanThuTucSearch";
import {
  ThanhPhanThuTucProvider,
  useThanhPhanThuTucContext,
} from "../contexts/ThanhPhanThuTucContext";
import { ThanhPhanThuTucDetail } from "./ThanhPhanThuTucDetail";
import { Table } from "antd";
import { useTruongHopThuTucContext } from "@/features/truonghopthutuc/contexts/TruongHopThuTucContext";

const ThanhPhanThuTucTable = () => {
  const dispatch = useAppDispatch();
  const thanhPhanThuTucContext = useThanhPhanThuTucContext();
  const truongHopThuTucContext = useTruongHopThuTucContext();
  const {
    datas: thanhPhanThuTucs,
    count,
    loading,
  } = useAppSelector((state) => state.thanhphanthutuc);
  const { data: truonghopthutuc } = useAppSelector(
    (state) => state.truonghopthutuc
  );
  const [searchParams, setSearchParams] = useState<ISearchThanhPhanThuTuc>({
    pageNumber: 1,
    pageSize: 10,
  });
  useEffect(() => {
    setSearchParams((curr) => ({ ...curr, truongHopId: truonghopthutuc?.ma }));
  }, [truongHopThuTucContext.truongHopThuTucId]);
  const columns = useColumn(searchParams);
  return (
    <>
      {searchParams.truongHopId && truongHopThuTucContext.truongHopThuTucId ? (
        <>
          <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <ThanhPhanThuTucSearch />
            <AntdTable
              columns={columns}
              loading={loading}
              dataSource={thanhPhanThuTucs}
              pagination={{
                total: count,
              }}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) => dispatch(SearchThanhPhanThuTuc(params))}
            />
          </AntdSpace>
          {thanhPhanThuTucContext.thanhPhanThuTucModalVisible ? (
            <ThanhPhanThuTucDetail setSearchParams={setSearchParams} />
          ) : null}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
const ThanhPhanThuTucTableWrapper = () => (
  <ThanhPhanThuTucProvider>
    <ThanhPhanThuTucTable />
  </ThanhPhanThuTucProvider>
);
export default ThanhPhanThuTucTableWrapper;
