import { useRef, useCallback, useState, useEffect, useMemo } from "react"
import { AntdMenu, AntdMenuProps } from "@/lib/antd/components"
import { DeleteOutlined, EditOutlined, FileAddOutlined } from "@ant-design/icons"
import { XoaKenhTin } from "./modals/XoaKenhTin"
import { ThemKenhTinCon } from "./modals/ThemKenhTinCon"
// import { updateKenhTin } from "./modals/SuaKenhTin"

const KENHTIN_CONTEXTMENU: AntdMenuProps<never>["items"] = [
  {
    label: 'Thêm mới kênh tin con',
    key: 'add',
    icon: <FileAddOutlined />,
  }
]

export const KenhTinActionContextMenu = ({ top, left, setVisible, id }: { top?: number, left?: number, id: string, setVisible: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [updateKenhTinModalVisible, setUpdateKenhTinModalVisible] = useState(false)
  const [deleteKenhTinModalVisible, setDeleteKenhTinModalVisible] = useState(false)
  const [addKenhTinModalVisible, setAddKenhTinModalVisible] = useState(false)
  const onCleanUp = useCallback(() => {
    setVisible(false)
  }, [])

  // useClickOutSide(ref, () => onCleanUp())
  useEffect(() => {

    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {

      if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
        if (!updateKenhTinModalVisible && !deleteKenhTinModalVisible && !addKenhTinModalVisible)
          onCleanUp()

      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, updateKenhTinModalVisible,addKenhTinModalVisible,deleteKenhTinModalVisible]);
  const onClick: AntdMenuProps<never>['onClick'] = (e) => {

    if (e.key == 'edit') {
      setUpdateKenhTinModalVisible(true)
    }
    if (e.key == 'delete') {
      setDeleteKenhTinModalVisible(true)
    }
    if (e.key == 'add') {
      setAddKenhTinModalVisible(true)
    }
  };
  return <div ref={ref} style={{ top, left }} className="context-menu-wrapper">
    <AntdMenu items={KENHTIN_CONTEXTMENU} mode="vertical" onClick={onClick} />

    {/* {updateKenhTinModalVisible ? <UpdateKenhTin handlerClose={() => {
      setUpdateKenhTinModalVisible(false)
      onCleanUp()
    }} folderId={id} /> : <></>} */}

    {deleteKenhTinModalVisible ? <XoaKenhTin handleCancel={() => {
      setDeleteKenhTinModalVisible(false)
      onCleanUp()
    }} folderId={id} /> : <></>}

    {addKenhTinModalVisible ? <ThemKenhTinCon handlerClose={() => {
      setAddKenhTinModalVisible(false)
    }} folderId={id} visible={addKenhTinModalVisible} /> : <></>}
  </div>


}