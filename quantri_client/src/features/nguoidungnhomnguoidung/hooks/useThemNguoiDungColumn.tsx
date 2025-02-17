import { useMemo } from "react";
import { INguoiDungNhomNguoiDung } from "../models";
import { ColumnsType } from "antd/es/table";
import { IBasePagination } from "../../../models";
import { IUser } from "@/features/user/models";

export const useThemNguoiDungColumn = (pagination: IBasePagination) => {
  const columns = useMemo((): ColumnsType<IUser> => {
    return [
      {
        title: "STT",
        key: 'STT',
        width:"5%",
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: "Họ và tên",
        key: "fullName",
        dataIndex: "fullName",
      },
      {
        title: "Tên đăng nhập",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "Chức vụ",
        key: "positionName",
        dataIndex: "positionName",
      },
      {
        title: "Chức danh",
        key: "chucDanh",
        dataIndex: "chucDanh",
      },
      {
        title: "Thuộc",
        key: "groupName",
        dataIndex: "groupName",
      },
      {
        title: "Đơn vị",
        key: "officeName",
        dataIndex: "officeName",
      },
    ];
  }, [pagination]);
  return { columns };
};
