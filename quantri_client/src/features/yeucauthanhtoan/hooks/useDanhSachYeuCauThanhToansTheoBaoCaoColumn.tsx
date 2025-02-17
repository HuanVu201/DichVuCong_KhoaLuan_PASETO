import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import {
  BorderOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "@/lib/redux/Hooks";
import dayjs from "dayjs";
import { IBasePagination } from "@/models";
import { getCurrency } from "@/utils";
import { FORMAT_DATE } from "@/data";

import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { IYeuCauThanhToan } from "@/pages/dvc/thuphilephi/models/YeuCauThanhToan";
import { KENH_THUC_HIEN } from "@/features/hoso/data/formData";

export const useDanhSachYeuCauThanhToansTheoBaoCaoColumn = (
  pagination: IBasePagination,
  items: HoSoTableActions[]
) => {
  const buttonActionContext = useButtonActionContext();

  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <div style={{color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>
          <>{(pageNumber - 1) * pageSize + index + 1}</>
        </div>
        }
      },
      
      {
        title: "Mã hồ sơ",
        key: "maHoSo",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" , color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>{record.maHoSo}</div>
            </>
          );
        },
      },
      {
        title: "Loại tiếp nhận",
        key: "kenhThucHien",
        align: "center",
        render: (_, record) => {
          return record?.kenhThucHien == "1" ||
            record?.kenhThucHien == "2" ||
            record?.kenhThucHien == "3" ? (
            <>
              <div style={{ fontWeight: "500", color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : "" }}>
                {KENH_THUC_HIEN[record.kenhThucHien]}
              </div>
            </>
          ) : (
            ""
          );
        },
      },
      {
        title: "Tên người nộp",
        key: "maHoSo",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" , color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>
                {record.nguoiNopTienBienLai
                  ? record.nguoiNopTienBienLai
                  : record.chuHoSo}
              </div>
            </>
          );
        },
      },

      {
        title: "Số biên lai",
        key: "soHieuBienLai",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" , color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>{record.soHieuBienLai}</div>
            </>
          );
        },
      },
      {
        title: "Mẫu số",
        key: "mauSoBienLai",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500", color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : "" }}>{record.mauSoBienLai}</div>
            </>
          );
        },
      },
      {
        title: "Ký hiệu",
        key: "kyHieuBienLai",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500", color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : "" }}>{record.kyHieuBienLai}</div>
            </>
          );
        },
      },

      {
        title: "Ngày tiếp nhận",
        key: "ngayTiepNhan",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" , color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>
                {record.ngayTiepNhan
                  ? dayjs(record.ngayTiepNhan).format(FORMAT_DATE)
                  : ""}
              </div>
            </>
          );
        },
      },

      {
        title: "Ngày thu phí, lệ phí",
        key: "ngayThuPhi",
        align: "center",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" , color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>
                {record.ngayThuPhi
                  ? dayjs(record.ngayThuPhi).format(FORMAT_DATE)
                  : ""}
              </div>
            </>
          );
        },
      },
      {
        title: "Phí (VNĐ)",
        key: "phi",
        width: "150px ",
        align: "center",
        render: (_, record) => {
          return <div style={{color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>{getCurrency(record.phi ?? "0")}</div>;
        },
      },
      {
        title: "Lệ phí (VNĐ)",
        key: "lePhi",
        width: "150px ",
        align: "center",
        render: (_, record) => {
          return  <div style={{color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>{getCurrency(record.lePhi ?? "0")}</div>;
        },
      },
      {
        title: "Tổng số (VNĐ)",
        key: "thuPhiLePhi",
        width: "150px ",
        align: "center",
        render: (_, record) => {
          return  <div style={{color : record?.kenhThucHien == "2" ? "rgb(233, 19, 19)" : ""}}>{getCurrency(record.soTien ?? "0")}</div>;;
        },
      },
      {
        title: "Thao tác",
        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => {
          return (
            <Space direction="horizontal">
              <EyeOutlined
                title="Xem chi tiết hồ sơ"
                onClick={(e) => {
                  buttonActionContext.setChiTietHoSoModalVisible(true);
                  e.preventDefault();
                  buttonActionContext.setSelectedHoSos([record.id ?? ""]);
                }}
              />
            </Space>
          );
        },
      },
    ];
  }, [pagination]);
  return { columns };
};
