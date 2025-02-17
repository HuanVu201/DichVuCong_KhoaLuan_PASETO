import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  RollbackOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { ISearchUser, IUser } from "@/features/user/models";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext";
import {
  AdminResetPassword,
  DeleteUser,
  SearchUser,
} from "@/features/user/redux/Actions";
import { toast } from "react-toastify";

export const useCoCauColumn = (pagination: ISearchUser) => {
  const coCauModalContext = useCoCauModalContext();
  const columns = useMemo((): ColumnsType<IUser> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: "Họ tên",
        key: "fullName",
        dataIndex: "fullName",
      },
      {
        title: "Tài khoản",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "Chức vụ",
        key: "positionName",
        dataIndex: "positionName",
      },
     
    ];
  }, [pagination]);
  return columns;
};
