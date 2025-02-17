import { IUser } from "@/features/user/models"
import { userService } from "@/features/user/services"
import { useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useMemo, useState } from "react"

export const LienHeDetailChildren = ({ item, index }: { item: any, index: number }) => {
    const [groupCode, setGroupCode] = useState('');
    const [visible, setVisible] = useState(true);
    const { datas: users } = useAppSelector((state) => state.user);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await userService.SearchPortal({});
    //         setDataUser(res.data.data);
    //     };
    //     fetchData();
    // }, []);

    const handleClick = (e: any) => {
        setGroupCode(e);
        setVisible(cur => !cur);
    };

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) => user.officeCode === item.groupCode);
    }, [users, item.groupCode]);
    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <span style={{ fontWeight: '700', cursor: 'pointer',textTransform : 'uppercase',color : '#f0ad4e' }} onClick={() => handleClick(item.groupCode)}>
                    {item.groupName}
                </span>
            </div>

            {visible && (
                <div>
                   
                    <div className='wrapper_table'>
                        <table className='table-lienhe'>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Họ tên</th>
                                    <th>Chức vụ</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ thư điện tử</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers?.map((user: IUser, index) => (
                                    <tr key={user.id}>
                                        <td className="stt">{index + 1}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.positionName}</td>
                                        <td className="sdt">{user.phoneNumber}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}
