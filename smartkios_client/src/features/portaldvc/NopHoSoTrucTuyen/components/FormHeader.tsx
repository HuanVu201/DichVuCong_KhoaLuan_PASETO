import { IWithChildren } from "@/types"

export const FormHeader = ({children, extraInfo, style}: IWithChildren & {style?: React.CSSProperties; extraInfo?: React.ReactNode}) => {
    return <div className=" px-0 mb-1 d-flex" style={{borderBottom: "3px solid #903938", ...style}}>
        <h3 className="fw-bold mb-0 pb-1" style={{fontSize: 17}}>
            {children}
        </h3>
        {extraInfo}
    </div>
}