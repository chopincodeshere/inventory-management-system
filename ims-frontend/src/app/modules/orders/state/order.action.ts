import { createAction, props } from "@ngrx/store";

export const setCustomerInfo = createAction('setCustomerInfo', props<{ customerInfo: any }>());