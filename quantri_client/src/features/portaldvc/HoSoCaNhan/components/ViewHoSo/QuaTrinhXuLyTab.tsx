import { FORMAT_DATE } from '@/data'
import { SearchQuaTrinhXuLyHoSo } from '@/features/quatrinhxulyhoso/redux/action'
import { AntdSpace } from '@/lib/antd/components'
import { RegularUpload } from '@/lib/antd/components/upload/RegularUpload'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { Form, Tag, Timeline, TimelineProps, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import React, { useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

function QuaTrinhXuLyTab() {
    const dispatch = useAppDispatch()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const [form] = Form.useForm()
    const { datas: quaTrinhXuLyHoSos } = useAppSelector(state => state.quatrinhxulyhoso)

    const columns: ColumnsType<{ dinhKem: string; noiDung: string; ellipsis: boolean, key: string }> = [{
        dataIndex: "dinhKem",
        key: "dinhKem",
        ellipsis: true,
        render: (_: any, record: any) => {
            return <RegularUpload fieldName={""} folderName={""} form={form} dinhKem={record.dinhKem} hideUpload={true} />
        }
    }, {
        dataIndex: "noiDung",
        key: "noiDung",
        render: (_: any, record: any) => {
            return <Typography.Paragraph ellipsis={record.ellipsis ? { rows: 2, expandable: true, symbol: "Xem thêm" } : false}>{record.noiDung}</Typography.Paragraph>
        }
    }]
    useEffect(() => {
        if (hoSo?.id) {
            dispatch(SearchQuaTrinhXuLyHoSo({ maHoSo: hoSo.maHoSo, pageSize: 50 }))
        }
    }, [hoSo?.id])
    const items = useMemo((): TimelineProps["items"] => {
        return quaTrinhXuLyHoSos?.map(quaTrinh => {
            const isExpired = dayjs(quaTrinh.ngayHetHanBuocXuLy).isBefore(dayjs(quaTrinh.thoiGian))
            return {
                color: isExpired ? "red" : "green",
                // dot: isExpired ? <ClockCircleOutlined style={{ fontSize: '16px' }} /> : null,
                label: <AntdSpace direction="vertical">
                    <span>Thời gian xử lý: <strong>{dayjs(quaTrinh.thoiGian).format(FORMAT_DATE)}</strong></span>
                    {quaTrinh.ngayHetHanBuocXuLy ? <span>Thời gian hết hạn xử lý: <strong>{dayjs(quaTrinh.ngayHetHanBuocXuLy).format(FORMAT_DATE)}</strong></span> : null}
                    {quaTrinh.ngayHetHanBuocXuLy ? <Tag color={isExpired ? "red" : "green"}>{isExpired ? "Quá hạn xử lý" : "Đúng hạn"}</Tag> : null}

                </AntdSpace>,
                children: <AntdSpace direction="vertical">
                    {quaTrinh.tenNguoiGui ? <span style={{ fontWeight: "bold" }}>Người xử lý: {quaTrinh.tenNguoiGui}</span> : null}

                    {quaTrinh.noiDung ? <Table
                        showHeader={false}
                        pagination={false}
                        dataSource={[{ noiDung: quaTrinh.noiDung, dinhKem: undefined as any, ellipsis: true, key: "123" }]}
                        columns={columns}
                        rowKey={"key"}
                    /> : undefined
                    }
                    {quaTrinh.tenNguoiNhan ? <span style={{ fontWeight: "bold" }}>Người nhận: {quaTrinh.tenNguoiNhan}</span> : null}
                    <Tag color="cyan">{quaTrinh.thaoTac}</Tag>
                </AntdSpace>
            }
        })
    }, [quaTrinhXuLyHoSos])
    return <Timeline items={items} mode="left" style={{ marginTop: 20 }} />
}

export default QuaTrinhXuLyTab

