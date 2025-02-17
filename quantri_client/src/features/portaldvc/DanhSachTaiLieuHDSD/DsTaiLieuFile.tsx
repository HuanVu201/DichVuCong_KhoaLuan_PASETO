import { IDSTaiLieuHDSD } from "@/features/portaldvc_admin/DSTaiLieuHDSD/models"
import { AntdButton } from "@/lib/antd/components"
import { callApiAndDisplayPublicFile, getFileName, getUrlFromBlobPublic } from "@/utils"
import { useState } from "react"

export const DsTaiLieuFile = ({ item }: { item: IDSTaiLieuHDSD }) => {
    const [loading, setLoading] = useState(false)

    return (
        <AntdButton type='link' loading={loading} onClick={async () => {
            try {
                setLoading(true)
                const file = await getUrlFromBlobPublic(item.tepDinhKem)
                await callApiAndDisplayPublicFile(file)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
            // finally {
            //     setLoading(false)

            // }
        }}>{getFileName(item.tepDinhKem)}</AntdButton>
    )
}