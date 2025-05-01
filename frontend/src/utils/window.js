import {WindowCenter, WindowSetSize} from "../../wailsjs/runtime/runtime.js";

export const SetLoginWindow = () => {
    WindowSetSize(600, 360);
    setTimeout(() => {
        WindowCenter()
    }, 10)
}

export const SetMainLayoutWindow = () => {
    WindowSetSize(1200, 800);
    setTimeout(() => {
        WindowCenter()
    }, 10)
}