"use client"

import React, {createContext, useContext, useState} from "react";
import {Snackbar, Alert} from "@mui/material";

type Severity = "error" | "info" | "success" | "warning";
type Position = {
    vertical: "top" | "bottom";
    horizontal: "left" | "right" | "center";
};

interface SnackbarContextType {
    showSnackbar: (message: string, severity: Severity, position?: Position) => void;
    updateSnackbarMessage: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children } : {children: React.ReactNode}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>("info");
    const [snackbarPosition, setSnackbarPosition] = useState<Position>();

    const showSnackbar = (
        message: string,
        severity: Severity,
        position: Position = { vertical: "bottom", horizontal: "right" }
    ) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarPosition(position);
        setSnackbarOpen(true);
    }

    const updateSnackbarMessage = (message: string) => {
        setSnackbarMessage(message);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    return (
        <SnackbarContext.Provider value={{showSnackbar, updateSnackbarMessage}}>
            {children}
            <Snackbar open={snackbarOpen} onClose={handleSnackbarClose} autoHideDuration={4000} anchorOrigin={snackbarPosition}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
}