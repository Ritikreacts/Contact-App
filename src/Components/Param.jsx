import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        applyFilters(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    applyFilters(users);
  }, [searchParams, users]);

  const applyFilters = (usersData) => {
    const nameFilter = searchParams.get('name');
    if (nameFilter) {
      const filteredData = usersData.filter(user =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(usersData);
    }
  };

  const handleSearch = () => {
    setSearchParams({ name: searchName });
  };

  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onInput={handleSearch}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
