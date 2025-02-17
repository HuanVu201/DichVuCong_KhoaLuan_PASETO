import { useState, useRef, ComponentProps } from "react"
import { Modal, ModalProps } from "antd"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks"
import Draggable, { DraggableEventHandler } from "react-draggable"
export interface IAntdModalProps extends Omit<ModalProps, "open" | "title">{
    positionStyle?: React.CSSProperties
    visible: boolean,
    fullsize?: boolean,
    fullsizeScrollable?:boolean
    title: React.ReactNode,
    handlerOk?: () => void,
    handlerCancel?: () => void,
}

export const AntdModal = (props: IAntdModalProps) => {
    const {children, positionStyle, handlerOk, visible, fullsize, fullsizeScrollable, title, handlerCancel, ...rest} = props
    const [disable, setDisable] = useState(true)
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    })
    const dragRef = useRef<HTMLDivElement>(null)
    const onStart : DraggableEventHandler  = (_, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = dragRef.current?.getBoundingClientRect();
        if(targetRect){
            setBounds({
                left: -targetRect.left + uiData?.x,
                right: clientWidth - (targetRect.right - uiData?.x),
                top: -targetRect.top + uiData?.y,
                bottom: clientHeight - (targetRect.bottom - uiData?.y)
            })
        }
    }
    const onHandlerCancel = () => {
        handlerCancel ? handlerCancel() : null
    }
    const onHandlerOk = () => {
        handlerOk ? handlerOk() : null
    }
    return <Modal 
        open={visible}
        maskClosable={!fullsizeScrollable ?? !fullsize ?? true}
        wrapClassName={`modal-wrapper ${fullsize ? "fullsize" : ""} ${fullsizeScrollable ? "fullsizescrollable" : ""}`}
        style={{...positionStyle, }}
        title={<div style={{width:'100%', cursor:fullsize ? "default" : "move"}} onMouseOver={() => disable ? setDisable(false) : null} onMouseOut={() => setDisable(true)}>
            {title}
        </div>}
        maskStyle={{backgroundColor: fullsizeScrollable? "#fff" : ""}}
        onCancel={onHandlerCancel}
        onOk={onHandlerOk}
        modalRender={(modal) => (
            <Draggable 
                disabled={disable || fullsize || fullsizeScrollable}
                bounds={bounds}
                onStart={(event, uiData) => onStart(event, uiData)}
                nodeRef={dragRef}
                >
                <div ref={dragRef}>
                    {modal}
                </div>
            </Draggable>
        )}
        {...rest}
        >
        {children}
    </Modal>
}