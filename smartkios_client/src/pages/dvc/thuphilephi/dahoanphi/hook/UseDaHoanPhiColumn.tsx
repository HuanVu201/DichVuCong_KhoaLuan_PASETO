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
import { useAppDispatch } from "../../../../../lib/redux/Hooks";

import { IBasePagination } from "@/models";
import { useDaHoanPhiContext } from "../contexts/DaHoanPhiContext";
import { getCurrency } from "@/utils";
export const useDaHoanPhiColumn = (
  pagination: IBasePagination,
  items: MenuProps["items"]
) => {
  const daThuPhiContext = useDaHoanPhiContext();
  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
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
        title: "Thu phí/lệ phí",
        key: "thuPhiLePhi",
        render: (_, record) => {
          return (
            <>
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
                - Hình thức thu: {record.hinhThucThu}
              </div>
              <div style={{ fontWeight: "500" }}>
                {" "}
                - Số tiền: {getCurrency(record.soTien ?? "0")}
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
          // const items: MenuProps['items'] = [
          //     {
          //         label: <div onClick={() => {
          //             tiepNhanHoSoContext.setDetailTiepNhanHoSoModalVisible(true)
          //         }}>Xem thông tin</div>,
          //         key: 'view',
          //     },
          //     {
          //         label: <span >In phiếu tiếp nhận</span>,
          //         key: 'inPhieuTiepNhan',
          //     },
          //     {
          //         label: <span >In phiếu kiểm soát</span>,
          //         key: 'inPhieuKiemSoat',
          //     },
          //     {
          //         label: <span>Chuyển bước</span>,
          //         key: 'chuyenBuoc',
          //     },
          // ];
          return (
            <Space direction="horizontal">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    // daThuPhiContext.setSelectedIds([record.id]);
                  }}
                >
                  <Space>
                    Chức năng
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Space>
          );
        },
      },
    ];
  }, [pagination]);
  return { columns };
};
