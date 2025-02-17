import { useMemo, useState } from "react";

import { Space, TableColumnsType, Table } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { IThuTuc } from "@/features/thutuc/models";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { IBasePagination } from "@/models";
export const useColumn = (pagination: IBasePagination) => {
  const thuTucContext = useThuTucContext();
  const expandedColumns = useMemo(() => {
    const columns: TableColumnsType<IThuTuc> = [
      {
        title: "STT",
        width:"5%",
        key: 'STT',
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
    },
      {
        title: "Mã thủ tục",
        key: "maTTHC",
        dataIndex: "maTTHC",
      },
      {
        title: "Tên thủ tục",
        key: "tenTTHC",
        dataIndex: "tenTTHC",
      },
      // {
      //     title: "ĐKKQ",
      //     key: "dkkq",
      //     render: (_, record) => {
      //         return <div>null</div>
      //     }
      // },
      {
        title: "Có phí, lệ phí",
        key: "trangThaiPhiLePhi",
        dataIndex: "trangThaiPhiLePhi",
        align: "center",
        render: (text) =>
          text == true ? (
            <CheckCircleOutlined
              style={{ color: "green" }}
            ></CheckCircleOutlined>
          ) : (
            <CloseCircleOutlined style={{ color: "red" }}></CloseCircleOutlined>
          ),
      },
      {
        title: "Sử dụng",
        key: "suDung",
        dataIndex: "suDung",
        align: "center",
        render: (text, record) => (
          <Space style={{ cursor: "pointer" }} direction="horizontal">
            {text == true ? (
              <CheckCircleOutlined
                style={{ color: "green" }}
              ></CheckCircleOutlined>
            ) : (
              <CloseCircleOutlined
                style={{ color: "red" }}
              ></CloseCircleOutlined>
            )}
          </Space>
        ),
      },
      {
        title: "Liên thông",
        key: "lienThong",
        align: "center",
        render: (_, record) => {
          return record.lienThong ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          );
        },
      },
      {
        title: "Thao tác",
        width: "10%",
        align: "center",
        key: "thaotac",
        render: (_, record) => (
          <Space direction="horizontal">
            <EditOutlined
              style={{ color: "cornflowerblue" }}
              title="Xem chi tiết thủ tục"
              onClick={() => {
                thuTucContext.setThuTucId(record.id);
                thuTucContext.setThuTucModalVisible(true);
              }}
            />
          </Space>
        ),
      },
    ];
    return columns;
  }, [pagination]);
  // const columns = useMemo((): ColumnsType<IThuTuc> => {
  //     return [
  //         { title: 'Tên lĩnh vực', dataIndex: 'linhVucChinh', key: 'linhVucChinh' },
  //         { title: 'Mã lĩnh vực', dataIndex: 'maLinhVucChinh', key: 'maLinhVucChinh' },
  //     ];
  // }, [pagination])
  return { expandedColumns };
};
