import { useMemo } from "react";
import { IPhiLePhi, ISearchPhiLePhi } from "../models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { DeletePhiLePhi } from "../redux/action";
import { IBasePagination } from "../../../models";
import { usePhiLePhiContext } from "../contexts/PhiLePhiContext";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";

export const useColumn = (
  pagination: IBasePagination,
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchPhiLePhi>>
) => {
  const dispatch = useAppDispatch();
  const phiLePhiContext = usePhiLePhiContext();
  const thuTucContext = useThuTucContext();
  const columns = useMemo((): ColumnsType<IPhiLePhi> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Loại",
        key: "loai",
        dataIndex: "loai",
      },
      {
        title: "Nội dung",
        key: "ten",
        dataIndex: "ten",
      },
      {
        title: "Số tiền (VNĐ)",
        key: "soTien",
        dataIndex: "soTien",
        render: (text) => String(text),
      },
      {
        title: "Thao tác",
        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => (
          <Space direction="horizontal">
            <EditOutlined
              style={{ color: "cornflowerblue" }}
              title="Xem chi tiết/Sửa"
              onClick={() => {
                phiLePhiContext.setMaPhiLePhi(record.id);
                phiLePhiContext.setPhiLePhiModalVisible(true);
              }}
            />
            <Popconfirm
              title="Xoá?"
              onConfirm={async () => {
                await dispatch(
                  DeletePhiLePhi({ id: record.id, forceDelete: false })
                ).unwrap();
                setSearchParams((cur) => ({
                  ...cur,
                  thuTucId: thuTucContext.thuTucId,
                }));
              }}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <DeleteOutlined style={{ color: "tomato" }} />
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, [pagination]);
  return { columns };
};
