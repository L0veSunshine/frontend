import * as React from 'react';

import { LocalizationProvider, DatePicker, zhCN } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NavBar from './nvaBar';

export function Entry() {
  return (
    <>
      <NavBar/>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={zhCN.components.MuiLocalizationProvider.defaultProps}>
        <DatePicker slotProps={{ textField: { size: 'small', autoComplete: 'new-password' } }}></DatePicker>
      </LocalizationProvider>
    </>
  );
}