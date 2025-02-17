import { SelectProps } from 'antd'

export const FORMAT_SOGIAYTO_LABEL = {
  'Công dân': 'CCCD/CMND/Hộ chiếu',
  'Cá nhân': 'Mã định danh',
  'Doanh nghiệp': 'Mã số thuế',
  'Tổ chức': 'Mã định danh',
  Khác: 'Mã định danh',
  'Cơ quan nhà nước': 'Mã định danh',
}

export const LOAICHUHOSO_OPTIONS_OBJ = {
  "Công dân": "Công dân",
  "Doanh nghiệp": "Doanh nghiệp",
  "Cơ quan nhà nước": "Cơ quan nhà nước",
  "Khác": "Khác",
} as const

export type LOAICHUHOSO_OPTIONS_TYPE = keyof typeof LOAICHUHOSO_OPTIONS_OBJ

export const LOAICHUHOSO_OPTIONS: SelectProps['options'] = [
  {
    label: 'Công dân',
    value: 'Công dân',
  },
  {
    label: 'Doanh nghiệp',
    value: 'Doanh nghiệp',
  },
  {
    label: 'Cơ quan nhà nước',
    value: 'Cơ quan nhà nước',
  },
  {
    label: 'Tổ chức',
    value: 'Tổ chức',
  },
  {
    label: 'Khác',
    value: 'Khác',
  },
]

export const KENH_THUC_HIEN = {
  '1': 'Trực tiếp',
  '2': 'Trực tuyến',
  '3': 'Qua bưu chính công ích',
}

export const KENH_THUC_HIEN_LOWERCASE = {
  '1': 'trực tiếp',
  '2': 'trực tuyến',
  '3': 'qua bưu chính công ích',
}

export const CATALOG = {
  'xa-phuong': 'xa-phuong',
  'quan-huyen': 'quan-huyen',
  'so-ban-nganh': 'so-ban-nganh',
  'cnvpdk': 'cnvpdk',
}

export const TRANGTHAIHOSO: Record<string, string> = {
  '1': 'Mới đăng ký',
  '2': 'Được tiếp nhận',
  '3': 'Không được tiếp nhận',
  '4': 'Đang xử lý',
  '5': 'Yêu cầu bổ sung giấy tờ',
  '6': 'Yêu cầu thực hiện nghĩa vụ tài chính',
  '7': 'Công dân yêu cầu rút hồ sơ',
  '8': 'Dừng xử lý',
  '9': 'Đã xử lý xong',
  '10': 'Đã trả kết quả',
}

export const LOAITIEPNHAN_OPTIONS: SelectProps['options'] = [
  {
    label: 'Tất cả',
    value: '',
  },
  {
    label: 'Trực tiếp',
    value: '1',
  },
  {
    label: 'Nộp trực tuyến',
    value: '2',
  },
  {
    label: 'Qua bưu chính công ích',
    value: '3',
  },
]

export const LOAITIEPNHAN_FORMNOPTRUCTIEP: SelectProps['options'] = [
  {
    label: 'Trực tiếp',
    value: '1',
  },
  {
    label: 'Qua bưu chính công ích',
    value: '3',
  },
]


export const COPHILEPHI_OPTIONS: SelectProps['options'] = [
  {
    label: 'Thu trước',
    value: 'Thu trước',
  },
  {
    label: 'Đối tượng miễn phí',
    value: 'Đối tượng miễn phí',
  },
  {
    label: 'Thu sau',
    value: 'Thu sau',
  },
]

export const KHONGCOPHILEPHI_OPTIONS: SelectProps['options'] = [

  {
    label: 'Không thu phí',
    value: 'Không thu phí',
  },


]


export const LOAIPHILEPHI_OPTIONS: SelectProps['options'] = [
  {
    label: 'Thu trước',
    value: 'Thu trước',
  },
  {
    label: 'Không thu phí',
    value: 'Không thu phí',
  },
  {
    label: 'Đối tượng miễn phí',
    value: 'Đối tượng miễn phí',
  },
  {
    label: 'Thu sau',
    value: 'Thu sau',
  },
]
export const LOAIPHILEPHI_CHUNGTHUC_OPTIONS: SelectProps['options'] = [
  {
    label: 'Thu sau',
    value: 'Thu sau',
  },
]

export const LOAIPHILEPHI_PAYMENT_OPTIONS: SelectProps['options'] = [
  {
    label: 'Thu trước',
    value: 'Thu trước',
  },
  {
    label: 'Thu sau',
    value: 'Thu sau',
  },
  {
    label: 'Đối tượng miễn phí',
    value: 'Đối tượng miễn phí',
  },
]

export const LOAIPHILEPHI_TABLE_OPTIONS: SelectProps['options'] = [
  {
    label: 'Phí',
    value: 'Phí',
  },
  {
    label: 'Lệ phí',
    value: 'Lệ phí',
  },
]

export const LOAISOHOA_OPTIONS: SelectProps['options'] = [
  {
    label: 'Số hóa thành phần',
    value: '0',
  },
  {
    label: 'Số hóa kết quả',
    value: '1',
  },
]

export const GIAYTOSOHOA_LOAISOHOA = {
  '0': 'Số hóa thành phần',
  '1': 'Số hóa kết quả',
}

export type TRANGTHAISOHOA_CONST_VALUE = '0' | '1' | '2' | '3'

export const TRANGTHAISOHOA: Record<
  | 'Chưa số hóa'
  | 'Được số hóa'
  | 'Tái sử dụng'
  | 'Tái sử dụng từ kết quả hồ sơ khác',
  TRANGTHAISOHOA_CONST_VALUE
> = {
  'Chưa số hóa': '0',
  'Được số hóa': '1',
  'Tái sử dụng': '2',
  'Tái sử dụng từ kết quả hồ sơ khác': '3',
} as const
export type TRANGTHAISOHOA_TYPE = keyof typeof TRANGTHAISOHOA

export const TRANGTHAISOHOA_VALUE: Record<
  TRANGTHAISOHOA_CONST_VALUE,
  TRANGTHAISOHOA_TYPE
> = {
  '0': 'Chưa số hóa',
  '1': 'Được số hóa',
  '2': 'Tái sử dụng',
  '3': 'Tái sử dụng từ kết quả hồ sơ khác',
}

export const TRANGTHAITHANHTOAN = {
  'Đã thanh toán': 'Đã thanh toán',
  'Hoàn phí': 'Hoàn phí',
  'Hủy thanh toán': 'Hủy thanh toán',
  'Chờ thanh toán': 'Chờ thanh toán',
  'Chưa thanh toán': 'Chưa thanh toán',
} as const

export const HINH_THUC_THANH_TOAN: SelectProps["options"] = [
  { value: "tien-mat", label: "Tiền mặt" },
  { value: "chuyen-khoan", label: "Chuyển khoản" },
  { value: "truc-tuyen", label: "Trực tuyến" },
]

export const DOT_TAC_THANH_TOAN: SelectProps["options"] = [
  { value: "", label: "Tất cả" },
  { value: "VNeID", label: "VNeID" },
  // { value: "paymentplatform", label: "Payment Platform" },
]

export const LOAI_KET_QUA_OPTIONS: SelectProps["options"] = [
  { value: "Quyết định", label: "Quyết định" },
  { value: "Tờ trình", label: "Tờ trình" },
  { value: "Công văn", label: "Công văn" },
  { value: "Phiếu xin ý kiến", label: "Phiếu xin ý kiến" },
  { value: "Giấy phép", label: "Giấy phép" },
  { value: "Giấy chứng nhận", label: "Giấy chứng nhận" },
  { value: "Chứng chỉ", label: "Chứng chỉ" },
  { value: "Bằng công nhận", label: "Bằng công nhận" },
  { value: "Bản sao", label: "Bản sao" },
  { value: "Phiếu báo", label: "Phiếu báo" },
  { value: "Giấy xác nhận", label: "Giấy xác nhận" },
  { value: "Phù hiệu", label: "Phù hiệu" },
  { value: "Phiếu", label: "Phiếu" },
  { value: "Giấy khen", label: "Giấy khen" },
  { value: "Bằng khen", label: "Bằng khen" },
  { value: "Báo cáo", label: "Báo cáo" },
  { value: "Hướng dẫn", label: "Hướng dẫn" },
  { value: "Thông báo", label: "Thông báo" },
  { value: "Trích lục cải chính", label: "Trích lục cải chính" },
  { value: "Trích lục bản sao", label: "Trích lục bản sao" },
  { value: "Giấy phép xây dựng", label: "Giấy phép xây dựng" },
]
export const LaDuLieuThongKeCacNamOptions = [
  { label: "Toàn bộ", value: true },
  { label: "Dữ liệu hiện tại", value: false },
];
export type POST_CREATE_HOSO = { uploadSignedFile: boolean; allowSameFileName: boolean }