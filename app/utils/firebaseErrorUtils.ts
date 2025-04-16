import {getAuthErrorMessage} from "@/app/types/authErrors";

export interface FirebaseErrorShape {
    code: string;
    message: string;
    name?: string;
}
export function isFirebaseError(error: unknown): error is FirebaseErrorShape {
    return (
        typeof error === 'object'
        && error !== null
        && "code" in error
        && typeof (error as any).code === "string"
        && typeof (error as any).message === "string"
    );
}

export function handleFirebaseError(error: unknown, fallbackMessage = 'Đã xảy ra lỗi'): string {
    if (isFirebaseError(error)) {
        return getAuthErrorMessage(error.code || fallbackMessage);
    }
    return fallbackMessage;
}