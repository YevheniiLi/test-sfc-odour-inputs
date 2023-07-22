import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import Maps from "./components/Map";
import "react-datepicker/dist/react-datepicker.css";
import {
  AppContainer,
  Header,
  InputSection,
  LeftInputs,
  RightInputsSection,
  SectionContainer,
  StyledInput,
  MainSection,
} from "./globalStyles.styled";
import SliderTime from "./components/SliderTime";
import SliderCalendar from "./components/SliderCalendar";
import SliderIntensidad from "./components/SliderIntensidad";
import { SearchIcon } from "./globalStyles.styled";
import DatePickerComponent from "./components/DatePickerComponent";
import ButtonGroup from "./components/ButtonGroup";

function App() {
  const buttonTitles = [
    "Industriado",
    "Urbano",
    "Residuos y aguas residuales",
    "Campo y natyraleza",
    "Comida",
  ];
  const [buttonsPressed, setButtonsPressed] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleButtonClick = (index) => {
    const updatedButtonsPressed = buttonsPressed.map(() => false);
    updatedButtonsPressed[index] = true;
    setButtonsPressed(updatedButtonsPressed);
  };

  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    setDateRange({ startDate, endDate });
  };

  return (
    <AppContainer>
      <MainSection>
        <Header>
          <img src="images/logo.svg" alt="Logo" width="150" />
        </Header>

        <SectionContainer>
          <InputSection>
            <LeftInputs>
              <StyledInput type="text" placeholder="Ubicacion" />
              <SearchIcon size={16} />
              <SliderTime />
              <DatePickerComponent
                dateRange={dateRange}
                handleDateChange={handleDateChange}
              />
            </LeftInputs>
          </InputSection>
          <SliderCalendar />

          <RightInputsSection>
            <ButtonGroup
              buttonTitles={buttonTitles}
              buttonsPressed={buttonsPressed}
              handleButtonClick={handleButtonClick}
            />
          </RightInputsSection>
        </SectionContainer>
        <SliderIntensidad />
      </MainSection>

      <div className="map-container">
        <Maps />
      </div>
    </AppContainer>
  );
}

export default App;
