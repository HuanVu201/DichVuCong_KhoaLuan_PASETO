import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AntdTable,
  AntdSpace,
  IAntdTableProps,
} from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";

import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";

import { Button, Row, Space, Table } from "antd";

import { PhiLePhiDetail } from "@/features/philephi/components/phiLePhiDetail";

import { toast } from "react-toastify";
import { ISearchThuTuc, IThuTuc } from "@/features/thutuc/models";
import { ThuTucCanBoMotCuaSearch } from "./ThuTucCanBoMotCuaSearch";
import { SearchThuTuc } from "@/features/thutuc/redux/action";
import { ThuTucDetail } from "@/features/thutuc/components/ThuTucDetail";
import {
  ThuTucProvider,
  useThuTucContext,
} from "@/features/thutuc/contexts/ThuTucContext";
import { ThuTucCanBoMotCuaDetail } from "./ThuTucCanBoMotCuaDetail";

const ThuTucCanBoMotCuaTable = () => {
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
    currentDonVi: true,
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
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Row>
          {" "}
          <Space size="small">
            <Button
              type="primary"
              className="m-2"
              onClick={() => {
                if (thuTucContext.selectedThuTucs.length > 0) {
                  thuTucContext.setChonDonViThuTucModalVisible(true);
                } else {
                  toast.error("Bạn chưa chọn thủ tục");
                }
              }}
            >
              Chọn đơn vị thủ tục
            </Button>
          </Space>
        </Row>
        <ThuTucCanBoMotCuaSearch setSearchParams={setSearchParams} />
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
          onSearch={(params) =>
            dispatch(SearchThuTuc({ ...params, donVi: user?.officeCode }))
          }
        />
      </AntdSpace>
      {thuTucContext.thuTucModalVisible ? <ThuTucCanBoMotCuaDetail /> : null}
    </>
  );
};
const ThuTucCanBoMotCuaWrapper = () => (
  <ThuTucProvider>
    <ThuTucCanBoMotCuaTable />
  </ThuTucProvider>
);
export default ThuTucCanBoMotCuaWrapper;
