export const sendEMCAction = (maThuTuc: string, extraInfo: string = "", state: "1" | "0" = "1", trackId: string = "trackDVC" ) => {
    window._govaq.push([trackId, maThuTuc, state, extraInfo])
}