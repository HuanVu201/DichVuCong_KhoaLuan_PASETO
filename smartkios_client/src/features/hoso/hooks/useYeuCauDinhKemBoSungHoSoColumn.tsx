import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { FormInstance, Input, Upload, UploadFile } from 'antd/lib'
import { IHoSo } from '@/features/hoso/models'
import { HOST_PATH, ID_SEPARATE } from '@/data'
import { RcFile, UploadChangeParam } from 'antd/es/upload'
import { UploadTable, getBase64 } from '@/lib/antd/components'
import { ThanhPhanBoSungHoSo } from '../components/actions/yeuCauMotCuaBoSung/YeuCauMotCuaBoSungModal'
import { useAppSelector } from '@/lib/redux/Hooks'

export const useYeuCauDinhKemBoSungHoSoColumn = ({dataSource, setDataSource}: {dataSource: ThanhPhanBoSungHoSo[], setDataSource: React.Dispatch<React.SetStateAction<ThanhPhanBoSungHoSo[]>>}) => {
    const [_, startTransition] = useTransition();
    const {data: hoSo} = useAppSelector(state => state.hoso) 
    const onRowChange = useCallback((value: any, index: number, colName: keyof ThanhPhanBoSungHoSo) => {
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

    // const onChangeDinhKem = useCallback((info: UploadChangeParam<UploadFile<any>>, index: number, colName: keyof ThanhPhanBoSungHoSo ) => {
    //     if (info.file.status !== 'uploading') {
    //         // console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //         getBase64(info.file.originFileObj as RcFile, (url) => {
    //             // formInstance.setFieldValue(fieldName, info.file.response.data)
    //             startTransition(() => {
    //                 setDataSource((curr) => {
    //                     const newDataSource = [...curr];
    //                     return newDataSource.map((item, idx) => {
    //                         if (idx === index){
    //                             return {...item, [colName]: item[colName] ? item[colName] + ID_SEPARATE + info.file.response.data : info.file.response.data}
    //                         }
    //                         return item
    //                     })
    //                 })
    //             })
    //         });
            
    //     } else if (info.file.status === 'error') {
    //     }
    // }, [])

    const columns = useMemo(() : ColumnsType<ThanhPhanBoSungHoSo> => {
        return [
            {
                title: "Tên giấy tờ",
                key: "tenThanhPhan",
                dataIndex: "tenThanhPhan",
                width:"45%",
                render: (_, record, idx) => {
                    return <Input.TextArea rows={2} defaultValue={record.tenThanhPhan} onChange={(e) => onRowChange(e.target.value, idx, "tenThanhPhan")}/>
                }
            },
            {
                title: "Đính kèm",
                key: "fileDinhKem",
                width:"20%",
                render: (_, record, idx) => {
                    // const fileList = record.fileDinhKem?.split(ID_SEPARATE).map((x) :UploadFile => {
                    //     const fileSegments = x.split("/")
                    //     const fileName = fileSegments[fileSegments.length - 1]
                    //     return {uid: x, name: fileName, url: HOST_PATH + x }
                    // })
                    // return <>
                    //     {<Upload fileList={fileList}></Upload>}
                    // </>
                    return <UploadTable hideUpload={true} dinhKem={record.fileDinhKem} folderName={hoSo?.maHoSo} colDinhKemName={"fileDinhKem"} rowNumber={idx} />
                }
            },
            {
                title:"Nội dung yêu cầu bổ sung",
                key:"noiDungBoSung",
                render: (_, record, idx) => {
                    return <Input.TextArea rows={2} onChange={(e) => onRowChange(e.target.value, idx, "noiDungBoSung")}/>
                }
            }
        ]
    }, [dataSource, hoSo])
    return columns
}