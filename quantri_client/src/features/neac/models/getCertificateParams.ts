import { IBaseExt } from "@/models";

export type NEACGetCertificateRequest =
    {
        user_id: string;
        ca_name: string;
    }

export type NEACGetCertificateResponse =
    {
        status_code: number;
        message: string;
        data: {
            transaction_id: string;
            user_certificates: NEACUserCertificateResponse[]
        };
    }

export interface IKySoNEAC extends IBaseExt{
    soGiayTo?: string
    caName?: string
    duongDanFile?: string
    ngayKy?: string
}


export type NEACUserCertificateResponse =
    {
        cert_id: string;
        cert_data: string;
        serial_number: string;
        transaction_id: string;
    }