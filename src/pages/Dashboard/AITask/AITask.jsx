import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  FaPlay,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimesCircle,
  FaSave,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserTasks,
  addTask,
  updateTask,
  deleteTask,
  setUser,
  selectTasks,
  selectLoading,
  selectError,
} from "../../../Features/automations/AutomationSlice";
import { selectUser } from "../../../Features/auth/authSlice";
import Loader from "../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const AITask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const plans = useSelector((state) => state.subscription.plans); // Assuming subscription plans are in Redux state

  const navigate = useNavigate(); // Initialize the navigate function

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      dispatch(fetchUserTasks(user.uid));
    } else {
      dispatch(setUser(null));
    }
  }, [dispatch, user]);

  // Check the subscription limit before adding a task
  const checkSubscriptionLimit = useCallback(() => {
    const currentPlan = plans.find((plan) => plan.id === user.subscription); // Get the current plan
    if (!currentPlan) return 50; // Default to 50 tasks if no plan is found
    return currentPlan.taskLimit;
  }, [plans, user]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to add a task.");
    if (!newTaskName.trim()) return toast.error("Task name cannot be empty.");

    // Check if the number of tasks exceeds the limit
    const taskLimit = checkSubscriptionLimit();
    if (tasks.length >= taskLimit) {
      toast.error(`Task limit reached. You can only have ${taskLimit} tasks.`);
      // Redirect to the upgrade page if the task limit is exceeded
      navigate('/upgrade-pro-plan');
      return; // Prevent task creation if limit is exceeded
    }

    dispatch(addTask({ taskName: newTaskName, userId: user.uid }));
    setNewTaskName("");
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditedTaskName(task.name);
  };

  const handleSaveTask = (taskId) => {
    if (!editedTaskName.trim()) {
      return toast.error("Task name cannot be empty.");
    }
    dispatch(updateTask({ taskId, taskName: editedTaskName, status: "Completed" }));
    setEditingTask(null);
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold">⚡ AI Task Automation</h1>
      <p className="opacity-80">Trigger AI tasks and track real-time execution.</p>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-3 bg-green-500 rounded-lg flex items-center hover:bg-green-700 transition-all"
      >
        <FaPlus className="mr-2" /> Add Task
      </button>

      <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">📊 Task Execution History</h2>
        <div className="mt-4">
          {loading ? (
            <Loader bgColor="transparent" />
          ) : error ? (
            <p>{error}</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400">{user ? "No AI tasks added yet." : "Please login to see tasks."}</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400">
                  <th className="p-2">Task</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Created</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-t border-gray-700">
                    <td className="p-2">
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          value={editedTaskName}
                          onChange={(e) => setEditedTaskName(e.target.value)}
                          className="bg-gray-700 p-1 rounded text-white"
                        />
                      ) : (
                        task.name
                      )}
                    </td>
                    <td className="p-2">
                      {task.status === "Pending" && <FaSpinner className="animate-spin text-yellow-500" />}
                      {task.status === "Completed" && <FaCheck className="text-green-500" />}
                      {task.status === "Failed" && <FaTimes className="text-red-500" />}
                    </td>
                    <td className="p-2">{new Date(task.createdAt.seconds * 1000).toLocaleString()}</td>
                    <td className="p-2 flex space-x-2">
                      {editingTask === task.id ? (
                        <button onClick={() => handleSaveTask(task.id)} className="text-green-400">
                          <FaSave />
                        </button>
                      ) : (
                        <button onClick={() => handleEditTask(task)} className="text-blue-400">
                          <FaEdit />
                        </button>
                      )}
                      <button onClick={() => handleDeleteTask(task.id)} className="text-red-400">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <FaTimesCircle size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">📝 Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Enter task name"
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                required
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 flex items-center mt-4">
                <FaCheck className="mr-2" /> Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITask;
