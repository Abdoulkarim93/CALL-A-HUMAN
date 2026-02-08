import React from 'react';
import { postNeed } from '../api';

export default ({ user, onUpdateUser, language }: any) => {
  const handlePostNeed = () => {
    postNeed({
      id: 'need-' + Math.random().toString(36).substr(2, 9),
      summary: 'TEST NEED',
      intent: { serviceType: 'Testing', urgency: 'High' }
    });
  };

  return (
    <div>
      Concierge Chat Stub
      <button onClick={handlePostNeed} className="bg-blue-500 p-2 rounded">Test Post Need</button>
    </div>
  );
};
