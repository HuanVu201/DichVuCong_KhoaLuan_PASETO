import { IHoSo } from "@/features/hoso/models";
import {
  ISearchThanhPhanThuTuc,
  IThanhPhanThuTuc,
} from "@/features/thanhphanthutuc/models";
import { useThanhPhanThuTucColumn } from "@/features/hoso/hooks/useThanhPhanThuTucColumn";
import { AntdButton, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FormInstance } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { useThanhPhanHuongDanNopHoSoColumn } from "../hooks/useThanhPhanHuongDanNopHoSoColumn";
import { IHuongDanNopHoSo } from "../models";

export const ThanhPhanHuongDanNopHoSoDetail = ({
  form,
  thanhPhanThuTucs,
  hoSoId,
}: {
  form: FormInstance<IHuongDanNopHoSo>;
  thanhPhanThuTucs: IThanhPhanThuTuc[] | undefined;
  hoSoId: string;
}) => {
  const dispatch = useAppDispatch();

  const [dataSource, setDataSource] = useState<IThanhPhanThuTuc[]>([]);
  const [searchParams, setSearchParams] = useState<ISearchThanhPhanThuTuc>({
    pageNumber: 1,
    pageSize: 1000,
    reFetch: true,
  });

  const columns = useThanhPhanHuongDanNopHoSoColumn({
    dataSource,
    setDataSource,
    form,
  });

  useEffect(() => {
    form.setFieldValue("thanhPhanHoSos", dataSource); // có thể sẽ chậm
  }, [dataSource]);

  useEffect(() => {
    if (thanhPhanThuTucs) {
      setDataSource(thanhPhanThuTucs);
    }
  }, [thanhPhanThuTucs]);

  const onAddRow = () => {
    const newRow: any = {
      id: uuid(),
      ten: "",
      soBanChinh: 0,
      soBanSao: 0,
      ghiChu: "",
      hoSo: hoSoId,
    };
    setDataSource([...dataSource, newRow]);
  };

  return (
    <>
      <AntdTable
        columns={columns}
        dataSource={dataSource}
        footer={() => (
          <AntdButton
            icon={<PlusCircleOutlined />}
            type="primary"
            onClick={onAddRow}
          >
            Thêm thành phần
          </AntdButton>
        )}
        pagination={false}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={() => {}}
      />
    </>
  );
};
