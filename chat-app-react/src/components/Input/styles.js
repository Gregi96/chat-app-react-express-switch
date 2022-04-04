import styled from 'styled-components';

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #ffffff 0% 0% no-repeat padding-box;
  padding: 15px 15px 15px 0;
  margin-top: auto;

  input[type='text'] {
    width: 100%;
    font-size: 14px;
    border-radius: 16px;
    border: none;
    box-shadow: 0px 0px 99px #0000002e;
    padding: 20px;
    color: #2c3e50;
    outline: none;
    &::placeholder {
      color: #2c3e50;
      opacity: 0.5;
    }
  }

  button {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 50%;
    color: #ffffff;
    background: #3491ce 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 18px #00000026;
    margin-left: 12px;
    cursor: pointer;
  }
`;

export const EditBadge = styled.div`
  position: absolute;
  top: -22px;
  left: 0;
  background-color: lightgray;
  border-radius: 5px;
  padding: 5px 10px;
`;

export const AddImage = styled.div`
  margin-right: 10px;

  .uploader_image_preview--wrapper {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: -68px;

    .uploader_image_preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    button {
      width: 20px;
      height: 20px;
      background-color: lightgrey;
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 30px;
    }
  }

  .uploader_button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background-color: lightgray;
    border-radius: 50%;
    cursor: pointer;

    img {
      width: 25px;
      height: 25px;
    }
  }

  input[type='file'] {
    display: none;
    opacity: 0;
  }
`;
