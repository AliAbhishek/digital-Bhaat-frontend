

export const endpoints = {
    SIGN_UP: { endpoint: "/auth/signup", method: "post" },
    LOG_IN: { endpoint: "/auth/login", method: "post" },
    RESEND_OTP:{ endpoint: "/auth/resendOTP", method: "post" },
    VERIFY_OTP:{ endpoint: "/auth/verifyOTP", method: "post" },
    UPLOAD_TO_S3 : { endpoint: "/auth/uploadImagesToS3", method: "post" },
    UPDATE_PROFILE: { endpoint: "/auth/updateProfile", method: "put" },
    AADHAR_UPLOAD: { endpoint: "/brideProfile/aadharUpload", method: "post" },
    CREATE_BRIDE_PROFILE : { endpoint: "/brideProfile/createBrideProfile", method: "post" },
    GET_BRIDE_PROFILE : { endpoint: "/brideProfile/getBrideProfile" },

}