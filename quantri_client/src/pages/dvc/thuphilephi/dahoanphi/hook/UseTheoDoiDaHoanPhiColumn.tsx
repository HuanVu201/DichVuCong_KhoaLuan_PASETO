import { useMemo } from "react";
import { IYeuCauThanhToan } from "../../models/YeuCauThanhToan";
import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import {
  BorderOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "@/lib/redux/Hooks";

import { IBasePagination } from "@/models";
import { useChoThuPhiContext } from "../../chothuphi/contexts/ChoThuPhiContext";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
import { FORMAT_DATE } from "@/data";
export const useTheoDoiDaHoanPhiColumn = (pagination: IBasePagination) => {
  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
    return [
      {
        title: "STT",
        width:"5%",
        key: 'STT',
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: "Mã hồ sơ",
        key: "maHoSo",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.maHoSo}</div>
            </>
          );
        },
      },
      {
        title: "Người nộp(In BL)",
        key: "nguoiNopTienBienLai",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>
                {record.nguoiNopTienBienLai ||
                  record.nguoiUyQuyen ||
                  record.chuHoSo}
              </div>
            </>
          );
        },
      },
      {
        title: "Chủ hồ sơ",
        key: "maHoSo",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.chuHoSo}</div>
            </>
          );
        },
      },
      {
        title: "Địa chỉ chủ hồ sơ (In BL)",
        key: "diaChiChuHoSo",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>
                {record.diaChiBienLai || record.diaChiChuHoSo}
              </div>
            </>
          );
        },
      },
      {
        title: "Người yêu cầu",
        key: "tenNguoiYeuCau",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.tenNguoiYeuCau}</div>
            </>
          );
        },
      },

      {
        title: "Đơn vị yêu cầu",
        key: "tenDonVi",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.tenDonVi}</div>
            </>
          );
        },
      },
      {
        title: "Ngày chuyển TTHCC	",
        key: "createdOn",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>
                {record.createdOn
                  ? dayjs(record.createdOn).format(FORMAT_DATE)
                  : ""}
              </div>
            </>
          );
        },
      },
      {
        title: "Hình thức thu",
        key: "thuPhiLePhi",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.hinhThucThu}</div>
            </>
          );
        },
      },
      {
        title: "Thu phí/lệ phí",
        key: "thuPhiLePhi",
        width: "150px ",
        render: (_, record) => {
          return (
            <div>
              <div style={{ fontWeight: "500" }}>
                {" "}
                - Phí: {getCurrency(record.phi ?? "0")}
              </div>
              <div style={{ fontWeight: "500" }}>
                {" "}
                - Lệ phí: {getCurrency(record.lePhi ?? "0")}
              </div>
              <div style={{ fontWeight: "500" }}>
                {" "}
                - Số tiền: {getCurrency(record.soTien ?? "0")}
              </div>
            </div>
          );
        },
      },
    ];
  }, [pagination]);
  return { columns };
};
