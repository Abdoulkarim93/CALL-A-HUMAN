import React from 'react';
export default ({ onComplete, language }: any) => (
  <div>
    Provider Signup Stub
    <button onClick={() => onComplete({ name: 'Demo Provider', phone: '123' })}>Complete Signup</button>
  </div>
);
