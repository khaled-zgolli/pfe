import { IconButton, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { DeleteMeeting } from './DeleteMeeting';
import { EditMeeting } from './editMeeting';
import { MeetingDetails } from './meetingDetails';

export interface row {
  _id: string;
  meetingName: string;
  date: string;
  begin: number;
  end: string;
  description: string;
  state: string;
  taches: string;
  members: { name: string; _id: string; state: string }[];
}
/* eslint-disable-next-line */
export interface TableRowsProps {
  index: number;
  filtredRow: row;
}

export const TableRows: React.FC<TableRowsProps> = ({ index, filtredRow }) => {
  return (
    <TableRow key={index}>
      <TableCell>{filtredRow._id}</TableCell>
      <TableCell>{filtredRow.meetingName}</TableCell>
      <TableCell>{filtredRow.date}</TableCell>
      <TableCell>{filtredRow.begin}</TableCell>
      <TableCell>{filtredRow.end}</TableCell>

      <TableCell>
        <MeetingDetails rowValue={filtredRow} />
      </TableCell>
      <TableCell>
        <EditMeeting rowValue={filtredRow} />
        <DeleteMeeting id={filtredRow._id} />
      </TableCell>
    </TableRow>
  );
};
