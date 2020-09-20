import React, { useState, useEffect } from 'react';

const Recommendations = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
    </div>
  );
};

export default Recommendations;
