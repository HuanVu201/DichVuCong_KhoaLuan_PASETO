import './index.scss'
import data from './data.json';

const LienHeCapTinhWrapper = () => {
    return (
        <div className="containerLienHe ">
            <div className='text-title'>
                <strong >DANH SÁCH CÁN BỘ, CÔNG CHỨC TIẾP NHẬN HỒ SƠ THỦ TỤC HÀNH CHÍNH CỦA CÁC SỞ, BAN, NGÀNH CẤP TỈNH</strong>
            </div>
            <div className='wrapper-subtitle '>
                <div style={{ fontWeight: '700' }}>Trung tâm Phục vụ hành chính công tỉnh Thanh Hóa</div>
                <div style={{ margin: '5px 0' }}>Địa chỉ: Số 28, Đại lộ Lê Lợi, phường Điện Biên, Thành phố Thanh Hóa.</div>
                <div>Tổng đài điện thoại: <strong>02373900900</strong>;  Email: tthcc@thanhhoa.gov.vn.</div>
            </div>
            <div className='wrapper-table '>
                <table className='table commonBackgroundTrongDong'>
                    <thead>
                        <tr>
                            <th>TT</th>
                            <th>Họ tên</th>
                            <th>Chức vụ</th>
                            <th>Đơn vị</th>
                            <th>Số máy lẻ Tổng đài</th>
                            <th>Địa chỉ thư điện tử</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.TT}</td>
                                <td>{item.hoTen}</td>
                                <td>{item.chucVu}</td>
                                <td>{item.donVi}</td>
                                <td>{item.soMayLeTongDai}</td>
                                <td>{item.diaChiDienTu}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default LienHeCapTinhWrapper