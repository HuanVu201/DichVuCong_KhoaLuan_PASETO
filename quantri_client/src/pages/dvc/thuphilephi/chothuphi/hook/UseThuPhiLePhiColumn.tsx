import { useMemo } from "react";
import { IYeuCauThanhToan } from "../../models/YeuCauThanhToan";
import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Space, Tag } from "antd";
import {
  BorderOutlined,
  DeleteOutlined,
  DollarCircleOutlined,
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
import { useNavigate } from "react-router-dom";
import { Service } from "@/services";
export const useYeuCauThanhToanColumn = (
  pagination: IBasePagination,
  items: HoSoTableActions[]
) => {
  const buttonActionContext = useButtonActionContext();
  const choThuPhiContext = useChoThuPhiContext();
  const navigate = useNavigate();
  const columns = useMemo((): ColumnsType<IYeuCauThanhToan> => {
    return [
      {
        title: <p style={{ textAlign: 'center' }}>STT</p>,
        width: "5%",
        align: "center",
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: <p style={{ textAlign: 'center' }}>Mã hồ sơ</p>,
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
        title: <p style={{ textAlign: 'center' }}>Chủ hồ sơ</p>,
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
        title: <p style={{ textAlign: 'center' }}>Người nộp (In BL)</p>,
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
        title: <p style={{ textAlign: 'center' }}>Địa chỉ chủ hồ sơ (In BL)</p>,
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
        title: <p style={{ textAlign: 'center' }}>Tên thủ tục</p>,
        key: "tenTTHC",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.tenTTHC}</div>
            </>
          );
        },
      },
      {
        title: <p style={{ textAlign: 'center' }}>Người yêu cầu</p>,
        key: "tenNguoiYeuCau",
        render: (_, record) => {
          return (
            <>
              <div style={{ fontWeight: "500" }}>{record.tenNguoiYeuCau} - {record.tenDonVi}</div>
            </>
          );
        },
      },
      {
        title: <p style={{ textAlign: 'center' }}>Ngày chuyển TTHCC	</p>,
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
        title: <p style={{ textAlign: 'center' }}>Hình thức thu</p>,
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
        title: <p style={{ textAlign: 'center' }}>Thu phí/lệ phí (VNĐ)</p>,
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
        title: <p style={{ textAlign: 'center' }}>Thao tác</p>,
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
                style={{ fontSize: "16px" }}
                onClick={(e) => {
                  buttonActionContext.setChiTietHoSoModalVisible(true);
                  e.preventDefault();
                  buttonActionContext.setSelectedHoSos([record.hoSoId ?? ""]);
                }}
              />
              <DollarCircleOutlined
                title="Thanh toán trực tuyến"
                style={{ fontSize: "16px" }}
                onClick={() => {
                  // navigate(
                  //   Service.primaryRoutes.portaldvc.thanhToan +
                  //     "?maHoSo=" +
                  //     record.maHoSo
                  // );
                  window.open(
                    Service.primaryRoutes.portaldvc.thanhToan +
                    "?maHoSo=" +
                    record.maHoSo
                  );
                }}
              />

              {items?.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      choThuPhiContext.setSelectedIds([record.id]);
                    }}
                  >
                    {item.icon}
                  </span>
                );
              })}
              {/* <Dropdown menu={{ items }} trigger={['click']}>
                              <a onClick={(e) => {
                                  e.preventDefault()
                                  buttonActionContext.setSelectedHoSos([record.id])
                              }}>
                                  <Space>
                                      Chức năng
                                      <DownOutlined />
                                  </Space>
                              </a>
                          </Dropdown> */}
            </Space>

            // <Space direction="horizontal">
            //   <Dropdown menu={{ items }} trigger={["click"]}>
            //     <a
            //       onClick={(e) => {
            //         e.preventDefault();
            //         choThuPhiContext.setSelectedIds([record.id]);
            //       }}
            //     >
            //       <Space>
            //         Chức năng
            //         <DownOutlined />
            //       </Space>
            //     </a>
            //   </Dropdown>
            // </Space>
          );
        },
      },
    ];
  }, [pagination]);
  return { columns };
};
