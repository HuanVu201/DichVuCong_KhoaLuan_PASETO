import { useMemo } from "react";

import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Popconfirm, Space, Tag, Typography } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LinkOutlined,
  MailOutlined,
  PhoneOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";
import {
  FORMAT_DATE,
  FORMAT_DATE_WITHOUT_SECOND,
  FORMAT_DATE_WITHOUT_TIME,
  ID_SEPARATE,
} from "@/data";

import { AntdSpace } from "@/lib/antd/components";

import { TrangThaiTag } from "@/components/common";
import { callApiAndDisplayFile, getCurrency } from "@/utils";
import { IBasePagination } from "@/models";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { IHoSo, ISearchHoSo, TRANGTHAITHUPHI } from "@/features/hoso/models";
import { KENH_THUC_HIEN_LOWERCASE } from "@/features/hoso/data/formData";
import { useAppDispatch } from "@/lib/redux/Hooks";
import {
  SearchHoSo,
  ThuHoiChuyenTraKq,
  XacNhanKetQua,
} from "@/features/hoso/redux/action";
import { TrangThaiTraKetQuaContants } from "../../contants/TrangThaiTraKetQuaContants";

export type HoSoTableActions = {
  icon: React.ReactNode;
};

export const useTheoDoiDaChuyenTraKqColumn = (
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
        title: <p style={{ fontSize: 16, textAlign: 'center' }}>STT</p>,
        width: '5%',
        align: 'center',
        render: (_, record, idx) => {
            const pageNumber = pagination.pageNumber ?? 1
            const pageSize = pagination.pageSize ?? 10
            return <>{(pageNumber - 1) * pageSize + idx + 1}</>
          },
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
                style={{ marginBottom: 0 }}
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
              <div style={{ fontWeight: "500" }}>
                {record.danhGia ? (
                  <>
                    <div>
                      - Đánh giá:
                      {record.danhGia == "RẤT HÀI LÒNG" ? (
                        <button
                          className="btn sohappy"
                          style={{
                            backgroundColor: "#903938",
                            color: "#fff",
                            cursor: "default",
                            fontSize: "12px",
                            padding: "3px 10px",
                            marginLeft: "5px",
                          }}
                        >
                          <i
                            className="fa-solid fa-thumbs-up"
                            style={{ color: "#fff", marginRight: "5px" }}
                          ></i>
                          <span>RẤT HÀI LÒNG</span>
                        </button>
                      ) : record.danhGia == "HÀI LÒNG" ? (
                        <button
                          className="btn happy"
                          style={{
                            backgroundColor: "#67A99F",
                            color: "#fff",
                            cursor: "default",
                            fontSize: "12px",
                            padding: "3px 10px",
                            marginLeft: "5px",
                          }}
                        >
                          <i
                            className="fa-solid fa-thumbs-up"
                            style={{ color: "#fff", marginRight: "5px" }}
                          ></i>
                          <span>HÀI LÒNG</span>
                        </button>
                      ) : (
                        <button
                          className="btn nohappy"
                          style={{
                            backgroundColor: "#8F969C",
                            color: "#fff",
                            cursor: "default",
                            fontSize: "12px",
                            padding: "3px 10px",
                            marginLeft: "5px",
                          }}
                        >
                          <i
                            className="fa-solid fa-thumbs-down"
                            style={{ color: "#fff", marginRight: "5px" }}
                          ></i>
                          <span>KHÔNG HÀI LÒNG</span>
                        </button>
                      )}
                    </div>
                    {record.noiDungDanhGia ? (
                      <div>- Nội dung đánh giá: {record.noiDungDanhGia}</div>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <></>
                )}
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
                  title="Số điện thoại"
                  onClick={() =>
                    window.open(`tel:+${record.soDienThoaiChuHoSo}`)
                  }
                >
                  {" "}
                  <i
                    className="fa-solid fa-phone-volume"
                    style={{ marginRight: 5, color: "rgba(245, 158, 11, 1)" }}
                  ></i>{" "}
                  <span>{record.soDienThoaiChuHoSo}</span>
                </div>
              ) : null}
              {record.diaChiChuHoSo ? (
                <div
                  style={{
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                  }}
                  role="button"
                  title="Số điện thoại"
                >
                  {" "}
                  <i
                    className="fa-solid fa-map-marker-alt"
                    style={{ marginRight: 5, color: "rgba(245, 158, 11, 1)" }}
                  ></i>{" "}
                  <span>{record.diaChiChuHoSo}</span>

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
                  <MailOutlined
                    title="Email"
                    style={{ marginRight: 5, color: "rgba(245, 158, 11, 1)" }}
                  />{" "}
                  <span>{record.emailChuHoSo}</span>
                </div>
              ) : null}
            </div>
          );
        },
      },
      {
        title: <p style={{ fontSize: 16, textAlign: "center" }}>Phí, Lệ phí</p>,
        key: "trangThaiPhiLePhi",
        dataIndex: "trangThaiPhiLePhi",
        align: "center",
        render: (text, record) => {
          let trangThai = record?.trangThaiThuPhi;
          let trangThais = trangThai?.split(ID_SEPARATE);
          let displayTrangThai = "";
          if (trangThais && trangThais?.length > 0) {
            const trangThaiConLai = trangThais.filter(
              (x) => x != TRANGTHAITHUPHI["Đã thanh toán"]
            );
            displayTrangThai =
              trangThaiConLai && trangThaiConLai.length > 0
                ? trangThaiConLai[0]
                : trangThais[0];
          }
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {displayTrangThai ? (
                <Tag
                  color={
                    displayTrangThai == TRANGTHAITHUPHI["Đã thanh toán"]
                      ? "green-inverse"
                      : displayTrangThai == TRANGTHAITHUPHI["Chờ thanh toán"]
                        ? "orange-inverse"
                        : "default"
                  }
                >
                  {displayTrangThai}
                </Tag>
              ) : null}
              <div style={{ marginTop: "5px" }}>
                {text == true ? (
                  <CheckCircleOutlined
                    style={{ color: "green" }}
                  ></CheckCircleOutlined>
                ) : (
                  <CloseCircleOutlined
                    style={{ color: "red" }}
                  ></CloseCircleOutlined>
                )}
              </div>
            </div>
          );
        },
        width: "10%",
      },
      {
        title: (
          <p style={{ fontSize: 16, textAlign: "center" }}>
            Loại kết quả xác nhận
          </p>
        ),
        key: "trangThaiHoSoId",
        render: (_, record) => {
          var trangThaiHoSoText = record?.loaiKetQua
            ? record?.loaiKetQua
            : "Kết quả";
          return <>
            <div style={{ fontWeight: '500' }}>
              {trangThaiHoSoText}
            </div>
            <div style={{ fontWeight: '500' }}>
              - Số ký hiệu: {record.soKyHieuKetQua}
            </div>
            {record.trichYeuKetQua ?
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span>-</span>
                <Typography.Paragraph
                  style={{ fontWeight: '500', marginBottom: 0 }}
                  ellipsis={{ rows: 2, expandable: true, symbol: 'Xem thêm' }}
                >
                  {record.trichYeuKetQua}
                </Typography.Paragraph>
              </div> : null
            }

            <div style={{ display: 'flex', flexDirection: 'row', fontWeight: '500', alignItems: 'center' }}>
              <span>- Đính kèm:</span>
              {record.dinhKemKetQua?.split(ID_SEPARATE).map((dinhKem, idx) =>
                <AntdSpace direction="horizontal" onClick={() => callApiAndDisplayFile(dinhKem)} key={idx}>
                  {''} <LinkOutlined style={{ color: "yellowgreen" }} role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />
                </AntdSpace>
              )}
            </div>
          </>;
        },
        width: "10%",
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
                title="Xác nhận thu hồi chuyển trả kết quả?"
                onConfirm={async () => {
                  await dispatch(
                    ThuHoiChuyenTraKq({
                      ids: [record.id],
                    })
                  );
                  await dispatch(SearchHoSo(pagination));
                }}
                okText="Xác nhận"
                cancelText="Huỷ"
              >
                <RollbackOutlined />
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
