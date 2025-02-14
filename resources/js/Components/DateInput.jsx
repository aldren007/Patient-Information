import { useState, useEffect } from "react";

export default function DateInput({ dbDate }) {
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    if (dbDate) {
      setBirthDate(new Date(dbDate).toISOString().split("T")[0]); // Ensure YYYY-MM-DD format
    }
  }, [dbDate]);
  //console.log(birthDate);
  return (
    <div>
      <input
        type="date"
        className="mt-1 block w-full bg-white dark:bg-gray-800 sm:rounded-lg border-gray-300"
        isFocused={true}
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
    </div>
  );
}
