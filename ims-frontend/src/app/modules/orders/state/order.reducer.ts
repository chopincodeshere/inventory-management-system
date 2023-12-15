import { createReducer, on } from '@ngrx/store';
import { initialState } from './order.state';
import { setInvoice } from './order.action';

const _invoiceReducer = createReducer(
  initialState,
  on(setInvoice, (state, payload) => {
    return {
      ...state,
      invoice: payload.invoice,
      customerName: payload.customerName,
      orderId: payload.orderId 
    };
  })
);


export function invoiceReducer(state: any, action: any) {
  return _invoiceReducer(state, action);
}
