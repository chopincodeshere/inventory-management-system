import { createAction, props } from "@ngrx/store";

export const setInvoice = createAction('setInvoice', props<{ invoice: any, customerName: string, orderId: string }>());