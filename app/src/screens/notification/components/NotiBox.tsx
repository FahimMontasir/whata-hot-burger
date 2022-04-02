import React from 'react';
import {Box, Typography} from '../../../common';

interface IProps {
  message: string;
  date: string;
}

const NotiBox = ({message, date}: IProps) => {
  return (
    <Box ph="10px" pv="15px" mv="5px" elevation="1" align="flex-start">
      <Typography h3>{message}</Typography>
      <Typography caption>{date}</Typography>
    </Box>
  );
};
export default NotiBox;
