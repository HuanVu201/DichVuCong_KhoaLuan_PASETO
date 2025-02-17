import { IHoSo } from '@/features/hoso/models'
import { IKetQuaThuTuc } from '@/features/ketquathutuc/models'
import { AntdButton, AntdSelect, UploadTable } from '@/lib/antd/components'
import {
  Checkbox,
  FormInstance,
  Input,
  InputNumber,
  Popconfirm,
  Select,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useCallback, useMemo, useTransition } from 'react'
import { KetQuaThuTucChungThuc } from '../ThanhPhanHoSo'
import { IDanhMucGiayToChungThuc } from '@/features/danhmucgiaytochungthuc/models'
import { filterOptions, filterOptionsChungThuc } from '@/utils'
import { ISearchThanhPhanHoSo } from '@/features/thanhphanhoso/models'
import { useWindowSizeChange } from '@/hooks/useWindowSizeChange'
// import { ScanWrapper } from '@/lib/antd/components/upload/ScanMobile'
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable'
import { lazy } from '@/utils/lazyLoading'
const ScanWrapper = lazy(() => import("../../../../../../lib/antd/components/upload/ScanMobile"))

export const useThanhPhanHoSos = ({
  dataSource,
  setDataSource,
  form,
  danhMucGiayToChungThucs,
  useKySoNEAC,
  pagination,
}: {
  pagination: ISearchThanhPhanHoSo
  useKySoNEAC?: boolean
  danhMucGiayToChungThucs: IDanhMucGiayToChungThuc[] | undefined
  dataSource: KetQuaThuTucChungThuc[]
  setDataSource: React.Dispatch<React.SetStateAction<KetQuaThuTucChungThuc[]>>
  form: FormInstance<IHoSo>
}) => {
  const [_, startTransition] = useTransition()
  const {onChangeDinhKemTable} = useUploadTable<KetQuaThuTucChungThuc>({folderName: "ScanChungThuc", setDataSource, colDinhKemName: "dinhKem", rowNumber: -1})

  const onRowChange = useCallback(
    (value: any, index: number, colName: keyof KetQuaThuTucChungThuc) => {
      startTransition(() => {
        setDataSource((curr) => {
          const newDataSource = [...curr]
          return newDataSource.map((item, idx) => {
            if (idx === index) {
              if(colName == "soBanGiay" && value == undefined){
                return {...item, [colName]: item.soBanGiay}
              }
              if(colName == "soTrang" && value == undefined){
                return {...item, [colName]: item.soTrang}
              }
              // sau khi thay đổi thì kyDienTuBanGiay sẽ là false. và nếu soBanGiay là 0 thì mặc định nó lên 1
              if (
                colName == 'kyDienTuBanGiay' &&
                item.kyDienTuBanGiay == true &&
                item.soBanGiay == 0
              ) {
                return { ...item, [colName]: value, soBanGiay: 1 }
              }
              return { ...item, [colName]: value }
            }
            return item
          })
        })
      })
    },
    []
  )
  const { isWindow } = useWindowSizeChange()
  const onRowChangeWithoutTransition = useCallback(
    (value: any, index: number, colName: keyof KetQuaThuTucChungThuc) => {
      setDataSource((curr) => {
        const newDataSource = [...curr]
        return newDataSource.map((item, idx) => {
          if (idx === index) {
            // sau khi thay đổi thì kyDienTuBanGiay sẽ là false. và nếu soBanGiay là 0 thì mặc định nó lên 1
            if (
              colName == 'kyDienTuBanGiay' &&
              item.kyDienTuBanGiay == true &&
              item.soBanGiay == 0
            ) {
              return { ...item, [colName]: value, soBanGiay: 1 }
            }
            return { ...item, [colName]: value }
          }
          return item
        })
      })
    },
    []
  )

  const columns = useMemo((): ColumnsType<KetQuaThuTucChungThuc> => {
    return [
      {
        title: 'STT',
        key: 'STT',
        render: (_, record, idx) => {
          const pageNumber = pagination.pageNumber ?? 1
          const pageSize = pagination.pageSize ?? 10
          return <>{(pageNumber - 1) * pageSize + idx + 1}</>
        },
      },
      {
        title: (
          <>
            Tên giấy tờ <span style={{ color: 'red' }}>*</span>
          </>
        ),
        key: 'maGiayTo',
        width: "15%",
        dataIndex: 'maGiayTo',
        render: (_, record, idx) => {
          return (
            <Select
              defaultValue={record.ten}
              style={{ width: '100%' }}
              placeholder="Chọn giấy tờ"
              showSearch
              filterOption={filterOptionsChungThuc}
              onSelect={(value, option) => {
                onRowChange(option['data-ten'], idx, 'ten')
                onRowChange(value, idx, 'maGiayTo')
              }}
            >
              {danhMucGiayToChungThucs?.map((danhMuc, idx) => {
                return (
                  <Select.Option
                    key={idx}
                    data-ten={danhMuc.ten}
                    value={danhMuc.ma}
                  >
                    {danhMuc.ten}
                  </Select.Option>
                )
              })}
            </Select>
          )
        },
      },
      {
        title: (
          <>
            Mô tả/nội dung giấy tờ <span style={{ color: 'red' }}>*</span>
          </>
        ),
        key: 'ten',
        dataIndex: 'ten',
        render: (_, record, idx) => {
          return (
            <Input
              value={record.ten}
              onChange={(e) =>
                onRowChangeWithoutTransition(e.target.value, idx, 'ten')
              }
            ></Input>
          )
        },
      },
      {
        title: 'Số trang',
        key: 'soTrang',
        dataIndex: 'soTrang',
        align: 'center',
        render: (_, record, idx) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InputNumber
                min={1}
                defaultValue={record.soTrang ?? 1}
                value={record.soTrang}
                onChange={(e) => onRowChange(e, idx, 'soTrang')}
              />
            </div>
          )
        },
      },
      {
        title: 'Số bản giấy',
        key: 'soBanGiay',
        dataIndex: 'soBanGiay',
        align: 'center',
        render: (_, record, idx) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <InputNumber
                min={record.kyDienTuBanGiay ? 0 : 1}
                defaultValue={record.soBanGiay ?? 0}
                value={record.soBanGiay}
                onChange={(e) => onRowChange(e, idx, 'soBanGiay')}
              />
            </div>
          )
        },
      },
      {
        title: 'Bản điện tử',
        key: 'kyDienTuBanGiay',
        dataIndex: 'kyDienTuBanGiay',
        align: 'center',
        render: (_, record, idx) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Checkbox
                checked={record.kyDienTuBanGiay}
                onChange={(e) =>
                  onRowChange(e.target.checked, idx, 'kyDienTuBanGiay')
                }
              />
            </div>
          )
        },
      },
      {
        title: 'Đính kèm',
        key: 'dinhKem',
        render: (_, record, idx) => {
          return (
            <>
              <UploadTable
                kySoToken
                kySoNEAC={useKySoNEAC}
                dataSource={dataSource}
                setDataSource={setDataSource}
                maxCount={1}
                folderName={'ThemMoiHoSoChungChuc'}
                colDinhKemName="dinhKem"
                rowNumber={idx}
                dinhKem={record.dinhKem}
                accept="application/pdf"
                scanPC={isWindow}
                extraElement={(loading) => (<>
                  <ScanWrapper onSuccess={(fileName) => {
                    if(record.dinhKem){
                      onChangeDinhKemTable(fileName, record.dinhKem, "override", idx)
                    } else {
                      onChangeDinhKemTable(fileName,undefined, "add", idx)
                    }
                  }}/>
              </>)}
                onRemoveFile={(file: string) => {
                  const removeFiles: string[] =
                    form.getFieldValue('removeFiles')
                  form.setFieldValue('removeFiles', [...removeFiles, file])
                }}
              />
            </>
          )
        },
      },
      {
        title: 'Thao tác',
        width: '10%',
        align: 'center',
        key: 'thaotac',
        render: (_, record, idx) => (
          <Popconfirm
            title="Xoá?"
            onConfirm={() => {
              setDataSource((curr) => curr.filter((x) => x.id !== record.id))
            }}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <AntdButton> Xóa</AntdButton>
          </Popconfirm>
        ),
      },
    ]
  }, [dataSource, form, pagination?.pageNumber, pagination?.pageSize, isWindow])
  return { columns }
}
