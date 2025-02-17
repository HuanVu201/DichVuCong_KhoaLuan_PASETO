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
import { useAppDispatch } from "../../../../../lib/redux/Hooks";

import { IBasePagination } from "@/models";
import { useDaThuPhiContext } from "../contexts/DaThuPhiContext";
import { getCurrency } from "@/utils";
import dayjs from "dayjs";
import { FORMAT_DATE } from "@/data";
import { HoSoTableActions } from "../../hosodathuphitructuyen/hooks/HoSoDaThuPhiTrucTuyenColumn";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
export const useDaThuPhiColumn = (
  pagination: IBasePagination,
  items: HoSoTableActions[]
) => {
  const daThuPhiContext = useDaThuPhiContext();
  const buttonActionContext = useButtonActionContext();
  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
    return [
      {
        title: "STT",
        width: "5%",
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
        title: "Hình thức thanh toán",
        key: "hinhThucThanhToan",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.hinhThucThanhToan == "chuyen-khoan" ? "Chuyển khoản" :
                record.hinhThucThanhToan == "tien-mat" ? "Tiền mặt" :
                  record.hinhThucThanhToan == "truc-tuyen" ? "Trực tuyến" : record.hinhThucThanhToan}</div>
            </>
          );
        },
      },
      {
        title: "Thu phí, lệ phí (VNĐ)",
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
      {
        title: "Ngày thu phí, lệ phí	",
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
              <EyeOutlined
                title="Xem chi tiết hồ sơ"
                onClick={(e) => {
                  buttonActionContext.setChiTietHoSoModalVisible(true);
                  e.preventDefault();
                  buttonActionContext.setSelectedHoSos([record.hoSoId ?? ""]);
                }}
              />
              {
                record.loaiBienLaiThanhToan == 'local'
                  ?
                  items.filter((x: { icon?: any, key?: any }) => x.key == 'phiLephi' || x.key == 'hoanPhi' || x.key == "paymentPlatform")
                    .map((item: any, index) => {
                      if (item?.key == 'paymentPlatform' && record?.hinhThucThanhToan == "truc-tuyen") {
                        return (
                          <span
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              daThuPhiContext.setSelectedIds([record.id]);
                              daThuPhiContext.setSelectedMaGiaoDich(record.maThamChieuGiaoDich)
                            }}
                          >
                            {item.icon}
                          </span>
                        );
                      } else if (item?.key != 'paymentPlatform') {
                        return (
                          <span
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              daThuPhiContext.setSelectedIds([record.id]);
                            }}
                          >
                            {item.icon}
                          </span>
                        );
                      }

                    })
                  :
                  items.filter((x: { icon?: any, key?: any }) => x.key != 'phiLephi')
                    .map((item: any, index) => {
                      if (item?.key == 'paymentPlatform' && record?.hinhThucThanhToan == "truc-tuyen") {
                        return (
                          <span
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              daThuPhiContext.setSelectedIds([record.id]);
                              daThuPhiContext.setSelectedMaGiaoDich(record.maThamChieuGiaoDich)
                            }}
                          >
                            {item.icon}
                          </span>
                        );
                      } else if (item?.key != 'paymentPlatform') {
                        return (
                          <span
                            key={index}
                            onClick={(e) => {
                              e.preventDefault();
                              daThuPhiContext.setSelectedIds([record.id]);
                            }}
                          >
                            {item.icon}
                          </span>
                        );
                      }

                    })
              }
            </Space>
          );
        },
      },
    ];
  }, [pagination]);
  return { columns };
};
