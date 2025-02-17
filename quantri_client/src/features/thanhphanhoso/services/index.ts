import axiosInstance from '@/lib/axios'
import { AxiosResponseWrapper } from '../../../lib/axios/typeHelper'
import {
  IPickSearch,
  IBaseExt,
  IOmitUpdate,
  IPaginationResponse,
  IResult,
  ISoftDelete,
} from '../../../models'
import { Service } from '../../../services'
import { ISearchThanhPhanHoSo, IThanhPhanHoSo } from '../models'

class ThanhPhanHoSoService
  extends Service.BaseApi
  implements Service.ICrud<IThanhPhanHoSo>
{
  constructor() {
    super('thanhphanhosos')
  }
  SearchThanhPhanChungThuc(
    _params: ISearchThanhPhanHoSo
  ): AxiosResponseWrapper<IPaginationResponse<IThanhPhanHoSo[]>> {
    return axiosInstance.get(this._urlSuffix + '/thanhphanchungthucs', {
      params: _params,
    })
  }

  Search(
    _params: ISearchThanhPhanHoSo
  ): AxiosResponseWrapper<IPaginationResponse<IThanhPhanHoSo[]>> {
    return axiosInstance.get(this._urlSuffix, { params: _params })
  }
  Get(_id: string): AxiosResponseWrapper<IResult<IThanhPhanHoSo>> {
    return axiosInstance.get(this._urlSuffix + '/' + _id)
  }
  Create(
    data: Partial<Omit<IThanhPhanHoSo, keyof IBaseExt<string>>>
  ): AxiosResponseWrapper<IResult<string>> {
    return axiosInstance.post(this._urlSuffix, data)
  }
  Delete(_params: ISoftDelete): AxiosResponseWrapper {
    return axiosInstance.delete(this._urlSuffix + '/' + _params.id, {
      data: { forceDelete: _params.forceDelete },
    })
  }
  Restore(_id: string): AxiosResponseWrapper {
    throw new Error('Method not implemented.')
  }
  Update(_params: IOmitUpdate<IThanhPhanHoSo>): AxiosResponseWrapper {
    return axiosInstance.put(this._urlSuffix + '/' + _params.id, _params.data)
  }
  CapNhatTrangThaiKySoChungThuc(_params: {
    thanhPhanHoSos: Pick<IThanhPhanHoSo, 'id' | 'dinhKem' | 'trangThaiDuyet'>[]
  }): AxiosResponseWrapper<IResult<any>> {
    return axiosInstance.put(
      this._urlSuffix + '/CapNhatTrangThaiKySoChungThuc',
      _params
    )
  }
  CapSoVaDongDauChungThuc(
    _params: Pick<IThanhPhanHoSo, 'id' | 'soChungThucDT' | 'soChungThucG'>
  ): AxiosResponseWrapper<IResult<any>> {
    return axiosInstance.put(
      this._urlSuffix + '/CapSoVaDongDauChungThuc',
      _params
    )
  }
}

export const thanhPhanHoSoApi = new ThanhPhanHoSoService()
