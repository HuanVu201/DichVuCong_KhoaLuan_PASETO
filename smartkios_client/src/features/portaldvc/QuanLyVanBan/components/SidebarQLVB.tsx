import { SearchQuanLyVanBan } from "@/features/portaldvc_admin/QuanLyVanBan/redux/action";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarQLVB = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const onClick: MenuProps['onClick'] = ({ key }) => {
        dispatch(SearchQuanLyVanBan({ congKhai: true, loaiVanBan: key }))
        navigate({
            pathname: location.pathname,
            search: `key=${key}`,
        }
        );
    };
    const [open, setOpen] = useState(true)
    const onHandleClick = (e: any) => {
        setOpen(!open)
    };



    const items: MenuProps['items'] = [
        {
            label: 'Quyết định TTHC Cấp Tỉnh',
            key: 'tinh',
        },
        {
            type: 'divider',
        },
        {
            label: 'Quyết định TTHC Cấp Huyện - Xã',
            key: 'huyen-xa',
        },
        {
            type: 'divider',
        },
        {
            label: 'Quyết định TTHC Liên thông',
            key: 'lien-thong',
        },
    ];
    return (
        <div style={{ backgroundColor: '#ce7a58', borderRadius: '3px' }} >
            <Dropdown open={open} menu={{ items, onClick }} trigger={['click']}>
                <a style={{ color: 'white', display: 'flex', justifyContent: 'space-between', fontSize: '15px', padding: '4px 5px', cursor: 'pointer' }} onClick={(e) => e.preventDefault()}>
                    <div style={{ marginLeft: '10px' }}>
                        LOẠI VĂN BẢN
                    </div>
                    <div onClick={onHandleClick} style={{ marginRight: '5px' }}>
                        <DownOutlined />
                    </div>
                </a>
            </Dropdown>
        </div>

    )
}