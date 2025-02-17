import { useMemo } from "react";
import { ISearchThanhPhanThuTuc, IThanhPhanThuTuc } from "../models";
import { ColumnsType } from "antd/es/table";
import { Popconfirm, Space, TableColumnsType } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../lib/redux/Hooks";
import { DeleteThanhPhanThuTuc, SearchThanhPhanThuTuc } from "../redux/action";
import { IBasePagination } from "../../../models";
import { useThanhPhanThuTucContext } from "../contexts/ThanhPhanThuTucContext";
export const useColumn = (searchParams: ISearchThanhPhanThuTuc) => {
  const dispatch = useAppDispatch();
  const thanhPhanThuTucContext = useThanhPhanThuTucContext();
  const columns = useMemo(() => {
    const columns: TableColumnsType<IThanhPhanThuTuc> = [
      {
        title: "STT",
        key: 'STT',
        width:"5%",
        render: (_, record, idx) => {
          const pageNumber = searchParams.pageNumber ?? 1
          const pageSize = searchParams.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
    },
      {
        title: "Mã giấy tờ",
        key: "ma",
        dataIndex: "ma",
      },
      {
        title: "Tên giấy tờ",
        key: "ten",
        width:"35%",
        dataIndex: "ten",
      },
      {
        title: "Số bản chính    ",
        key: "soBanChinh",
        dataIndex: "soBanChinh",
      },
      {
        title: "Số bản sao",
        key: "soBanSao",
        dataIndex: "soBanSao",
      },
      // {
      //     title: "Mã giấy tờ kho DVCQG",
      //     key: "maGiayToKhoQuocGia",
      //     dataIndex: "maGiayToKhoQuocGia",
      // },
      {
        title: "Thao tác",
        width: "10%",
        align: "center",
        key: "thaotac",
        render: (_, record) => (
          <Space direction="horizontal">
            <EditOutlined
              style={{ color: "cornflowerblue" }}
              title="Xem chi tiết/Sửa"
              onClick={() => {
                thanhPhanThuTucContext.setThanhPhanThuTucId(record.id);
                thanhPhanThuTucContext.setThanhPhanThuTucModalVisible(true);
              }}
            />
            <Popconfirm
              title="Xoá?"
              onConfirm={async () => {
                await dispatch(
                  DeleteThanhPhanThuTuc({ id: record.id, forceDelete: false })
                );
                await dispatch(SearchThanhPhanThuTuc(searchParams));
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
    return columns;
  }, [searchParams]);
  return columns;
};
