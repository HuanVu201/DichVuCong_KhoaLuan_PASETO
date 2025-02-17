

import "./guiPaknDvcTinh.scss"
import { LoadingOutlined, MailOutlined, SendOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAppSelector } from "@/lib/redux/Hooks";
import { parseJwt } from "@/utils/common";
import { IParseUserToken } from "@/models";
import { useEffect, useState } from "react";
import { Button, Divider, notification, Space, Spin } from 'antd';
import { useDispatch } from "react-redux";
import { AddPhanAnhKienNghi } from "./redux/action";


interface IPhanAnhKienNghi {
    userId: string,
    hoTen: string,
    email: string,
    soDienThoai: string,
    diaChi: string,
    tieuDe: string,
    noiDung: string,
    ngayGui: any,
    trangThai: string,
    nguoiTraLoi: string,
    noiDungTraLoi: string,
    congKhai: string
}

const formValidate = (userId: string) => {
    const hoTen: any = document.querySelector('#hoTen')
    const email: any = document.querySelector('#email')
    const soDienThoai: any = document.querySelector('#soDienThoai')
    const diaChi: any = document.querySelector('#diaChi')
    const tieuDe: any = document.querySelector('#tieuDe')
    const noiDung: any = document.querySelector('#noiDung')
    const congKhai: any = document.querySelector('#congKhai')
    if (!userId) {
        toast.error('Vui lòng thực hiện đăng nhập hệ thống để phản ánh kiến nghị!');
        return false;
    }
    if (!hoTen.value) {
        toast.warning('Vui lòng nhập họ tên đầy đủ!');
        hoTen.focus();
        return false;
    }
    if (!email.value) {
        toast.warning('Vui lòng nhập email!');
        email.focus();
        return false;
    }
    else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email.value)) {
            toast.warning('Email không hợp lệ!');
            email.focus();
            return false;
        }
    }
    if (!soDienThoai.value) {
        toast.warning('Vui lòng nhập số điện thoại!');
        soDienThoai.focus();
        return false;
    }
    if (!diaChi.value) {
        toast.warning('Vui lòng nhập địa chỉ!');
        diaChi.focus();
        return false;
    }
    if (!tieuDe.value) {
        toast.warning('Vui lòng nhập tiêu đề phản ánh!');
        tieuDe.focus();
        return false;
    }
    if (!noiDung.value) {
        toast.warning('Vui lòng nhập nội dung phản ánh!');
        noiDung.focus();
        return false;
    }
    if (!congKhai.value) {
        toast.warning('Vui lòng chọn hình thức phản ánh!');
        congKhai.focus();
        return false;
    }

    const getCurrentDate = new Date();
    const currentDate = getCurrentDate.toISOString();


    const resObject: IPhanAnhKienNghi = {
        userId: userId,
        hoTen: hoTen.value,
        email: email.value,
        soDienThoai: soDienThoai.value,
        diaChi: diaChi.value,
        tieuDe: tieuDe.value,
        noiDung: noiDung.value,
        ngayGui: currentDate,
        trangThai: '0',
        nguoiTraLoi: '',
        noiDungTraLoi: '',
        congKhai: congKhai.value
    }


    return resObject;

}
const GuiPaknDvcTinh = () => {
    const dispatch = useDispatch();
    const [userId, setUserId] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { publicModule: config } = useAppSelector(state => state.config)
    let getTinh
    config?.map(item => {
        if (item.code == "ten-don-vi-lowercase") {
            getTinh = item.content
        }
    })

    const { data: auth } = useAppSelector((state) => state.auth);
    let userData: IParseUserToken
    if (auth !== undefined) {
        userData = parseJwt(auth.token)
    }
    useEffect(() => {
        if (!userData)
            toast.error('Vui lòng thực hiện đăng nhập hệ thống để phản ánh kiến nghị!')
        else
            setUserId(userData.uid)
    }, [])

    const requestAction = async () => {
        const response: any = formValidate(userId)
        if (response) {
            setLoading(true)
            setTimeout(async () => {
                const result = await dispatch(AddPhanAnhKienNghi(response) as any)
                if (result.payload == '201') {
                    toast.success("Gửi phản ánh, kiến nghị thành công!")
                    const elements: any = document.querySelectorAll('.form-control');
                    elements.forEach((element: any) => {
                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.value = '';
                        } else if (element.tagName === 'SELECT') {
                            element.selectedIndex = 0;
                        }
                    });
                    setLoading(false)
                }
            }, 2000)
        }
    }

    return (<>
        <div className="guiPakn-container commonBackgroundTrongDong">
            <div className="col-12 chart-1-year pakn-form">
                <div className="pakn_header title-chart-year">
                    TIẾP NHẬN PHẢN ÁNH KIẾN NGHỊ
                </div>
                <div className="pakn_body content-chart-year">
                    <Spin spinning={loading}
                        indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />} >
                        <p className="text-primary text-center">
                            Trung tâm phục vụ Hành chính công tỉnh {getTinh} mong nhận được phản ánh, kiến nghị của tổ chức, công dân về quy định hành chính.
                        </p>
                        <p className="text-center"><i><b>Chú ý: Các mục có dấu (<span style={{ color: 'red' }}>*</span>) là phần bắt buộc phải nhập!</b></i></p>
                        <div className="form-group">
                            <div className="input-group row">
                                <div className="col-3 titleContent">
                                    Tổ chức, công dân <span style={{ color: 'red' }}>*</span>
                                </div>
                                <div className="col-9">
                                    <input type="text" id="hoTen" className="form-control" name='hoTen' placeholder="Nhập họ tên đầy đủ" />
                                </div>
                            </div>
                            <div className="input-group row">
                                <div className="col-3 titleContent">
                                    Thông tin liên hệ <span style={{ color: 'red' }}>*</span>
                                </div>
                                <div className="col-9 row inputThongTinLienHe">
                                    <div className="col-12 col-lg-6">
                                        <input type="text" id="email" className="form-control" name='email' placeholder="Nhập địa chỉ thư điện tử" />
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <input type="text" id="soDienThoai" className="form-control" name='soDienThoai' placeholder="Nhập số điện thoại" />
                                    </div>

                                </div>
                            </div>
                            <div className="input-group row">
                                <div className="col-3 titleContent">
                                    Địa chỉ liên hệ <span style={{ color: 'red' }}>*</span>
                                </div>
                                <div className="col-9">
                                    <input type="text" id="diaChi" className="form-control" name='diaChi' placeholder="Nhập địa chỉ" />
                                </div>
                            </div>
                            <div className="input-group row">
                                <div className="col-3 titleContent">
                                    Phản ánh, kiến nghị về việc <span style={{ color: 'red' }}>*</span>
                                </div>
                                <div className="col-9">
                                    <input type="text" id="tieuDe" className="form-control" name='tieuDe' placeholder="Nhập tiêu đề phản ánh, kiến nghị" />
                                </div>
                            </div>
                            <div className="input-group row">
                                <div className="col-3 titleContent">
                                    Nội dung phản ánh, kiến nghị <span style={{ color: 'red' }}>*</span>
                                </div>
                                <div className="col-9">
                                    <textarea id="noiDung" className="form-control" name='noiDung' rows={4} placeholder="Nhập nội dung phản ánh, kiến nghị. Hệ thống không tiếp nhận đơn thư khiếu nại, tố cáo và hướng dẫn giải đáp pháp luật" />
                                </div>
                            </div>
                            <div className="input-group row">
                                <div className="col-3 titleContent">
                                    Hình thức phản ánh, kiến nghị <span style={{ color: 'red' }}>*</span>
                                </div>
                                <div className="col-9">
                                    <select id="congKhai" className="form-select form-control" aria-label="Default select example" defaultValue={1}>
                                        <option value="1" key={1} selected>Công khai</option>
                                        <option value="0" key={0}>Không công khai</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-center col-12">
                                <Button className="buttonSearchPortal" htmlType="submit" onClick={() => requestAction()}>
                                    <SendOutlined /> Gửi phản ánh, kiến nghị
                                </Button>
                            </div>
                        </div>

                    </Spin>
                </div>
            </div>

        </div>

    </>)
}

export default GuiPaknDvcTinh