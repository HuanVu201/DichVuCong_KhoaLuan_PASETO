import { FolderContextProvider } from "@/contexts/FolderContext";
import { Spliter } from "@/lib/spliter/Spliter";
import { CoCauToChuc } from "./leftside/CoCauToChuc";
import { DanhSachTab } from "./rightside/DanhSachTab";
import { CoCauModalProvider } from "../contexts/CoCauModalContext";

const CoCauToChucWrapper = () => {
  return (
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
          <section style={{ marginRight: 12, maxHeight: 600 }}>
            <CoCauToChuc />
          </section>
          <section style={{ marginLeft: 12 }}>
            <DanhSachTab />
          </section>
        </Spliter>
      </CoCauModalProvider>
    </FolderContextProvider>
  );
};

export default CoCauToChucWrapper;
