export const CAP_THUC_HIEN_CONSTANTS = {
    "so-ban-nganh" : "Sở ban ngành",
    "quan-huyen" : "Huyện, thị xã, thành phố",
    "xa-phuong" : "Xã, phường, thị trấn"
} as const

export type CAP_THUC_HIEN = keyof typeof CAP_THUC_HIEN_CONSTANTS