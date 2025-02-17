import { IHoSo } from "@/features/hoso/models";
import { AntdButton, AntdTable } from "@/lib/antd/components";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { PlusCircleOutlined } from "@ant-design/icons";
import { FormInstance } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useTiepNhanHoSoContext } from "@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext";
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from "../../../data/formData";
import {
  ISearchThanhPhanHoSo,
  IThanhPhanHoSo,
} from "@/features/thanhphanhoso/models";
import { DanhSachGiayToSoHoaModal } from "../themMoiHoSo/DanhSachGiayToSoHoaModal";
import { GiayToSoHoaModal } from "../themMoiHoSo/GiayToSoHoaModal";
import { useThanhPhanHoSoColumn } from "@/features/hoso/hooks/useThanhPhanHoSoColumn";

export interface IThanhPhanHoSoWithSoHoa extends IThanhPhanHoSo {
  trangThaiSoHoa: keyof typeof TRANGTHAISOHOA_VALUE;
  fileSoHoa?: string;
}

export const AdminTepDinhKemSuaHoSo = ({
  form,
  thanhPhanHoSos,
}: {
  form: FormInstance<IHoSo>;
  thanhPhanHoSos: IThanhPhanHoSo[] | undefined;
}) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState<ISearchThanhPhanHoSo>({
    pageNumber: 1,
    pageSize: 1000,
    reFetch: true,
  });
  const [dataSource, setDataSource] = useState<IThanhPhanHoSoWithSoHoa[]>([]);
  const columns = useThanhPhanHoSoColumn({ dataSource, setDataSource, form, pagination: {pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize} });
  const tiepNhanHoSoContext = useTiepNhanHoSoContext();

  useEffect(() => {
    form.setFieldValue("thanhPhanHoSos", dataSource); // có thể sẽ chậm
  }, [dataSource]);

  useEffect(() => {
    if (thanhPhanHoSos) {
      setDataSource(
        thanhPhanHoSos.map((x) => ({
          ...x,
          trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"],
        }))
      );
    }
    return () => {
      setDataSource([]);
    };
  }, [thanhPhanHoSos]);

  const onAddRow = () => {
    const newRow: any = {
      id: uuid(),
      batBuoc: false,
      ten: "",
      soBanChinh: 0,
      soBanSao: 0,
      nhanBanGiay: false,
      trangThaiSoHoa: TRANGTHAISOHOA["Chưa số hóa"],
      dinhKem: "",
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
      {tiepNhanHoSoContext.danhSachGiayToSoHoaModalVisible ? (
        <DanhSachGiayToSoHoaModal form={form} />
      ) : null}
      {tiepNhanHoSoContext.giayToSoHoaVisible ? <GiayToSoHoaModal /> : null}
    </>
  );
};
