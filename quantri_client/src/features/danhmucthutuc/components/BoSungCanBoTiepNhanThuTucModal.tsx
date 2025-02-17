import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdTable,
} from "@/lib/antd/components";
import { Col, Form, Row, SelectProps, Spin } from "antd";
import { Suspense, useEffect, useMemo, useState } from "react";
import { IUpdateMultiDonViThuTuc } from "@/features/danhmucthutucdonvi/models";
import { toast } from "react-toastify";
import { useDonViThuTucContext } from "@/features/danhmucthutucdonvi/contexts/DonViThuTucContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { UpdateMultiDonViThuTuc } from "@/features/donvithutuc/redux/action";
import {
  ISearchTaiKhoanThuHuong,
  ITaiKhoanThuHuong,
} from "@/features/taikhoanthuhuong/models";
import { SearchTaiKhoanThuHuong } from "@/features/taikhoanthuhuong/redux/action";
import { ColumnsType } from "antd/es/table";
import { ISearchUser, IUser } from "@/features/user/models";
import { GetUsersWithDonViQuanLy, SearchUser } from "@/features/user/redux/Actions";
import { DanhSachTaiKhoanSearch } from "@/features/danhmucthutucdonvi/components/DanhSachTaiKhoanSearch";
import { ISearchCoCauToChuc } from "@/features/cocautochuc/models";
import { SearchNguoiTiepNhanThuTucs } from "@/features/thutuc/redux/action";
import { form } from "@formio/react";
import { LoadingOutlined } from "@ant-design/icons";

export const BoSungCanBoTiepNhanThuTucModal = ({
  handleCancel,
  onReload,
  donViThuTucIds
}: {
  handleCancel: () => void;
  onReload: () => void;
  donViThuTucIds: never[]
}) => {
  const dispatch = useAppDispatch();
  const donViThuTucContext = useDonViThuTucContext();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data: user, datas: users, } = useAppSelector(state => state.user)

  const { datas: dsCanBos, count, loading } = useAppSelector((state) => state.user);
  const { datas: donViThuTucs } = useAppSelector((state) => state.donvithutuc);
  const columns = useMemo((): ColumnsType<IUser> => {
    return [
      {
        title: "STT",
        width: "5%",
        align: "center",
        render: (_, record, idx) => {
          const pageNumber = donViThuTucContext.searchTaiKhoans?.pageNumber ?? 1
          const pageSize = donViThuTucContext.searchTaiKhoans?.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
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


    if (selectedRowKeys.length > 0) {

      const putData = {
        Ids: donViThuTucIds,
        NguoiTiepNhanId: selectedRowKeys.join("##"),
        LaBoSungNguoiTiepNhan: true
      } as IUpdateMultiDonViThuTuc;
      const res = await dispatch(UpdateMultiDonViThuTuc(putData));
      if (res) {
        dispatch(SearchNguoiTiepNhanThuTucs({ pageNumber: 1, pageSize: 50, reFetch: true, donViId: user?.officeCode }));
        toast.success("Cập nhật cán bộ tiếp nhận thành công");
        onReload();
        handleCancel();
      }

    } else {
      toast.warning("Vui lòng chọn cán bộ tiếp nhận");
    }
  };

  // const onSelectTableChange = (newSelectedRowKeys: React.Key[]) => {
  //   setSelectedRowKeys([...selectedRowKeys, ...newSelectedRowKeys]);
  // };

  useEffect(() => {
    if (user?.officeCode && !donViThuTucContext.searchTaiKhoans.donViQuanLy) {
      donViThuTucContext.setSearchTaiKhoans({
        ...donViThuTucContext.searchTaiKhoans,
        donViQuanLy: user.officeCode
      })
    }
  }, [user])

  const onSelectTableChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);

    let tmpUsers = newSelectedRowKeys.map((item: string) => {
      let tmpUser = users?.find((x) => x.id == item);
      return {
        id: tmpUser?.id,
        userName: tmpUser?.userName,
      };
    });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectTableChange,
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
      <AntdSpace direction="vertical" style={{ width: "100%" }}>
        <Spin spinning={loading}
        // indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
        >
          <DanhSachTaiKhoanSearch
            setSearchParams={donViThuTucContext.setSearchTaiKhoans}
          />
          <AntdTable
            className="mt-2"
            columns={columns}
            rowSelection={rowSelection}
            dataSource={dsCanBos}
            pagination={{
              total: count,
            }}
            searchParams={donViThuTucContext.searchTaiKhoans}
            setSearchParams={donViThuTucContext.setSearchTaiKhoans}
            onSearch={(params) => {
              if (donViThuTucContext.searchTaiKhoans.donViQuanLy) {
                dispatch(GetUsersWithDonViQuanLy({
                  ...params,
                  donViQuanLy: donViThuTucContext.searchTaiKhoans.donViQuanLy
                }))
              }

            }}
          />
        </Spin>
      </AntdSpace>
    </AntdModal>
  );
};
