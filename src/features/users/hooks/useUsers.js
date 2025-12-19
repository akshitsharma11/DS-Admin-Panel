import { useState, useMemo } from 'react';
// import { usersApi } from '../api/users.api';

/**
 * Hook for managing users data and operations
 * Currently uses mock data - replace with API calls when backend is ready
 */
export function useUsers() {
  // Mock data - in real app, fetch from API
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

  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    const query = searchQuery.toLowerCase();
    return users.filter((user) => {
      return (
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }, [users, searchQuery]);

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
      // TODO: Replace with API call
      // await usersApi.createUser(newUser);
    } else {
      // Update existing user
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              ...userData,
              shortName: `${userData.fullName.split(' ')[0]} ${userData.fullName.split(' ')[1]?.[0] || ''}.`,
            }
          : user
      );
      setUsers(updatedUsers);
      // TODO: Replace with API call
      // await usersApi.updateUser(selectedUser.id, userData);
    }
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    // TODO: Replace with API call
    // await usersApi.deleteUser(selectedUser.id);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  return {
    users: filteredUsers,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    isDeleteDialogOpen,
    selectedUser,
    dialogMode,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    handleSaveUser,
    handleConfirmDelete,
    closeDialog,
    closeDeleteDialog,
  };
}

