import { useEffect, useState } from "react";
import { AntdTable, AntdSpace } from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import { ISearchDonViThuTuc } from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import { GetDonViThuTuc, SearchDonViThuTuc } from "../redux/action";
import { DonViThuTucSearch } from "./DonViThuTucSearch";
import {
  DonViThuTucProvider,
  useDonViThuTucContext,
} from "../contexts/DonViThuTucContext";
import { DonViThuTucDetail } from "./DonViThuTucDetail";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { ISearchDonVi } from "@/features/donvi/models";
import { SearchDonVi } from "@/features/donvi/redux/action";
import {
  useDonViContext,
  DonViProvider,
} from "@/features/donvi/contexts/DonViContext";
import { AddMultiDonViThuTucModal } from "./AddMultiDonViThuTucs";
import { useTruongHopThuTucContext } from "@/features/truonghopthutuc/contexts/TruongHopThuTucContext";
import { ChonDonVisModal } from "./ChonDonVisModal";
import { ChonMucDoModal } from "./ChonMucDoModal";

const DonViThuTucTable = () => {
  const dispatch = useAppDispatch();
  const {
    datas: DonViThuTucs,
    data: DonViThuTuc,
    count,
  } = useAppSelector((state) => state.donvi);

  //   const DonViThuTucContext = useDonViThuTucContext();
  const DonViContext = useDonViContext();
  const ThuTucContext = useThuTucContext();

  const [searchParams, setSearchParams] = useState<ISearchDonVi>({
    pageNumber: 1,
    pageSize: 20,
    maTTHC: ThuTucContext.thuTucId,
  });

  const { columns } = useColumn(
    { pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize },
    setSearchParams
  );
  const [chonDonViModalVisible, setChonDonViModalVisible] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectTableChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    DonViContext.setSelectedDonViThuTucs(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectTableChange,
  };
  return (
    <>
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <DonViThuTucSearch
          setSearchParams={setSearchParams}
          onReload={() => dispatch(SearchDonVi(searchParams))}
        />
        <AntdTable
          bordered
          columns={columns}
          dataSource={DonViThuTucs}
          rowSelection={rowSelection}
          pagination={{
            total: count,
            pageSizeOptions: ["10", "11", "50", "100", "600"],
          }}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={(params) => dispatch(SearchDonVi(params))}
        />
      </AntdSpace>
      {/* {DonViContext.addMultiDonViModalVisible ? (
        <DonViThuTucDetail setSearchDonViThuTucParams={setSearchParams} />
      ) : null} */}
      {DonViContext.addMultiDonViModalVisible ? (
        <AddMultiDonViThuTucModal
          setSearchDonViThuTucParams={setSearchParams}
        />
      ) : null}
      {DonViContext.chonDonVisModalVisible ? (
        <ChonDonVisModal
          handleCancel={() => {
            DonViContext.setChonDonVisModalVisible(false);
          }}
        />
      ) : null}
      {DonViContext.chonMucDoModalVisible ? (
        <ChonMucDoModal
          onReload={() => dispatch(SearchDonVi(searchParams))}
          handleCancel={() => DonViContext.setChonMucDoModalVisible(false)}
        />
      ) : null}
    </>
  );
};
const DonViThuTucTableWrapper = () => (
  <DonViProvider>
    <DonViThuTucTable />
  </DonViProvider>
);
export default DonViThuTucTableWrapper;
