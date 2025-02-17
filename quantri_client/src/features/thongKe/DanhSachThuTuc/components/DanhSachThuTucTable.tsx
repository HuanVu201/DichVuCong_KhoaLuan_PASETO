import { useCallback, useEffect, useMemo, useState } from "react";

import { Button, Row, Space, Table } from "antd";

import { PhiLePhiDetail } from "@/features/philephi/components/phiLePhiDetail";

import { toast } from "react-toastify";
import { ISearchThuTuc, IThuTuc } from "@/features/thutuc/models";
import { DanhSachThuTucSearch } from "./DanhSachThuTucSearch";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { ThuTucDetail } from "@/features/thutuc/components/ThuTucDetail";
import {
  ThuTucProvider,
  useThuTucContext,
} from "@/features/thutuc/contexts/ThuTucContext";
import { DanhSachThuTucDetail } from "./DanhSachThuTucDetail";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useColumn } from "../hooks/useColumn";
import { AntdSpace, AntdTable } from "@/lib/antd/components";
import { XuatDanhSachThuTucTable } from "../../components/XuatDanhSachThuTucTable";

const DanhSachThuTucTable = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const {
    datas: thuTucs,
    count,
    loading,
  } = useAppSelector((state) => state.thutuc);
  const [searchParams, setSearchParams] = useState<ISearchThuTuc>({
    pageNumber: 1,
    pageSize: 20,
  });
  const { expandedColumns } = useColumn({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [expandedRowKeys, setExpandedRowKeys] =
    useState<readonly React.Key[]>();
  const thuTucContext = useThuTucContext();

  // const expandedRowRender = useCallback((record : IThuTuc) => {
  //     const filterThuTucByMaLinhVuc = thuTucs?.filter(x => x.maLinhVucChinh === record.maLinhVucChinh)
  //     return <Table columns={expandedColumns} dataSource={filterThuTucByMaLinhVuc} pagination={false} rowKey={"id"}/>;
  // },[thuTucs])
  const uniqueLinhVucFromThuTuc = useMemo(() => {
    if (thuTucs) {
      const uniqueLinhVucFromThuTuc = [
        ...new Map(thuTucs.map((item) => [item.maLinhVucChinh, item])).values(),
      ];
      setExpandedRowKeys(() => uniqueLinhVucFromThuTuc.map((x) => x.id));
      return uniqueLinhVucFromThuTuc;
    }
  }, [thuTucs]);
  const onSelectTableChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    let tmpUsers = newSelectedRowKeys.map((item: string) => {
      let tmpUser = thuTucs?.find((x) => x.id == item);
      return {
        id: tmpUser?.id,
        maTTHC: tmpUser?.maTTHC,
      };
    }) as IThuTuc[];
    thuTucContext.setSelectedThuTucs(tmpUsers ?? []);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectTableChange,
  };
  const onFinish = async (value: ISearchThuTuc) => {
    await dispatch(SearchThuTuc(value));
  };
  useEffect(() => {
    onFinish({
      ...searchParams,
      pageSize: searchParams.pageSize,
      pageNumber: searchParams.pageNumber,
    });
  }, [searchParams.pageSize, searchParams.pageNumber]);
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <DanhSachThuTucSearch
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onFinish={onFinish}
        />
        <div className="table-responsive">
        <AntdTable
          bordered
          columns={expandedColumns}
          loading={loading}
          rowSelection={rowSelection}
          dataSource={thuTucs}
          // expandable={{ expandedRowRender,
          //     expandedRowKeys: expandedRowKeys,
          //     onExpandedRowsChange: setExpandedRowKeys,
          //     expandRowByClick: true
          // }}
          pagination={{
            total: count,
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => {}}
        />
        </div>
      </AntdSpace>
      {thuTucContext.thuTucModalVisible ? <DanhSachThuTucDetail /> : null}
      {thuTucs ? <XuatDanhSachThuTucTable data={thuTucs} /> : null}
    </>
  );
};
const DanhSachThuTucWrapper = () => (
  <ThuTucProvider>
    <DanhSachThuTucTable />
  </ThuTucProvider>
);
export default DanhSachThuTucWrapper;
