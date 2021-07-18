import { IconButton, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

import ProgressBar from '@ramonak/react-progress-bar';
import { ProjectDetails } from './projectDtails';
import { DeleteProject } from './deleteProject';
import { ModifyProject } from './ModifyProject';

export interface row {
  _id: string;
  name: string;
  etat: string;
  progress: number;
  tasksNumber: number;
  projectDetails: string;
  membersTasks: {
    searchMembers: { _id: string; name: string };
    tasks: string[];
  }[];
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
      <TableCell>{filtredRow.name}</TableCell>
      <TableCell>{filtredRow.etat}</TableCell>
      <TableCell>
        <ProgressBar
          completed={filtredRow.progress}
          width="90%"
          borderRadius="8px"
          height="15px"
          labelAlignment="center"
          labelSize="10px"
          bgColor={
            filtredRow.progress >= 80
              ? '#388e3c'
              : filtredRow.progress >= 40
              ? '#ffee33'
              : '#d32f2f'
          }
        />
      </TableCell>
      <TableCell>
        <ProjectDetails rowValue={filtredRow} />
      </TableCell>
      <TableCell>
        <ModifyProject rowValue={filtredRow} />
        <DeleteProject id={filtredRow._id} />
      </TableCell>
    </TableRow>
  );
};
