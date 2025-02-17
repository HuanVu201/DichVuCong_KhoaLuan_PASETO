import { IHoSo } from "@/features/hoso/models";
import { Rule } from "antd/es/form";

export const INPUT_RULES : Record<keyof Pick<IHoSo, "soGiayToChuHoSo" | "chuHoSo" | "soDienThoaiChuHoSo" | "diaChiChuHoSo" | "ngayHenTra" | "ngayTiepNhan" | "trichYeuHoSo">, Rule[]> = {
    soGiayToChuHoSo: [{required : true, message : "Vui lòng nhập số giấy tờ chủ hô sơ!"}],
    chuHoSo: [{required : true, message : "Vui lòng nhập tên chủ hồ sơ!"}],
    soDienThoaiChuHoSo: [{required : true, message : "Vui lòng nhập số điện thoại!"},{
        required: true,
        pattern: new RegExp(/\d+/g),
        message: "Vui lòng nhập chữ số!"
    }],
    diaChiChuHoSo: [{required : true, message : "Vui lòng nhập địa chỉ chủ hồ sơ!"}],
    ngayHenTra: [{required : true, message : "Không được để trống!"}],
    ngayTiepNhan: [{required : true, message : "Không được để trống!"}],
    trichYeuHoSo: [{required : true, message : "Không được để trống!"}],
}