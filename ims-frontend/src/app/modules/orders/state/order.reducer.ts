import { createReducer, on } from '@ngrx/store';
import { initialState } from './order.state';
import { setCustomerInfo } from './order.action';

const _customerInfoReducer = createReducer(
  initialState,
  on(setCustomerInfo, (state, payload) => {
    return {
      ...state,
      customerInfo: payload.customerInfo, // Use payload.customerInfo directly
    };
  })
);

export function customerInfoReducer(state: any, action: any) {
  return _customerInfoReducer(state, action);
}
