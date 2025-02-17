import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdTable,
} from "@/lib/antd/components";
import { Col, Form, Row, SelectProps, Spin } from "antd";
import { Suspense, useEffect, useMemo, useState } from "react";
import { IUpdateMultiDonViThuTuc } from "../models";
import { toast } from "react-toastify";
import { useDonViThuTucContext } from "../contexts/DonViThuTucContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { UpdateMultiDonViThuTuc } from "../redux/action";
import {
  ISearchTaiKhoanThuHuong,
  ITaiKhoanThuHuong,
} from "@/features/taikhoanthuhuong/models";
import { SearchTaiKhoanThuHuong } from "@/features/taikhoanthuhuong/redux/action";
import { ColumnsType } from "antd/es/table";

export const UpdateTkThuHuongModal = ({
  handleCancel,
  onReload,
}: {
  handleCancel: () => void;
  onReload: () => void;
}) => {
  const dispatch = useAppDispatch();
  const donViThuTucContext = useDonViThuTucContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [searchTaiKhoanThuHuongParams, setSearchTaiKhoanThuHuongParams] =
    useState<ISearchTaiKhoanThuHuong>({
      pageNumber: 1,
      pageSize: 10,
    });
  const { datas: taiKhoanThuHuongs, count } = useAppSelector(
    (state) => state.taikhoanthuhuong
  );
  useEffect(() => {
    dispatch(SearchTaiKhoanThuHuong(searchTaiKhoanThuHuongParams));
  }, [searchTaiKhoanThuHuongParams]);

  const columns = useMemo((): ColumnsType<ITaiKhoanThuHuong> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Tài khoản thụ hưởng",
        key: "tkThuHuong",
        dataIndex: "tkThuHuong",
      },
      {
        title: "Mã ngân hàng thụ hưởng",
        key: "maNHThuHuong",
        dataIndex: "maNHThuHuong",
      },
      {
        title: "Tên tài khoản thụ hưởng",
        key: "tenTKThuHuong",
        dataIndex: "tenTKThuHuong",
      },
      {
        title: "Mô tả",
        key: "moTa",
        dataIndex: "moTa",
      },
    ];
  }, [searchTaiKhoanThuHuongParams]);
  const handleSubmit = async () => {
    setLoading(true);
    if (selectedRowKeys.length > 0) {
      const putData = {
        Ids: donViThuTucContext.selectedDonViThuTucs,
        TaiKhoanThuHuongId: selectedRowKeys[0],
      } as IUpdateMultiDonViThuTuc;
      await dispatch(UpdateMultiDonViThuTuc(putData));

      onReload();
      handleCancel();
    } else {
      toast.warning("Vui lòng chọn tài khoản thụ hưởng");
    }
    setLoading(false);
  };

  const onSelectTableChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <AntdModal
      footer={
        <AntdSpace align="center">
          <AntdButton type="primary" onClick={handleSubmit}>
            Xác nhận
          </AntdButton>
          <AntdButton type="default" onClick={handleCancel}>
            Đóng
          </AntdButton>
        </AntdSpace>
      }
      fullsizeScrollable
      visible={true}
      title="Chọn tài khoản thụ hưởng"
      handlerCancel={handleCancel}
    >
      <Spin spinning={loading}>
        <AntdTable
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectTableChange,
            type: "radio",
          }}
          dataSource={taiKhoanThuHuongs}
          pagination={{
            total: count,
          }}
          searchParams={searchTaiKhoanThuHuongParams}
          setSearchParams={setSearchTaiKhoanThuHuongParams}
          onSearch={(params) => dispatch(SearchTaiKhoanThuHuong(params))}
        />
      </Spin>
    </AntdModal>
  );
};
