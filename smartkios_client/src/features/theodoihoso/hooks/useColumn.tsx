import { useMemo } from "react";
import { IHoSo, ISearchHoSo } from "../../hoso/models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { DeleteHoSo } from "../../hoso/redux/action";
import { IBasePagination } from "../../../models";
import { useTheoDoiHoSoContext } from "../contexts/TheoDoiHoSoContext";

export const useColumn = (searchParams: ISearchHoSo) => {
  const dispatch = useAppDispatch();
  const theoDoiHoSoContext = useTheoDoiHoSoContext();
  const columns = useMemo((): ColumnsType<IHoSo> => {
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
        dataIndex: "maHoSo",
      },
      {
        title: "Quy trình",
        key: "quyTrinh",
        dataIndex: "quyTrinh",
      },
      {
        title: "Cán bộ tiếp nhận",
        key: "canBoTiepNhan",
        dataIndex: "canBoTiepNhan",
      },
      {
        title: "Trạng thái tiếp theo",
        key: "trangThaiTiepTheo",
        dataIndex: "trangThaiTiepTheo",
      },
      {
        title: "Bộ phận xử lý",
        key: "boPhanXuLy",
        dataIndex: "boPhanXuLy",
      },
      {
        title: "Người xử lý",
        key: "nguoiXuLy",
        dataIndex: "nguoiXuLy",
      },
      {
        title: "Đã gửi hồ sơ",
        key: "daGuiHoSo",
        dataIndex: "daGuiHoSo",
      },
      {
        title: "Đã gửi TPHS",
        key: "daGuiTPHS",
        dataIndex: "daGuiTPHS",
      },
      {
        title: "Trạng thái hồ sơ",
        key: "trangThaiHoSo",
        dataIndex: "trangThaiHoSo",
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
                theoDoiHoSoContext.setTheoDoiHoSoId(record.id);
                theoDoiHoSoContext.setDetailTheoDoiHoSoModalVisible(true);
              }}
            />
            <Popconfirm
              title="Xoá?"
              onConfirm={() => {
                dispatch(
                  DeleteHoSo({
                    ids: [record.id],
                    forceDelete: false,
                    lyDoXoa: "",
                  })
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
  }, [searchParams]);
  return { columns };
};
