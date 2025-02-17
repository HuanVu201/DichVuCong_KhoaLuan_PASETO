import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { AntdButton, AntdSpace } from "../antd/components"
import { toast } from "react-toastify";

const padStates = {
    closed: 0,
    opened: 1
};
const dialogTypes = {
    signatur: 0,
    pdf: 1
};
const padModes = {
    Default: 0,
    API: 1
};

const OS_WINDOWS = "Windows";
const OS_LINUX = "Linux";
const wsUri = "wss://local.signotecwebsocket.de:49494";
const deviceCapabilities = {
    HasColorDisplay: 0x00000001,
    HasBacklight: 0x00000002,
    SupportsVerticalScrolling: 0x00000004,
    SupportsHorizontalScrolling: 0x00000008,
    SupportsPenScrolling: 0x00000010,
    SupportsServiceMenu: 0x00000020,
    SupportsRSA: 0x00000040,
    SupportsContentSigning: 0x00000080,
    SupportsH2ContentSigning: 0x00000100,
    CanGenerateSignKey: 0x00000200,
    CanStoreSignKey: 0x00000400,
    CanStoreEncryptKey: 0x00000800,
    CanSignExternalHash: 0x00001000,
    SupportsRSAPassword: 0x00002000,
    SupportsSecureModePassword: 0x00004000,
    Supports4096BitKeys: 0x00008000,
    HasNFCReader: 0x00010000,
    SupportsKeyPad: 0x00020000,
    SupportsKeyPad32: 0x00040000,
    HasDisplay: 0x00080000,
    SupportsRSASignPassword: 0x00100000
};
const docHashes = {
    kSha1: 0,
    kSha256: 1
};
const field_name = "Signature 1";
const custom_text = "Please sign!";

export type SignotecProps = {
    canvasStyle?: React.CSSProperties;
}
export type SignotecRef = {
    confirmSignture: () => Promise<any>;
}
const STPadServerLibDefault = window.STPadServerLib.STPadServerLibDefault;
const STPadServerLibCommons = window.STPadServerLib.STPadServerLibCommons;
const STPadServerLibApi = window.STPadServerLib.STPadServerLibApi;

export const Signotec = forwardRef<SignotecRef, SignotecProps>((props, ref) => {
    const { canvasStyle } = props
    const liveSignatureCanvasRef = useRef<HTMLCanvasElement>(null)
    const [signData, setSignData] = useState({
        padType: 0,
        padIndex: 0,
        supportsRSA: false,
        canStoreEncryptKey: false,
        os: "Unknown",
        padState: padStates.closed,
        scaleFactorX: 1.0,
        scaleFactorY: 1.0,
        sampleRate: undefined,
        docHash_type: docHashes.kSha256,
        sha1_dochash: "AAECAwQFBgcICQoLDA0ODxAREhM=",
        sha256_dochash: "AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8=",
        encryption_cert: "MIICqTCCAZGgAwIBAgIBATANBgkqhkiG9w0BAQUFADAYMRYwFAYDVQQKEw1EZW1vIHNpZ25vdGVjMB4XDTE1MTAwNzA5NDc1MFoXDTI1MTAwNDA5NDc1MFowGDEWMBQGA1UEChMNRGVtbyBzaWdub3RlYzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAOFFpsZexYW28Neznn26Bp9NVCJywFFj1QYXg3DDsaSyr6ubuqXKSC4jkenIGBnom/zKPxwPDtNXuy+nyDYFXYNn87TUdh/51CCr3uk9kR9hvRIzBKwkOx0DGLdCoSGAKDOPHwx1rE0m/SOqYOQh6XFjlybw+KzDZcPvhf2Fq/IFNXHpk8m0YHMAReW8q34CYjk9ZtcIlrcYGTikQherOtYM8CaEUPDd6vdJgosGWEnDeNXDCAIWTFc5ECJm9Hh7a47eF3BG5Pjl1QfOSA8lQBV5eTjQc1n1rWCWULt143nIbN5yCFrn0D8W6+eKJV5urETxWUQ208iqgeU1bIgKSEUCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAt2ax8iwLFoOmlAOZTQcRQtjxseQAhgOTYL/vEP14rPZhF1/gkI9ZzhESdkqR8mHIIl7FnfBg9A2v9ZccC7YgRb4bCXNzv6TIEyz4EYXNkIq8EaaQpvsX4+A5jKIP0PRNZUaLJaDRcQZudd6FMyHxrHtCUTEvORzrgGtRnhBDhAMiSDmQ958t8RhET6HL8C7EnL7f8XBMMFR5sDC60iCu/HeIUkCnx/a2waZ13QvhEIeUBmTRi9gEjZEsGd1iZmgf8OapTjefZMXlbl7CJBymKPJgXFe5mD9/yEMFKNRy5Xfl3cB2gJka4wct6PSIzcQVPaCts6I0V9NfEikXy1bpSA==",
        encryption_cert_only_when_empty: "TRUE",
        dialogType: dialogTypes.signatur,
        padMode: padModes.Default,
    })

    const { canStoreEncryptKey, padMode, dialogType, padIndex, encryption_cert, encryption_cert_only_when_empty, padType, supportsRSA, os, padState, docHash_type, sampleRate, scaleFactorX, scaleFactorY, sha1_dochash, sha256_dochash } = signData
    const default_dochash = docHash_type == docHashes.kSha256 ? sha256_dochash : docHash_type == docHashes.kSha1 ? sha1_dochash : ""

    const rsa_scheme = STPadServerLibDefault.RsaScheme.PSS
    const padConnectionType = "HID"

    useImperativeHandle(ref, () => ({
        confirmSignture: async () => await signature_confirm_send(),
    }), [signData.sampleRate, signData.os])

    STPadServerLibCommons.handleDisconnect = function (index: number) {
        disconnect_send(index);
    }

    STPadServerLibCommons.handleNextSignaturePoint = function (x: number, y: number, p: number) {
        signature_point_send(x, y, p);
    }

    STPadServerLibDefault.handleRetrySignature = function () {
        signature_retry_send();
    }

    STPadServerLibDefault.handleConfirmSignature = function () {
        signature_confirm_send();
    }

    STPadServerLibDefault.handleCancelSignature = function () {
        signature_cancel_send();

    }

    STPadServerLibDefault.handleConfirmSelection = function () {
        selection_confirm_send();
    }

    STPadServerLibDefault.handleSelectionChange = function (fieldId: any, fieldChecked: any) {
        selection_change_send(fieldId, fieldChecked);
    }

    STPadServerLibDefault.handleCancelSelection = function () {
        selection_cancel_send();
    }

    STPadServerLibDefault.handleError = function (error_context: any, return_code: any, error_description: any) {
        error_send(error_context, return_code, error_description);
    }

    STPadServerLibApi.Sensor.handleHotSpotPressed = function (button: any) {
        api_sensor_hot_spot_pressed_send(button);
    }

    STPadServerLibApi.Sensor.handleDisplayScrollPosChanged = function (xPos: any, yPos: any) {
        api_display_scroll_pos_changed_send(xPos, yPos);
    }
    useEffect(() => {
        STPadServerLibCommons.handleLogging = logMessage;
        try {
            STPadServerLibCommons.createConnection(wsUri, onOpen, () => { }, () => { });
        } catch (error) {
            STPadServerLibCommons.destroyConnection()
            STPadServerLibCommons.createConnection(wsUri, onOpen, () => { }, () => { });
        }

        return () => {
            (async () => {
                var closePadParams = new STPadServerLibDefault.Params.closePad(padIndex);
                await STPadServerLibDefault.closePad(closePadParams);
                STPadServerLibCommons.destroyConnection()
            })()
        }
    }, [])
    function onOpen(evt: any) {
        get_server_version();
    }
    async function get_server_version() {
        try {
            const serverVersion = await STPadServerLibCommons.getServerVersion();
            setSignData((curr) => ({ ...curr, os: serverVersion.os }))
            // set_states_of_ui_elements();
        } catch (error: any) {
            console.error(error?.errorMessage);
        }
    }
    function logMessage(msg: string) {
        // console.log(msg);
    }

    function disconnect_send(index: number) {
        var msg = "The pad (index: " + index + ") has been disconnected.";
        // alert(msg);
        console.log(msg)
        resetInterface();
        setSignData((curr) => ({ ...curr, padState: padStates.closed, dialogType: dialogTypes.signatur }))
    }
    function error_send(error_context: any, return_code: any, error_description: any) {
        var ret = return_code;
        if (ret < 0) {
            console.log("Failed to confirm the signature. Reason: " + error_description + ", Context: " + error_context);
        }
    }
    function api_sensor_hot_spot_pressed_send(button: any) {
        // switch (button) {
        //     // cancel signing process
        // case cancelButton:
        //     if (dialogType == dialogTypes.pdf) {
        //         api_close_pad();
        //     } else if (dialogType == dialogTypes.signatur) {
        //         signature_cancel_send();
        //     } else {
        //         dialogType = dialogTypes.signatur;
        //         alert("invalid dialogType");
        //         return;
        //     }
        //     break;

        //     // restart signing process
        // case retryButton:
        //     signature_retry_send();
        //     break;

        //     // confirm signing process
        // case confirmButton:
        //     if (dialogType == dialogTypes.pdf) {
        //         api_pdf_dialog_end();
        //     } else if (dialogType == dialogTypes.signatur) {
        //         signature_confirm_send();
        //     } else {
        //         dialogType = dialogTypes.signatur;
        //         alert("invalid dialogType");
        //         return;
        //     }
        //     break;

        // default:
        //     alert("unknown button id: " + button);
        // }
    }
    function api_display_scroll_pos_changed_send(xPos: any, yPos: any) {
        console.log(xPos + "," + yPos);
    }
    async function selection_cancel_send() {
        const sigcanvas = liveSignatureCanvasRef.current
        var ctx = sigcanvas?.getContext("2d");

        if (!ctx || !sigcanvas) {
            console.log("ctx or sigcanvas is null")
            return
        }
        if (padMode == padModes.Default) {
            // default mode
            ctx.clearRect(0, 0, sigcanvas.width, sigcanvas.height);
            try {
                await STPadServerLibDefault.cancelSignature();
                default_close_pad();
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
        } else if (padMode == padModes.API) {// API mode
            // do nothing
        } else {
            alert("invalid padMode");
            return;
        }
    }
    function selection_change_send(fieldId: any, fieldChecked: any) {
        // if (padMode == padModes.Default) {
        //     // default mode
        //     for (i = 1; i <= document.getElementById("check_boxes_selectedElements").value; i++) {
        //         if (document.getElementById("fieldID" + i).value == fieldId) {
        //             if (fieldChecked == "TRUE") {
        //                 document.getElementById("fieldChecked" + i).checked = true;
        //             } else {
        //                 document.getElementById("fieldChecked" + i).checked = false;
        //             }
        //         }
        //     }
        // } else if (padMode == padModes.API) {// API mode
        // // do nothing
        // } else {
        //     alert("invalid padMode");
        //     return;
        // }
    }
    function selection_confirm_send() {
        if (padMode == padModes.Default) {
            // default mode
            var status = '';
            // for (i = 1; i <= document.getElementById("check_boxes_selectedElements").value; i++) {
            //     status += 'Feld ' + i + ' = ' + document.getElementById("fieldChecked" + i).checked + '\n';
            // }
            alert(status);
            signature_start();
        } else if (padMode == padModes.API) {// API mode
            // do nothing
        } else {
            alert("invalid padMode");
            return;
        }
    }
    async function signature_retry_send() {
        const sigcanvas = liveSignatureCanvasRef.current
        var ctx = sigcanvas?.getContext("2d");

        if (!ctx || !sigcanvas) {
            console.log("ctx or sigcanvas is null")
            return
        }
        if (padMode == padModes.Default) {
            // default mode
            try {
                await STPadServerLibDefault.retrySignature();
                ctx.clearRect(0, 0, sigcanvas.width, sigcanvas.height);
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
        } else if (padMode == padModes.API) {
            // API mode
            try {
                await STPadServerLibApi.Signature.retry();
                ctx.clearRect(0, 0, sigcanvas.width, sigcanvas.height);
            } catch (error) {
                handleError(error);
                api_close_pad();
            }
        } else {
            alert("invalid padMode");
            return;
        }
    }
    async function api_close_pad() {
        if (padState == padStates.opened) {
            try {
                var closePadParams = new STPadServerLibApi.Device.Params.close(padIndex);
                await STPadServerLibApi.Device.close(closePadParams);
                setSignData((curr) => ({ ...curr, padState: padStates.closed }))
            } catch (error) {
                handleError(error);
            }
        }
    }
    async function signature_cancel_send() {
        const sigcanvas = liveSignatureCanvasRef.current
        var ctx = sigcanvas?.getContext("2d");

        if (!ctx || !sigcanvas) {
            console.log("ctx or sigcanvas is null")
            return
        }
        if (padMode == padModes.Default) {
            // default mode
            try {
                await STPadServerLibDefault.cancelSignature();
                ctx.clearRect(0, 0, sigcanvas.width, sigcanvas.height);
                default_close_pad();
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
        } else if (padMode == padModes.API) {
            // API mode
            try {
                var cancelParams = new STPadServerLibApi.Signature.Params.cancel();
                cancelParams.setErase(0);
                await STPadServerLibApi.Signature.cancel(cancelParams);
                ctx.clearRect(0, 0, sigcanvas.width, sigcanvas.height);
                api_close_pad();
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
        } else {
            alert("invalid padMode");
            return;
        }
    }
    function signature_point_send(x: number, y: number, p: number) {
        const sigcanvas = liveSignatureCanvasRef.current
        var ctx = sigcanvas?.getContext("2d");
        if (!ctx) {
            console.log("ctx is null")
            return
        }
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#0000FF"
        ctx.lineWidth = 4.5;
        ctx.lineCap = "round";

        if (p == 0) {
            drawStrokeStartPoint(ctx, x * scaleFactorX, y * scaleFactorY);
        } else {
            drawStrokePoint(ctx, x * scaleFactorX, y * scaleFactorY);
        }
    }

    const onSign = async () => {
        resetInterface()
        getSignatureDefault()
    }
    async function signature_confirm_send() {
        if (padState == padStates.closed) {
            return;
        }
        const sigcanvas = liveSignatureCanvasRef.current
        var ctx = sigcanvas?.getContext("2d");

        if (!ctx || !sigcanvas) {
            console.log("ctx is null")
            return
        }
        if (padMode == padModes.Default) {
            // default mode
            try {
                const signature = await STPadServerLibDefault.confirmSignature();
                // check if there are enough points for a valid signature
                if (!sampleRate) {
                    console.log("chưa có sampleRate")
                    return;
                }
                if ((signature.countedPoints / sampleRate) <= 0.2) {
                    toast.warn("Chữ ký quá ngắn, vui lòng thử lại")
                    await STPadServerLibDefault.retrySignature();
                    ctx.clearRect(0, 0, sigcanvas.width, sigcanvas.height);
                    return;
                } else if (supportsRSA) {
                    const signingCert = await STPadServerLibDefault.getSigningCert();
                } else {
                }
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
            console.log(os);

            try {
                if (os == OS_WINDOWS) {
                    var getSignatureImageParams = new STPadServerLibDefault.Params.getSignatureImage();
                    getSignatureImageParams.setFileType(STPadServerLibDefault.FileType.PNG);
                    getSignatureImageParams.setPenWidth(5);
                    const signatureImage = await STPadServerLibDefault.getSignatureImage(getSignatureImageParams);
                    default_close_pad();
                    return "data:image/png;base64," + signatureImage.file;
                    // document.getElementById("Signature_0").src = "data:image/png;base64," + signatureImage.file;
                }
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
            try {
                var getSignatureDataParams = new STPadServerLibDefault.Params.getSignatureData();
                getSignatureDataParams.setRsaScheme(rsa_scheme);
                const signatureData = await STPadServerLibDefault.getSignatureData(getSignatureDataParams);
                // if (supportsRSA) {
                //     if (signatureData.certId !== undefined) {
                //         document.getElementById("biometryCertID_0").innerHTML = signatureData.certId;
                //     }
                //     document.getElementById("RSAScheme_0").innerHTML = rsa_scheme;
                //     if (signatureData.rsaSignature !== undefined) {
                //         document.getElementById("RsaSignature_0").value = signatureData.rsaSignature;
                //     }
                // } else {
                //     document.getElementById("biometryCertID_0").innerHTML = "";
                //     document.getElementById("RSAScheme_0").innerHTML = "";
                //     document.getElementById("RsaSignature_0").value = "";
                // }
                if (signatureData.signData !== undefined) {
                    // default_close_pad();
                    // return "data:image/png;base64, " + signatureData.signData;
                    // setSignData((curr) => ({...curr, base64Data: signatureData.signData}))
                    // document.getElementById("SignData_0").value = signatureData.signData;
                }
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
            default_close_pad();
        } else if (padMode == padModes.API) {
            // API mode
            try {
                const signature = await STPadServerLibApi.Signature.confirm();
                // check if there are enough points for a valid signature
                if (!sampleRate) {
                    console.log("chưa có samplerate")
                    return
                }
                if ((signature.countedPoints / sampleRate) <= 0.2) {
                    alert("The signature is too short. Please sign again!");
                    await STPadServerLibDefault.retrySignature();
                    ctx.clearRect(0, 0, sigcanvas.width, sigcanvas.height);
                    return;
                }
                if (os == OS_WINDOWS) {
                    var saveAsStreamExParams = new STPadServerLibApi.Signature.Params.saveAsStreamEx(300, 0, 0, STPadServerLibApi.FileType.PNG, 5, "#000000", 0);
                    const signatureImage = await STPadServerLibApi.Signature.saveAsStreamEx(saveAsStreamExParams);
                    // document.getElementById("Signature_0").src = "data:image/png;base64," + signatureImage.image;
                }
            } catch (error) {
                handleError(error);
                default_close_pad();
            }
            // try {
            //     if (supportsRSA) {
            //         let params = new STPadServerLibApi.RSA.Params.saveSigningCertAsStream(certtype);
            //         const signingCert = await STPadServerLibApi.RSA.saveSigningCertAsStream(params);
            //         // document.getElementById("signatureCert_0").innerHTML = signingCert.signingCert;
            //         var hash_value;
            //         if (api_dochash === undefined || api_dochash === null) {
            //             hash_value = HashValue.kHash2;
            //         } else {
            //             hash_value = HashValue.kCombination;
            //         }
            //         const options = 0;
            //         const sign_password = "";
            //         params = new STPadServerLibApi.RSA.Params.signPw(rsa_scheme,hash_value,options,sign_password);
            //         const signature = await STPadServerLibApi.RSA.signPw(params);
            //         document.getElementById("RSAScheme_0").innerHTML = rsa_scheme;

            //         document.getElementById("RsaSignature_0").value = signature.rsaSignature;
            //         const encryptionCertId = await STPadServerLibApi.RSA.getEncryptionCertId();
            //         document.getElementById("biometryCertID_0").innerHTML = encryptionCertId.encryptionCertId;
            //         params = new STPadServerLibApi.RSA.Params.getRSASignData(options);
            //         const signData = await STPadServerLibApi.RSA.getRSASignData(params);
            //         document.getElementById("SignData_0").value = signData.rsaSignData;
            //     } else {
            //         const signData = await STPadServerLibApi.Signature.getSignData();
            //         document.getElementById("SignData_0").value = signData.signData;
            //     }
            // } catch (error) {
            //     handleError(error);
            //     default_close_pad();
            // }
            api_close_pad();
        } else {
            alert("invalid padMode");
            return;
        }
    }

    async function getSignatureDefault() {
        // search for pads begin
        try {
            var searchForPadsParams = new STPadServerLibDefault.Params.searchForPads();
            searchForPadsParams.setPadSubset(padConnectionType);
            // console.log("padConnectionType", padConnectionType);
            const pads = await STPadServerLibDefault.searchForPads(searchForPadsParams);
            // console.log("pads", pads);

            if (pads.foundPads.length == 0) {
                alert("No connected pads have been found.");
                return;
            }

            let cloneSupportsRSA = supportsRSA
            let cloneCanStoreEncryptKey = canStoreEncryptKey
            if (pads.foundPads[padIndex].capabilities & deviceCapabilities.SupportsRSA) {
                if (os == OS_WINDOWS) {
                    cloneSupportsRSA = true;
                } else if (os == OS_LINUX) {
                    // not supported
                    cloneSupportsRSA = false;
                } else {// do nothing
                }
            } else {
                cloneSupportsRSA = false;
            }
            if (pads.foundPads[padIndex].capabilities & deviceCapabilities.CanStoreEncryptKey) {
                if (os == OS_WINDOWS) {
                    cloneCanStoreEncryptKey = true;
                } else if (os == OS_LINUX) {
                    // not supported
                    cloneCanStoreEncryptKey = false;
                } else {// do nothing
                }
            } else {
                cloneCanStoreEncryptKey = false;
            }
            setSignData((curr) => ({ ...curr, padType: pads.foundPads[padIndex].type, canStoreEncryptKey: cloneCanStoreEncryptKey, supportsRSA: cloneSupportsRSA }))
        } catch (error) {
            handleError(error);
            default_close_pad();
        }
        // search for pads end

        // open pad begin
        try {
            const openPadParams = new STPadServerLibDefault.Params.openPad(padIndex);
            const padInfo = await STPadServerLibDefault.openPad(openPadParams);
            // padState = padStates.opened;
            const canvas = liveSignatureCanvasRef.current
            // console.log(canvas);

            if (!canvas) {
                return
            }

            canvas.width = padInfo.padInfo.displayWidth;
            canvas.height = padInfo.padInfo.displayHeight;


            //get scale factor from signature resolution to canvas
            const currScaleFactorX = padInfo.padInfo.displayWidth / padInfo.padInfo.xResolution;
            const currScaleFactorY = padInfo.padInfo.displayHeight / padInfo.padInfo.yResolution;
            //get sample rate
            setSignData((curr) => ({ ...curr, padState: padStates.opened, scaleFactorX: currScaleFactorX, scaleFactorY: currScaleFactorY, sampleRate: padInfo.padInfo.samplingRate }))

            //start the signature process

            // selection_dialog();
            signature_start()
        } catch (error) {
            handleError(error);
            default_close_pad();
        }
        // open pad end
    }
    const drawStrokeStartPoint = (canvasContext: CanvasRenderingContext2D, softCoordX: number, softCoordY: number) => {
        // open new stroke's path
        canvasContext.beginPath();
        canvasContext.arc(softCoordX, softCoordY, 0.1, 0, 2 * Math.PI, true);
        canvasContext.fill();
        canvasContext.stroke();
        canvasContext.moveTo(softCoordX, softCoordY);

    }
    function drawStrokePoint(canvasContext: CanvasRenderingContext2D, softCoordX: number, softCoordY: number) {
        // continue after start or not start point
        canvasContext.lineTo(softCoordX, softCoordY);
        canvasContext.stroke();
    }

    async function signature_start() {
        try {
            var startSignatureParams = new STPadServerLibDefault.Params.startSignature();
            startSignatureParams.setFieldName(field_name);
            startSignatureParams.setCustomText(custom_text);
            if (supportsRSA) {
                if (canStoreEncryptKey) {
                    startSignatureParams.enablePadEncryption(default_dochash, encryption_cert, encryption_cert_only_when_empty);
                } else {
                    startSignatureParams.enablePadEncryption(default_dochash, null);
                }
            }
            await STPadServerLibDefault.startSignature(startSignatureParams);
        } catch (error) {
            handleError(error);
            default_close_pad();
        }
    }

    const handleError = (param: any) => {
        if (param.errorCode < 0) {
            const message = "Function " + param.command + " failed. Reason: " + param.errorMessage;
            STPadServerLibCommons.handleLogging(message);
            // alert(message);
        }
    }

    async function default_close_pad() {
        if (padState == padStates.opened) {
            try {
                var closePadParams = new STPadServerLibDefault.Params.closePad(padIndex);
                await STPadServerLibDefault.closePad(closePadParams);
                setSignData((curr) => ({ ...curr, padState: padStates.closed }))
            } catch (error) {
                handleError(error);
            }
        }
    }

    const resetInterface = () => {
        const canvas = liveSignatureCanvasRef.current
        if (!canvas) {
            return
        }
        var ctx = canvas.getContext("2d");
        if (!ctx) {
            return
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return <AntdSpace direction="vertical">
        <AntdSpace direction="horizontal" style={{ float: 'right' }}>
            <AntdButton key={1} 
            onClick={onSign} 
            style={{backgroundColor: '#35aa47', color: "#fff"}}
            >
                Ký nhận
                </AntdButton>
            <AntdButton key={2} 
            onClick={() => signature_retry_send()}
            style={{backgroundColor: '#edae58', color: "#000"}}
            >
                Ký lại
                </AntdButton>
            {/* <AntdButton key={3} onClick={() => signature_confirm_send()}>Ký Lại</AntdButton> */}
        </AntdSpace>
        <div>
            <canvas ref={liveSignatureCanvasRef} style={{ border: "1px solid #000", backgroundColor: "transparent", width: '100%', height: 480, ...canvasStyle }}></canvas>
        </div>
    </AntdSpace>
})