import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  History,
  User as UserIcon,
  IndianRupee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [balance, setBalance] = useState(12500.75);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    // avatar: "https://i.pinimg.com/736x/b0/dd/a1/b0dda14b01e645e7fd3a2adb9228a3ad.jpg",
    avatar: "https://i.pinimg.com/736x/fd/d8/9e/fdd89e52258da1a81313decd31d39f9a.jpg",
  });

  // Sample transaction history
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 500,
      date: "2023-05-15",
      description: "Salary",
    },
    {
      id: 2,
      type: "withdrawal",
      amount: -120,
      date: "2023-05-12",
      description: "Groceries",
    },
    {
      id: 3,
      type: "deposit",
      amount: 300,
      date: "2023-05-10",
      description: "Freelance work",
    },
    {
      id: 4,
      type: "withdrawal",
      amount: -45,
      date: "2023-05-08",
      description: "Dining out",
    },
  ];

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="absolute -bottom-16 left-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg"
              >
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          <div className="pt-20 px-6 pb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div className="order-1 md:order-none">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="text-2xl font-bold bg-gray-100 rounded px-2 py-1 mb-1 w-full"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800">
                    {userData.name}
                  </h2>
                )}
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="text-gray-600 bg-gray-100 rounded px-2 py-1 w-full"
                  />
                ) : (
                  <p className="text-gray-600">{userData.email}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg mt-4 md:mt-0 ${
                  isEditing
                    ? "bg-green-500 text-white"
                    : "bg-indigo-100 text-indigo-700"
                } cursor-pointer`}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </motion.button>
            </div>

            {/* Account Balance */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-700">Account Balance</h3>
                <button
                  onClick={toggleBalanceVisibility}
                  className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <motion.div
                key={showBalance ? "visible" : "hidden"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 flex items-center"
              >
                <IndianRupee size={20} className="mr-1" />
                <p className="text-3xl font-bold text-gray-800">
                  {showBalance ? balance.toFixed(2) : "••••••"}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-none py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === "profile"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              } cursor-pointer`}
            >
              <UserIcon size={18} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-none py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === "security"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              } cursor-pointer`}
            >
              <Lock size={18} />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-none py-4 px-6 font-medium flex items-center justify-center gap-2 ${
                activeTab === "history"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              } cursor-pointer`}
            >
              <History size={18} />
              <span>Transactions</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <p className="mt-1 text-gray-900">{userData.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <p className="mt-1 text-gray-900">{userData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Member Since
                      </label>
                      <p className="mt-1 text-gray-900">January 15, 2022</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Change Password
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Ensure your account is secure with a strong password
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer"
                      >
                        Change Password
                      </motion.button>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg cursor-pointer"
                      >
                        Enable 2FA
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "history" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Transaction History
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                          <motion.tr
                            key={transaction.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{
                              backgroundColor: "rgba(79, 70, 229, 0.05)",
                            }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {transaction.description}
                            </td>
                            <td
                              className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              <span className="flex items-center">
                                <IndianRupee size={14} className="mr-1" />
                                {transaction.amount > 0 ? "+" : ""}
                                {Math.abs(transaction.amount).toFixed(2)}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
