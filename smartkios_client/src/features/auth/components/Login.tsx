import { Form, Input, Button } from 'antd'
import { ILogin } from '../models'
import { useAppDispatch, useAppSelector } from '../../../lib/redux/Hooks'
import { GetToken } from '../redux/Actions'
import { stat } from 'fs'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { Service } from '@/services'
import { SearchConfig, SearchPublicConfig } from '@/features/config/redux/action'

export const Login = () => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm<ILogin>()
    const { data: auth } = useAppSelector(state => state.auth)
    const { publicModule } = useAppSelector(state => state.config)
    useEffect(() => {
        dispatch(SearchPublicConfig())
    }, [])
    const [tenUngDung, tenDonVi, footerDangNhap, logoDangNhap] = useMemo(() => {
        return [publicModule?.find(x => x.code == 'ten-ung-dung'), publicModule?.find(x => x.code == 'ten-don-vi'), publicModule?.find(x => x.code == 'footer-dang-nhap'), publicModule?.find(x => x.code == 'logo-dang-nhap')]
    }, [publicModule])
    const onFinish = async (formData: ILogin) => {
        await dispatch(GetToken(formData))
    }
    if (auth !== undefined) {
        return <Navigate to={Service.primaryRoutes.redirectUser} />
    }

    return (
        <div style={{ height: '100vh', justifyContent: 'center' }} className='d-flex flex-center flex-column flex-lg-row-fluid'>
            <div className='d-flex justify-content-center mb-3'>
                {logoDangNhap?.content ?
                    <img src={logoDangNhap?.content} style={{ width: '125px', height: '125px' }} alt=""></img>
                    : <></>
                }
            </div>
            <div className='text-center mb-11'>
                <h3 className='text-dark fw-bolder mb-3' style={{ wordBreak: 'break-word', fontSize: '1.5rem' }}>{tenUngDung?.content}</h3>
                <div className='text-gray-500 fw-bold' style={{ wordBreak: 'break-word', fontSize: '1.25rem', color: '#8EAEC3' }}>{tenDonVi?.content}</div>
            </div>
            <div className='d-flex justify-content-center mt-3'>
                <Form style={{ width: 450 }} form={form} name='login' onFinish={onFinish} initialValues={{ email: "", password: "" }}>
                    <label className='form-label fs-6 fw-bolder text-dark'>Tài khoản</label>
                    <Form.Item name="userName" hasFeedback rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}>
                        <Input placeholder='Tài khoản' style={{ minHeight: '38px' }} ></Input>
                    </Form.Item>
                    <label className='form-label fs-6 fw-bolder text-dark'>Mật khẩu</label>
                    <Form.Item name="password" hasFeedback rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                        <Input.Password placeholder='Mật khẩu' style={{ minHeight: '38px' }}></Input.Password>
                    </Form.Item>
                    <Form.Item >
                        <Button htmlType="submit" style={{ width: '-webkit-fill-available', marginTop: '20px', backgroundColor: '#009ef7', minHeight: '38px' }}>
                            <span style={{ color: 'white', fontSize: '15px', fontWeight: '500' }}>Đăng nhập</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='text-center mb-11'>
                <span style={{ color: '#8EAEC3', fontWeight: '500', fontStyle: 'italic' }}>{footerDangNhap?.content}</span>
            </div>
        </div>
    )
}
