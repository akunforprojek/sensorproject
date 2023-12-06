import React, { useState, useEffect } from 'react';

const AnimatedNumberDisplay = ({ targetNumber , style}) => {
  const [displayedNumber, setDisplayedNumber] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const updateNumber = () => {
      if (displayedNumber < targetNumber) {
        setDisplayedNumber((prevNumber) => prevNumber + 1);
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    // Mulai animasi saat komponen dimount
    animationFrameId = requestAnimationFrame(updateNumber);

    // Membersihkan interval saat komponen dilepas
    return () => cancelAnimationFrame(animationFrameId);
  }, [displayedNumber, targetNumber]);

  return (
    <div>
      <p style={style}>{displayedNumber}</p>
    </div>
  );
};

export default AnimatedNumberDisplay;
