import React, { useEffect } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import './SidebarHoiDap.scss'
import { AntdSelect } from '@/lib/antd/components';
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud';
import { resetData } from '@/features/cocautochuc/redux/slice';
import { AddHoiDap } from '../redux/action';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { hoiDapApi } from '../services';
const SubmitButton = ({ form }: { form: FormInstance }) => {

    const [submittable, setSubmittable] = React.useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button htmlType="submit" disabled={!submittable}>
            Gửi
        </Button>
    );
};
const { TextArea } = Input;

const FormBlock: React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const { datas: coCauToChucs } = useAppSelector((state) => state.cocautochuc);
    const { data } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(SearchCoCauToChuc({}))
    }, [])

    const onFinish = async () => {
        const formData = form.getFieldsValue();
        try {
            const res = await hoiDapApi.Create({
                ...formData,
                traLoi: '',
                dinhKem: '',
                congKhai: 'ko',
                trangThai: '',
                nguoiTraLoi: '',
                tieuDeTraLoi: '',
                noiDungTraLoi: '',
                ma : '',
                ngayGui: dayjs().format('YYYY-MM-DDTHH:mm:ss')
            });

            // Kiểm tra kết quả từ response ở đây
            if (res.status == 201) {
                toast.success("Đã gửi câu hỏi thành công")
            }
            else {
                toast.error("Có lỗi xảy ra")
            }
            if (data?.token) {
                toast.warning("Vui lòng đăng nhập trước khi gửi câu hỏi")
            }
            handleCancel();
        } catch (error) {
            toast.warning("Vui lòng đăng nhập trước khi gửi câu hỏi")
        }
    }
    const handleCancel = () => {
        form.resetFields();
        dispatch(resetData())

    };
    return (
        <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
            <Form.Item name="hoTen" label="Họ và tên" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="soDienThoai" label="Số điện thoại" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: false }]}>
                <Input />
            </Form.Item>
            <Form.Item name="diaChi" label="Địa chỉ" rules={[{ required: false }]}>
                <Input />
            </Form.Item>
            <Form.Item name="tieuDe" label="Tiêu đề" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="noiDung" label="Nội dung" rules={[{ required: true }]}>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="maDonVi" label="Đơn vị nhận câu hỏi" rules={[{ required: true }]}>
                <AntdSelect generateOptions={{ model: coCauToChucs, label: 'groupName', value: 'id' }} />
            </Form.Item>
            {/* <Form.Item name="ma" label="Mã xác nhận" rules={[{ required: true }]}>
                <Input />
            </Form.Item> */}


            <Form.Item>
                <Space className='d-flex justify-content-center'>
                    <SubmitButton form={form} />
                    <Button htmlType="reset">Hủy</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

function SidebarHoiDap() {
    return (
        <div className='sidebarHoiDap'>
            <div className='sidebarHoiDap_block'>
                <div className='heading'>
                    Gửi câu hỏi
                </div>
                <div className='content'>
                    <div className='notes'>
                        <p className=' text-center'>
                            Vui lòng nhập đầy đủ thông tin trước khi gửi
                        </p>
                        <span>
                            <i>Chú ý: </i>Các mục có dấu (<strong className='text-danger'>*</strong>) là bắt buộc phải nhập!
                        </span>
                    </div>
                    <div className='form-group'>
                        <FormBlock />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SidebarHoiDap;