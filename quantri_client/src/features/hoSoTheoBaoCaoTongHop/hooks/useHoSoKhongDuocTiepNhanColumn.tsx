import { useEffect, useMemo, useState } from "react";

import { ColumnsType } from "antd/es/table";
import { Dropdown, MenuProps, Space, Tag, Typography } from "antd";
import {
  BorderOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";

import { IBasePagination } from "../../../models";
import dayjs from "dayjs";
import {
  FORMAT_DATE,
  FORMAT_DATE_WITHOUT_SECOND,
  FORMAT_DATE_WITHOUT_TIME,
} from "@/data";

import { AntdSpace } from "@/lib/antd/components";

import { TrangThaiTag } from "@/components/common";
import { getCurrency } from "@/utils";
import { HoSoTableActions } from "@/features/hoso/hooks/useHoSoColumn";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { KENH_THUC_HIEN_LOWERCASE } from "@/features/hoso/data/formData";
import { IHoSo } from "@/features/hoso/models";
import { ISearchTrangThaiHoSo } from "@/features/trangthaihoso/models";
import { SearchTrangThaiHoSo } from "@/features/trangthaihoso/redux/action";

export const useHoSoKhongDuocTiepNhanColumn = (
  pagination: IBasePagination,
  items: HoSoTableActions[]
) => {
  const buttonActionContext = useButtonActionContext();
  const dispatch = useAppDispatch();
  const onViewDetail = (hoSoId: string) => {
    buttonActionContext.setSelectedHoSos([hoSoId]);
    buttonActionContext.setChiTietHoSoModalVisible(true);
  };
  const { datas: trangThaiXuLyHoSos } = useAppSelector(
    (state) => state.trangthaihoso
  );
  const [searchTrangThaiHoSoParams, setSearchTrangThaiHoSoParams] =
    useState<ISearchTrangThaiHoSo>({
      pageSize: 100,
      pageNumber: 1,
    });
  useEffect(() => {
    dispatch(SearchTrangThaiHoSo(searchTrangThaiHoSoParams));
  }, []);
  const columns = useMemo((): ColumnsType<
    IHoSo & { daHetHanBoSung?: boolean }
  > => {
    return [
      {
        title: <p style={{ fontSize: 16, textAlign: "center" }}>STT</p>,
        width: "5%",
        align: "center",
        render: (text, record, index) => {
          if(pagination?.pageNumber && pagination.pageSize)
          return  (index + 1) + ((pagination.pageNumber-1)* pagination.pageSize)
          return  (index + 1)
        },
      },
      {
        title: (
          <p style={{ fontSize: 16, textAlign: "center" }}>Thông tin hồ sơ</p>
        ),
        key: "thongTinHoSo",
        render: (_, record) => {
          const gioTiepNhan = (
            <div style={{ fontWeight: "500" }}>
              {" "}
              - Tiếp nhận{" "}
              {(KENH_THUC_HIEN_LOWERCASE as any)[record.kenhThucHien]}:{" "}
              {record.ngayTiepNhan
                ? dayjs(record.ngayTiepNhan).format(FORMAT_DATE_WITHOUT_SECOND)
                : ""}
              , hẹn trả:{" "}
              {record.ngayHenTra
                ? dayjs(record.ngayHenTra).format(FORMAT_DATE_WITHOUT_SECOND)
                : ""}
              {record.ngayTra
                ? `, ngày trả: ${dayjs(record.ngayTra).format(
                    FORMAT_DATE_WITHOUT_SECOND
                  )}`
                : ""}
            </div>
          );
          const gioDangKy = (
            <div style={{ fontWeight: "500" }}>
              {" "}
              - Ngày nộp hồ sơ:{" "}
              {record.ngayNopHoSo
                ? dayjs(record.ngayNopHoSo).format(FORMAT_DATE_WITHOUT_SECOND)
                : ""}
            </div>
          );
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
              {record.trangThaiHoSoId == "1" ? gioDangKy : gioTiepNhan}
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
          <p style={{ fontSize: 16, textAlign: "center" }}>Trạng thái hồ sơ</p>
        ),
        key: "trangThaiHoSoId",
        render: (_, record) => {
          var trangThaiHoSoText = trangThaiXuLyHoSos?.find(
            (x) => x.ma == record.trangThaiHoSoId
          )?.ten;
          return (
            <>
              {trangThaiHoSoText ? (
                <>{TrangThaiTag(record.trangThaiHoSoId)}</>
              ) : null}
            </>
          );
        },
        width: "10%",
        align: "center",
      },
      {
        title: (
          <p style={{ fontSize: 16, textAlign: "center" }}>Lý do từ chối</p>
        ),
        key: "lyDoTuChoi",
        dataIndex : "lyDoTuChoi"
      },
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
            </Space>
          );
        },
      },
    ];
  }, [pagination]);
  return { columns };
};
