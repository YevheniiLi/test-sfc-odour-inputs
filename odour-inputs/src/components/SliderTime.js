import React, { useState } from 'react';
import { Range } from 'react-range';

const SliderTime = () => {
  const [timeRange1, setTimeRange1] = useState([0, 1440]);

  const handleTimeChange1 = (newTimeRange) => {
    setTimeRange1(newTimeRange);
  };

  const formatTime = (value) => {
    const hour = Math.floor(value / 60);
    const minute = value % 60;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}:${formattedMinute} ${ampm}`;
  };

  return (
    <div style={{ marginTop: '60px', width: '233px', position: 'relative', top: '50px', right: '160px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>Desde</span>
        <span style={{ fontWeight: 'bold' }}>Hasta</span>
      </div>
      <Range
        step={1}
        min={0}
        max={1440}
        values={timeRange1}
        onChange={(values) => handleTimeChange1(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              borderRadius: '3px',
              background: `linear-gradient(to right, #ddd 0%, #ddd ${(timeRange1[0] / 1440) * 100}%, #D8BFD8 ${(timeRange1[0] / 1440) * 100}%, #D8BFD8 ${(timeRange1[1] / 1440) * 100}%, #ddd ${(timeRange1[1] / 1440) * 100}%, #ddd 100%)`,
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
              boxShadow: '0 0 2px 0 #555',
            }}
          />
        )}
      />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {formatTime(timeRange1[0])} - {formatTime(timeRange1[1])}
      </div>
    </div>
  );
};

export default SliderTime;
