import { useEffect, useState } from "react"
import { ITinBaiPortal } from "../models/TinBai"
import { fileApi } from "@/features/file/services"
import { toast } from "react-toastify"

export const TinTucImages = ({ item }: { item: ITinBaiPortal }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    useEffect(() => {
        const fetchImage = async () => {
            if (item) {
                try {
                    const resFile = await fileApi.GetFilePublicByte({ path: item.anhDaiDien || '' });
                    const blob = resFile.data;
                    const url = URL.createObjectURL(blob);
                    setImageUrl(url);

                    // Giải phóng URL khi component unmount hoặc khi có URL mới
                    return () => {
                        URL.revokeObjectURL(url);
                    };
                } catch (error) {
                    console.log(error);
                }
            }
        };

        fetchImage();
    }, [item])

    return (
        <>
        {imageUrl ? (
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <img src={imageUrl} alt='' style={{ width: '100%', height: '100%' }} />
            </div>
        ) : (
            <p>Loading image...</p>
        )}
    </>)
}