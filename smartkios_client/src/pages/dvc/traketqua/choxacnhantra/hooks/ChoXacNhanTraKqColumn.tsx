import { useMemo } from "react";

import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Popconfirm, Space, Tag, Typography } from "antd";
import {
  BorderOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import {
  FORMAT_DATE,
  FORMAT_DATE_WITHOUT_SECOND,
  FORMAT_DATE_WITHOUT_TIME,
} from "@/data";

import { AntdSpace } from "@/lib/antd/components";

import { TrangThaiTag } from "@/components/common";
import { getCurrency } from "@/utils";
import { IBasePagination } from "@/models";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo } from "@/features/hoso/models";
import { KENH_THUC_HIEN_LOWERCASE } from "@/features/hoso/data/formData";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchHoSo, XacNhanKetQua } from "@/features/hoso/redux/action";

export type HoSoTableActions = {
  icon: React.ReactNode;
};

export const useChoXacNhanKqColumn = (
  pagination: ISearchHoSo,
  items: HoSoTableActions[]
) => {
  const buttonActionContext = useButtonActionContext();

  const onViewDetail = (hoSoId: string) => {
    buttonActionContext.setSelectedHoSos([hoSoId]);
    buttonActionContext.setChiTietHoSoModalVisible(true);
  };
  const dispatch = useAppDispatch();
  const columns = useMemo((): ColumnsType<
    IHoSo & { daHetHanBoSung?: boolean }
  > => {
    return [
      {
        title: <p style={{ fontSize: 16, textAlign: "center" }}>STT</p>,
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: (
          <p style={{ fontSize: 16, textAlign: "center" }}>Thông tin hồ sơ</p>
        ),
        key: "thongTinHoSo",
        render: (_, record) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ fontWeight: "500", color: "#2C62B9" }}
                  role="button"
                  onClick={() => onViewDetail(record.id)}
                >
                  {record.maHoSo}
                </div>
              </div>
              <Typography.Paragraph
                style={{ fontWeight: "500", marginBottom: 0 }}
                ellipsis={{ rows: 2, expandable: true, symbol: "Xem thêm" }}
              >
                - {record.tenTTHC}
              </Typography.Paragraph>
              {/* <div style={{fontWeight: '500'}}> - Ngày tạo: {record.ngayTiepNhan ? dayjs(record.ngayTiepNhan).format(FORMAT_DATE) : ""}</div> */}
              <div style={{ fontWeight: "500" }}>
                {" "}
                - Tiếp nhận{" "}
                {(KENH_THUC_HIEN_LOWERCASE as any)[record.kenhThucHien]}:{" "}
                {record.ngayNopHoSo
                  ? dayjs(record.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_SECOND)
                  : ""}
                , hẹn trả:{" "}
                {record.ngayHenTra
                  ? dayjs(record.ngayHenTra).format(FORMAT_DATE_WITHOUT_SECOND)
                  : ""}
              </div>
             
              {/* <div style={{fontWeight: '500'}}> - Đăng ký nhận kết quả: </div> */}
            </>
          );
        },
      },
      {
        title: <p style={{ fontSize: 16, textAlign: "center" }}>Chủ hồ sơ</p>,
        key: "chuHoSo",
        render: (_, record) => {
          return (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                flexDirection: "column",
              }}
            >
              <div style={{ fontWeight: "500" }}>
                {record.chuHoSo} ({record.soGiayToChuHoSo})
              </div>
              {record.soDienThoaiChuHoSo ? (
                <div
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                  role="button"
                  onClick={() =>
                    window.open(`tel:+${record.soDienThoaiChuHoSo}`)
                  }
                >
                  {" "}
                  <PhoneOutlined
                    title="Số điện thoại"
                    style={{ marginRight: 3 }}
                  />{" "}
                  <span>{record.soDienThoaiChuHoSo}</span>
                </div>
              ) : null}
              {record.emailChuHoSo ? (
                <div
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                  role="button"
                  onClick={() => window.open(`mailto:${record.emailChuHoSo}`)}
                >
                  {" "}
                  <MailOutlined title="Email" style={{ marginRight: 3 }} />{" "}
                  <span>{record.emailChuHoSo}</span>
                </div>
              ) : null}
            </div>
          );
        },
      },
      {
        title: (
          <p style={{ fontSize: 16, textAlign: "center" }}>Thu phí/lệ phí</p>
        ),
        key: "thuPhiLePhi",
        render: (_, record) => {
          return (
            <>
              {record.soTien ? (
                <>
                  <div style={{ fontWeight: "500" }}>
                    {record.hinhThucThu}: {getCurrency(record.soTien)} VNĐ
                  </div>
                </>
              ) : (
                <span style={{ fontWeight: "500" }}>Không thu phí</span>
              )}
            </>
          );
        },
      },
      // {
      //     title: "Trạng thái",
      //     key: "trangThai",
      //     render: (_, record) => {
      //         return <>
      //             {/* <div style={{fontWeight: '500'}}> - </div> */}
      //             <AntdSpace style={{ fontWeight: '500' }} direction="vertical">
      //                 {TrangThaiTag(record.trangThaiHoSoId)}
      //                 {record.daHetHanBoSung ? <Tag color="magenta">Đã quá hạn bổ sung</Tag>: null}
      //             </AntdSpace>
      //         </>
      //     }
      // },
      {
        title: <p style={{ fontSize: 16, textAlign: "center" }}>Thao tác</p>,
        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => {
          return (
            <Space direction="horizontal">
              {items?.map((item, index) => {
                return (
                  <span
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      buttonActionContext.setSelectedHoSos([record.id]);
                    }}
                  >
                    {item.icon}
                  </span>
                );
              })}
              <Popconfirm
                title="Xác nhận kết quả xử lý?"
                onConfirm={async () => {
                  await dispatch(
                    XacNhanKetQua({
                      ids: [record.id],
                    })
                  );
                  await dispatch(SearchHoSo(pagination));
                }}
                okText="Xác nhận"
                cancelText="Huỷ"
              >
                <CheckCircleOutlined />
              </Popconfirm>
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
          );
        },
      },
    ];
  }, [pagination]);
  return { columns };
};
