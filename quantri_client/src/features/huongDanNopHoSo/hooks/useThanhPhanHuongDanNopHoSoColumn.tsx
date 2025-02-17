import { useCallback, useMemo, useTransition } from "react";
import { ColumnsType } from "antd/es/table";
import { IThanhPhanThuTuc } from "@/features/thanhphanthutuc/models";
import { Checkbox, Input, InputNumber, Popconfirm, Space, Tag } from "antd";
import { DeleteOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib";
import { IHoSo } from "@/features/hoso/models";

import React from "react";

import { useAppSelector } from "@/lib/redux/Hooks";

const FOLDER_NAME = "ThanhPhanHoSo";

export const useThanhPhanHuongDanNopHoSoColumn = ({
  dataSource,
  setDataSource,
  form,
}: {
  dataSource: IThanhPhanThuTuc[];
  setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanThuTuc[]>>;
  form: FormInstance<IHoSo>;
}) => {
  const [_, startTransition] = useTransition();
  const { data: hoSo } = useAppSelector((state) => state.hoso);

  const onRowChange = useCallback(
    (value: any, index: number, colName: keyof IThanhPhanThuTuc) => {
      startTransition(() => {
        setDataSource((curr) => {
          const newDataSource = [...curr];
          return newDataSource.map((item, idx) => {
            if (idx === index) {
              return { ...item, [colName]: value };
            }
            return item;
          });
        });
      });
    },
    []
  );

  const columns = useMemo((): ColumnsType<IThanhPhanThuTuc> => {
    return [
      {
        title: "Tên giấy tờ",
        key: "ten",
        dataIndex: "ten",
        width: "40%",
        render: (_, record, idx) => {
          return (
            <Input.TextArea
              title={record.ten}
              cols={80}
              rows={3}
              defaultValue={record.ten}
              onChange={(e) => onRowChange(e.target.value, idx, "ten")}
            />
          );
        },
      },
      {
        title: "Số bản chính",
        key: "soBanChinh",
        dataIndex: "soBanChinh",
        render: (_, record, idx) => {
          return (
            <InputNumber
              min={0}
              defaultValue={record.soBanChinh ?? 0}
              onChange={(e) => onRowChange(e, idx, "soBanChinh")}
            />
          );
        },
      },
      {
        title: "Số bản sao",
        key: "soBanSao",
        dataIndex: "soBanSao",
        render: (_, record, idx) => {
          return (
            <InputNumber
              min={0}
              defaultValue={record.soBanSao ?? 0}
              onChange={(e) => onRowChange(e, idx, "soBanSao")}
            />
          );
        },
      },
      {
        title: "Ghi chú",
        key: "ghiChu",
        dataIndex: "ghiChu",

        render: (_, record, idx) => {
          return (
            <Input.TextArea
              title={record.ghiChu}
              cols={80}
              rows={3}
              defaultValue={record.ghiChu}
              onChange={(e) => onRowChange(e.target.value, idx, "ghiChu")}
            />
          );
        },
      },
      {
        title: "Thao tác",
        width: "10%",
        align: "center",
        key: "thaotac",
        render: (_, record, idx) => (
          <Space direction="horizontal">
            <Popconfirm
              title="Xoá?"
              onConfirm={() => {
                setDataSource((curr) => curr.filter((x) => x.id !== record.id));
              }}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <DeleteOutlined
                style={{ color: "tomato" }}
                title="Xóa dòng"
                onClick={() => {}}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];
  }, [dataSource, hoSo, form]);
  return columns;
};
