import React from 'react';
import { es } from 'date-fns/locale';
import { DatePickerContainer, StyledDatePickerWrapper } from '../globalStyles.styled';

const DatePickerComponent = ({ dateRange, handleDateChange }) => {
  return (
    <DatePickerContainer>
      <StyledDatePickerWrapper
        selected={dateRange.startDate}
        onChange={handleDateChange}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        selectsRange
        placeholderText="Rango de fechas"
        dateFormat="dd.MM.yyyy"
        minDate={new Date()}
        locale={es}
      />
    </DatePickerContainer>
  );
};

export default DatePickerComponent;
