import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor, EditorState, RichUtils, DraftEditorCommand, convertToRaw, convertFromRaw } from 'draft-js';
import axios from 'axios';
import { ProfileUpdateProps } from './types';
import 'draft-js/dist/Draft.css';
import { Api } from '../../../api';
import { successMsg } from '../../../utils/successMsg';
import { useProfile } from '../../../hooks/useProfile';
import { errorMsg } from '../../../utils/errorMsg';
import Bar from '../../atomic/Bar';
import { Margin } from '../../atomic/Margin';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import OptionButton from '../../atomic/buttons/OptionButton';

const Container = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const SaveButton = styled(SubmitButton)`
  align-self: center;
`;

const ProfileIntroUpdate: React.FC<ProfileUpdateProps> = ({ closeModal }) => {
  const { profile, fetchProfile } = useProfile();

  const [editorState, setEditorState] = useState<EditorState>(
    profile.intro
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(profile.intro)))
      : EditorState.createEmpty(),
  );

  const handleKey = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onToggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const onBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleSave = async () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    try {
      const res = await Api.post('/user/profile', { intro: data });
      successMsg(res.data.msg);
      if (closeModal) {
        closeModal();
        fetchProfile();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorMsg(error.response?.data.msg);
      }
    }
  };

  return (
    <Container>
      <Wrap>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'header-one')}>
          h1
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'header-two')}>
          h2
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'header-three')}>
          h3
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'unstyled')}>
          normal
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onToggleClick(e, 'BOLD')}>
          bold
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onToggleClick(e, 'ITALIC')}>
          italic
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onToggleClick(e, 'STRIKETHROUGH')}>
          strikthrough
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'ordered-list-item')}>
          ol
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'unordered-list-item')}>
          ul
        </OptionButton>
      </Wrap>
      <Margin h="1rem" />

      <Bar />
      <Margin h="0.5rem" />

      <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKey} />

      <SaveButton
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        내 정보 수정
      </SaveButton>
    </Container>
  );
};

export default ProfileIntroUpdate;
