import { AntdSelect, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
// import { useCoCauUser } from "../../hooks/useNguoiDungCoCauColumn";
import { useEffect, useMemo, useState } from "react";
import { ISearchUser, IUser } from "@/features/user/models";
import { SearchUser, SearchUserDonViThuTuc } from "@/features/user/redux/Actions";
import { useFolderContext } from "@/contexts/FolderContext";
// import { ThemMoiUser } from "../modals/ThemMoiUser";
// import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
// import { PhanQuyen } from "../modals/PhanQuyen";
import { useCoCauUser } from "@/features/cocautochuc/hooks/useNguoiDungCoCauColumn";
import { Button, Select, SelectProps, TableProps } from "antd";
import { useDonViContext } from "../contexts/DonViContext";
import { DefaultOptionType } from "antd/es/select";
import { resetDonViThuTucUsers } from "@/features/user/redux/Slice";
import { TableRowSelection } from "antd/es/table/interface";


// import { AdminPasswordResetInfoModal } from "../modals/AdminPasswordResetInfo";
// import { ChuyenNhomModal } from "../modals/ChuyenNhom";

export const NguoiTiepNhanRightSide = () => {
    const {
        donViThuTucUsers,
        count,
        loading,
    } = useAppSelector((state) => state.user);
    const [searchParams, setSearchParams] = useState<ISearchUser>({
        pageNumber: 1,
        pageSize: 100,

        // isActive: true,
    });
    const dispatch = useAppDispatch();
    const folderContext = useFolderContext();
    const donViContext = useDonViContext()

   
    const onSelectTable= (record: IUser, selected: boolean) => {
        donViContext.setSelectedUsers((curr) => {
            if(selected){
                return [...curr, record.id]

            }
            return curr.filter(x => x != record.id)
        })
        
    }
    const rowSelection: TableProps<IUser>["rowSelection"] = {
        selectedRowKeys: donViContext.selectedUsers,
        onSelect: onSelectTable,



    };
    useEffect(() => {
        if (folderContext.folderId) {
            setSearchParams((curr) => ({
                ...curr,
                groupCode: folderContext.folderId,
            }));
        }

    }, [folderContext.folderId]);
    useEffect(() => {
        if (donViThuTucUsers) {
            donViContext.setSelectedUserOptions((curr) => {
                const newUserOptions = donViThuTucUsers.map((user): DefaultOptionType => ({
                    value: user.id,
                    label: user.userName
                }))
                let users = [...curr, ...newUserOptions]
                return [...new Map(users.map(item =>
                    [item.value, item])).values()]
            })
        }

    }, [donViThuTucUsers])
    useEffect(() => {
        return () => {
            dispatch(resetDonViThuTucUsers())
        }
    }, [])
    const columns = useCoCauUser({
        pageNumber: searchParams.pageNumber,
        pageSize: searchParams.pageSize,
        groupCode: folderContext.folderId,
    });
    const onChange: SelectProps["onChange"] = ((values) => {
        donViContext.setSelectedUsers(values);
    })

    return (
        <>
            {folderContext.folderId ? (
                <>
                    {searchParams.groupCode ? <AntdTable
                        rowSelection={rowSelection}
                        loading={loading}
                        onSearch={(params) => dispatch(SearchUserDonViThuTuc(params))}
                        dataSource={donViThuTucUsers}
                        columns={columns}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        pagination={{ total: count }}
                        style={{ height: '100%' }}

                    /> : null}

                    <Select mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Người tiếp nhận đã chọn"
                        options={donViContext.selectedUserOptions}
                        value={donViContext.selectedUsers}
                        // onDeselect={onChange}
                        onChange={onChange}
                    />
                    {/* <Button
                        style={{ float: 'right', marginTop: '30px' }} type="primary"
                        onClick={onClick}
                        >
                        Xong
                    </Button> */}
                </>
            ) : null}
        </>
    );
};
