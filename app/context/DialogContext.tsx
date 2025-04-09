"use client"

import React, {createContext, useContext, useState} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";

type DialogOptions = {
    title?: string;
    content: React.ReactNode;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

type DialogContextType = {
    confirmDialog: (options: DialogOptions) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({children} : {children: React.ReactNode}) => {

    const [open, setOpen] = useState(false);
    const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null);

    const confirmDialog = (options: DialogOptions) => {
        setDialogOptions(options);
        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handleConfirm = () => {
        dialogOptions?.onConfirm?.();
        handleClose();
    };
    return (
        <DialogContext.Provider value={{confirmDialog}}>
            {children}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{dialogOptions?.title || "Xác nhận"}</DialogTitle>
                <DialogContent>{dialogOptions?.content}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {dialogOptions?.cancelText || "Hủy"}
                    </Button>
                    <Button onClick={handleConfirm} color="error">
                        {dialogOptions?.confirmText || "Xác nhận"}
                    </Button>
                </DialogActions>
            </Dialog>
        </DialogContext.Provider>
    )
}
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) throw new Error("useDialog must be used within DialogProvider");
    return context;
}
