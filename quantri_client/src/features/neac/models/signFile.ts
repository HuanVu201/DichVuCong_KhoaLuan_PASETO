export type NEACSignFileRequest =
{
    user_id : string;
    ca_name : string;
    cert_data : string;
    serial_number : string;
    transaction_id : string;
    sign_files : NEACSignFile[];
}

export type NEACSignFileResponse =
{
    status_code : number;
    message : string;
    serial_number : string;
    transaction_id : string;
    sign_files : NEACSignFile;
}

export type NEACSignFile =
{
    doc_id : string;
    file_name : string;
    file_base64 : string;
}