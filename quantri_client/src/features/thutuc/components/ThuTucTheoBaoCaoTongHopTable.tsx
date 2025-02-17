import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AntdTable,
  AntdSpace,
  IAntdTableProps,
  AntdModal,
} from "../../../lib/antd/components";
import { useColumn } from "../hooks/useColumn";
import {
  ISearchThuTuc,
  ISearchThuTucTheoBaoCaoTongHop,
  IThuTuc,
} from "../models";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";

import { ThuTucProvider, useThuTucContext } from "../contexts/ThuTucContext";
import { SearchThuTucTheoBaoCaoTongHop } from "../redux/action";
import { useColumnTongHopThuTuc } from "../hooks/useColumnTongHopThuTuc";
import { BaoCaoTongHopProvider } from "@/features/thongKe/ThongKeTheoDonVi/context/BaoCaoTongHopContext";
import {
  HoSoTheoBaoCaoTongHopProvider,
  useHoSoTheoBaoCaoTongHopContext,
} from "@/features/hoSoTheoBaoCaoTongHop/contexts/HoSoTheoBaoCaoTongHopContext";
import DanhSachHoSoWrapper from "@/features/hoSoTheoBaoCaoTongHop/components/DanhSachHoSosTable";
import { ThuTucCanBoMotCuaDetail } from "@/features/thutuccanbomotcua/components/ThuTucCanBoMotCuaDetail";

const ThuTucTheoBaoCaoTongHopTable = ({
  searchParams,
  setSearchParams,
  modalVisible,
  setModalVisible,
}: {
  searchParams: ISearchThuTucTheoBaoCaoTongHop;
  setSearchParams: React.Dispatch<
    React.SetStateAction<ISearchThuTucTheoBaoCaoTongHop>
  >;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const {
    datas: thuTucs,
    count,
    loading,
  } = useAppSelector((state) => state.thutuc);
  const hoSoTheoBaoCaoTongHopContext = useHoSoTheoBaoCaoTongHopContext();

  const thuTucContext = useThuTucContext();
  const { expandedColumns } = useColumnTongHopThuTuc({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });
  const handleCancel = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    if (searchParams.maLinhVuc || searchParams.groupCode)
      dispatch(SearchThuTucTheoBaoCaoTongHop(searchParams));
  }, [searchParams]);
  return (
    <AntdModal
      fullsizeScrollable
      title="Danh sách thủ tục"
      visible={modalVisible}
      handlerCancel={handleCancel}
      footer={null}
    >
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <AntdTable
          bordered
          columns={expandedColumns}
          loading={loading}
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
          onSearch={(params) => {
            // dispatch(SearchThuTucTheoBaoCaoTongHop(params));
          }}
        />
        {thuTucContext.thuTucModalVisible ? <ThuTucCanBoMotCuaDetail /> : null}
        {hoSoTheoBaoCaoTongHopContext.hoSoTheoBaoCaoTongHopModalVisible ? (
          <DanhSachHoSoWrapper
            searchHoSoParams={hoSoTheoBaoCaoTongHopContext.searchParams}
          />
        ) : null}
      </AntdSpace>
    </AntdModal>
  );
};
export const ThuTucTheoBaoCaoTongHopWrapper = ({
  searchParams,
  setSearchParams,
  modalVisible,
  setModalVisible,
}: {
  searchParams: ISearchThuTucTheoBaoCaoTongHop;
  setSearchParams: React.Dispatch<
    React.SetStateAction<ISearchThuTucTheoBaoCaoTongHop>
  >;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <BaoCaoTongHopProvider>
      <HoSoTheoBaoCaoTongHopProvider>
        <ThuTucTheoBaoCaoTongHopTable
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
        />
      </HoSoTheoBaoCaoTongHopProvider>
    </BaoCaoTongHopProvider>
  );
};
