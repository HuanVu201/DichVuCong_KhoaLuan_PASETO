import { Typography } from "antd"

export const TotalRecord = ({pageNumber, pageSize, count, style}: {style?: React.CSSProperties; pageNumber: number | undefined; pageSize?: number | undefined; count: number | undefined}) => {
    return <div style={{display:"flex", justifyContent:"end", ...style}}>{pageNumber && pageSize && count ? <Typography.Title level={5}>Hiển thị: {Math.min((pageNumber * pageSize), count)} trên tổng số {count} bản ghi</Typography.Title> : null}</div>
}
    