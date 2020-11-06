import { useEffect } from "react";

const useAsyncEffect = (callback: () => void, dependencies: any[] = []) => {
    useEffect(() => {
        callback();
    },dependencies);
};

export default useAsyncEffect;