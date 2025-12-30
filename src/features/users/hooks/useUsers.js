import { useState, useMemo, useEffect } from 'react';
import { usersApi } from '../api/users.api';
import { useSnackbar } from '../../../contexts/SnackbarContext';

/**
 * Hook for managing users data and operations
 */
export function useUsers() {
  const { success, error: showError } = useSnackbar();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'

  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersData = await usersApi.getUsers();
        // Map API response to table format
        const mappedUsers = usersData.map((user) => ({
          _id: user._id,
          shortName: user.tabName || '',
          fullName: user.name || '',
          email: user.user_email || '',
          hourlyRate: user.hourlyRate || 0,
          role: user.role || '',
          status: user.userStatus || 'ACTIVE',
        }));
        setUsers(mappedUsers);
      } catch (err) {
        const errorMessage = err.response?.data?.description || err.message || 'Failed to fetch users';
        showError(errorMessage);
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [showError]);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    
    const query = searchQuery.toLowerCase();
    return users.filter((user) => {
      return (
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.shortName.toLowerCase().includes(query)
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

  const handleSaveUser = async (userData) => {
    setIsSaving(true);
    try {
      if (dialogMode === 'add') {
        // Add new user
        // Map form data to API format
        const apiData = {
          tabName: userData.tabName,
          name: userData.fullName,
          role: userData.role,
          hourlyRate: userData.hourlyRate,
          userStatus: userData.status,
          email: userData.email,
        };
        
        await usersApi.createUser(apiData);
        
        // Refresh users list
        const usersData = await usersApi.getUsers();
        const mappedUsers = usersData.map((user) => ({
          _id: user._id,
          shortName: user.tabName || '',
          fullName: user.name || '',
          email: user.user_email || '',
          hourlyRate: user.hourlyRate || 0,
          role: user.role || '',
          status: user.userStatus || 'ACTIVE',
        }));
        setUsers(mappedUsers);
        success('User created successfully');
      } else {
        // Update existing user
        // Map form data to API format
        const apiData = {
          tabName: userData.tabName,
          name: userData.fullName,
          role: userData.role,
          hourlyRate: userData.hourlyRate,
          userStatus: userData.status,
          email: selectedUser.email, // Email from selected user (not editable)
        };
        
        await usersApi.updateUser(apiData);
        
        // Refresh users list
        const usersData = await usersApi.getUsers();
        const mappedUsers = usersData.map((user) => ({
          _id: user._id,
          shortName: user.tabName || '',
          fullName: user.name || '',
          email: user.user_email || '',
          hourlyRate: user.hourlyRate || 0,
          role: user.role || '',
          status: user.userStatus || 'ACTIVE',
        }));
        setUsers(mappedUsers);
        success('User updated successfully');
      }
      setIsDialogOpen(false);
      setSelectedUser(null);
    } catch (err) {
      const errorMessage = err.response?.data?.description || err.message || 'Failed to save user';
      showError(errorMessage);
      console.error('Error saving user:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  return {
    users: filteredUsers,
    isLoading,
    isSaving,
    searchQuery,
    setSearchQuery,
    isDialogOpen,
    selectedUser,
    dialogMode,
    handleAddUser,
    handleEditUser,
    handleSaveUser,
    closeDialog,
  };
}

