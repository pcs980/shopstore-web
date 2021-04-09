import React from 'react';
import colors from '../styles/colors';

const Divider: React.FC = () => {
  return (
    <div style={{ marginBottom: 10, marginTop: 10 }}>
      <hr className='solid' style={{ backgroundColor: colors.gray, borderWidth: 2 }} />
    </div>
  );
}

export default Divider;
