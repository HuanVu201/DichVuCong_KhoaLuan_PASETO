import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { IBasePagination } from "@/models/index";
import { IHoSoTheoTrangThaiXuLy } from "@/features/hoso/models/searchHoSoTheoTrangThaiXuLy";

export const useColumn = (pagination: IBasePagination) => {
  const columns = useMemo((): ColumnsType<IHoSoTheoTrangThaiXuLy> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Đơn vị tiếp nhận",
        key: "groupName",
        dataIndex: "groupName",
      },
      {
        title: "Lĩnh vực",
        key: "linhVucChinh",
        dataIndex: "linhVucChinh",
      },
      {
        title: "Tên thủ tục hành chính",
        key: "tenTTHC",
        dataIndex: "tenTTHC",
      },

      {
        title: "Mã hồ sơ",
        key: "maHoSo",
        dataIndex: "maHoSo",
      },
      {
        title: "Trạng thái",
        key: "tenTrangThaiHoSo",
        dataIndex: "tenTrangThaiHoSo",
      },
      {
        title: "Địa chỉ",
        key: "diaChiChuHoSo",
        dataIndex: "diaChiChuHoSo",
      },
      {
        title: "Chủ hồ sơ",
        key: "chuHoSo",
        dataIndex: "chuHoSo",
      },
      {
        title: "Ngày nhận",
        key: "ngayTiepNhan",
        dataIndex: "ngayTiepNhan",
      },
      {
        title: "Ngày hẹn trả",
        key: "ngayHenTra",
        dataIndex: "ngayHenTra",
      },
      {
        title: "Ngày kết thúc xử lý",
        key: "ngayTra",
        dataIndex: "ngayTra",
      },
    ];
  }, [pagination]);
  return columns;
};
