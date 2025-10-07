import React from 'react';

const Slider = ({ children }) => {
  return (
    <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide">
      {React.Children.map(children, (child, index) => (
        <div key={index} className="flex-shrink-0 w-64">
          {child}
        </div>
      ))}
    </div>
  );
};

export default Slider;