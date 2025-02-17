import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FormInstance, Input, Popconfirm, Space, Upload, UploadFile } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { HOST_PATH, ID_SEPARATE } from '@/data'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { AntdUpLoad, UploadTable, getBase64 } from '@/lib/antd/components'
import { ThanhPhanBoSungHoSo } from '../components/actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal'
import { DanhSachDinhKemBoSung } from '../components/DinhKemBoSungHoSo'
import { DeleteOutlined } from '@ant-design/icons'
import { useAppSelector } from '@/lib/redux/Hooks'

export const useDinhKemBoSungHoSoColumn = ({dataSource, setDataSource, maHoSo}: {maHoSo: string | undefined;dataSource: DanhSachDinhKemBoSung[], setDataSource: React.Dispatch<React.SetStateAction<DanhSachDinhKemBoSung[]>>}) => {
    const [_, startTransition] = useTransition();
    const {data: user} = useAppSelector(state => state.user)
    
    const onRowChange = useCallback((value: any, index: number, colName: keyof DanhSachDinhKemBoSung) => {
        startTransition(() => {
            setDataSource((curr) => {
                const newDataSource = [...curr];
                return newDataSource.map((item, idx) => {
                    if (idx === index){
                        return {...item, [colName]: value}
                    }
                    return item
                })
            })
        })
    },[])

    const onChangeDinhKem = useCallback((info: UploadChangeParam<UploadFile<any>>, index: number, colName: keyof DanhSachDinhKemBoSung ) => {
        if (info.file.status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                // formInstance.setFieldValue(fieldName, info.file.response.data)
                startTransition(() => {
                    setDataSource((curr) => {
                        const newDataSource = [...curr];
                        return newDataSource.map((item, idx) => {
                            if (idx === index){
                                return {...item, [colName]: item[colName] ? item[colName] + ID_SEPARATE + info.file.response.data : info.file.response.data}
                            }
                            return item
                        })
                    })
                })
            });
            
        } else if (info.file.status === 'error') {
        }
    }, [])

    const columns = useMemo(() : ColumnsType<DanhSachDinhKemBoSung> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "tenThanhPhan",
                dataIndex: "tenThanhPhan",
                width:"45%",
                render: (_, record, idx) => {
                    return <Input.TextArea rows={4} defaultValue={record.tenThanhPhan} onChange={(e) => onRowChange(e.target.value, idx, "tenThanhPhan")}/>
                }
            },
            {
                title: "Đính kèm hiện tại",
                key: "fileDinhKemCu",
                render: (_, record, idx) => {
                    // const fileList = record.fileDinhKemCu?.split(ID_SEPARATE).map((x) :UploadFile => {
                    //     const fileSegments = x.split("/")
                    //     const fileName = fileSegments[fileSegments.length - 1]
                    //     return {uid: x, name: fileName, url: HOST_PATH + x }
                    // })
                    // return <>
                    //     {<Upload fileList={fileList}></Upload>}
                    // </>
                    return maHoSo ? <UploadTable setDataSource={setDataSource} hideUpload={true} dinhKem={record.fileDinhKemCu} folderName={maHoSo} colDinhKemName={"fileDinhKemCu"} rowNumber={idx} /> : null
                }
            },
            {
                title: "Đính kèm bổ sung",
                key: "fileDinhKemMoi",
                render: (_, record, idx) => {
                    
                    return maHoSo ? <UploadTable  
                            dinhKem={record.fileDinhKemMoi ? record.fileDinhKemMoi : undefined}
                            folderName={maHoSo} 
                            colDinhKemName={"fileDinhKemMoi"} 
                            kySoToken={user?.typeUser == "CanBo"}
                            rowNumber={idx} 
                            dataSource={dataSource} 
                            setDataSource={setDataSource} 
                        /> : null
                }
            },
            {
                title:"Nội dung yêu cầu bổ sung",
                key:"noiDungBoSung",
                render: (_, record, idx) => {
                    return <Input.TextArea disabled rows={2} defaultValue={record.noiDungBoSung}/>
                }
            },
            {
                title: "Thao tác",
                width: "10%",
                align: 'center',
                key: 'thaotac',
                render: (_, record, idx) => (
                    <Space direction="horizontal">
                        {record.laThanhPhanMoi ? <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                setDataSource((curr) => curr.filter(x => x.thanhPhanHoSoId !== record.thanhPhanHoSoId))
                            }}
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <DeleteOutlined style={{ color: "tomato" }} title='Xóa dòng' onClick={() => { }} />
                        </Popconfirm> : null}
                    </Space>
                )
            }
        ]
    }, [dataSource, maHoSo, user])
    return columns
}