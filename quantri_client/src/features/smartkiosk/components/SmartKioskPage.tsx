import { Carousel } from 'antd'
import '../scss/Page.scss'

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '200px',
    objectFit : 'cover',
    backgroundPosition : 'center',
    backgroundRepeat : 'no-repeat',
    backgroundSize : 'cover',
    width : '100%',
    color: '#fff',
};

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

    },
    {
        title: 'ĐĂNG KÝ DỊCH VỤ CÔNG',
        subTitle: 'Tra cứu các dịch vụ công một phần, toàn phần có thể nộp hồ sơ trực tuyến',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/dangkydichvucong.png',

    },
    {
        title: 'LẤY SỐ HÀNG ĐỢI',
        subTitle: 'Tra cứu cửa tiếp nhận hồ sơ, lấy số thứ tự làm thủ tục',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/huongdan_hotro.png'

    },
    {
        title: 'TRA CỨU HỒ SƠ',
        subTitle: 'Tra cứu thông tin các hồ sơ đã nộp',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/tracuuhoso.png'

    },
    {
        title: 'THANH TOÁN DỊCH VỤ CÔNG',
        subTitle: 'Thanh toán chi phí thực hiện dịch vụ',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/thanhtoandvc.png'

    },
    {
        title: 'ĐÁNH GIÁ HÀI LÒNG',
        subTitle: 'Mức độ hài lòng khi thực hiện thủ tục tại cơ quan hành chính',
        image: 'https://hanam-quantri-smartkiosk.fpt.com/Uploads/MenuIcons/2023/9/dghl.png'

    },

]

const getColorStyles = (title: string) => {
    switch (title) {
        case 'THỦ TỤC HÀNH CHÍNH':
            return {
                backgroundColor: '#0066b3',
                border: '2px solid rgba(255,255,255,.5)',
                color: '#fff'

            };
        case 'ĐĂNG KÝ DỊCH VỤ CÔNG':
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
        default:
            return {
                backgroundColor: 'rgba(255,255,255,.2)',
                border: '2px solid rgba(255,255,255,.5)',
                color : '#00204d!important'
            };
    }
};


export const SmartKioskPage = () => {
    return (
        <div className="container home-page-menu mt-content d-flex flex-column mt-content mt-5">
            <div className='d-flex justify-content-between flex-wrap mb-2'>
               
            </div>
            {/* Slider */}
            <div className='mb-5'>
                <Carousel autoplay autoplaySpeed={7000}>
                    {dataBanner.map((item, index) => (
                    <div key={index}>
                        <img src={item.banner} style={contentStyle}></img>
                    </div>
                    ))}
                </Carousel>
            </div>
            {/*  */}
            <div className='gap-2 d-flex flex-row align-self-stretch justify-content-between flex-wrap mt-3'>
                {data.map((item, index) => (
                    <div key={index} className='d-flex flex-column justify-content-center align-items-center menu mb-4' style={getColorStyles(item.title)}>
                        <div className='d-flex flex-column justify-content-center gap-3 align-items-center box-menu bg-cl-og sub-menu'>
                            <div>
                                <img className='menu-image' src={item.image}></img>
                            </div>
                            <div className='menu-title'>{item.title}</div>
                            <div className='menu-subTitle'>{item.subTitle}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}