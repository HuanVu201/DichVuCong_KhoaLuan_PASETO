import { useCallback, useMemo, useTransition } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Input, InputNumber, Popconfirm, Select } from 'antd'
import { MinusCircleOutlined } from '@ant-design/icons'
import { AntdSpace } from '@/lib/antd/components'
import { IPhiLePhi } from '@/features/philephi/models'
import { LOAIPHILEPHI_TABLE_OPTIONS } from '../data/formData'
import { getCurrency } from '@/utils'
import { FormInstance } from 'antd/lib'


export const usePhiLePhiColumn = ({dataSource ,setDataSource,}: {dataSource: IPhiLePhi[], setDataSource: React.Dispatch<React.SetStateAction<IPhiLePhi[]>>}) => {
    const [_, startTransition] = useTransition();
    const onRowChange = useCallback((value: any, index: number, colName: keyof IPhiLePhi) => {
      // const cloneDataSource = [...dataSource];
      // const newDataSource = cloneDataSource.map((item, idx) => {
      //     if (idx === index){
      //         return {...item, [colName]: value}
      //     }
      //     return item
      // })
      startTransition(() => {
          setDataSource((curr) => {
            return curr.map((item, idx) => {
              if (idx === index){
                  return {...item, [colName]: value}
              }
              return item
            })
            // if(colName == "soTien" || colName == "loai"){
            //   const selectedRows = newData.filter(x => selectedRowKeys.includes(x.id))
            //   console.log(selectedRows);
              
            //   updateSoTien(selectedRows)
            // }
            // return newData
        })
      })
      
  },[])
    const columns = useMemo((): ColumnsType<IPhiLePhi> => {
        return [
            {
                title: "Tên phí, lệ phí",
                key: "ten",
                dataIndex:"ten",
                render: (_, record, idx) =>{
                  return <Input.TextArea rows={2} defaultValue={record.ten} onChange={(e) => onRowChange(e.target.value, idx, "ten")}/>
                }
            },
            {
                title: "Loại",
                key: "loai",
                dataIndex: "loai",
                render: (_, record, idx) =>{
                  return <Select options={LOAIPHILEPHI_TABLE_OPTIONS} defaultValue={record.loai} onChange={(value) => onRowChange(value, idx, "loai")}/>
                }
            },
            {
                title: "Số tiền",
                key: "soTien",
                dataIndex: "soTien",
                render: (_, record, idx) => {
                    return <InputNumber min={0} defaultValue={record.soTien} formatter={(value: number | undefined) => value ? getCurrency(value) : "0"} onChange={(value) => onRowChange(value, idx, "soTien")}/>
                }
            },
            {
                title: "Thao tác",
                width:"10%",
                align:'center',
                key: 'thaotac',
                render: (_: any, record: IPhiLePhi) => {
                    return <AntdSpace>
                    <Popconfirm
                            title='Xoá?'
                            onConfirm={() => {
                                setDataSource((curr) => curr.filter(x => x.id !== record.id))
                            } }
                            okText='Xoá'
                            cancelText='Huỷ'
                        >
                            <MinusCircleOutlined style={{color:"tomato"}} title='Xóa dòng' />
                    </Popconfirm>
                    </AntdSpace>
                }
            },
        ]
    }, [dataSource])
    return columns
}