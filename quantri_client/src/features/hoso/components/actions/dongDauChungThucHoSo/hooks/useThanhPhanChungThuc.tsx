import { IHoSo } from '@/features/hoso/models'
import { IKetQuaThuTuc } from '@/features/ketquathutuc/models'
import {
  AntdButton,
  AntdSelect,
  AntdSpace,
  UploadTable,
} from '@/lib/antd/components'
import {
  Checkbox,
  FormInstance,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Tag,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import {
  ISearchThanhPhanHoSo,
  IThanhPhanHoSo,
  THANHPHANHOSO_TRANGTHAIDUYET,
  THANHPHANHOSO_TRANGTHAIDUYET_TYPE,
} from '@/features/thanhphanhoso/models'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks'
import { SoChungThucApi } from '@/features/sochungthuc/services'
import { ISoChungThuc } from '@/features/sochungthuc/models'
import { thanhPhanHoSoApi } from '@/features/thanhphanhoso/services'
import { toast } from 'react-toastify'
import { GetHoSo } from '@/features/hoso/redux/action'
import { useButtonActionContext } from '@/features/hoso/contexts/ButtonActionsContext'
import { TagProps } from 'antd/lib'
import { DATE, MONTH, YEAR } from '@/data'
import { leading0 } from '@/utils'
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable'
import { btnSignClick, getAutoPositionSigned } from '@/utils/common'
import { IThanhPhanHoSoWithDongDau } from '../ThanhPhanChungThuc'
import { getChucDanh } from '../../kySoChungThuc/hooks/useThanhPhanChungThuc'

export const useThanhPhanChungThuc = ({
  dataSource,
  setDataSource,
  form,
  soChungThucs,
  pagination,
}: {
  pagination: ISearchThanhPhanHoSo
  soChungThucs: ISoChungThuc[] | undefined
  dataSource: IThanhPhanHoSoWithDongDau[]
  setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSoWithDongDau[]>>
  form: FormInstance<IHoSo>
}) => {
  const [_, startTransition] = useTransition()
  const dispatch = useAppDispatch()
  const buttonActionContext = useButtonActionContext()
  const { data: hoSo } = useAppSelector((state) => state.hoso)
  const { data: user } = useAppSelector((state) => state.user)

  // const {} = useKe({donVi: hoSo?.donViId})
  const onRowChange = useCallback(
    (value: any, index: number, colName: keyof IThanhPhanHoSoWithDongDau) => {
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
  const [soChungThucGiay, soChungThucDienTu] = useMemo(() => {
    return [
      soChungThucs?.find((x) => x.loai == 'Giấy'),
      soChungThucs?.find((x) => x.loai == 'Điện tử'),
    ]
  }, [soChungThucs])

  const { onChangeDinhKemTable } = useUploadTable<IThanhPhanHoSoWithDongDau>({
    folderName: hoSo?.maHoSo,
    setDataSource,
    colDinhKemName: 'dinhKem',
    rowNumber: -1,
  })

  const columns = useMemo((): ColumnsType<IThanhPhanHoSoWithDongDau> => {
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
        dataIndex: 'ten',
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
      {
        title: 'Trạng thái duyệt',
        key: 'trangThaiDuyet',
        dataIndex: 'trangThaiDuyet',
        render: (_, record, idx) => {
          const color: TagProps['color'] =
            record.trangThaiDuyet == 'Chưa ký'
              ? 'red'
              : record.trangThaiDuyet == 'Đã ký'
              ? 'success'
              : 'default'
          return (
            <Tag style={{ minWidth: 60, textAlign: 'center' }} color={color}>
              {record.trangThaiDuyet
                ? THANHPHANHOSO_TRANGTHAIDUYET[record.trangThaiDuyet]
                : ''}
            </Tag>
          )
        },
      },
      {
        title: 'Số chứng thực điện tử',
        key: 'soChungThucDienTu',
        render: (_, record, idx) => {
          return (
            <>
              {record.soChungThucDienTu &&
              record.soChungThucDT &&
              soChungThucDienTu?.id == record.soChungThucDT ? (
                <>
                  <p>{record.soChungThucDienTu}/ĐT</p>
                  <p>{soChungThucDienTu.tenSo}</p>
                </>
              ) : (
                ''
              )}
            </>
          )
        },
      },
      {
        title: 'Số chứng thực giấy',
        key: 'soChungThucGiay',
        render: (_, record, idx) => {
          return (
            <>
              {record.soChungThucGiay &&
              record.soChungThucG &&
              soChungThucGiay?.id == record.soChungThucG ? (
                <>
                  <p>{record.soChungThucGiay}</p>
                  <p>{soChungThucGiay?.tenSo}</p>
                </>
              ) : (
                ''
              )}
            </>
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
                // kySoToken={(record.soChungThucDT != null && record.soChungThucDienTu != null)}
                // customSignature={[
                //     {
                //         name: "Sổ chứng thực",
                //         selection: 'preset',
                //         appearance: {
                //             fontSize: 16,
                //             fields: [{ type: "text", value: 'Chứng thực bản sao đúng với bản chính'}, {type: "text", value: `Số chứng thực ${record.soChungThucDienTu} Quyển số: ${soChungThucDienTu?.tenSo} \n Ngày${leading0(DATE)} tháng ${leading0(MONTH)} năm ${YEAR}`}],
                //             textColor: 0x0000ff,
                //         },
                //         autoPosition: {
                //             // patterns: [{
                //             //     pattern: '^\\s*Số:?(\\s+)/',
                //             //     isRegex: true,
                //             //     group: 1,
                //             // }],
                //             positionX: 'start',
                //             positionY: 'start',
                //             method: "page",
                //             pageOrder: "descending",
                //             page:1,
                //         }
                //     },
                // ]}
                hideUpload
                dataSource={dataSource}
                setDataSource={setDataSource}
                folderName={'ThemMoiHoSoChungChuc'}
                colDinhKemName="dinhKem"
                rowNumber={idx}
                dinhKem={record.dinhKem}
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
            <AntdButton disabled={record.daDongDau}
              onClick={async () => {
                if(record.daDongDau){
                  return
                }
                const soChungThuc = record.kyDienTuBanGiay == true && record.soChungThucDienTu ? record.soChungThucDienTu : record.soChungThucGiay
                const tenSoChungThuc = record.kyDienTuBanGiay == true && record.soChungThucDT ? soChungThucDienTu?.tenSo : soChungThucGiay?.tenSo
                const pageNumber = pagination.pageNumber ?? 1
                const pageSize = pagination.pageSize ?? 10
                const page = (pageNumber - 1) * pageSize + idx
                console.log(page);
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
                    onRowChange(true, page, "daDongDau")
                  },
                  undefined,
                  [
                    {
                      name: 'Sổ chứng thực',
                      selection: 'preset',
                      appearance: {
                        fontSize: 16,
                        fontFamily: 'Times New Roman',
                        fields: [
                          {
                            type: 'text',
                            value: 'Chứng thực bản sao đúng với bản chính',
                          },
                        ],
                        textColor: 0xff0000,
                      },
                      autoPosition: {
                        positionX: 'start',
                        positionY: 'start',
                        method: 'page',
                        marginY: 60,
                        marginX: 50,
                        pageOrder: 'descending',
                        page: 1,
                      },
                    },
                    {
                      name: 'Sổ chứng thực',
                      selection: 'preset',
                      appearance: {
                        fontSize: 16,
                        fontFamily: 'Times New Roman',
                        fields: [
                          {
                            type: 'text',
                            value: `Số chứng thực ${
                              soChungThuc
                            } Quyển số: ${
                              tenSoChungThuc
                            } \nNgày ${leading0(DATE)} tháng ${leading0(
                              MONTH
                            )} năm ${YEAR}`,
                          },
                        ],
                        textColor: 0x0000ff,
                      },
                      autoPosition: {
                        positionX: 'start',
                        positionY: 'start',
                        method: 'page',
                        marginY: 90,
                        marginX: 50,
                        pageOrder: 'descending',
                        page: 1,
                      },
                    },
                    {
                      name: 'Chữ ký',
                      isDefault: true,
                      appearance: {
                          fontFamily: "Times New Roman",
                      },
                      autoPosition: {
                        positionX: 'end',
                        positionY: 'start',
                        method: "page",
                        marginY: 75,
                        marginX: 95,
                        pageOrder: "descending",
                        page:1,
                        // marginX: -40,
                        // marginY: 35,
                        // ...getAutoPositionSigned(user?.fullName ?? "", getChucDanh(user?.positionName)),
                    }
                    } as any
                  ],
                  true
                )
              }}
            >
              {record.daDongDau ? "Đã ": " "}Đóng dấu
            </AntdButton>
          )
        },
      },
    ]
  }, [dataSource, form, pagination?.pageNumber, pagination?.pageSize])
  return { columns }
}
