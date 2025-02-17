import {
  NguoiDungNhomNguoiDungProvider,
  useNguoiDungNhomNguoiDungContext,
} from "@/features/nguoidungnhomnguoidung/contexts/NguoiDungNhomNguoiDungContext";
import { useDanhSachNguoiDungColumn } from "@/features/nguoidungnhomnguoidung/hooks/useDanhSachNguoiDungColumn";
import { ISearchNguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/models";
import { SearchNguoiDungNhomNguoiDung } from "@/features/nguoidungnhomnguoidung/redux/action";
import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useMemo, useState } from "react";
import { ChonNguoiDungNhomNguoiDungSearch } from "./ChonNguoiDungNhomNguoiDungSearch";

const DanhSachNguoiDungModal = ({
  nhomNguoiDungId,
  handleCancel,
  setSelectedNguoiXuLys,
  selectedNguoiXuLys,
  handleClose,
}: {
  nhomNguoiDungId: string | undefined;
  handleCancel: () => void;
  handleClose: () => void;
  selectedNguoiXuLys: string[];
  setSelectedNguoiXuLys: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [searchParams, setSearchParams] =
    useState<ISearchNguoiDungNhomNguoiDung>({
      pageNumber: 1,
      pageSize: 500,
      reFetch: true,
      nhomNguoiDungId: nhomNguoiDungId,
      orderBy: ["OfficeCode", "FullName"],
    });
  const {
    datas: nguoiDungNhomNguoiDungs,
    loading,
    count,
  } = useAppSelector((state) => state.nguoidungnhomnguoidung);
  const dispatch = useAppDispatch();

  const [expandedRowKeys, setExpandedRowKeys] =
    useState<readonly React.Key[]>();
  const { columns } = useDanhSachNguoiDungColumn(searchParams);

  useEffect(() => {
    if (nhomNguoiDungId) {
      setSearchParams((curr) => ({
        ...curr,
        nhomNguoiDungId: nhomNguoiDungId,
      }));
    }
  }, [nhomNguoiDungId]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectTableChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectTableChange,
  };
  // const expandedRowRender = useCallback((record: INguoiDungNhomNguoiDung) => {
  //     const filterThuTucByMaLinhVuc = nguoiDungNhomNguoiDungs?.filter(x => x.officeCode === record.officeCode)
  //     return <Table columns={expandedColumns} dataSource={filterThuTucByMaLinhVuc} pagination={false} rowKey={"id"} />;
  // }, [nguoiDungNhomNguoiDungs])
  const handleCanceler = () => {
    setSelectedNguoiXuLys([]);
    handleCancel();
  };
  const onOk = () => {
    var tmp = selectedRowKeys as string[];
    var nguoiXuLy = nguoiDungNhomNguoiDungs
      ?.filter((x) => tmp.indexOf(x.id) != -1)
      ?.map((x) => x.userId);

    setSelectedNguoiXuLys(nguoiXuLy || []);

    handleClose();
  };

  const uniqueLinhVucFromThuTuc = useMemo(() => {
    if (nguoiDungNhomNguoiDungs) {
      const uniqueLinhVucFromThuTuc = [
        ...new Map(
          nguoiDungNhomNguoiDungs.map((item) => [item.officeCode, item])
        ).values(),
      ];

      setExpandedRowKeys(() => uniqueLinhVucFromThuTuc.map((x) => x.id));
      var tmpuniqueDanhSachNguoiDung = uniqueLinhVucFromThuTuc.map(
        (itemUnique) => {
          return {
            id: "parent" + itemUnique.id,
            donViId: itemUnique.officeCode,
            officeName: itemUnique.officeName,
            children: nguoiDungNhomNguoiDungs
              .filter((x) => x.officeCode == itemUnique.officeCode)
              .map((item) => {
                return { ...item, officeName: "" };
              }),
          };
        }
      );

      return tmpuniqueDanhSachNguoiDung;
    }
  }, [nguoiDungNhomNguoiDungs]);
  return (
    <AntdModal
      title="Chọn người xử lý"
      visible={true}
      handlerCancel={handleCanceler}
      fullsizeScrollable
      onOk={onOk}
      okText="Xác nhận"
    >
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <ChonNguoiDungNhomNguoiDungSearch setSearchParams={setSearchParams} />
        {nhomNguoiDungId ? (
          <AntdTable
            columns={columns}
            loading={loading}
            dataSource={uniqueLinhVucFromThuTuc as any}
            rowSelection={{ ...rowSelection, checkStrictly: false }}
            // expandable={{
            //     expandedRowRender,
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
              dispatch(SearchNguoiDungNhomNguoiDung(params))
            }
          />
        ) : null}
      </AntdSpace>
    </AntdModal>
  );
};

export const ChonNguoiDungNhomNguoiDungModal = ({
  handleCancel,
  handleClose,
  setSelectedNguoiXuLys,
  selectedNguoiXuLys,
  nhomNguoiDungId,
}: {
  handleCancel: () => void;
  handleClose: () => void;
  nhomNguoiDungId: string | undefined;
  selectedNguoiXuLys: string[];
  setSelectedNguoiXuLys: React.Dispatch<React.SetStateAction<string[]>>;
}) => (
  <NguoiDungNhomNguoiDungProvider>
    <DanhSachNguoiDungModal
      handleCancel={handleCancel}
      nhomNguoiDungId={nhomNguoiDungId}
      handleClose={handleClose}
      selectedNguoiXuLys={selectedNguoiXuLys}
      setSelectedNguoiXuLys={setSelectedNguoiXuLys}
    />
  </NguoiDungNhomNguoiDungProvider>
);
