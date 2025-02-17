import { ID_SEPARATE } from "@/data";
import { fileApi } from "@/features/file/services";
import { giayToHoSoApi } from "@/features/giaytohoso/service";
import { XuLyHoSoProvider } from "@/features/hoso/contexts/XuLyHoSoContext";
import { NGUOI_TU_CHOI } from "@/features/hoso/data/signData";
import { AntdButton, AntdModal, AntdSpace } from "@/lib/antd/components"
import { useAppSelector } from "@/lib/redux/Hooks";
import { PhieuTuChoiTiepNhanTrucTuyen } from "@/pages/dvc/MauPhieu/documents/pdf/PhieuTuChoiTiepNhanTrucTuyen/PhieuTuChoiTiepNhanTrucTuyen";
import { btnSignClick, getAutoPositionSigned, togglerSinged } from "@/utils/common";
import { LoadingOutlined } from "@ant-design/icons";
import { ListElementSupport } from "@ckeditor/ckeditor5-html-support";
import { FormInstance, Spin } from "antd";
import axios from "axios";
import { ppid } from "process";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from 'file-saver'

export const XuatPhieuModal = ({ visible, handlerClose, lyDoTuChoi, setNewFile, urlPhieu, setUrlPhieu, onChangeLyDo, setOnChangeLyDo, maGiayToHoSo, setMaGiayToHoSo, form, loadingPhieu, setLoadingPhieu }:
   {
      visible: boolean; handlerClose: () => void; lyDoTuChoi: string | undefined,
      setNewFile: (newFile: string) => void,
      urlPhieu: string | undefined, setUrlPhieu: (url: string) => void,
      onChangeLyDo: boolean, setOnChangeLyDo: (onchange: boolean) => void
      maGiayToHoSo: string | undefined, setMaGiayToHoSo: (maGiayToHoSo: string | undefined) => void,
      form: FormInstance<any>
      loadingPhieu: boolean, setLoadingPhieu: (onchange: boolean) => void
   }) => {


   const { data: user } = useAppSelector(state => state.user)

   const [pdfBlob, setPdfBlob] = useState<Blob>()
   const [xuatWord, setXuatWord] = useState<boolean>(false)
   const { publicModule: config } = useAppSelector(state => state.config)
   const [xuatDocx, setXuatDocx] = useState<boolean>(false)
   useEffect(() => {
      config?.map((item: any) => {
         if (item.code == 'xuat-docx' && item.content == '1')
            setXuatDocx(true)
      })
   }, [config])

   const handlerCancel = () => {
      handlerClose();
   }

   useEffect(() => {
      const handleKeyPress = (event: any) => {
         if (event.ctrlKey && event.key === 'p') {
            event.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt khi nhấn Ctrl+P
            taiPhieu(); // Gọi hàm in PDF
         }
      };
      // Nghe sự kiện keydown trên cả trang web
      document.addEventListener('keydown', handleKeyPress);
      // Xóa bỏ sự kiện khi component unmount
      return () => {
         document.removeEventListener('keydown', handleKeyPress);
      };
   }, []);


   const taiPhieu = async () => {
      const iframe: any = document.getElementById('iframePdf')
      if (iframe) {
         iframe.contentWindow.print(); // Gọi hàm in của iframe
      }
   }

   const onSave = (urlDinhKem: string | undefined, signed: boolean = false) => {
      if (urlDinhKem) {
         setNewFile(urlDinhKem)
         togglerSinged(form.getFieldValue("dinhKemTuChoi"), signed)
         setOnChangeLyDo(false)
         handlerCancel()
      }
      else {
         toast.error("Không có đường dẫn phiếu!")
      }

   }
   const onSignAndSave = async (signPos: string) => {
      let urlPdfPhieuRequest: string = ''
      let idGiayToHoSo: string = ''
      let signedDigital: boolean = false
      if (urlPhieu) {
         try {
            const { data: {
               data: {
                  hasDigitalSinature
               }
            } } = await fileApi.VerifyDigitalSignature(urlPhieu.split(ID_SEPARATE))
            if (hasDigitalSinature) {
               signedDigital = true
               toast.warning("Phiếu đã được ký số!")
            }

         } catch {
            toast.warn('Có lỗi khi kiểm tra ký số!')
         }
      }

      if (pdfBlob && !signedDigital) {
         const url = URL.createObjectURL(pdfBlob as Blob)
         await btnSignClick(
            url,
            'XuatPhieu',
            (urlFileSigned, oldFile) => {
               urlPdfPhieuRequest = urlFileSigned
            }, async (fileName: string) => {
               const res = await axios.get(fileName, { responseType: "blob" })
               return res.data
            }, [{
               name: 'Chữ ký',
               isDefault: true,
               appearance: {
                  // font family of the signature appearence
                  // fontFamily: "Times New Roman",
                  // text color of the signature
                  // textColor: 0x8800FF,
               },
               autoPosition: {
                  ...getAutoPositionSigned(user?.fullName ?? "", signPos),
               }
            }], true
         )
      }
      if (urlPdfPhieuRequest && !signedDigital) {
         setUrlPhieu(urlPdfPhieuRequest)
         onSave(urlPdfPhieuRequest, true)
         // const resSearch = await giayToHoSoApi.Search({ maGiayTo: maGiayToHoSo, suDung: true })
         // const giayToHoSoSearch = resSearch.data.data
         // if (giayToHoSoSearch) {
         //    idGiayToHoSo = giayToHoSoSearch[0].id
         // }
         //Cập nhật url dã ký số cho phiếu cũ 
         const resUpdate = await giayToHoSoApi.UpdateGTHSWithMaGiayTo({ maGiayTo: maGiayToHoSo, pdfPhieu: urlPdfPhieuRequest })

      }
   }

   const exportWord = () => {
      setXuatWord(true)
   }

   return <AntdModal title="PHIẾU TỪ CHỐI" width={"100%"} fullsizeScrollable visible={visible} handlerCancel={handlerCancel} footer={
      <AntdSpace direction="horizontal">
         <AntdButton key={4} onClick={() => exportWord()} hidden={!xuatDocx} >Xuất phiếu word</AntdButton>
         <AntdButton key={3} onClick={() => onSignAndSave(NGUOI_TU_CHOI)}>Ký số và lưu tệp</AntdButton>
         <AntdButton key={2} onClick={() => onSave(urlPhieu || undefined)}>Lưu tệp</AntdButton>
         <AntdButton key={1} onClick={handlerCancel}>Đóng</AntdButton>
      </AntdSpace>
   }>
      <Spin spinning={loadingPhieu}
         indicator={<LoadingOutlined style={{ fontSize: 50, color: '#f0ad4e' }} spin />}
      >
         <PhieuTuChoiTiepNhanTrucTuyen lyDoTuChoi={lyDoTuChoi}
            setUrlPhieu={setUrlPhieu}
            maGiayToHoSo={maGiayToHoSo} setMaGiayToHoSo={setMaGiayToHoSo}
            pdfBlob={pdfBlob} setPdfBlob={setPdfBlob}
            onChangeLyDo={onChangeLyDo}
            loadingPhieu={loadingPhieu} setLoadingPhieu={setLoadingPhieu}
            xuatWord={xuatWord} setXuatWord={setXuatWord}
         />
      </Spin>
   </AntdModal>

}
