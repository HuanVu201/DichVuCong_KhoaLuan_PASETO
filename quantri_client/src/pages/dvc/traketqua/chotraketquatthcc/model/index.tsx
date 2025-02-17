export interface IBanGiaoKetQuaParams {
    ids: string[],
    tenGiayTo: string
    maLoaiPhieu: string
    loaiPhoi: string
    code: string
}


export interface IBanGiaoKetQuaResponse {
    data: IBanGiaoKetQua
}
export interface IBanGiaoKetQua {
    urlPhoi?: string
    idQrCode?: string
    tenTinh?: string
    hoSos: IBanGiaoKetQuaElement[];
}
export interface IBanGiaoKetQuaElement {
    id: string
    maHoSo?: string
    donViId?: string
    maTTHC?: string
    maLinhVucChinh?: string
    chuHoSo?: string
    diaChiChuHoSo?: string
    trichYeuHoSo?: string
    trichYeuKetQua?: string
    kenhThucHien?: string
    catalog?: string
    groupName?: string
    maDinhDanh?: string
    maTinh?: string
    trangThaiPhiLePhi?: boolean
    dangKyNhanHoSoQuaBCCIData?: string
    loaiKetQua?: string
    ngayXacNhanKetQua?: string
}