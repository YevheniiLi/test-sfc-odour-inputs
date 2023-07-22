import styled from "styled-components";
import DatePicker from "react-datepicker";
import { FiSearch } from "react-icons/fi";
import { es } from "date-fns/locale";

export const MainSection = styled.div`
  padding: 20px;
  padding-bottom: 70px;
`;

export const AppContainer = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InputSection = styled.div`
  position: relative;
  top: 3.5px;
`;

export const LeftInputs = styled.div`
  display: flex;
  align-items: center;
`;

export const DatePickerContainer = styled.div`
  position: relative;
  margin-left: 10px;
  z-index: 1000;
  width: 100%;
  margin: 0 auto;
`;

export const StyledInput = styled.input`
  background-color: transparent;
  color: black;
  border: 2px solid #b2b2b2;
  padding: 10px 20px;
  border-radius: 10px;
  margin-right: 10px;
  width: 145px;
  ::placeholder {
    color: black;
    text-indent: 30px;
  }
`;

export const StyledDatePickerWrapper = styled(DatePicker).attrs((props) => ({
  locale: es,
  dateFormat: "EEE dd MMMM",
}))`
  z-index: 1;
  display: inline-block;
  text-align: center;
  width: 177px;
  font-size: 16px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.pressed ? "#f6dec9" : "transparent")};
  color: ${(props) => (props.pressed ? "black" : "black")};
  border: 2px solid #b2b2b2;
  border-radius: 10px;
  cursor: pointer;
  caret-color: transparent;
  margin-right: 2px;
  position: relative;
  right: -10px;
  overflow: hidden;
  white-space: nowrap;
`;

export const RightInputsSection = styled.div`
  position: relative;
  top: -30px;
  padding-left: 30px;
`;

export const StyledButton = styled.button`
  background-color: ${(props) => (props.pressed ? "#f6dec9" : "transparent")};
  color: ${(props) => (props.pressed ? "black" : "black")};
  border: 2px solid #b2b2b2;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
`;

export const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

export const SearchIcon = styled(FiSearch)`
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-60%);
  color: #aaa;
`;
