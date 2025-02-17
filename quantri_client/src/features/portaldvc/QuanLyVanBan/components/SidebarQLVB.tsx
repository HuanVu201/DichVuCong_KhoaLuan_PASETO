import { SearchQuanLyVanBan } from "@/features/portaldvc_admin/QuanLyVanBan/redux/action";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarQLVB = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [loaiVB, setLoaiVb] = useState<string>('tinh')

    useEffect(() => {
        dispatch(SearchQuanLyVanBan({ congKhai: true, loaiVanBan: loaiVB }))
        navigate({
            pathname: location.pathname,
            search: `key=${loaiVB}`,
        });

        document.querySelectorAll('.text-content').forEach(function(e:any){
            e.style.backgroundColor = 'unset'
        })
        document.querySelectorAll(`#${loaiVB}`).forEach(function(e:any){
            e.style.backgroundColor = '#fcf7e1'
        })
        
    }, [loaiVB])

    return (
        <>
            <div className="mt-2 wrapper-left">
                <h5 style={{ color: '#ce7a58' }}>LOẠI VĂN BẢN</h5>

                <div className="selectItemBlock">
                    <div className="text-content" id="tinh"
                        onClick={() => setLoaiVb('tinh')}
                    >
                        <div>Quyết định TTHC Cấp Tỉnh</div>
                    </div>
                    <div className="text-content" id="huyen"
                        onClick={() => setLoaiVb('huyen')}
                    >
                        <div>Quyết định TTHC Cấp Huyện</div>
                    </div>
                    <div className="text-content" id="xa"
                        onClick={() => setLoaiVb('xa')}
                    >
                        <div>Quyết định TTHC Cấp Xã</div>
                    </div>
                    <div className="text-content" id="lien-thong"
                        onClick={() => setLoaiVb('lien-thong')}
                    >
                        <div>Quyết định TTHC Liên thông</div>
                    </div>

                </div>
            </div>
        </>

    )
}