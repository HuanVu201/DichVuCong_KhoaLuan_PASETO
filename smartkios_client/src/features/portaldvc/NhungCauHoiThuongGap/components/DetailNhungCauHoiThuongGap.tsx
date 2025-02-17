import { GetCauHoiPhoBien } from "@/features/portaldvc_admin/CauHoiPhoBien/redux/action";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { QuestionCircleOutlined, WechatOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../scss/List.scss'
import { AntdButton } from "@/lib/antd/components";

const DetailNhungCauHoiThuongGap = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { data: cauHoiPhoBien } = useAppSelector((state) => state.cauhoiphobien)
    let { id } = useParams();
    useEffect(() => {
        dispatch(GetCauHoiPhoBien(id as any))
    }, [id])

    return (
        <div className="container">
            <div style={{marginLeft : '200px',marginTop : '50px'}}>
                <AntdButton style={{ backgroundColor: '#ce7a58' }} onClick={() => navigate(-1)}>Quay lại</AntdButton>
            </div>
            <div className="container d-flex justify-content-start align-self-center " style={{ width: '100vh', marginTop: '100px' }}  >
                <div className="imageBlock" style={{ margin: '20px' }}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05q_vg5Ux_rPqNDBBeYLc1BHrG-qjaw7_tA&usqp=CAU' alt='' />
                </div>
                <div>
                    <strong style={{ color: '#ce7a58', fontSize: '15px' }}>{cauHoiPhoBien?.tieuDe}</strong>
                    <div style={{ fontWeight: 'bold', margin: '7px 0px' }}><QuestionCircleOutlined /> Nội Dung :</div>
                    <div style={{ marginBottom: '10px' }}>{cauHoiPhoBien?.noiDungCauHoi}</div>
                    <div style={{ fontWeight: 'bold', marginBottom: '7px' }}><WechatOutlined /> Trả lời :</div>
                    <div>{cauHoiPhoBien?.noiDungTraLoi}</div>
                </div>
            </div>
        </div>
    )
}

export default DetailNhungCauHoiThuongGap