import { useState } from 'react';
import './ManageUsersPage.css';
import { UserTable } from '../components/users/UserTable';
import { UserDialog } from '../components/users/UserDialog';
import { DeleteConfirmDialog } from '../components/users/DeleteConfirmDialog';

// Mock user data - in real app, fetch from API
const initialUsers = [
  {
    id: 1,
    shortName: 'Marco D.',
    fullName: 'Marco Daniels',
    email: 'marco.daniels@company.com',
    hourlyRate: 50,
    role: 'Employee',
    status: 'Active',
  },
  {
    id: 2,
    shortName: 'Sarah J.',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    hourlyRate: 55,
    role: 'Employee',
    status: 'Active',
  },
  {
    id: 3,
    shortName: 'John S.',
    fullName: 'John Smith',
    email: 'john.smith@company.com',
    hourlyRate: 60,
    role: 'Manager',
    status: 'Active',
  },
  {
    id: 4,
    shortName: 'Emily C.',
    fullName: 'Emily Chen',
    email: 'emily.chen@company.com',
    hourlyRate: 50,
    role: 'Employee',
    status: 'Inactive',
  },
];

export function ManageUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setDialogMode('add');
    setIsDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setDialogMode('edit');
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveUser = (userData) => {
    if (dialogMode === 'add') {
      // Add new user
      const newUser = {
        ...userData,
        id: users.length + 1,
        shortName: `${userData.fullName.split(' ')[0]} ${userData.fullName.split(' ')[1]?.[0] || ''}.`,
      };
      setUsers([...users, newUser]);
    } else {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                ...userData,
                shortName: `${userData.fullName.split(' ')[0]} ${userData.fullName.split(' ')[1]?.[0] || ''}.`,
              }
            : user
        )
      );
    }
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="manage-users-page">
      <div className="page-header-single-line">
        <h1 className="page-title">User Management</h1>
        <div className="header-right-section">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search users by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-add-user" onClick={handleAddUser}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Add New User</span>
          </button>
        </div>
      </div>

      <div className="table-section">
        <UserTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>

      {isDialogOpen && (
        <UserDialog
          user={selectedUser}
          mode={dialogMode}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedUser(null);
          }}
          onSave={handleSaveUser}
        />
      )}

      {isDeleteDialogOpen && (
        <DeleteConfirmDialog
          user={selectedUser}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedUser(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
