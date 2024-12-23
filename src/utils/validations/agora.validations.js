import * as yup from "yup";

export const generateTokenRequestValidation = yup.object({
    channelName: yup.string().required("Channel name is required"),
    uid: yup.number().required("UID is required"),
    
})
