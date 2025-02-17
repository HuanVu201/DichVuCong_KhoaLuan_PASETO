import { useMemo } from "react";
import {
  INguoiDungNhomNguoiDung,
  ISearchNguoiDungNhomNguoiDung,
} from "../models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space, TableColumnsType } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import {
  DeleteNguoiDungNhomNguoiDung,
  SearchNguoiDungNhomNguoiDung,
} from "../redux/action";
import { IBasePagination } from "../../../models";
import { useNguoiDungNhomNguoiDungContext } from "../contexts/NguoiDungNhomNguoiDungContext";
import { IUser } from "@/features/user/models";

export const useDanhSachNguoiDungColumn = (
  searchParams: ISearchNguoiDungNhomNguoiDung
) => {
  const dispatch = useAppDispatch();
  const columns = useMemo(() => {
    const columns: TableColumnsType<INguoiDungNhomNguoiDung> = [
      // {
      //   title: "STT",
      //   width: "5%",
      //   align: "center",
      //   render: (text, record, index) => index + 1,
      // },
      {
        title: "Tên đơn vị",
        key: "officeName",
        dataIndex: "officeName",
      },
      {
        title: "Tên phòng ban",
        key: "groupName",
        dataIndex: "groupName",
      },
      {
        title: "Tài khoản",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "Họ và tên",
        key: "fullName",
        dataIndex: "fullName",
      },
      {
        title: "Chức vụ",
        key: "positionName",
        dataIndex: "positionName",
      },
      {
        title: "Thao tác",
        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => (
          <Space direction="horizontal">
            {record.id.indexOf("parent") == -1 ? (
              <Popconfirm
                title="Xoá?"
                onConfirm={async () => {
                  await dispatch(
                    DeleteNguoiDungNhomNguoiDung({
                      id: record.id,
                      forceDelete: true,
                    })
                  );
                  await dispatch(SearchNguoiDungNhomNguoiDung(searchParams));
                }}
                okText="Xoá"
                cancelText="Huỷ"
              >
                <DeleteOutlined style={{ color: "tomato" }} />
              </Popconfirm>
            ) : (
              <></>
            )}
          </Space>
        ),
      },
    ];
    return columns;
  }, [searchParams]);

  return { columns };
};
