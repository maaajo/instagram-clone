import React from 'react';
import useUser from '../../hooks/use-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const { user } = useUser();

  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
}
