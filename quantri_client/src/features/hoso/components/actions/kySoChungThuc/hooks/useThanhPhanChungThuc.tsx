import { IHoSo } from '@/features/hoso/models'
import { IKetQuaThuTuc } from '@/features/ketquathutuc/models'
import { AntdButton, AntdSelect, UploadTable } from '@/lib/antd/components'
import {
  Checkbox,
  FormInstance,
  Input,
  InputNumber,
  Popconfirm,
  Tag,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useCallback, useMemo, useTransition } from 'react'
import {
  ISearchThanhPhanHoSo,
  IThanhPhanHoSo,
  THANHPHANHOSO_TRANGTHAIDUYET,
  THANHPHANHOSO_TRANGTHAIDUYET_TYPE,
} from '@/features/thanhphanhoso/models'
import { addPagePDF } from '@/utils'
import { useAppSelector } from '@/lib/redux/Hooks'
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable'
import { btnSignClick, getAutoPositionSigned } from '@/utils/common'
import { IThanhPhanHoSoWithKySo } from '../ThanhPhanChungThuc'

export const getChucDanh = (positionName: string | undefined) => {
  if(!positionName){
    return ""
  }
  const positionNameLowerCase = positionName.toLowerCase();
  const isPhoChuTich = positionNameLowerCase.startsWith("phó chủ tịch");
  const isChuTich = positionNameLowerCase.startsWith("chủ tịch");
  const isTruongPhong = positionNameLowerCase.startsWith("trưởng phòng");
  const isPhoTruongPhong = positionNameLowerCase.startsWith("phó trưởng phòng");
  let chucDanh = "";
  if (isPhoChuTich)
  {
      chucDanh = `KT. CHỦ TỊCH`;
  }
  else if (isChuTich)
  {
      chucDanh = `CHỦ TỊCH`;
  }
  else if (isPhoTruongPhong)
  {
      chucDanh = `KT. TRƯỞNG PHÒNG`;
  }
  else if (isTruongPhong)
  {
      chucDanh = `TRƯỞNG PHÒNG`;
  }
  return chucDanh;
}

export const useThanhPhanChungThuc = ({
  dataSource,
  setDataSource,
  form,
  pagination,
}: {
  pagination: ISearchThanhPhanHoSo
  dataSource: IThanhPhanHoSoWithKySo[]
  setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSoWithKySo[]>>
  form: FormInstance<IHoSo>
}) => {
  const { data: hoSo } = useAppSelector((state) => state.hoso)
  const { data: user } = useAppSelector((state) => state.user)
  const [_, startTransition] = useTransition()
  const onRowChange = useCallback(
    (value: any, index: number, colName: keyof IThanhPhanHoSoWithKySo) => {
      startTransition(() => {
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
      })
    },
    []
  )

  const { onChangeDinhKemTable } = useUploadTable<IThanhPhanHoSoWithKySo>({
    folderName: hoSo?.maHoSo,
    setDataSource,
    colDinhKemName: 'dinhKem',
    rowNumber: -1,
  })

  const columns = useMemo((): ColumnsType<IThanhPhanHoSoWithKySo> => {
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
        title: 'Tên giấy tờ',
        key: 'ten',
        render: (_, record) => {
          return <>{record.tenGiayTo} ({record.ten})</>
        }
      },
      {
        title: 'Số trang/Số bản giấy',
        key: 'soTrang',
        dataIndex: 'soTrang',
        render: (_, record) => {
          return (
            <>
              {record.soTrang} / {record.soBanGiay}
            </>
          )
        },
      },
      {
        title: 'Bản điện tử',
        key: 'kyDienTuBanGiay',
        dataIndex: 'kyDienTuBanGiay',
        render: (_, record, idx) => {
          return (
            <Tag
              style={{ minWidth: 60, textAlign: 'center' }}
              color={record.kyDienTuBanGiay ? 'success' : 'magenta'}
            >
              {record.kyDienTuBanGiay ? 'Có' : 'Không'}
            </Tag>
          )
        },
      },
      // {
      //     title: "Trạng thái",
      //     key: "trangThaiDuyet",
      //     dataIndex: "trangThaiDuyet",
      //     render: (_, record, idx) => {
      //         return <AntdSelect
      //         onChange={(value) => onRowChange(value, idx, "trangThaiDuyet")}
      //         options={[{label:"Đã ký", value:"Đã ký"}, {label:"Chưa ký", value:"Chưa ký"}]}
      //          defaultValue={THANHPHANHOSO_TRANGTHAIDUYET["Chưa ký"]} style={{width: "100%"}} value={record.trangThaiDuyet}/>
      //     }
      // },
      {
        title: 'Trạng thái',
        key: 'trangThaiDuyet',
        dataIndex: 'trangThaiDuyet',
        render: (_, record, idx) => {
          return (
            <Tag
              style={{ minWidth: 60, textAlign: 'center' }}
              color={
                record.trangThaiDuyet == 'Đã ký'
                  ? 'success'
                  : record.trangThaiDuyet == 'Chưa ký'
                  ? 'red'
                  : 'default'
              }
            >
              {record.trangThaiDuyet}
            </Tag>
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
                // kySoToken
                dataSource={dataSource}
                setDataSource={setDataSource}
                folderName={'ThemMoiHoSoChungChuc'}
                colDinhKemName="dinhKem"
                rowNumber={idx}
                maxCount={1}
                dinhKem={record.dinhKem}
                // extraElement={
                //     <>
                //         <AntdButton icon={<UploadOutlined />}>Scan</AntdButton>
                //     </>
                // }
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
        key: 'ThaoTac',
        render: (_, record, idx) => {
          return (
            <AntdButton
              disabled={record.daKySo}
              onClick={async () => {
                if(record.daKySo){
                  return;
                }
                const pageNumber = pagination.pageNumber ?? 1
                const pageSize = pagination.pageSize ?? 10
                const page = (pageNumber - 1) * pageSize + idx
                await btnSignClick(
                  record.dinhKem,
                  hoSo?.maHoSo ?? 'KySoChungThuc',
                  (urlFileSigned, oldFileUrl) => {
                    onChangeDinhKemTable(
                      urlFileSigned,
                      oldFileUrl,
                      'override',
                      page
                    )
                    onRowChange('Đã ký', page, 'trangThaiDuyet')
                  },
                  async (fileName: string) => await addPagePDF(fileName),
                  [
                    {
                      name: 'Chữ ký',
                      isDefault: true,
                      appearance: {
                        fontFamily: "Times New Roman",
                      },

                      autoPosition: {
                        ...getAutoPositionSigned(user?.fullName ?? "", getChucDanh(user?.positionName)),
                        // positionX: 'end',
                        // positionY: 'start',
                        // method: "page",
                        // marginY: 50,
                        // marginX: 40,
                        // pageOrder: "descending",
                        // page:1,
                    }
                    } as any
                  ],
                  true
                )
              }}
            >
              {record.daKySo ? "Đã ": " "}Ký số
            </AntdButton>
          )
        },
      },
    ]
  }, [dataSource, form, pagination?.pageNumber, pagination?.pageSize])
  return { columns }
}
