import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { switchUser } from '../../actions/user.actions';

import { CheckBoxWrapper, CheckBoxLabel, CheckBox } from './styles';

export default function ToggleSwitch() {
  const users = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    users[0].isActive ? setChecked(false) : setChecked(true);
  }, [users]);

  const handleSwitchUser = () => {
    dispatch(switchUser());
  };

  return (
    <div>
      <h4 style={{ fontSize: '24px', color: '#555555', marginBottom: '9px' }}>
        Chat application
      </h4>
      <p style={{ fontSize: '14px', color: '#555555', marginBottom: '16px' }}>
        Switch user
      </p>
      <CheckBoxWrapper>
        <CheckBox
          id="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => handleSwitchUser()}
        />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </div>
  );
}
