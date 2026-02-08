import React from 'react';
export default ({ onComplete, language }: any) => (
  <div>
    User Signup Stub
    <button onClick={() => onComplete({ name: 'Demo User', phone: '123' })}>Complete Signup</button>
  </div>
);
