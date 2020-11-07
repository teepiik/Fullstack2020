import React, { useState } from 'react';

const Recommendations = (props) => {
  const [recommended, setRecommended] = useState(['']);
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
