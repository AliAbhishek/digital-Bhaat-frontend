

export const endpoints = {
    SIGN_UP: { endpoint: "/auth/signup", method: "post" },
    LOG_IN: { endpoint: "/auth/login", method: "post" },
    RESEND_OTP:{ endpoint: "/auth/resendOTP", method: "post" },
    VERIFY_OTP:{ endpoint: "/auth/verifyOTP", method: "post" },
    UPLOAD_TO_S3 : { endpoint: "/auth/uploadImagesToS3", method: "post" },
    UPDATE_PROFILE: { endpoint: "/auth/updateProfile", method: "put" },
    GET_USER_PROFILE: { endpoint: "/auth/getProfile" },
    FAMILY_ID_UPLOAD: { endpoint: "/brideProfile/familyIdUpload", method: "post" },
    CREATE_BRIDE_PROFILE : { endpoint: "/brideProfile/createBrideProfile", method: "post" },
    GET_BRIDE_PROFILE : { endpoint: "/brideProfile/getBrideProfile" },
    UPDATE_BRIDE_PROFILE: { endpoint: "/brideProfile/updateBrideProfile",method:"put" },
    GET_BRIDE_PROFILES: { endpoint: "/brideProfile/getBrideProfiles" },
    RATION_CARD_UPLOAD:{ endpoint: "/brideProfile/rationCardUpload", method: "post" },
    GET_VERIFIED_BRIDES:{ endpoint: "/provider/providerHomePage" },
    GET_GAMES:{endpoint:"/games/getGamesList"},
    ADD_GAME_FAV:{ endpoint: "/games/addToFav", method: "post" },
    GET_FAV_GAMES:{endpoint:"/games/getFavGames"},

}