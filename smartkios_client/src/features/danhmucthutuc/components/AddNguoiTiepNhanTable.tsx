import { SearchUserTable } from "@/features/cocautochuc/components/rightside/SearchUser";
import { useNguoiTiepNhanThuTucContext } from "../contexts/NguoiTiepNhanThuTucContext";
import { ISearchUser, IUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { AntdButton, AntdModal, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { useColumn } from "../hooks/useColumn";
import { toast } from "react-toastify";
import { useColumnNguoiTiepNhanThuTuc } from "../hooks/useColumnNguoiTiepNhan";
import { useThuTucContext } from "@/features/thutuc/contexts/ThuTucContext";
import { Space } from "antd";
import { AddDonViThuTuc, UpdateMultiDonViThuTuc } from "@/features/donvithutuc/redux/action";
import { IUpdateMultiDonViThuTuc } from "@/features/donvithutuc/models";
import { AddNguoiTiepNhanSearch } from "./AddNguoiTiepNhanSearch";
import { donViThuTucApi } from "@/features/donvithutuc/services";
import { SearchNguoiTiepNhanThuTucs } from "@/features/thutuc/redux/action";

const AddNguoiTiepNhanTable = ({ donViIds }: { donViIds: never[] }) => {
    const dispatch = useAppDispatch()
    const nguoiTiepNhanThucTucContext = useThuTucContext();
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectTableChange = (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys);

        let tmpUsers = newSelectedRowKeys.map((item: string) => {
            let tmpUser = users?.find((x) => x.id == item);
            return {
                id: tmpUser?.id,
                userName: tmpUser?.userName,
            };
        });
        setSelectedUsers(tmpUsers);
    };
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
            if (res.status === 200)
                dispatch(SearchNguoiTiepNhanThuTucs({ pageNumber: 1, pageSize: 50, reFetch: true }));
            toast.success("Cập nhật cán bộ tiếp nhận thành công");
            handleCancel();
            return res.data

        } else {
            toast.warning("Vui lòng chọn cán bộ tiếp nhận");
        }

    }


    return (
        <AntdModal
            title="Chọn người dùng"
            visible={nguoiTiepNhanThucTucContext.addCanBoTiepNhanModalVisible}
            handlerCancel={handleCancel}
            footer={null}
            fullsizeScrollable
        >
            <div className="mb-3">
                <AddNguoiTiepNhanSearch setSearchParams={setSearchParams} />
            </div>

            <AntdTable
                bordered
                rowSelection={rowSelection}
                loading={loading}
                onSearch={(params) => {
                    dispatch(SearchUser({ ...params, officeCode: user?.officeCode }));
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
        </AntdModal>


    )

}

export default AddNguoiTiepNhanTable