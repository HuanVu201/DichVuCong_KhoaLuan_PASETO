import { useMemo } from "react";
import { IYeuCauThanhToan } from "../../models/YeuCauThanhToan";
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
import { useChoThuPhiContext } from "../../chothuphi/contexts/ChoThuPhiContext";
import { getCurrency } from "@/utils";
import { FORMAT_DATE } from "@/data";
import { HoSoTableActions } from "../../hosodathuphitructuyen/hooks/HoSoDaThuPhiTrucTuyenColumn";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
export const useThongKeThuPhiLePhiColumn = (
  pagination: IBasePagination,
  items: HoSoTableActions[]
) => {
  const buttonActionContext = useButtonActionContext();

  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
    return [
      {
        title: "STT",
        key: 'STT',
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Mã hồ sơ</p>,
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
        title: <p style={{textAlign: 'center'}}>Chủ hồ sơ</p>,
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
        title: <p style={{textAlign: 'center'}}>Địa chỉ chủ hồ sơ</p>,
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
        title:<p style={{textAlign: 'center'}}>Người nộp hồ sơ</p>,
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
        title: <p style={{textAlign: 'center'}}>Nội dung hồ sơ giải quyết</p>,
        key: "trichYeuHoSo",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>
                {record?.trichYeuHoSo && record?.trichYeuHoSo.length > 200
                  ? record.trichYeuHoSo?.slice(0, 200) + "..."
                  : record.trichYeuHoSo}
              </div>
            </>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Hình thức thu</p>,
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
        title: <p style={{textAlign: 'center'}}>Phí (VNĐ)</p>,
        key: "phi",
        render: (_, record) => {
          return (
            <div style={{ fontWeight: "500", textAlign:"right" }}>
             {getCurrency(record.phi ?? "0")}
            </div>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Lệ phí (VNĐ)</p>,
        key: "lePhi",
        render: (_, record) => {
          return (
            <div style={{ fontWeight: "500" , textAlign:"right"  }}>
              {getCurrency(record.lePhi ?? "0")}
            </div>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Tổng số (VNĐ)</p>,
        key: "tongSo",
        render: (_, record) => {
          return (
            <div style={{ fontWeight: "500" , textAlign:"right" }}>
            {getCurrency(record.soTien ?? "0")}
            </div>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Mẫu số biên lai</p>,
        key: "tongSo",
        render: (_, record) => {
          return (
            <div style={{ fontWeight: "500"  }}>
              {record.mauSoBienLai}
            </div>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Ký hiệu biên lai</p>,
        key: "tongSo",
        render: (_, record) => {
          return (
            <div style={{ fontWeight: "500"  }}>
              {record.kyHieuBienLai}
            </div>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Số biên lai phí</p>,
        key: "tongSo",
        render: (_, record) => {
          return (
            <div style={{ fontWeight: "500"  }}>
              {record.soBienLaiPhi}
            </div>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Số biên lai lệ phí</p>,
        key: "tongSo",
        render: (_, record) => {
          return (
            <div style={{ fontWeight: "500"  }}>
              {record.soBienLaiLePhi}
            </div>
          );
        },
      },
      {
        title: <p style={{textAlign: 'center'}}>Ngày thu phí, lệ phí</p>,
        key: "ngayThuPhi",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>
                {record.ngayThuPhi
                  ? dayjs(record.ngayThuPhi).format(FORMAT_DATE)
                  : ""}
              </div>
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
          return (
            <Space direction="horizontal">
              <EyeOutlined
                title="Xem chi tiết hồ sơ"
                onClick={(e) => {
                  buttonActionContext.setChiTietHoSoModalVisible(true);
                  e.preventDefault();
                  buttonActionContext.setSelectedHoSos([record.hoSoId ?? ""]);
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
