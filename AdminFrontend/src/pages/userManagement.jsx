import React, { useState, useEffect } from 'react';
import '../styles/userManagement.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isAddingUser, setIsAddingUser] = useState(false); 

  
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  useEffect(() => {
    if (users.length > 0) {
      const result = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(result);
    }
  }, [search, users]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/delete-user/${id}`, { method: 'DELETE' });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting user:', errorData.message || 'Unknown error');
        alert('Failed to delete user. Please try again.');
        return;
      }
  
      await response.json(); 
      setUsers(users.filter(user => user._id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user. Please try again later.');
    }
  };  

  
  const handleEdit = (user) => {
    setSelectedUser(user); 
    setShowModal(true); 
  };

  
  const handleAddUser = () => {
    setIsAddingUser(true); 
    setShowModal(true); 
  };

  return (
    <div className="user-management-container">
      <div className="header">
        <h2>User Management</h2>
        <button className="add-user-btn" onClick={handleAddUser}>
          + Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
        <FaSearch />
      </div>

      {/* User Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)} className="edit-btn">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="delete-btn">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add User Modal */}
      {showModal && (
        <AddUserModal 
          setShowModal={setShowModal} 
          fetchUsers={fetchUsers} 
          isAddingUser={isAddingUser} 
          setIsAddingUser={setIsAddingUser} 
        />
      )}
      

      {/* Edit User Modal */}
      {showModal && selectedUser && !isAddingUser && (
        <EditUserModal 
          user={selectedUser} 
          setShowModal={setShowModal} 
          fetchUsers={fetchUsers} 
        />
      )}
    </div>
  );
};

export default UserManagement;
