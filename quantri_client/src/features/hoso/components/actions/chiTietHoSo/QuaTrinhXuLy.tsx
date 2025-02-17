import { SearchQuaTrinhXuLyHoSo } from "@/features/quatrinhxulyhoso/redux/action"
import { AntdSpace } from "@/lib/antd/components"
import { useMenu } from "@/lib/antd/components/menu/hooks/useMenu"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { Button, Form, Table, Tag, Timeline, TimelineProps, Typography } from "antd"
import React, { useEffect, useMemo, useState } from "react"
import dayjs from 'dayjs'
import { ClockCircleOutlined, DownloadOutlined } from "@ant-design/icons"
import { RegularUpload } from "@/lib/antd/components/upload/RegularUpload"
import { ColumnsType } from "antd/es/table"
import { FORMAT_DATE, ID_SEPARATE } from "@/data"
import { IQuaTrinhXuLyHoSo } from "@/features/quatrinhxulyhoso/models"
import { useButtonActionContext } from "@/features/hoso/contexts/ButtonActionsContext"


export const QuaTrinhXuLy = () => {
    const dispatch = useAppDispatch()
    const { data: hoSo } = useAppSelector(state => state.hoso)
    const [form] = Form.useForm()
    const { datas: quaTrinhXuLyHoSos } = useAppSelector(state => state.quatrinhxulyhoso)
    const buttonActionContext = useButtonActionContext()
    const XuatQuaTrinhXuLy = () => {
        buttonActionContext.setXuatQuaTrinhXuLyHoSoModalVisible(true)
    }
    const quaTrinhXuLyByGroup = useMemo(() => {
        let donVi: string | null = null

        const newQuaTrinhXuLyHoSos: (IQuaTrinhXuLyHoSo & { dot?: React.ReactNode })[] = []
        quaTrinhXuLyHoSos?.forEach((qtxl, index) => {
            if (qtxl.officeCode == null) {
                newQuaTrinhXuLyHoSos.push(qtxl)
            } else {
                if (qtxl.officeCode == donVi) {
                    newQuaTrinhXuLyHoSos.push(qtxl)
                } else {
                    newQuaTrinhXuLyHoSos.push({ ...qtxl, dot: <div>{qtxl.officeName}</div> })
                    newQuaTrinhXuLyHoSos.push({ ...qtxl })
                    donVi = qtxl.officeCode
                }
            }
        })
        return newQuaTrinhXuLyHoSos
    }, [quaTrinhXuLyHoSos])

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
        return quaTrinhXuLyByGroup?.map(quaTrinh => {
            if (quaTrinh.dot) {
                return {
                    dot: quaTrinh.dot
                }
            }
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
                    {quaTrinh.tenNguoiGui ? <span style={{ fontWeight: "bold" }}>Người xử lý: {quaTrinh.tenNguoiGui} </span> : null}

                    {quaTrinh.dinhKem || quaTrinh.noiDung ? <Table
                        showHeader={false}
                        pagination={false}
                        dataSource={[{ noiDung: quaTrinh.noiDung, dinhKem: quaTrinh.dinhKem, ellipsis: true, key: "123" }]}
                        columns={columns}
                        rowKey={"key"}
                    /> : undefined
                    }
                    {quaTrinh.tenNguoiNhan ? <span style={{ fontWeight: "bold" }}>Người nhận: {quaTrinh.tenNguoiNhan}</span> : null}
                    <Tag color="cyan">{quaTrinh.thaoTac}</Tag>
                </AntdSpace>,
                dot: quaTrinh.dot
            }
        })
    }, [quaTrinhXuLyHoSos])
    return (
        <>
        <div>
            <Button className="buttonDownload" htmlType="submit"
                disabled={false}
                onClick={async () => XuatQuaTrinhXuLy()}
                //   loading={btnLoading}
                style={{
                    color: '#fff', display: 'flex', alignItems: 'center',
                    backgroundColor: '#3eaa4f',  padding: '0px 5px', margin: 'auto',
                    position: 'relative', left: '25%'
                }}
            >
                <DownloadOutlined /> Xuất thông tin quá trình xử lý
            </Button>
        </div>
            <Timeline items={items} mode="left" style={{ marginTop: 20 }} />
        </>)
}