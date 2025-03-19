import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [membershipDates, setMembershipDates] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/users", {
        withCredentials: true,
      });
      
      // Map over users to get their membership status
      const usersWithMembership = await Promise.all(response.data.map(async (user) => {
        try {
          const membershipRes = await axios.get(
            `http://localhost:3000/api/membership/user/${user._id}`,
            { withCredentials: true }
          );
          return {
            ...user,
            membershipEndDate: membershipRes.data.endDate,
            membershipStatus: membershipRes.data.active ? 'gold' : 'none'
          };
        } catch (error) {
          return { ...user, membershipStatus: 'none' };
        }
      }));

      setUsers(usersWithMembership);
      setFilteredUsers(usersWithMembership);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/users/${userId}/role`,
        { role: newRole },
        { withCredentials: true }
      );
      fetchUsers(); // Refresh user list
      alert("User role updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDelete = async (userId, userRole) => {
    if (userRole === "superadmin") {
      alert("Cannot delete super admin user");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
        withCredentials: true,
      });
      fetchUsers(); // Refresh the list
      alert("User deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleMembershipActivation = async (userId) => {
    if (!membershipDates.startDate || !membershipDates.endDate) {
      alert('Please select both start and end dates');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/membership/activate',
        {
          userId,
          startDate: membershipDates.startDate,
          endDate: membershipDates.endDate
        },
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        alert('Membership activated successfully');
        setShowMembershipModal(false);
        fetchUsers();
      } else {
        alert(response.data.message || 'Failed to activate membership');
      }
    } catch (error) {
      console.error('Activation error:', error);
      alert(error.response?.data?.message || 'Failed to activate membership');
    }
  };

  const handleDeactivateMembership = async (userId) => {
    if (!window.confirm("Are you sure you want to deactivate this user's membership?")) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/membership/deactivate',
        { userId },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert('Membership deactivated successfully');
        fetchUsers();
      } else {
        alert(response.data.message || 'Failed to deactivate membership');
      }
    } catch (error) {
      console.error('Deactivation error:', error);
      alert(error.response?.data?.message || 'Failed to deactivate membership');
    }
  };

  // Handle search by name or email
  useEffect(() => {
    if (searchQuery) {
      setFilteredUsers(
        users.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Super Admin Panel</h1>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* User Management Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              <i className="fas fa-users-cog mr-2"></i>
              User Management
            </h2>
            <p className="text-gray-600 mb-4">Manage users, roles, and memberships</p>
          </div>

          {/* Dashboard Access Card */}
          <div 
            onClick={() => window.location.href = '/dashboard'}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">
              <i className="fas fa-chart-line mr-2"></i>
              Dashboard
            </h2>
            <p className="text-gray-600 mb-4">Access admin dashboard features</p>
          </div>
        </div>

        {/* Existing User Management Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User List</h2>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Current Role</th>
                  <th className="px-6 py-3 text-left">Membership</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className={`border-t ${
                    user.membershipStatus === 'gold' ? 'bg-green-50' : ''
                  }`}>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.membershipStatus === 'gold' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          <span className={`w-2 h-2 mr-1 rounded-full ${
                            user.membershipStatus === 'gold' ? 'bg-green-400' : 'bg-gray-400'
                          }`}></span>
                          {user.membershipStatus === 'gold' ? 'Gold Member' : 'Regular User'}
                        </span>
                        {user.membershipEndDate && (
                          <span className="text-xs text-gray-500">
                            Expires: {new Date(user.membershipEndDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border rounded px-2 py-1"
                        disabled={user.role === "superadmin"}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        onClick={() => handleDelete(user._id, user.role)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        disabled={user.role === "superadmin"}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          if (user.membershipStatus === 'gold') {
                            handleDeactivateMembership(user._id);
                          } else {
                            setSelectedUser(user);
                            setShowMembershipModal(true);
                          }
                        }}
                        className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                          user.membershipStatus === 'gold'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white`}
                      >
                        <i className={`fas ${user.membershipStatus === 'gold' ? 'fa-user-minus' : 'fa-user-plus'}`}></i>
                        {user.membershipStatus === 'gold' ? 'Deactivate Gold' : 'Activate Gold'}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Membership Modal */}
      {showMembershipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Activate Gold Membership</h2>
              <button onClick={() => setShowMembershipModal(false)} className="text-gray-500">×</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input
                  type="date"
                  value={membershipDates.startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setMembershipDates(prev => ({
                    ...prev,
                    startDate: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input
                  type="date"
                  value={membershipDates.endDate}
                  min={membershipDates.startDate}
                  onChange={(e) => setMembershipDates(prev => ({
                    ...prev,
                    endDate: e.target.value
                  }))}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowMembershipModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleMembershipActivation(selectedUser._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperAdminDashboard;
