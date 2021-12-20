import React from 'react';
import styled from 'styled-components';
import Span from '../../atomic/Spans/Span';

const Container = styled.div`
  word-break: break-all;
  font-size: 1.2rem;
`;

const ProfileName: React.FC<{ name: string }> = ({ name }) => {
  if (!name) {
    return (
      <Container>
        어서오세요!{' '}
        <Span fWeight="bold" fSize="1.2rem">
          이름
        </Span>
        을 알려주세요!
      </Container>
    );
  }
  return (
    <Container>
      환영합니다{' '}
      <Span fWeight="bold" fSize="1.2rem">
        {name}님!
      </Span>
    </Container>
  );
};

export default ProfileName;
