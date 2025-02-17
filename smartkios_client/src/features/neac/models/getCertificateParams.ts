export type NEACGetCertificateRequest = 
{
    user_id : string;
    ca_name : string;
}

export type NEACGetCertificateResponse =
{
    status_code : number;
    message : string;
    data : {
        user_certificates: NEACUserCertificateResponse[]
    };
}


export type NEACUserCertificateResponse = 
{
   cert_id : string;
   cert_data : string;
   serial_number : string;
   transaction_id : string;
}