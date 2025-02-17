import { AntdModal, AntdSpace, AntdTable } from "@/lib/antd/components";
import {
  NguoiDungNhomNguoiDungProvider,
  useNguoiDungNhomNguoiDungContext,
} from "../contexts/NguoiDungNhomNguoiDungContext";
import { useNhomNguoiDungContext } from "@/features/nhomnguoidung/contexts/NhomNguoiDungContext";
import { useCallback, useState, useMemo, useEffect } from "react";
import {
  INguoiDungNhomNguoiDung,
  ISearchNguoiDungNhomNguoiDung,
} from "../models";
import { NguoiDungNhomNguoiDungSearchDonVi } from "./DanhSachNguoiDungDonViSearchDonVi";
import { useDanhSachNguoiDungColumn } from "../hooks/useDanhSachNguoiDungColumn";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Space, Table } from "antd";
import { SearchNguoiDungNhomNguoiDung } from "../redux/action";
import { ThemNguoiDungModalDonVi } from "./ThemNguoiDungModalDonVi";
import { IUser } from "@/features/user/models";
import { PhanQuyenQuanTriDonVi } from "@/features/danhsachnguoidung/components/PhanQuyenQuanTriDonVi";
import { SearchUser } from "@/features/user/redux/Actions";

export const DanhSachNguoiDungDonVi = () => {
  const nguoiDungNhomNguoiDungContext = useNguoiDungNhomNguoiDungContext()
  const { data: user } = useAppSelector(state => state.user)
  const [searchParams, setSearchParams] =
    useState<ISearchNguoiDungNhomNguoiDung>({
      pageNumber: 1,
      pageSize: 50,
      reFetch: true,
      orderBy: ["OfficeCode", "FullName"],
      userGroupCode: user?.officeCode,
      loaiBuoc: "Khác"
    });
  const {
    datas: nguoiDungNhomNguoiDungs,
    loading,
    count,
  } = useAppSelector((state) => state.nguoidungnhomnguoidung);
  const dispatch = useAppDispatch();
  const {
    datas: users,
  } = useAppSelector((state) => state.user);
  const [expandedRowKeys, setExpandedRowKeys] =
    useState<readonly React.Key[]>();
  const { columns } = useDanhSachNguoiDungColumn(searchParams);
  const nhomNguoiDungContext = useNhomNguoiDungContext();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const onSelectTableChange = (newSelectedRowKeys: any, arraySelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);

    let tmpUsers = arraySelectedRowKeys.map((item: any) => {
      let tmpUser = nguoiDungNhomNguoiDungs?.find((x) => x.userId == item.userId);
      return {
        id: tmpUser?.userId,
        userName: tmpUser?.userName,
      };
    });
    setSelectedUsers(tmpUsers);
  };
  console.log(selectedUsers);
  
  useEffect(() => {
    dispatch(SearchUser({ officeCode: user?.officeCode, pageNumber: 1 }))
  }, [])

  useEffect(() => {
    if (nhomNguoiDungContext.nhomNguoiDungId) {
      setSearchParams((curr) => ({
        ...curr,
        nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
      }));
    }
  }, [nhomNguoiDungContext.nhomNguoiDungId]);


  const handleCancel = () => {
    nhomNguoiDungContext.setNhomNguoiDungId(undefined);
    nhomNguoiDungContext.setDanhSachNguoiDungDonViModalVisible(false);
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
            id: itemUnique.id,
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectTableChange,
  };

  return (
    <AntdModal
      title="Thêm mới người dùng"
      visible={true}
      handlerCancel={handleCancel}
      footer={null}
      fullsizeScrollable
    >
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <NguoiDungNhomNguoiDungSearchDonVi setSearchParams={setSearchParams} />
        {searchParams.nhomNguoiDungId ? (
          <div>
            <Space>
              <span>Tổng số nhóm:</span>
              <span>{uniqueLinhVucFromThuTuc?.length || 0}</span>
            </Space>
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
          </div>
        ) : null}

        {nguoiDungNhomNguoiDungContext.themNguoiDungModalVisible ? (
          <ThemNguoiDungModalDonVi setSearchNhomParams={setSearchParams} />
        ) : null}
        {nguoiDungNhomNguoiDungContext.phanQuyenNguoiDungModalVisible ? (
          <PhanQuyenQuanTriDonVi visible={nguoiDungNhomNguoiDungContext.phanQuyenNguoiDungModalVisible}
            handleClose={() => nguoiDungNhomNguoiDungContext.setPhanQuyenNguoiDungModalVisible(false)}
            users={selectedUsers} />
        ) : null}
      </AntdSpace>
    </AntdModal>
  );
};

export const DanhSachNguoiDungDonViTable = () => (
  <NguoiDungNhomNguoiDungProvider>
    <DanhSachNguoiDungDonVi />
  </NguoiDungNhomNguoiDungProvider>
);
