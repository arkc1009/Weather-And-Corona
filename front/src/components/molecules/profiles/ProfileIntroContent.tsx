import React, { useMemo } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import { useProfile } from '../../../hooks/useProfile';

const Container = styled.div`
  width: 100%;
  word-break: break-all;
`;

const ProfileIntroContent: React.FC = () => {
  const { profile } = useProfile();
  const stringIntro = useMemo(() => profile.intro && profile.intro, [profile]);

  const introduce = useMemo(
    () => stringIntro && EditorState.createWithContent(convertFromRaw(JSON.parse(stringIntro))),
    [stringIntro],
  );

  const converted = useMemo(() => introduce && draftToHtml(convertToRaw(introduce.getCurrentContent())), [introduce]);

  if (!converted) {
    return <Container>Loading...</Container>;
  }
  return <Container dangerouslySetInnerHTML={{ __html: converted }} />;
};

export default ProfileIntroContent;
