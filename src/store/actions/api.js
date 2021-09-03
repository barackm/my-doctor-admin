import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/apiCallBegan");
export const apiCallSucceeded = createAction("api/apiCallSucceeded");
export const apiCallFailed = createAction("api/apiCallFailed");
