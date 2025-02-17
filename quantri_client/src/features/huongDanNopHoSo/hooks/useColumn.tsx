import { useMemo } from "react";
import { IHuongDanNopHoSo } from "../models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { DeleteHuongDanNopHoSo } from "../redux/action";
import { IBasePagination } from "../../../models";
import { useHuongDanNopHoSoContext } from "../contexts/HuongDanNopHoSoContext";
import { FORMAT_DATE } from "@/data";
import dayjs from "dayjs";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
export const useColumn = (pagination: IBasePagination) => {
  const dispatch = useAppDispatch();
  const huongDanNopHoSoContext = useHuongDanNopHoSoContext();
  const columns = useMemo((): ColumnsType<IHuongDanNopHoSo> => {
    return [
      {
        title: "STT",
        key: 'STT',
        width:"5%",
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: "Họ tên",
        key: "chuHoSo",
        dataIndex: "chuHoSo",
      },
      {
        title: "Thủ tục",
        key: "tenTTHC",
        dataIndex: "tenTTHC",
      },
      {
        title: "Nội dung",
        key: "trichYeuHoSo",
        dataIndex: "trichYeuHoSo",
        align: "left",
        render: (text) => <>{text}</>,
      },
      {
        title: "Địa chỉ",
        key: "diaChiChuHoSo",
        dataIndex: "diaChiChuHoSo",
        align: "left",
        render: (text) => <>{text}</>,
      },
      {
        title: "Số CCCD",
        key: "soGiayToChuHoSo",
        dataIndex: "soGiayToChuHoSo",
        align: "center",
        render: (text) => <>{text}</>,
      },
      {
        title: "Điện thoại",
        key: "soDienThoaiChuHoSo",
        dataIndex: "soDienThoaiChuHoSo",
        align: "center",
        render: (text) => <>{text}</>,
      },
      {
        title: "Ngày hướng dẫn",
        key: "ngayTiepNhan",
        dataIndex: "ngayTiepNhan",
        align: "center",
        render: (record) => (
          <>{record ? dayjs(record).format(FORMAT_DATE) : ""}</>
        ),
      },

      {
        title: "Thao tác",
        dataIndex: "",
        width: "10%",
        align: "center",
        key: "",
        render: (_, record) => (
          <Space direction="horizontal">
            <EditOutlined
              style={{ color: "cornflowerblue" }}
              title="Xem chi tiết/Sửa"
              onClick={() => {
                huongDanNopHoSoContext.setSelectedHuongDanNopHoSoId(record.id);
                huongDanNopHoSoContext.setHuongDanNopHoSoModalVisible(true);
              }}
            />
            <PrinterOutlined
              style={{ color: "black" }}
              title="In phiếu hướng dẫn"
              onClick={() => {
                huongDanNopHoSoContext.setSelectedHuongDanNopHoSoId(record.id);
                huongDanNopHoSoContext.setXuatPhieuHuongDanNopHoSoModalVisible(true);
              }}
            />
            <PrinterOutlined
              style={{ color: "black" }}
              title="In phiếu từ chối"
              onClick={() => {
                huongDanNopHoSoContext.setSelectedHuongDanNopHoSoId(record.id);
                huongDanNopHoSoContext.setXuatPhieuTuChoiModalVisible(true);
              }}
            />
            <Popconfirm
              title="Xoá?"
              onConfirm={() => {
                dispatch(
                  DeleteHuongDanNopHoSo({ id: record.id, forceDelete: false })
                );
              }}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <DeleteOutlined style={{ color: "tomato" }} />
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, [pagination]);
  return { columns };
};
