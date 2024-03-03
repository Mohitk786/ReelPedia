import React from 'react';

const Dropdown = ({ title, options, func }) => {
  const selectStyle = {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px', 
    transition: 'border-color 0.3s ease', 
    
  };

  return (
    <div className='select'>
      <select
        style={selectStyle}
        onChange={func}
        className='cursor-pointer'
        defaultValue="0"
        name="format"
        id="format"
     
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
