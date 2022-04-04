import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 75vh;
  border: 1px solid #70707033;
  border-radius: 18px;
`;

export const MessagesWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding-top: 40px;
  padding-right: 35px;
  padding-left: 80px;
  padding-bottom: 15px;
`;

export const MessageBox = styled.div`
  width: 100%;
  max-width: 255px;
  align-self: ${(props) => (props.active ? 'end' : 'start')};
  margin-bottom: 20px;
  position: relative;
`;

export const Tools = styled.div`
  display: flex;
  color: #2c3e50;
  opacity: 0.47;

  p {
    margin-right: 4px;
    font-size: 14px;
    &::after {
      content: '|';
      margin-left: 4px;
    }
  }

  button {
    background-color: unset;
    border: none;
    margin-right: 4px;
    cursor: pointer;
    &:first-of-type {
      &::after {
        content: '|';
        margin-left: 4px;
      }
    }
  }
`;

export const Avatar = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 0;
  left: ${(props) => (props.active ? '-35px' : 'unset')};
  right: ${(props) => (props.active ? 'unset' : '-35px')};
  border-radius: 50%;
  object-fit: cover;
`;

export const TextBox = styled.div`
  border-radius: 10px;
  background: ${(props) =>
    props.active
      ? 'transparent linear-gradient(122deg, #3394CE 0%, #437CD4 52%, #4686D6 65%, #4D98D9 100%) 0% 0% no-repeat padding-box;'
      : '#ffffff 0% 0% no-repeat padding-box'};
  color: ${(props) => (props.active ? '#FFFFFF' : '#2C3E50')};
  box-shadow: 0px 0px 99px #0000002f;
  padding: 10px;
`;

export const Thumbnail = styled.img`
  width: 86px;
  height: 115px;
  border-radius: 20px;
  object-fit: cover;
  margin-top: 10px;
`;

export const InputWrapper = styled.div`
  padding-left: 80px;
`;
