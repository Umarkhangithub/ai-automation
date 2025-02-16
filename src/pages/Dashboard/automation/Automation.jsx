import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaCheckCircle, FaSpinner, FaTrash, FaEdit, FaSave, FaPlus, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { auth, onAuthStateChanged, db, collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc, query, where, getDocs } from "../../../firebase/Firebase";

const Automation = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customTaskName, setCustomTaskName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "ai_tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const checkSubscriptionLimit = async () => {
    if (!user) return false;
    const userTasksQuery = query(collection(db, "ai_tasks"), where("userId", "==", user.uid));
    const taskSnapshot = await getDocs(userTasksQuery);
    const taskCount = taskSnapshot.size;
    const taskLimit = 5; // Example limit, adjust as needed
    return taskCount >= taskLimit;
  };

  const triggerTask = useCallback(async () => {
    if (!user) return toast.error("You must be logged in to start a task.");
    if (await checkSubscriptionLimit()) return navigate("/upgrade-pro-plan");
    
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "ai_tasks"), {
        name: "AI Data Processing",
        status: "Pending",
        createdAt: new Date(),
        userId: user.uid,
      });
      toast.success("Task started successfully!");
      setTimeout(async () => {
        await updateDoc(doc(db, "ai_tasks", docRef.id), { status: "Completed" });
        setLoading(false);
      }, 5000);
    } catch (error) {
      toast.error("Error starting task.");
      setLoading(false);
    }
  }, [user, navigate]);

  const addCustomTask = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("You must be logged in to add a task.");
    if (!customTaskName.trim()) return toast.error("Task name cannot be empty.");
    if (await checkSubscriptionLimit()) return navigate("/upgrade-pro-plan");
    
    try {
      const docRef = await addDoc(collection(db, "ai_tasks"), {
        name: customTaskName,
        status: "Pending",
        createdAt: new Date(),
        userId: user.uid,
      });
      toast.success("Custom task added!");
      setTimeout(async () => {
        await updateDoc(doc(db, "ai_tasks", docRef.id), { status: "Completed" });
      }, 5000);
      setCustomTaskName("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error adding custom task.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">🤖 AI Automation</h1>
      <p className="opacity-80">Trigger AI tasks and track their status.</p>
      {user && (
        <div className="mt-4 bg-gray-700 p-4 rounded-lg shadow-md">
          <p>👤 <strong>User:</strong> {user.email}</p>
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
              {task.status === "Completed" ? <FaCheckCircle className="text-green-500" /> : <FaSpinner className="text-yellow-400 animate-spin" />}
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
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-500 rounded"> <FaTimes /> Cancel </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 rounded"> <FaSave /> Add Task </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automation;
