import './ManageUsersPage.css';
import { useUsers, UserTable, UserDialog } from '../features/users';

export function ManageUsersPage() {
  const {
    users,
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
  } = useUsers();

  return (
    <div className="manage-users-page">
      <div className="page-header-single-line">
        <h1 className="page-title">User Management</h1>
        <div className="header-right-section">
          <div className={`search-input-wrapper ${searchQuery ? 'has-value' : ''}`}>
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
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                type="button"
                title="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
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
          users={users}
          onEdit={handleEditUser}
          isLoading={isLoading}
        />
      </div>

      {isDialogOpen && (
        <UserDialog
          user={selectedUser}
          mode={dialogMode}
          onClose={closeDialog}
          onSave={handleSaveUser}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}
