import { SearchUserTable } from "@/features/cocautochuc/components/rightside/SearchUser";
import { useNguoiTiepNhanThuTucContext } from "../contexts/NguoiTiepNhanThuTucContext";
import { ISearchUser, IUser } from "@/features/user/models";
import { GetUsersWithDonViQuanLy, SearchUser } from "@/features/user/redux/Actions";
import { AntdButton, AntdModal, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { useColumn } from "../hooks/useColumn";
import { toast } from "react-toastify";
import { useColumnNguoiTiepNhanThuTuc } from "../hooks/useColumnNguoiTiepNhan";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { Space, Spin } from "antd";
import { AddDonViThuTuc, UpdateMultiDonViThuTuc } from "@/features/donvithutuc/redux/action";
import { IUpdateMultiDonViThuTuc } from "@/features/donvithutuc/models";
import { AddNguoiTiepNhanSearch } from "./AddNguoiTiepNhanSearch";
import { donViThuTucApi } from "@/features/donvithutuc/services";
import { SearchNguoiTiepNhanThuTucs } from "@/features/thutuc/redux/action";
import { LoadingOutlined } from "@ant-design/icons";

const AddNguoiTiepNhanTable = ({ donViIds }: { donViIds: never[] }) => {
    const dispatch = useAppDispatch()
    const nguoiTiepNhanThucTucContext = useThuTucContext();
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);


    const {
        datas: users,
        data: user,
        count,
        loading,
    } = useAppSelector((state) => state.user);
    const [searchParams, setSearchParams] = useState<ISearchUser>({
        pageNumber: 1,
        pageSize: 20,
        reFetch: true,
        officeCode: user?.officeCode
    });
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

    const { columns } = useColumnNguoiTiepNhanThuTuc({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const handleCancel = () => {
        // dispatch(resetData)
        nguoiTiepNhanThucTucContext.setAddCanBoTiepNhanModalVisible(false);
    };
    const onFinish = async () => {
        if (selectedRowKeys.length > 0) {
            const putData = {
                Ids: donViIds,
                NguoiTiepNhanId: selectedRowKeys.join("##"),
            } as IUpdateMultiDonViThuTuc;
            // await dispatch(UpdateMultiDonViThuTuc(putData));
            const res = await donViThuTucApi.UpdateMulti(putData);
            if (res.status === 200) {
                dispatch(SearchNguoiTiepNhanThuTucs({ pageNumber: 1, pageSize: 50, reFetch: true, donViId: user?.officeCode }));
                toast.success("Thao tác thành công!");
                handleCancel();
                return res.data
            } else {
                toast.error("Thao tác thất bại!")
            }

        } else {
            toast.warning("Vui lòng chọn cán bộ tiếp nhận");
        }

    }

    useEffect(() => {
        if (user?.officeCode && !searchParams.donViQuanLy) {
            setSearchParams({
                ...searchParams,
                donViQuanLy: user.officeCode
            })
        }
    }, [user])

    return (
        <AntdModal
            title="Chọn người dùng"
            visible={nguoiTiepNhanThucTucContext.addCanBoTiepNhanModalVisible}
            handlerCancel={handleCancel}
            footer={null}
            fullsizeScrollable
        >
            {/* <Spin spinning={loading}
                indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
            > */}
            <div className="mb-3">
                <AddNguoiTiepNhanSearch setSearchParams={setSearchParams} />
            </div>

            <AntdTable
                bordered
                rowSelection={rowSelection}
                loading={loading}
                onSearch={(params) => {
                    if (searchParams.donViQuanLy) {
                        dispatch(GetUsersWithDonViQuanLy({
                            ...params,
                            donViQuanLy: searchParams.donViQuanLy
                        }))
                    }
                }}
                dataSource={users}
                columns={columns}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                pagination={{ total: count }}

            />
            <Space style={{ display: 'flex', justifyContent: 'center' }} >
                <AntdButton type="primary" onClick={onFinish}>
                    Xác nhận
                </AntdButton>
                <AntdButton type="default" onClick={handleCancel}>
                    Đóng
                </AntdButton>
            </Space>
            {/* </Spin> */}
        </AntdModal>


    )

}

export default AddNguoiTiepNhanTable