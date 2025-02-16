import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  auth,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  query,
  where,
  deleteDoc,
} from "../../../firebase/Firebase";
import { FaPlay, FaCheck, FaTimes, FaSpinner, FaEdit, FaTrash, FaPlus, FaTimesCircle, FaSave } from "react-icons/fa";

const AITask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchUserTasks(currentUser.uid);
      else setTasks([]);
    });
    return unsubscribe;
  }, []);

  const fetchUserTasks = useCallback((uid) => {
    const userTasksQuery = query(collection(db, "ai_tasks"), where("userId", "==", uid));
    return onSnapshot(userTasksQuery, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to add a task.");
    if (!newTaskName.trim()) return toast.error("Task name cannot be empty.");
    try {
      await addDoc(collection(db, "ai_tasks"), {
        userId: user.uid,
        name: newTaskName,
        status: "Pending",
        createdAt: new Date(),
      });
      toast.success("Task added successfully!");
      setNewTaskName("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "ai_tasks", taskId));
      toast.success("Task deleted successfully.");
    } catch (error) {
      toast.error("Error deleting task.");
    }
  };

  const editTask = (task) => {
    setEditingTask(task.id);
    setEditedTaskName(task.name);
  };

  const saveTask = async (taskId) => {
    try {
      await updateDoc(doc(db, "ai_tasks", taskId), { name: editedTaskName });
      toast.success("Task updated successfully.");
      setEditingTask(null);
    } catch (error) {
      toast.error("Failed to update task.");
    }
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
          {tasks.length === 0 ? (
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
                    <td className="p-2">{task.createdAt.seconds ? new Date(task.createdAt.seconds * 1000).toLocaleString() : "N/A"}</td>
                    <td className="p-2 flex space-x-2">
                      {editingTask === task.id ? (
                        <button onClick={() => saveTask(task.id)} className="text-green-400"><FaSave /></button>
                      ) : (
                        <button onClick={() => editTask(task)} className="text-blue-400"><FaEdit /></button>
                      )}
                      <button onClick={() => deleteTask(task.id)} className="text-red-400"><FaTrash /></button>
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
            <form onSubmit={addTask}>
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
