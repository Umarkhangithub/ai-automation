import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaPlay,
  FaCheckCircle,
  FaSpinner,
  FaPlus,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  fetchUserTasks,
  addTask,
  selectTasks,
  selectLoading,
  selectError,
} from "../../../Features/automations/AutomationSlice";
import { selectUser, selectUserData } from "../../../Features/auth/authSlice";
import { selectPlans } from "../../../Features/subscription/SubscriptionSlice";
import { useNavigate } from "react-router-dom"; // Add useNavigate for redirect

const Automation = () => {
  const [customTaskName, setCustomTaskName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to handle navigation

  const plans = useSelector(selectPlans);
  const { email = "", subscription = "" } = useSelector(selectUserData) || {};
  const user = useSelector(selectUser);
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      dispatch(fetchUserTasks(user.uid));
    } else {
      dispatch(setUser(null));
    }
  }, [dispatch, user]);

  const checkSubscriptionLimit = useMemo(() => {
    return async () => {
      if (!user) return false;

      // Dynamically get the task limit based on the user's plan
      const currentPlan = plans.find((plan) => plan.id === subscription);
      const taskLimit = currentPlan ? currentPlan.taskLimit : 50; // Default to 50 if no plan is found

      return tasks.length >= taskLimit;
    };
  }, [user, tasks, plans, subscription]);

  const triggerTask = useCallback(async () => {
    if (!user) return toast.error("You must be logged in to start a task.");
    const isLimitReached = await checkSubscriptionLimit();
    if (isLimitReached) {
      toast.error("Task limit reached. Redirecting to upgrade page...");
      setTimeout(() => {
        navigate("/upgrade-pro-plan"); // Redirect to upgrade page after a short delay
      }, 2000); // 2 seconds delay before redirect
      return;
    }

    dispatch(addTask({ taskName: "AI Data Processing", userId: user.uid }));
  }, [user, dispatch, checkSubscriptionLimit, navigate]);

  const addCustomTask = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user) return toast.error("You must be logged in to add a task.");
      if (!customTaskName.trim())
        return toast.error("Task name cannot be empty.");
      const isLimitReached = await checkSubscriptionLimit();
      if (isLimitReached) {
        toast.error("Task limit reached. Redirecting to upgrade page...");
        setTimeout(() => {
          navigate("/upgrade-pro-plan"); // Redirect to upgrade page after a short delay
        }, 2000); // 2 seconds delay before redirect
        return;
      }

      try {
        await dispatch(addTask({ taskName: customTaskName, userId: user.uid }));
        setCustomTaskName(""); // Reset input field after successful task creation
        setIsModalOpen(false); // Close the modal
        toast.success("Task added successfully!");
      } catch (error) {
        toast.error("Error adding task. Please try again.");
      }
    },
    [user, customTaskName, dispatch, checkSubscriptionLimit, navigate]
  );

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const currentPlan = plans.find((plan) => plan.id === subscription);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">🤖 AI Automation</h1>
      <p className="opacity-80">Trigger AI tasks and track their status.</p>
      {user && (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg shadow-md">
          <p>
            👤 <strong>User:</strong> {email}
          </p>
          <p>
            🌟 <strong>Plan:</strong> {currentPlan?.name || "N/A"}
          </p>
          <p>
            📝 <strong>Task Limit:</strong>{" "}
            {currentPlan ? currentPlan.taskLimit : "N/A"} tasks
          </p>
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition"
        onClick={triggerTask}
        disabled={loading}
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaPlay />}
        <span>{loading ? "Processing..." : "Start AI Task"}</span>
      </motion.button>
      <button
        className="mt-4 px-6 py-3 bg-green-500 rounded-lg flex items-center hover:bg-green-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        <FaPlus className="mr-2" /> Add Custom Task
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">📋 AI Task History</h2>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              className="p-3 flex justify-between items-center bg-gray-700 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <span className="font-semibold">{task.name}</span>
              {task.status === "Completed" ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaSpinner className="text-yellow-400 animate-spin" />
              )}
            </motion.li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">📝 Add Custom Task</h2>
            <form onSubmit={addCustomTask}>
              <input
                type="text"
                value={customTaskName}
                onChange={(e) => setCustomTaskName(e.target.value)}
                placeholder="Enter task name"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                required
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-500 rounded"
                >
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 rounded">
                  <FaSave /> Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
