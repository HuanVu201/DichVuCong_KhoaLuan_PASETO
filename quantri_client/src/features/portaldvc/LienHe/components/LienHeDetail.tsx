import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import '../scss/LienHeDetail.scss'
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { PortalSearchCoCauToChuc, SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud';
import { useSearchParams } from 'react-router-dom';
import { ICoCauToChuc } from '@/features/cocautochuc/models';
import { coCauToChucService } from '@/features/cocautochuc/services';
import { SearchPortalUser, SearchUser } from '@/features/user/redux/Actions';
import { userService } from '@/features/user/services';
import { IUser } from '@/features/user/models';
import { LienHeDetailChildren } from './LienHeDetailChildren';

export const LienHeDetail = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataCoCauToChuc, setDataCoCauToChuc] = useState([])
    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
    const { datas: users } = useAppSelector((state) => state.user);
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const res = await coCauToChucService.Search({ type: 'don-vi', pageSize: 1000, ofGroupCode: searchParams.get("groupCode") as any })
            setDataCoCauToChuc(res.data.data as any)
        }
        fetchData()
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            const res = await dispatch(SearchPortalUser({}))
        }
        fetchData()

    }, [searchParams.get("groupCode")])
    const tenDonVi = coCauToChucs?.find(x => x.groupCode === searchParams.get("groupCode"))
    const handleClick = () => {
        setVisible(cur => !cur)
    }


    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) => dataCoCauToChuc.some((group: ICoCauToChuc) => searchParams.get("groupCode") === user.officeCode)
        );
    }, [users, searchParams.get("groupCode")]);

    return (
        <>
            <div className="containerLienHeDetail">
                <div className='titleText'>
                    THÔNG TIN HỌ VÀ TÊN, LIÊN HỆ BỘ PHẬN TIẾP NHẬN VÀ TRẢ KẾT QUẢ 
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <span onClick={handleClick} style={{ fontWeight: '700',textTransform : 'uppercase',color : '#f0ad4e' }}>{tenDonVi?.groupName}</span>
                </div>

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
                                    <td className='stt'>{index + 1}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.positionName}</td>
                                    <td className='sdt'>{user.phoneNumber}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {dataCoCauToChuc.map((item: ICoCauToChuc, index) => (
                        <div key={index}>
                            <LienHeDetailChildren index={index} item={item} ></LienHeDetailChildren>
                        </div>

                    ))}
                </div>
            </div>
        </>

    )
}