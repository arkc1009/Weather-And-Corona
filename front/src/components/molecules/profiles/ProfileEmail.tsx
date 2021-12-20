import React from 'react';
import Span from '../../atomic/Spans/Span';

const ProfileEmail: React.FC<{ email: string }> = ({ email }) => {
  return (
    <div>
      이메일: <Span color="#555555">{email}</Span>
    </div>
  );
};

export default ProfileEmail;
