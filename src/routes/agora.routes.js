import express from 'express'
export const agoraRoutes = express.Router()

import { validationCatches, catchAsyncErrors } from '../utils/helpers.common.js'
import * as agoraController from '../controllers/agora.controller.js'
import { generateTokenRequestValidation } from '../utils/validations/agora.validations.js'

agoraRoutes.post(
    '/agora-token',
    validationCatches(generateTokenRequestValidation),
    catchAsyncErrors(agoraController.generateAgoraToken)
)
