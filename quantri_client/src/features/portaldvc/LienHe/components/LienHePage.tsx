import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import '../scss/LienHePage.scss'
import { useEffect } from 'react';
import { PortalSearchCoCauToChuc, SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud';
import { ICoCauToChuc } from '@/features/cocautochuc/models';
import { useSearchParams } from 'react-router-dom';
import { LienHeDetail } from './LienHeDetail';
import { SearchPortalUser } from '@/features/user/redux/Actions';

const LienHePage = () => {
    const dispatch = useAppDispatch();
    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(PortalSearchCoCauToChuc({ type: 'don-vi', pageSize: 1000, cataLog: 'quan-huyen' }));

    }, [])
    useEffect(() => {
        const fetchData = async () => {
            dispatch(SearchPortalUser({}))
        }
        fetchData()

    }, [])
    const handleRowClick = (groupCode: any) => {
        setSearchParams({ groupCode: groupCode });

    };
    const getQuery = searchParams.get("groupCode")

    return (
        <>
            {getQuery ? <LienHeDetail></LienHeDetail> :
                <div className="containerLienHe commonBackgroundTrongDong">
                    <div>
                        <div className='titleText'>
                            THÔNG TIN LIÊN HỆ BỘ PHẬN MỘT CỬA VÀ SỐ ĐIỆN THOẠI CỦA UBND CẤP HUYỆN, UBND CẤP XÃ
                        </div>
                        <div className='expandText' style={{textAlign: 'center' }}>
                            <i>
                                (Về việc tiếp nhận phản ánh, kiến nghị, thắc mắc cũng như hỗ trợ, hướng dẫn, giải đáp cho công dân về thực hiện thủ tục hành chính)
                            </i>
                        </div>
                    </div>
                    <div className='wrapper_table'>
                        <table className='table-lienhe'>
                            <thead>
                                <tr>
                                    <th>TT</th>
                                    <th>Bộ phận Một cửa của UBND</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coCauToChucs?.map((item: ICoCauToChuc, index) => (
                                    <tr style={{cursor : 'pointer'}} key={item.id} onClick={() => handleRowClick(item.groupCode)}>
                                        <td>{index + 1}</td>
                                        <td>{item.groupName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>}
        </>

    )

}

export default LienHePage