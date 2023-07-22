import React, { useState } from 'react';
import { Range } from 'react-range';

const SliderCalendar = () => {
  const [timeRange2, setTimeRange2] = useState([0]);

  const handleTimeChange2 = (newTimeRange) => {
    setTimeRange2(newTimeRange);
  };

  return (
    <div style={{ marginTop: '20px', width: '350px', position: 'absolute', top: '190px', left: '280px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>Intensidad</span>
      </div>
      <Range
        step={1}
        min={0}
        max={100}
        values={timeRange2}
        onChange={(values) => handleTimeChange2(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              background: `linear-gradient(to right, #D8BFD8 0%, #D8BFD8 ${(timeRange2[0] / 100) * 100}%, #ddd ${(timeRange2[0] / 100) * 100}%, #ddd 100%)`, // Задаем заполнение цветом '#D8BFD8'
              borderRadius: '3px',
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '16px',
              width: '16px',
              borderRadius: '8px',
              backgroundColor: '#D8BFD8',
            }}
          />
        )}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', position: 'relative', left: '300px' }}>
        <span style={{ color: '#999'}}>Muy débil</span>
      </div>
    </div>
  );
};

export default SliderCalendar;
