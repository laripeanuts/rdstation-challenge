import React from 'react';

function Checkbox({ children, type = 'checkbox', ...props }) {
  return (
    <label className="flex items-center">
      <input
        type={type}
        className="w-5 h-5 text-blue-500 form-checkbox"
        {...props}
      />
      <span className="ml-2">{children}</span>
    </label>
  );
}

export default Checkbox;
