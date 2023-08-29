import React, { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;