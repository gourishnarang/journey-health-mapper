import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useEarlyAccessAuth from '@/hooks/useEarlyAccessAuth';
import { useState, useEffect } from 'react';
import { BASE_URL } from '@/utils/const';

interface User {
  _id: string;
  email: string;
  earlyAccess: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UsersResponse {
  count: number;
  users: User[];
}

const EarlyAccessUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { logout } = useEarlyAccessAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/early-access-login");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`);

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data: UsersResponse = await response.json();
        setUsers(data.users);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  // Calculate analytics
  const getLatestRegistration = () => {
    if (users.length === 0) return 'N/A';
    const latestUser = users.reduce((latest, user) => {
      return new Date(user.createdAt) > new Date(latest.createdAt) ? user : latest;
    }, users[0]);
    return formatDate(latestUser.createdAt);
  };

  const getActiveUsersCount = () => {
    // Count users with earlyAccess = true
    return users.filter(user => user.earlyAccess).length;
  };

  // Calculate growth rate based on registration dates in the last 30 days
  const getMonthlyGrowthRate = () => {
    if (users.length === 0) return 'N/A';

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newUsersThisMonth = users.filter(user =>
      new Date(user.createdAt) > thirtyDaysAgo
    ).length;

    // If we have previous users, calculate percentage growth
    const previousUsers = users.length - newUsersThisMonth;
    if (previousUsers > 0) {
      const growthRate = (newUsersThisMonth / previousUsers) * 100;
      return `+${growthRate.toFixed(1)}% this month`;
    } else if (newUsersThisMonth > 0) {
      return `+${newUsersThisMonth} new users this month`;
    }
    return 'No growth this month';
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fin-purple-dark to-fin-purple">
            Early Access
          </span>{" "}
          Users
        </h1>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-fin-purple text-fin-purple hover:bg-fin-purple-light"
        >
          Logout
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Early Access Portal</h2>
          <p className="text-gray-700 mb-4">
            This page is only accessible to authorized early access users. Here you can view exclusive content
            and features that aren't available to the general public yet.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Registered Users</h3>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fin-purple"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-fin-purple-light">
                    <th className="px-6 py-3 text-left text-xs font-medium text-fin-purple uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-fin-purple uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-fin-purple uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index+1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="border rounded-lg p-4 bg-gradient-to-r from-fin-purple-light to-white">
            <h3 className="font-medium mb-2 text-fin-purple-dark">Early Access Statistics</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Total registered users: {users.length}</li>
              <li>Active early access users: {getActiveUsersCount()}</li>
              <li>Latest registration: {getLatestRegistration()}</li>
              <li>Growth rate: {getMonthlyGrowthRate()}</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4 bg-gradient-to-r from-fin-purple-light to-white">
            <h3 className="font-medium mb-2 text-fin-purple-dark">Upcoming Features</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Advanced analytics dashboard</li>
              <li>Custom financial reports</li>
              <li>Integration with popular accounting software</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessUsers;