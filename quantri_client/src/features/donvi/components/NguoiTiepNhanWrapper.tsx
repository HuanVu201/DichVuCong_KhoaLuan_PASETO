import { FolderContextProvider } from "@/contexts/FolderContext";
import { CoCauToChuc } from "@/features/cocautochuc/components/leftside/CoCauToChuc";
import { CoCauModalProvider } from "@/features/cocautochuc/contexts/CoCauModalContext";
import { Spliter } from "@/lib/spliter/Spliter";
import { DanhSachTabNguoiTiepNhan } from "./DanhSachTab";
import { AntdModal } from "@/lib/antd/components";
import { NguoiTiepNhanLeftSide } from "./NguoiTiepNhanLeftSide";
import { DefaultOptionType } from "antd/es/select";

const NguoiTiepNhanWrapper = ({handleCancel} : {handleCancel : any}) => {
    return (
        <AntdModal handlerCancel={handleCancel} title="Chọn người tiếp nhận" visible={true} footer={null} fullsizeScrollable>
            <FolderContextProvider>
                <CoCauModalProvider>
                    <Spliter
                        customClassName="custom-react-spliter"
                        primaryIndex={1}
                        percentage={true}
                        primaryMinSize={25}
                        secondaryMinSize={15}
                        secondaryInitialSize={20}
                    >
                        <section style={{ marginRight: 12, maxHeight: 1000 }}>
                            <NguoiTiepNhanLeftSide />
                        </section>
                        <section style={{ marginLeft: 12 }}>
                            <DanhSachTabNguoiTiepNhan />
                        </section>
                    </Spliter>
                </CoCauModalProvider>
            </FolderContextProvider>
        </AntdModal>
    );
};

export default NguoiTiepNhanWrapper;
