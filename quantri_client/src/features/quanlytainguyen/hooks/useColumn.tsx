import { ColumnsType } from "antd/es/table"
import { IQuanLyTaiNguyen, ISearchQuanLyTaiNguyen } from "../models"
import { useEffect, useMemo, useState } from "react"
import { Popconfirm, Spin, Tag } from "antd"
import { DeleteOutlined, DownloadOutlined, EditOutlined, LinkOutlined, LoadingOutlined } from "@ant-design/icons"
import { useQuanLyTaiNguyenContext } from "../contexts/QuanLyTaiNguyenProvider"
import dayjs from 'dayjs'
import { FORMAT_DATE, FORMAT_DATE_WITHOUT_TIME, ID_SEPARATE } from "@/data"
import { callApiAndDisplayFile } from "@/utils"
import { AntdSpace } from "@/lib/antd/components"
import { DownloadAndSaveFile, getFileSize } from "@/utils/common"
import { useAppSelector } from "@/lib/redux/Hooks"
import axios from "axios"


export const useColumn = ({ searchParams, readOnlyMode }: { searchParams: ISearchQuanLyTaiNguyen; readOnlyMode?: boolean }) => {
    const QuanLyTaiNguyenContext = useQuanLyTaiNguyenContext()
    const { data: user } = useAppSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    const columns = useMemo((): ColumnsType<IQuanLyTaiNguyen> => {
       

        const column: ColumnsType<IQuanLyTaiNguyen> = [
            {
                title: "STT",
                key: 'STT',
                width:"5%",
                render: (_, record, idx) => {
                  const pageNumber = searchParams.pageNumber ?? 1
                  const pageSize = searchParams.pageSize ?? 10
                  return <>{(pageNumber - 1) * pageSize + idx + 1}</>
                },
            },

            {
                title: <p style={{ textAlign: 'center' }}>Tên tài nguyên</p>,
                key: "ten",
                dataIndex: "ten",
            },

            {
                title: <p style={{ textAlign: 'center' }}>Loại tài nguyên</p>,
                key: "public",
                render: (_, record) => {
                    return <Tag color={record.public ? "cyan-inverse" : "orange-inverse"}>{record.public ? "Hệ thống" : "Cá nhân"}</Tag>
                },
                align: 'center'
            },
            {
                title: <p style={{ textAlign: 'center' }}>Mô tả</p>,
                key: "mota",
                dataIndex: "mota",
            },
            {
                title: <p style={{ textAlign: 'center' }}>Kích thước tệp</p>,
                key: "kichThuocTep",
                render: (_, record) => {

                    if (record.kichThuocTep) {
                        const fileSizeMB = record.kichThuocTep / (1024 * 1024); // Chuyển đổi từ KB sang MB
                        return `${fileSizeMB.toFixed(2)} MB`;
                    } else {
                        return 'Loading...';
                    }
                },
                align: "center"
            },
            {
                title: <p style={{ textAlign: 'center' }}>Đính kèm</p>,
                key: "dinhKem",
                dataIndex: "dinhKem",
                render: (_, record) => {
                    if (!record.dinhKem) {
                        return <></>
                    }
                    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" onClick={async () => {
                                setLoading(true)
                                await callApiAndDisplayFile(dinhKem)
                                setLoading(false)
                            }
                            }
                                key={idx}>
                                {loading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> :
                                    <LinkOutlined role='button' title={dinhKem.substring(dinhKem.lastIndexOf("/") + 1)} />

                                }
                            </AntdSpace>
                        )}
                        {record.dinhKem?.split(ID_SEPARATE).map((dinhKem, idx) =>
                            <AntdSpace direction="horizontal" key={idx}>
                                {loading ? <Spin indicator={<LoadingOutlined spin />} size="small" />
                                    :
                                    <DownloadOutlined
                                        style={{ color: "darkorchid" }} title="Tải về" onClick={async () => {
                                            setLoading(true)
                                            await DownloadAndSaveFile(dinhKem)
                                            setLoading(false)
                                        }} />}
                            </AntdSpace>
                        )}
                    </div>
                }
            },
            {
                title: "Thao tác",
                dataIndex: '',
                width: "10%",
                align: 'center',
                key: 'thaoTac',
                render: (_, record) => (
                    <AntdSpace direction="horizontal">

                        {!(record.createdBy?.toLocaleLowerCase() == user?.id.toLocaleLowerCase()) ? null : <EditOutlined style={{ color: "cornflowerblue" }} title="Xem chi tiết/Sửa" onClick={() => {

                            QuanLyTaiNguyenContext.setQuanLyTaiNguyenId(record.id)
                            QuanLyTaiNguyenContext.setQuanLyTaiNguyenModalVisible(true)
                        }} />}

                        {!(record.createdBy?.toLocaleLowerCase() == user?.id.toLocaleLowerCase()) ? null : <Popconfirm
                            title='Xoá?'
                            onConfirm={async () => {
                                await QuanLyTaiNguyenContext.onDelete(record.id, searchParams)
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} />
                        </Popconfirm>}
                    </AntdSpace>
                )
            }
        ]
        if (readOnlyMode)
            return column.filter(x => x.key != "thaoTac")
        return column
    }, [loading])

    return columns;
}