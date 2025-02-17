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
import { ISearchUser, IUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { DanhSachTaiKhoanSearch } from "./DanhSachTaiKhoanSearch";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";

export const ThemCanBoTiepNhanModal = ({
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

  const { datas: dsCanBos, count } = useAppSelector((state) => state.user);

  const columns = useMemo((): ColumnsType<IUser> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (text, record, index) => index + 1,
      },
      {
        title: "Họ và tên",
        key: "fullName",
        dataIndex: "fullName",
      },
      {
        title: "Tên đăng nhập",
        key: "userName",
        dataIndex: "userName",
      },
      {
        title: "Chức vụ",
        key: "positionName",
        dataIndex: "positionName",
      },
      {
        title: "Thuộc",
        key: "groupName",
        dataIndex: "groupName",
      },
      {
        title: "Đơn vị",
        key: "officeName",
        dataIndex: "officeName",
      },
    ];
  }, [donViThuTucContext.searchTaiKhoans]);
  const handleSubmit = async () => {
    setLoading(true);
    if (selectedRowKeys.length > 0) {
      const putData = {
        Ids: donViThuTucContext.selectedDonViThuTucs,
        NguoiTiepNhanId: selectedRowKeys.join("##"),
      } as IUpdateMultiDonViThuTuc;
      await dispatch(UpdateMultiDonViThuTuc(putData));

      onReload();
      handleCancel();
    } else {
      toast.warning("Vui lòng chọn cán bộ tiếp nhận");
    }
    setLoading(false);
  };

  const onSelectTableChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys([...selectedRowKeys, ...newSelectedRowKeys]);
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
      title="Chọn cán bộ tiếp nhận"
      handlerCancel={handleCancel}
    >
      <Spin spinning={loading}>
        <DanhSachTaiKhoanSearch
          setSearchParams={donViThuTucContext.setSearchTaiKhoans}
        />
        <AntdTable
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: onSelectTableChange,
          }}
          dataSource={dsCanBos}
          pagination={{
            total: count,
          }}
          searchParams={donViThuTucContext.searchTaiKhoans}
          setSearchParams={donViThuTucContext.setSearchTaiKhoans}
          onSearch={(params) => dispatch(SearchUser(params))}
        />
      </Spin>
    </AntdModal>
  );
};
