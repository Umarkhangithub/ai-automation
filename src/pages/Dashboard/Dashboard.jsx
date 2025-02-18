import { useEffect, lazy, Suspense } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRobot, FaSignOutAlt, FaPlay, FaHome, FaAssistiveListeningSystems, FaChartBar } from "react-icons/fa";
import { auth, onAuthStateChanged } from "../../firebase/Firebase";
import { setUser, clearUser, selectUser, selectLoading } from "../../Features/auth/authSlice";
import Loader from "../../components/Loader/Loader";

// Lazy-loaded components for better performance
const DashboardHome = lazy(() => import("./DashboardHome/DashboardHome"));
const Automation = lazy(() => import("./automation/Automation"));
const Analytics = lazy(() => import("./Reports/Analytics"));
const Settings = lazy(() => import("./Setting/Setting"));
const AITask = lazy(() => import("./AITask/AITask"));

const navLinks = [
  { to: "/dashboard", label: "Dashboard Home", icon: <FaHome /> },
  { to: "/dashboard/automation", label: "Automation", icon: <FaRobot /> },
  { to: "/dashboard/analytics", label: "Reports & Analytics", icon: <FaChartBar /> },
  { to: "/dashboard/setting", label: "Settings", icon: <FaAssistiveListeningSystems /> },
  { to: "/dashboard/aitask", label: "Trigger AI Task", icon: <FaPlay /> },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser));
      } else {
        dispatch(clearUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    dispatch(clearUser());
    navigate("/");
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-800 pt-24 p-6 overflow-hidden shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          <Link to="/dashboard">🚀 AI Dashboard</Link>
        </h2>
        <ul className="space-y-4">
          {navLinks.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-md transition-all ${
                    isActive ? "bg-yellow-500 text-gray-900 font-semibold" : "hover:bg-gray-700"
                  }`
                }
                end
              >
                {icon} <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-6 flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition-all w-[calc(100%-48px)]"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 pt-16 ml-64">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="automation" element={<Automation />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="setting" element={<Settings />} />
            <Route path="aitask" element={<AITask />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;
