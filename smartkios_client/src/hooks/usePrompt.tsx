import { useEffect } from "react";
import { unstable_useBlocker } from "react-router-dom";

export function usePrompt(when: boolean, pathName: string) {
    const blocker = unstable_useBlocker(when);

    useEffect(() => {
        if (when) window.onbeforeunload = () => "Are you sure?";
        return () => {
            window.onbeforeunload = null;
        };
    }, [when]);

    useEffect(() => {
        if (blocker.state === "blocked" && blocker.location.pathname != pathName) {
            if (confirm("Có thay đổi chưa lưu, Xác nhận rời?")) {
                blocker.proceed()
            }
            else {
                blocker.reset()
            }
        }
    }, [blocker]);
}