import "./DetailThanhToan.scss"

function DetailThanhToan() {
    return (
        <div className="thanhToanBlock">
            <div className="header">
                <h3>THÔNG TIN THANH TOÁN</h3>
            </div>
            <div className="bodyThanhToan table-responsive">
                <div className="form-group">
                    <label className="title" htmlFor="">Mã hồ sơ</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Chủ hồ sơ</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Người nộp</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Số điện thoại chủ hồ sơ</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Email chủ hồ sơ</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Đơn vị yêu cầu thanh toán</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Nội dung yêu cầu thanh toán</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Số tiền (VNĐ)</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Số tiền bằng chữ</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Ghi chú</label>
                    <input className="data form-control" type="text" value={"a"} disabled />
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Loại thẻ nội địa hoặc quốc tế</label>
                    <select className="data form-select">
                        <option className="optionSelect" value='all_card' selected>Tất cả ngân hàng</option>
                        <option className="optionSelect" value='international_card' >Thẻ quốc tế</option>
                        <option className="optionSelect" value='domestic_card' >Thẻ nội địa</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Chọn hình thức thanh toán</label>
                    <select className="data form-select">
                        <option className="optionSelect" value='DVCQG' selected>Cổng DVC quốc gia</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="title" htmlFor="">Người thanh toán</label>
                    <select className="data form-select">
                        <option className="optionSelect" value='NguoiNop' selected>Người nộp hồ sơ</option>
                        <option className="optionSelect" value='ChuHoSo' >Chủ hồ sơ</option>
                    </select>
                </div>
                <input className="btn btnThanhToan" type="submit" value="Thanh toán" />
            </div>
        </div>
    );
}

export default DetailThanhToan;