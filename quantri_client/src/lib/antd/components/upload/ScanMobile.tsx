import { Col, Modal, Row, Tag, UploadProps } from "antd";
import { ScanProvider, useScanContext, ScanContextType } from "./contexts/ScanContext";
import { AntdButton, AntdModal, AntdSpace } from "..";
import Dragger from "antd/es/upload/Dragger";
import { RcFile } from "antd/es/upload";
import { InboxOutlined } from "@ant-design/icons";
import { FileListRender } from "./components/ScanMobile/FileListRender";
import { ComponentProps } from "react";
import heic2any from 'heic2any';
import EXIF from 'exifr';

const convertHeicToJpeg = async (file: File): Promise<string> => {
  const conversionResult = await heic2any({ blob: file, toType: 'image/jpeg' });
  return readFileAsDataURL(conversionResult as Blob);
};

const readFileAsDataURL = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image data.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image data.'));
    };
    reader.readAsDataURL(blob);
  });
};

const rotateAndResizeImage = async (dataUrl: string): Promise<string> => {
  const maxWidth = 800;
  const maxHeight = 800;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = async () => {
      const orientation = await EXIF.orientation(img);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let width = img.width;
      let height = img.height;

      if ([5, 6, 7, 8].includes(orientation as number)) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      switch (orientation) {
        case 2: ctx?.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx?.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx?.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx?.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx?.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx?.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx?.transform(0, -1, 1, 0, 0, width); break;
        default: ctx?.transform(1, 0, 0, 1, 0, 0); break;
      }

      let width2 = canvas.width;
      let height2 = canvas.height;

      if (width2 > height2) {
        if (width2 > maxWidth) {
          height2 = (height *= maxWidth / width2);
          width2 = maxWidth;
        }
      } else {
        if (height2 > maxHeight) {
          width2 = (width *= maxHeight / height2);
          height2 = maxHeight;
        }
      }

      canvas.width = width2;
      canvas.height = height2;
      ctx?.drawImage(img, 0, 0, width2, height2);
      canvas.toBlob(blob => {
        const resizedReader = new FileReader();
        resizedReader.onload = () => resolve(resizedReader.result as string);
        resizedReader.onerror = reject;
        resizedReader.readAsDataURL(blob as Blob);
      }, 'image/jpeg', 0.8); // Adjust quality as needed
    };
    img.onerror = reject;
  });
};

function ScanMobile() {
  const { setFileList, clearState, extractPdfFromImages, pdfData, setPickFileNameModal, scanModalWrapper, setScanModalWrapper } = useScanContext()
  const beforeUpload: UploadProps["beforeUpload"] = async (_, files) => {
    const newFileList = await Promise.all(
      files.map(async (file) => {
        let dataUrl;

        if (file.type === 'image/heic' || file.type === 'image/heif') {
          dataUrl = await convertHeicToJpeg(file);
        } else {
          dataUrl = await readFileAsDataURL(file);
        }
        const resizedDataUrl = await rotateAndResizeImage(dataUrl);
        return {
          base64: resizedDataUrl,
          name: file.name,
          uid: file.uid,
          type: file.type
        };
      })
    );

    setFileList((curr) => {
      if (curr && curr.length) {
        const data = [...curr, ...newFileList]
        return [
          ...new Map(data.map((item) => [item.uid, item])).values(),
        ]
      }
      return [...newFileList]
    });
    return false;
  };

  const onSaveAndContinue = async () => {
    if (!pdfData) {
      return;
    }
    setPickFileNameModal(true);
  }

  const props: UploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    accept: "image/*",
    beforeUpload,
  };
  return (
    <>
      <Modal width={1280} style={{ top: 0, bottom: 0 }} footer={null} onCancel={() => {
        clearState()
      }} open={scanModalWrapper} title="Scan ảnh">
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
          <Dragger {...props} >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Chọn tệp hoặc kéo tệp
            </p>
          </Dragger>
          <Row gutter={[8, 0]}>
            <Col span={pdfData ? 12 : 24}><AntdButton style={{ width: "100%" }} onClick={extractPdfFromImages}>Trích xuất ảnh thành PDF</AntdButton></Col>
            {pdfData ? <Col span={12}><AntdButton style={{ width: "100%" }} onClick={onSaveAndContinue}>Lưu tệp và tiếp tục</AntdButton></Col> : null}
          </Row>
          {pdfData ? <div onClick={() => {
            // const iframe = "<iframe width='100%' height='100%' src='" + pdfData.output('datauristring') + "'></iframe>"
            // const x = window.open();
            // if(!x){
            //   return
            // }
            // x.location.href = pdfData.output('datauristring')
            // x.document.open();
            // x.document.write(iframe);
            // x.document.close();
            const a = document.createElement("a")
            a.href = URL.createObjectURL(pdfData.output("blob"))
            a.target = "_blank"
            a.click()
            // window.open()
          }} >Xem chi tiết tệp trên trình duyệt</div> : null}
          <FileListRender />
        </AntdSpace>
      </Modal>
      <AntdButton onClick={() => setScanModalWrapper(true)}>Scan ảnh</AntdButton>
    </>
  );
}

export const ScanWrapper = (props: Pick<ComponentProps<typeof ScanProvider>, "onSuccess">) => {
  return <ScanProvider onSuccess={props.onSuccess}>
    <ScanMobile />
  </ScanProvider>
}

export default ScanWrapper