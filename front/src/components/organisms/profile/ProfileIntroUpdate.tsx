import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Editor, EditorState, RichUtils, DraftEditorCommand, convertToRaw, convertFromRaw } from 'draft-js';
import '../../../style/draft.css';
import axios from 'axios';
import { Api } from '../../../api';
import { errorMsg } from '../../../utils/errorMsg';
import { successMsg } from '../../../utils/successMsg';
import { useProfile } from '../../../hooks/useProfile';
import Bar from '../../atomic/Bar';
import SubmitButton from '../../atomic/buttons/SubmitButton';
import OptionButton from '../../atomic/buttons/OptionButton';
import { useModal } from '../../../hooks/useModal';

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
  margin-bottom: 1rem;
`;

const SaveButton = styled(SubmitButton)`
  align-self: center;
`;

const ProfileIntroUpdate: React.FC = () => {
  const navigate = useNavigate();
  const { closeModal } = useModal();
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
        navigate('/login');
      }
    }
  };

  return (
    <Container>
      <Wrap>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'header-one')}>
          <b>??????1</b>
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'header-two')}>
          <b>??????2</b>
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'header-three')}>
          <b>??????3</b>
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'unstyled')}>
          ??????
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onToggleClick(e, 'BOLD')}>
          <b>??????</b>
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onToggleClick(e, 'ITALIC')}>
          <em>?????????</em>
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onToggleClick(e, 'STRIKETHROUGH')}>
          <del>?????????</del>
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'ordered-list-item')}>
          1. ol
        </OptionButton>
        <OptionButton type="button" onMouseDown={(e) => onBlockClick(e, 'unordered-list-item')}>
          - ul
        </OptionButton>
      </Wrap>

      <Bar />

      <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKey} />

      <SaveButton
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        ??? ?????? ??????
      </SaveButton>
    </Container>
  );
};

export default ProfileIntroUpdate;
