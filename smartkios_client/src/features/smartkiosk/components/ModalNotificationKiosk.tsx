import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components"

export const ModalNotificationKisok = () => {
    return (
        <AntdModal
            width={500}
            style={{ display: 'flex', justifyContent: 'center' }}
            title=""
            visible={true}
            footer={null}
        >
            <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Arial, sans-serif' ,fontSize: '16px', fontWeight: '700', color: '#333', lineHeight: '1.5' }}>
                    Vui lòng cho thẻ CCCD vào trong thiết bị để đăng nhập
                </p>
                <div style={{ marginTop: '20px' }}>
                    <AntdButton type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                        Xác nhận
                    </AntdButton>
                    <AntdButton type="default">
                        Đóng
                    </AntdButton>
                </div>
            </div>
        </AntdModal>
    )
}