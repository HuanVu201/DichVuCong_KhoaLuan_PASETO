import { AntdButton, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useCoCauUser } from "@/features/cocautochuc/hooks/useNguoiDungCoCauColumn";
import { useEffect, useState } from "react";
import { ISearchUser, IUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { useFolderContext } from "@/contexts/FolderContext";
import { useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext";
import { toast } from "react-toastify";
import { AdminPasswordResetInfoModal } from "@/features/cocautochuc/components/modals/AdminPasswordResetInfo";
import { useCoCauColumn } from "./hook/useCoCauColumn";
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext";
import { TableRowSelection } from "antd/es/table/interface";
import { IHoSo } from "@/features/hoso/models";
import { hoSoApi } from "@/features/hoso/services";
export const DanhSachCanBo = ({ setLoadingModal }: { setLoadingModal: (value: boolean) => void }) => {
    const {
        datas: users,
        count,
        loading,
    } = useAppSelector((state) => state.user);
    const [searchParams, setSearchParams] = useState<ISearchUser>({
        pageNumber: 1,
        pageSize: 50,

    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const buttonActionContext = useButtonActionContext()
    const dispatch = useAppDispatch();
    const coCauModalContext = useCoCauModalContext();
    const folderContext = useFolderContext();
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
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
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectTableChange,
    };


    useEffect(() => {
        if (folderContext.folderId) {
            setSearchParams((curr) => ({
                ...curr,
                groupCode: folderContext.folderId,
                pageNumber: 1
            }));
        }
    }, [folderContext.folderId]);
    useEffect(() => {
        if (coCauModalContext.modalSetRolesVisible && selectedUsers.length == 0) {
            coCauModalContext.SetModalSetRolesVisible(false);
            toast.warning("Chưa có người dùng được chọn");
        }
    }, [coCauModalContext.modalSetRolesVisible]);
    useEffect(() => {
        if (coCauModalContext.modalAddUserVisible && !folderContext.folderId) {
            coCauModalContext.SetModalAddUserVisible(false);
            toast.warning("Chưa chọn nhóm");
        }
    }, [coCauModalContext.modalAddUserVisible]);
    const columns = useCoCauColumn({
        pageNumber: searchParams.pageNumber,
        pageSize: searchParams.pageSize,
        groupCode: folderContext.folderId,
    });

    const AddCanBoTiepNhanHandler = () => {
        if (buttonActionContext.selectedInfoHoSos?.length == 0) {
            toast.error('Chưa có hồ sơ được chọn!')
            return
        }
        if (selectedRowKeys?.length == 0) {
            toast.error('Vui lòng chọn cán bộ!')
            return
        }

        (async () => {
            setLoadingModal(true)
            const res = await hoSoApi.ThemCanBoTiepNhanHoSo({
                hoSoIds: buttonActionContext.selectedHoSos as any,
                canBoIds: selectedRowKeys
            })

            if (res.status == 200) {
                toast.success("Thao tác thành công!")
            } else {
                toast.error("Thao tác thất bại!")
            }
            setLoadingModal(false)
        })()
    }

    return (
        <>
            <AntdButton style={{ background: 'green', color: '#fff', float: 'right' }}
                onClick={() => AddCanBoTiepNhanHandler()}
            >
                Thêm người tiếp nhận
            </AntdButton>

            {folderContext.folderId ? (
                <>
                    <div>Có <b>{count}</b> người dùng</div>
                    <AntdTable
                        rowSelection={rowSelection}
                        loading={loading}
                        onSearch={(params) => {
                            if (params.groupCode) {
                                dispatch(SearchUser(params));
                            }
                        }}
                        dataSource={users}
                        columns={columns}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        pagination={{ total: count }}
                    />
                </>
            ) : null}
        </>
    );
};
