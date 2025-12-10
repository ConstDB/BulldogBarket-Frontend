import { useState } from "react";

export default function useModalManager() {
    const [modals, setModals] = useState({});

    const open = (name) => setModals(prev => ({...prev, [name]: true}));
    const close = (name) => setModals(prev => ({...prev, [name]: false}));

    return {modals, open, close}
}