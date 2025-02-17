import { IHoSo } from "@/features/hoso/models";
import { Rule } from "antd/es/form";

export const INPUT_RULES: Record<keyof Pick<IHoSo, "soGiayToChuHoSo" | "chuHoSo" | "soDienThoaiChuHoSo" | "diaChiChuHoSo" | "ngayHenTra" | "ngayTiepNhan" | "trichYeuHoSo" | "emailChuHoSo">, Rule[]> = {
    soGiayToChuHoSo: [{ required: true, message: "Vui lòng nhập số giấy tờ chủ hồ sơ!" }],
    chuHoSo: [{ required: true, message: "Vui lòng nhập tên chủ hồ sơ!" }],
    emailChuHoSo: [ {
        type: 'email',
        message: 'Vui lòng nhập đúng định dạng email!',
    }],
    soDienThoaiChuHoSo: [{ required: true, message: "Vui lòng nhập số điện thoại!" }, { min:10, max:13, message:"Độ dài không hợp lệ", required: true }, {
        required: true,
        pattern: new RegExp(/^-?([0-9][0-9]*)(\.[0-9]*)?$/),
        message: "Vui lòng nhập đúng định dạng!",
    }],
    diaChiChuHoSo: [{ required: true, message: "Vui lòng nhập địa chỉ chủ hồ sơ!" }],
    ngayHenTra: [{ required: true, message: "Không được để trống!" }],
    ngayTiepNhan: [{ required: true, message: "Không được để trống!" }],
    trichYeuHoSo: [{ required: true, message: "Không được để trống!" }],
}
export function hasDuplicateValue(arr: string[] | undefined) {
    if(!arr){
        return false;
    }
    let counts : Record<string,number>= {};
    for (let i = 0; i < arr.length; i++) {
        let value = arr[i];
        counts[value] = (counts[value] || 0) + 1;
        if (counts[value] === 2) {
            return true; // Nếu có giá trị xuất hiện hai lần, trả về true
        }
    }
    return false; // Nếu không có giá trị nào xuất hiện hai lần, trả về false
}