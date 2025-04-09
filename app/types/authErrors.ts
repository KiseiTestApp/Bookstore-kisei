// Code cho các lỗi của Firebase Authentication
export const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Địa chỉ email không đúng";
        case "auth/user-disabled":
            return "Tài khoản này đã bị vô hiệu hóa";
        case "auth/user-not-found":
            return "Không tìm thấy được tài khoản ứng với email vừa nhập";
        case "auth/invalid-password":
            return "Sai mật khẩu vừa nhập";
        case "auth/too-many-requests":
            return "Bạn đã cố gắng đăng nhập quá nhiều lần. Vui lòng thử lại sau vài tiếng";
        case "auth/operation-not-allowed":
            return "Việc đăng nhập với email/mật khẩu này đã bị vô hiệu hóa";
        case "auth/invalid-credential":
            return "Tài khoản không trùng với dữ liệu trên hệ thống"
        default:
            return "Đăng nhập thất bại. Vui lòng thử lại sau.";
    }
};