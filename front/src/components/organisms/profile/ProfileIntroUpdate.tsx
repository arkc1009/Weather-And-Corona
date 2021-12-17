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

const Container = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Wrap = styled.div`
  width: 100%;
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
        <button type="button" onMouseDown={(e) => onBlockClick(e, 'header-one')}>
          h1
        </button>
        <button type="button" onMouseDown={(e) => onBlockClick(e, 'header-two')}>
          h2
        </button>
        <button type="button" onMouseDown={(e) => onBlockClick(e, 'header-three')}>
          h3
        </button>
        <button type="button" onMouseDown={(e) => onBlockClick(e, 'unstyled')}>
          normal
        </button>
        <button type="button" onMouseDown={(e) => onToggleClick(e, 'BOLD')}>
          bold
        </button>
        <button type="button" onMouseDown={(e) => onToggleClick(e, 'ITALIC')}>
          italic
        </button>
        <button type="button" onMouseDown={(e) => onToggleClick(e, 'STRIKETHROUGH')}>
          strikthrough
        </button>
        <button type="button" onMouseDown={(e) => onBlockClick(e, 'ordered-list-item')}>
          ol
        </button>
        <button type="button" onMouseDown={(e) => onBlockClick(e, 'unordered-list-item')}>
          ul
        </button>
      </Wrap>
      <Margin h="1rem" />

      <Bar />
      <Margin h="0.5rem" />

      <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKey} />

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        save
      </button>
    </Container>
  );
};

export default ProfileIntroUpdate;
