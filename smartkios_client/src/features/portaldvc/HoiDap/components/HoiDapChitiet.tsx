import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import SidebarHoiDap from "./SidebarHoiDap"
import { useEffect } from "react"
import { GetHoiDap } from "../redux/action"
import { useParams } from "react-router-dom"
import './HoiDapContainer.scss'
import 'bootstrap/dist/css/bootstrap.css';
import dayjs from 'dayjs';
import { Button, Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { AntdButton, AntdSelect } from "@/lib/antd/components"
import { IHoiDap } from "../models"
import { QuestionCircleOutlined, WechatOutlined } from "@ant-design/icons"
import { FORMAT_DATE_WITHOUT_TIME } from "@/data"
import { useNavigate } from 'react-router-dom';

const HoiDapChiTiet = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm<IHoiDap>()
    const dispatch = useAppDispatch()
    const { data: hoidap } = useAppSelector(state => state.hoidap)
    let { id } = useParams();
    useEffect(() => {
        if (id) {
            dispatch(GetHoiDap(id))
        }
    }, [id])
    useEffect(() => {
        if (hoidap) {
            form.setFieldsValue({ ...hoidap })
        }
    }, [hoidap])

    return (
        <div className='HoiDapPage_swapper row'>
            <div className='col-sm-4 col-md-3 sidebar'>
                <SidebarHoiDap />
            </div>
            <div className='col-sm-8 col-md-9 '>
                <div >
                    <AntdButton style={{ backgroundColor: '#ce7a58',color : 'white',borderColor : 'white' }} onClick={() => navigate(-1)}>Quay lại</AntdButton>
                </div>
                <div className="container d-flex justify-content-start align-self-center " style={{ width: '100vh', marginTop: '100px' }}  >
                    <div className="imageBlock" style={{ margin: '20px' }}>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05q_vg5Ux_rPqNDBBeYLc1BHrG-qjaw7_tA&usqp=CAU' alt='' />
                    </div>
                    <div>
                        <strong style={{ color: '#ce7a58', fontSize: '15px' }}>{hoidap?.tieuDe}</strong>
                        <div style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '12px', color: '#6A94B6', fontWeight: '700' }}>
                                <i>Người gửi: </i>
                                {hoidap?.hoTen}
                                - <em className='Hoidap-time'>{hoidap?.ngayGui ? dayjs(hoidap.ngayGui).format(FORMAT_DATE_WITHOUT_TIME) : ""}</em>
                            </p>
                        </div>
                        <div style={{ fontWeight: 'bold', margin: '7px 0px' }}><QuestionCircleOutlined /> Nội Dung :</div>
                        <div style={{ marginBottom: '10px' }}>{hoidap?.noiDung}</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '7px' }}><WechatOutlined /> Trả lời :</div>
                        <div>{hoidap?.traLoi}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default HoiDapChiTiet