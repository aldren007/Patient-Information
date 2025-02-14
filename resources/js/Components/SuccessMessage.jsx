import { useState, useEffect } from "react";

export default function SuccessMessage({ message, duration = 5000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) {
      setVisible(false); // Hide if message is empty
      return;
    }

    setVisible(true); // Show when a new message appears

    const timer = setTimeout(() => setVisible(false), duration);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-2">
      {message}
    </div>
  );
}
