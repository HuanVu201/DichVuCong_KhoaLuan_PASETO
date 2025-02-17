import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { IBasePagination } from "../../../models";
import { useButtonActionContext } from "../contexts/ButtonActionsContext";
import { IYeuCauThanhToan } from "@/features/yeucauthanhtoan/models";
import { getCurrency } from "@/utils";
import { Space } from "antd";
import { HoSoTableActions } from "./useHoSoColumn";

export const useYeuCauThanhToanColumn = ({
  pagination,
  items,
}: {
  pagination: IBasePagination;
  items: HoSoTableActions[];
}) => {
  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
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
        title: "Phí (VNĐ)",
        key: "phi",
        dataIndex: "phi",
        render: (_, record) => {
          return <>{getCurrency(record.phi)}</>;
        },
      },
      {
        title: "Lệ phí (VNĐ)",
        key: "lePhi",
        dataIndex: "lePhi",
        render: (_, record) => {
          return <>{getCurrency(record.lePhi)}</>;
        },
      },
      {
        title: "Số tiền (VNĐ)",
        key: "soTien",
        dataIndex: "soTien",
        render: (_, record) => {
          return <>{getCurrency(record.soTien)}</>;
        },
      },
      {
        title: "Hình thức thu",
        key: "hinhThucThu",
        dataIndex: "hinhThucThu",
      },
      {
        title: "Trạng thái",
        key: "trangThai",
        dataIndex: "trangThai",
      },
    ];
  }, [pagination]);
  return columns;
};
