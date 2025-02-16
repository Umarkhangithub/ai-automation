import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaUser, FaLock, FaBell, FaCogs, FaMoon, FaSun } from "react-icons/fa";
import {
  auth,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "../../../firebase/Firebase";
import { db, doc, updateDoc, onSnapshot } from "../../../firebase/Firebase";
import Input from "../../../components/ui/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    fullName: "",
    email: "",
    darkMode: false,
    notifications: true,
  });
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // ✅ State for success/error messages

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserSettings(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserSettings = useCallback((uid) => {
    const userDocRef = doc(db, "users", uid);
    return onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
    });
  }, []);

  const updateSettings = useCallback(
    async (updatedFields) => {
      if (!user) return;
      try {
        setSaving(true);
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, updatedFields);
        setSettings((prev) => ({ ...prev, ...updatedFields }));
        toast.success("✅ Settings updated successfully!");
      } catch (error) {
        toast.error("❌ Error updating settings: " + error.message);
      } finally {
        setSaving(false);
      }
    },
    [user]
  );

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new) {
      setMessage({ text: "❌ Please enter both current and new passwords.", type: "error" });
      return;
    }
    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(user.email, passwords.current);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(auth.currentUser, passwords.new);
      setMessage({ text: "✅ Password updated successfully!", type: "success" });
      setPasswords({ current: "", new: "" });
    } catch (error) {
      setMessage({ text: "❌ " + error.message, type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 5000); // ✅ Auto-hide message after 5s
    }
  };

  const darkModeClass = useMemo(() => (settings.darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"), [settings.darkMode]);

  return (
    <div className={`p-6 min-h-screen transition-all ${darkModeClass}`}>
      <h1 className="text-3xl font-bold">⚙️ Settings</h1>
      <p className="opacity-80">Manage your account, preferences, and security.</p>

      {/* ✅ Display Password Update Message */}
      {message && (
        <div className={`mt-4 p-3 rounded-md text-center ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
          {message.text}
        </div>
      )}

      {/* Profile Settings */}
      <SettingsSection title="Profile Settings" icon={FaUser}>
        <Input
          label="Full Name"
          type="text"
          value={settings.fullName}
          onChange={(e) => updateSettings({ fullName: e.target.value })}
          disabled={saving}
        />
        <Input label="Email" type="email" value={settings.email} disabled />
      </SettingsSection>

      {/* Security */}
      <SettingsSection title="Security" icon={FaLock}>
        <Input
          label="Current Password"
          type="password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
        />
        <Input
          label="New Password"
          type="password"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
        />
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="Notifications" icon={FaBell}>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => updateSettings({ notifications: !settings.notifications })}
            className="mr-2 cursor-pointer"
          />
          Enable Email Notifications
        </label>
      </SettingsSection>

      {/* Appearance */}
      <SettingsSection title="Appearance" icon={FaCogs}>
        <button
          onClick={() => updateSettings({ darkMode: !settings.darkMode })}
          className="mt-4 px-4 py-2 flex items-center bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
        >
          {settings.darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
          {settings.darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </SettingsSection>
    </div>
  );
};

const SettingsSection = ({ title, icon: Icon, children }) => (
  <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all">
    <h2 className="text-xl font-semibold flex items-center">
      <Icon className="mr-2" /> {title}
    </h2>
    <div className="mt-4">{children}</div>
  </div>
);

export default Settings;
