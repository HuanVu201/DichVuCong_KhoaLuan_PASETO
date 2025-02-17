import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Input, Popconfirm, Space, Tag } from 'antd'
import { DeliveredProcedureOutlined, ImportOutlined, LinkOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { AntdButton, AntdSpace, UploadTable } from '@/lib/antd/components'
import { FormInstance } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { useTiepNhanHoSoContext } from '@/pages/dvc/tiepnhanhoso/tructiep/contexts/TiepNhanHoSoContext'
import { TRANGTHAISOHOA, TRANGTHAISOHOA_VALUE } from '@/features/hoso/data/formData'
import { IThanhPhanThuTucWithSoHoa } from '@/features/hoso/components/ReadOnlyTepDinhKem'
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable'
import { TrangThaiSoHoaTag } from '@/components/common'
import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'
import { useAppSelector } from '@/lib/redux/Hooks'
import { callApiAndDisplayFile, getFileName } from '@/utils'
import { ID_SEPARATE } from '@/data'
// import { ScanWrapper } from '@/lib/antd/components/upload/ScanMobile'
import { useLocation } from 'react-router-dom'
import { Service } from '@/services'
import { lazy } from '@/utils/lazyLoading'

const ScanWrapper = lazy(() => import("../../../../lib/antd/components/upload/ScanMobile"))


export const useTepDinhKemColumn = ({ dataSource, setDataSource, form }: {
    dataSource: IThanhPhanThuTucWithSoHoa[], setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanThuTucWithSoHoa[]>>,
    form: FormInstance<IHoSo>
}) => {
    const tiepNhanHoSoContext = useTiepNhanHoSoContext()
    const [_, startTransition] = useTransition();
    const location = useLocation()
    const isMobileUrl = location.pathname == Service.primaryRoutes.mobile.nopHoSoTrucTuyen
    const {isMobile, isTablet, isWindow} = useWindowSizeChange()
    const {onChangeDinhKemTable} = useUploadTable<IThanhPhanThuTucWithSoHoa>({folderName: "NopHoSoTrucTuyen", setDataSource, colDinhKemName: "dinhKem", rowNumber: -1})


    const onChonTuKhoSoHoa = (index: number, maKetQua: string) => {
        tiepNhanHoSoContext.setKhoSoHoaData({
            onOk: (dinhKem: string, maGiayToKhoQuocGia: string) => {
                // onChangeDinhKem(dinhKem, index, "dinhKem")
                onChangeDinhKemTable(dinhKem, undefined, "replace", index)
                onRowChange(maGiayToKhoQuocGia, index, "maGiayToKhoQuocGia")
                if(dinhKem){
                    onRowChange(TRANGTHAISOHOA["Tái sử dụng"], index, "trangThaiSoHoa")
                }
                // onRowChange(dinhKem, index, "fileSoHoa")
            }
        })
        form.setFieldValue("currentSelectedMaKetQuaTPTT", maKetQua)
        tiepNhanHoSoContext.setDanhSachGiayToSoHoaModalVisible(true)
    }

    const onRowChange = useCallback((value: any, index: number, colName: keyof IThanhPhanThuTucWithSoHoa) => {
        startTransition(() => {
            setDataSource((curr) => {
                const newDataSource = [...curr];
                return newDataSource.map((item, idx) => {
                    if (idx === index) {
                        return { ...item, [colName]: value }
                    }
                    return item
                })
            })
        })
    }, [])

    const columns = useMemo((): ColumnsType<IThanhPhanThuTucWithSoHoa> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "ten",
                width:"50%",
                dataIndex: "ten",
                render: (_, record, idx) => {
                    const disabled = "disabled" in record ? record.disabled as boolean : false
                    return <Input.TextArea title={record.ten} rows={4} defaultValue={record.ten} disabled={disabled} autoSize onChange={(e) => onRowChange(e.target.value, idx, "ten")}/>
                }
            },
            {
                title: "Đính kèm",
                key: "dinhKem",
                width:"20%",

                render: (_, record, idx) => {
                    let hideKySoWith =  undefined
                    if(record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng từ kết quả hồ sơ khác"] || record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng"]){
                        hideKySoWith = <TrangThaiSoHoaTag trangThai={record.trangThaiSoHoa}/>
                    }
                    if(!record.dinhKem){
                        hideKySoWith = undefined
                    }
                    return <UploadTable 
                        kySoToken
                        kySoNEAC
                        hideKySoWith={hideKySoWith}
                        onCleanSoHoa={() => {
                            if (record.trangThaiSoHoa != TRANGTHAISOHOA["Chưa số hóa"]) {
                                onRowChange(TRANGTHAISOHOA["Chưa số hóa"], idx, "trangThaiSoHoa")
                            }
                        }}
                        dataSource={dataSource} 
                        setDataSource={setDataSource} 
                        folderName={"NopHoSoTrucTuyen"}
                        colDinhKemName="dinhKem"
                        rowNumber={idx}
                        dinhKem={record.dinhKem}
                        scanPC={isWindow}
                        extraElement={(loading) => (<>
                            <AntdButton loading={loading} key={1} icon={<ImportOutlined />} onClick={() => onChonTuKhoSoHoa(idx, record.ma)}>Chọn từ kho số hóa</AntdButton>
                            {!isWindow ? <ScanWrapper onSuccess={(fileName) => {
                                onChangeDinhKemTable(fileName, undefined, "add", idx)
                            }}/> : null}
                        </>)}
                        onRemoveFile={(file: string) => {
                            const removeFiles: string[] = form.getFieldValue("removeFiles")
                            console.log(removeFiles, file);
                            form.setFieldValue("removeFiles", [...removeFiles, file])
                        }}
                />
                }
            },
            {
                title: "Mẫu đính kèm",
                key: "mauDinhKem",
                render: (_, record) => {
                    const mauDinhKem = (record as any)?.mauDinhKem
                    return <>
                    {mauDinhKem && mauDinhKem?.split(ID_SEPARATE).map((dinhKem: string, idx: number) => {
                        const isAbsolutePath = dinhKem.trimStart().startsWith("http://") || dinhKem.trimStart().startsWith("https://")
                        return <AntdSpace direction="vertical" onClick={() => {
                            if(isAbsolutePath){
                                window.open(dinhKem, '_blank'); 
                            } else {
                                callApiAndDisplayFile(dinhKem)
                            }
                           }} key={idx}>
                                <AntdSpace direction="horizontal" role="button" onClick={() => {
                                    if(isAbsolutePath){
                                        window.open(dinhKem, '_blank'); 
                                    } else {
                                        callApiAndDisplayFile(dinhKem)
                                    }
                                }}>
                                    <LinkOutlined />
                                    {isAbsolutePath ? null : <>{getFileName(dinhKem)}</>}
                                </AntdSpace>
                            </AntdSpace>
                    }
                    ) || ""}
                    </>
                }
            },
            {
                title: "Thao tác",
                width: "10%",
                align: 'center',
                key: 'thaotac',
                render: (_, record, idx) => (
                    <Space direction="horizontal">
                        {record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"] ? <Tag color="geekblue">{TRANGTHAISOHOA_VALUE[record.trangThaiSoHoa]}</Tag> : null }
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                setDataSource((curr) => curr.filter(x => x.id !== record.id))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} title='Xóa dòng' onClick={() => { }} />
                        </Popconfirm>
                    </Space>
                )
            },
        ]
    }, [dataSource, form, isMobile, isWindow])
    const mobileColumns = useMemo((): ColumnsType<IThanhPhanThuTucWithSoHoa> => {
        return [
            {
                title: "Tên giấy tờ/ Đính kèm",
                key: "ten",
                width:"50%",
                dataIndex: "ten",
                render: (_, record, idx) => {
                    const disabled = "disabled" in record ? record.disabled as boolean : false
                    let hideKySoWith =  undefined
                    if(record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng từ kết quả hồ sơ khác"] || record.trangThaiSoHoa == TRANGTHAISOHOA["Tái sử dụng"]){
                        hideKySoWith = <TrangThaiSoHoaTag trangThai={record.trangThaiSoHoa}/>
                    }
                    if(!record.dinhKem){
                        hideKySoWith = undefined
                    }
                    return <AntdSpace direction="vertical" style={{width:"100%"}}>
                        <Input.TextArea  title={record.ten} rows={4} defaultValue={record.ten} disabled={disabled} onChange={(e) => onRowChange(e.target.value, idx, "ten")}/>
                        <UploadTable 
                            kySoToken
                            kySoNEAC
                            hideKySoWith={hideKySoWith}
                            onCleanSoHoa={() => {
                                if (record.trangThaiSoHoa != TRANGTHAISOHOA["Chưa số hóa"]) {
                                    onRowChange(TRANGTHAISOHOA["Chưa số hóa"], idx, "trangThaiSoHoa")
                                }
                            }}
                            dataSource={dataSource} 
                            setDataSource={setDataSource} 
                            folderName={"NopHoSoTrucTuyen"}
                            colDinhKemName="dinhKem"
                            rowNumber={idx}
                            dinhKem={record.dinhKem}
                            extraElement={(loading) => (<>
                                <AntdButton loading={loading} key={1} icon={<ImportOutlined />} onClick={() => onChonTuKhoSoHoa(idx, record.ma)}>Chọn từ kho số hóa</AntdButton>
                                <ScanWrapper  onSuccess={(fileName) => {
                                    onChangeDinhKemTable(fileName, undefined, "add", idx)
                                }}/>
                            </>)}
                            onRemoveFile={(file: string) => {
                                const removeFiles: string[] = form.getFieldValue("removeFiles")
                                form.setFieldValue("removeFiles", [...removeFiles, file])
                            }}
                        />
                    </AntdSpace>
                }
            },
            {
                title: "Thao tác",
                width: "10%",
                align: 'center',
                key: 'thaotac',
                render: (_, record, idx) => (
                    <Space direction="horizontal">
                        {record.trangThaiSoHoa !== TRANGTHAISOHOA["Chưa số hóa"] ? <Tag color="geekblue">{TRANGTHAISOHOA_VALUE[record.trangThaiSoHoa]}</Tag> : null }
                        <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                setDataSource((curr) => curr.filter(x => x.id !== record.id))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} title='Xóa dòng' onClick={() => { }} />
                        </Popconfirm>
                    </Space>
                )
            },
        ]
    }, [dataSource, isMobile, isTablet, form])
    if(isMobileUrl){
        return mobileColumns
    } 
    return isWindow ? columns : mobileColumns
}