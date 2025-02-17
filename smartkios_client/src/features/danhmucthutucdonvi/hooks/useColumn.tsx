import { useMemo } from "react";
import { IDonViThuTuc } from "../models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { DeleteDonViThuTuc } from "../redux/action";
import { IBasePagination } from "../../../models";
import { useDonViThuTucContext } from "../contexts/DonViThuTucContext";
import { IDonVi, ISearchDonVi } from "@/features/donvi/models";
import { useDonViContext } from "@/features/donvi/contexts/DonViContext";

export const useColumn = (
  pagination: IBasePagination,
  setSearchDonViThuTucParams: React.Dispatch<React.SetStateAction<ISearchDonVi>>
) => {
  const dispatch = useAppDispatch();
  const columns = useMemo((): ColumnsType<IDonVi> => {
    return [
      {
        title: "Tên đơn vị",
        key: "groupName",
        dataIndex: "groupName",
      },
      {
        title: "STT",
        key: "index",
        dataIndex: "index",
      },
      {
        title: "Thủ tục",
        key: "tenTTHC",
        dataIndex: "tenTTHC",
      },
      {
        title: "Mức độ",
        key: "mucDo",
        dataIndex: "mucDo",
      },
      {
        title: "Tài khoản thụ hưởng",
        key: "tkThuHuong",
        dataIndex: "tkThuHuong",
      },
      {
        title: "Mã ngân hàng",
        key: "maNHThuHuong",
        dataIndex: "maNHThuHuong",
      },
      {
        title: "Tên tài khoản",
        key: "tenTKThuHuong",
        dataIndex: "tenTKThuHuong",
      },
      {
        title: "Cán bộ tiếp nhận",
        key: "nguoiTiepNhan",
        dataIndex: "nguoiTiepNhan",
        render: (_, record) => {
          return (
            <>
              {record.nguoiTiepNhan?.map((user, index) => (
                <Tag color="volcano" key={index}>
                  {user.userName}
                </Tag>
              ))}
            </>
          );
        },
      },

      {
        title: "Thao tác",
        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => {
          return record?.id && record?.id.indexOf("parent") == -1 ? (
            <Space direction="horizontal">
              <Popconfirm
                title="Xoá?"
                onConfirm={async () => {
                  await dispatch(
                    DeleteDonViThuTuc({ id: record.id, forceDelete: false })
                  ).unwrap();
                  setSearchDonViThuTucParams((cur) => ({ ...cur }));
                }}
                okText="Xoá"
                cancelText="Huỷ"
              >
                <DeleteOutlined style={{ color: "tomato" }} />
              </Popconfirm>
            </Space>
          ) : null;
        },
      },
    ];
  }, [pagination]);

  return { columns };
};
