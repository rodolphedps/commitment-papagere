import React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';

import { calcRem } from '../../../utils/styleHelper';

const style = {
  select: {
    fontSize: calcRem(14),
  },
};

const Select = ({
  value,
  label,
  placeholder,
  classes,
  disabled,
  onChange,
  renderValue,
  children,
}) => (
  <FormControl style={{ flexGrow: 1 }}>
    {!!label && <InputLabel shrink>{label}</InputLabel>}
    <MuiSelect
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disableUnderline
      classes={classes}
      disabled={disabled}
      displayEmpty
      renderValue={renderValue}
    >
      {!!placeholder && <MenuItem value="">{placeholder}</MenuItem>}
      {children}
    </MuiSelect>
  </FormControl>
);

Select.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  renderValue: PropTypes.func,
  children: PropTypes.node,
};

Select.defaultProps = {
  disabled: false,
  onChange: () => { },
};

export default withStyles(style)(Select);
