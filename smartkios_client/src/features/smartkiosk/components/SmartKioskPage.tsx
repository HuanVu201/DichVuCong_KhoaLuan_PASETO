import { Carousel } from 'antd'
import '../scss/Page.scss'
import { Link } from 'react-router-dom';
import { ClockCircleOutlined, DollarCircleOutlined, FileSearchOutlined, LikeOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/lib/redux/Hooks';
import { toast } from 'react-toastify';


const dataBanner = [
    {
        banner: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/Folder_Banner/2023/9/snapedit_1695885413493_28141659963.png'
    },
    {
        banner: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/Folder_Banner/2023/9/snapedit_1695885470519_28141809401.png'
    },
    {
        banner: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/Folder_Banner/2023/9/snapedit_1695889145705_28151920449.png'
    }
]

const data = [
    {

        title: 'THỦ TỤC HÀNH CHÍNH',
        subTitle: 'Tra cứu thông tin thủ tục, giấy tờ, quy trình thực hiện',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/thuthuchanhchinh.png',
        path: '/smartkiosk/thu-thuc-hanh-chinh'

    },
    {
        title: 'ĐĂNG KÍ DỊCH VỤ CÔNG',
        subTitle: 'Tra cứu các dịch vụ công một phần, toàn phần có thể nộp hồ sơ trực tuyến',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/dangkydichvucong.png',
        path: '/smartkiosk/dang-ki-dich-vu-cong'


    },
    {
        title: 'LẤY SỐ HÀNG ĐỢI',
        subTitle: 'Tra cứu cửa tiếp nhận hồ sơ, lấy số thứ tự làm thủ tục',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/huongdan_hotro.png',
        path: '/smartkiosk/lay-so-hang-doi'


    },
    {
        title: 'TRA CỨU HỒ SƠ',
        subTitle: 'Tra cứu thông tin các hồ sơ đã nộp',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/tracuuhoso.png',
        path: '/smartkiosk/tra-cuu-ho-so'


    },
    {
        title: 'THANH TOÁN DỊCH VỤ CÔNG',
        subTitle: 'Thanh toán chi phí thực hiện dịch vụ',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/thanhtoandvc.png',
        path: '/smartkiosk/thanh-toan-dich-vu-cong'


    },
    {
        title: 'ĐÁNH GIÁ HÀI LÒNG',
        subTitle: 'Mức độ hài lòng khi thực hiện thủ tục tại cơ quan hành chính',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/dghl.png',
        path: '/smartkiosk/danh-gia-hai-long'


    },

]

const renderIcon = (title: string) => {
    switch (title) {
        case 'THỦ TỤC HÀNH CHÍNH':
            return <SmileOutlined />;
        case 'ĐĂNG KÍ DỊCH VỤ CÔNG':
            return <UserOutlined />;
        case 'LẤY SỐ HÀNG ĐỢI':
            return <ClockCircleOutlined />;
        case 'TRA CỨU HỒ SƠ':
            return <FileSearchOutlined />;
        case 'THANH TOÁN DỊCH VỤ CÔNG':
            return <DollarCircleOutlined />;
        case 'ĐÁNH GIÁ HÀI LÒNG':
            return <LikeOutlined />;
        default:
            return null;
    }
};

const getColorStyles = (title: string) => {
    switch (title) {
        case 'THỦ TỤC HÀNH CHÍNH':
            return {
                backgroundColor: '#0066b3',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#fff'

            };
        case 'ĐĂNG KÍ DỊCH VỤ CÔNG':
            return {
                backgroundColor: '#f36f21',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#fff'

            };
        case 'LẤY SỐ HÀNG ĐỢI':
            return {
                backgroundColor: '#0db14b',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#fff'

            };
        case 'TRA CỨU HỒ SƠ':
            return {
                backgroundColor: 'rgb(241 203 30)',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#fff'

            };
        case 'THANH TOÁN DỊCH VỤ CÔNG':
            return {
                backgroundColor: 'rgb(241 30 30)',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#fff'

            };
        case 'ĐÁNH GIÁ HÀI LÒNG':
            return {
                backgroundColor: 'rgb(100 25 171)',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#fff'

            };
        default:
            return {
                backgroundColor: 'rgba(255,255,255,.2)',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#00204d!important'
            };
    }
};



export const SmartKioskPage = () => {
    const handleMenuItemClick = (item: any) => {
        if (token) {
            // If token exists, navigate to the destination link
            window.location.href = item.path;
        } else {
            // If token doesn't exist, show toast message
            toast.warning('Bạn cần đăng nhập để thực hiện hành động này');
        }
    }
    const { data: token, } = useAppSelector(state => state.auth)

    return (
        <div className="container home-page-menu mt-content d-flex flex-column mt-content mt-5">
            {/* Slider */}
            {/* <div className='mb-5'>
                <Carousel >
                    {dataBanner.map((item, index) => (
                        <div key={index}>
                            <img src={item.banner} style={contentStyle}></img>
                        </div>
                    ))}
                </Carousel>
            </div> */}

            {/*  */}
            <div className='gap-2 d-flex flex-row align-self-stretch justify-content-between flex-wrap mt-3'>
                {data.map((item, index) => (
                    <div key={index} className='d-flex flex-column justify-content-center align-items-center menu mb-4' style={getColorStyles(item.title)}>
                        <div className='d-flex flex-column justify-content-center gap-3 align-items-center box-menu bg-cl-og sub-menu'>

                            <div className='menu-image' style={{ fontSize: '39px' }}>
                                {renderIcon(item.title)}
                            </div>
                            <div className='menu-title' onClick={() => handleMenuItemClick(item)} >
                                <div style={{ textDecoration: 'none', color: 'inherit',cursor : 'pointer' }}>{item.title}</div>
                            </div>
                            <div  className='menu-subTitle'>{item.subTitle}</div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}