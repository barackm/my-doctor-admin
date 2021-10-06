import { createAction } from "@reduxjs/toolkit";

export const authApiCallStarted = createAction("auth/authApiCallStarted");
export const authApiCallSucceded = createAction("auth/authApiCallSucceded");
export const authApiCallFailed = createAction("auth/authApiCallFailed");
