import { TableCell, TableRow } from '@material-ui/core';
import React from 'react';

import { ModifyMemberForm } from './modifyMember';
import { DeleteMember } from './deleteMember';

interface row {
  _id: string;
  name: string;
  email: string;
  password: string;
  birthday: string;
  phone: number;
  gender: string;
  joinDate: string;
}
/* eslint-disable-next-line */
export interface TableRowsProps {
  index: string;
  filtredRow: row;
}

export const TableRows: React.FC<TableRowsProps> = ({ index, filtredRow }) => {
  return (
    <TableRow key={index}>
      <TableCell>{filtredRow._id}</TableCell>
      <TableCell>{filtredRow.email}</TableCell>
      <TableCell>{filtredRow.name}</TableCell>
      {/* <TableCell
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: '50px',
        }}
      >
        {filtredRow.password}
      </TableCell> */}
      <TableCell>{filtredRow.birthday}</TableCell>
      <TableCell>{filtredRow.phone}</TableCell>
      <TableCell>{filtredRow.gender}</TableCell>
      <TableCell>{filtredRow.joinDate}</TableCell>

      <TableCell>
        <ModifyMemberForm id={filtredRow._id} row={filtredRow} />
        <DeleteMember id={filtredRow._id} />
      </TableCell>
    </TableRow>
  );
};
