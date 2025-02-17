declare global {
    interface Window {
        objDataCSDLDanCu: any;
        objDataNopHoSo: any;
        downloadPhieuPdf: () => void;
        td: {
            eSign: any
        };
        _govaq: string[][]
    }
}
export {};