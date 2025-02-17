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
import { useAppSelector } from '@/lib/redux/Hooks'
import { useUploadTable } from '@/lib/antd/components/upload/hooks/useUploadTable'
import { btnSignClick } from '@/utils/common'

export const useReadOnlyThanhPhanChungThuc = ({
  dataSource,
  setDataSource,
  form,
  pagination,
}: {
  pagination: ISearchThanhPhanHoSo
  dataSource: IThanhPhanHoSo[]
  setDataSource: React.Dispatch<React.SetStateAction<IThanhPhanHoSo[]>>
  form: FormInstance<IHoSo>
}) => {

  const columns = useMemo((): ColumnsType<IThanhPhanHoSo> => {
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
        title: 'Chi tiết giấy tờ',
        key: 'ten',
        render: (_, record) => {
          return (
            <span>
              {(record as any)?.tenKetQua} ({record.ten})
            </span>
          )
        },
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
        title: 'Đính kèm',
        key: 'dinhKemGoc',
        render: (_, record, idx) => {
          return (
            <>
              <UploadTable
                // kySoToken
                hideUpload
                dataSource={dataSource}
                setDataSource={setDataSource}
                folderName={'ThemMoiHoSoChungChuc'}
                colDinhKemName={record.dinhKemGoc ? "dinhKemGoc" : "dinhKem"}
                rowNumber={idx}
                maxCount={1}
                dinhKem={record.dinhKemGoc ? record.dinhKemGoc : record.dinhKem}
              />
            </>
          )
        },
      },
    ]
  }, [dataSource, form, pagination?.pageNumber, pagination?.pageSize])
  return { columns }
}
