import { useEffect } from "react";
import { useState } from "react";

function Status() {
  const [status, setStatus] = useState();

  const getStatus = async () => {
    const response = await fetch("/api/get-server-status", { method: "POST" });
    const data = await response.json();
    setStatus(data);
  };

  useEffect(() => {
    const timer = setInterval(getStatus, 2000);
    return () => clearInterval(timer);
  });

  if (!status) {
    return "Loading...";
  }
  if (!status.state) {
    return "Error (no state)";
  }
  const state = status.state;
  if (state ===  0) {
    return "Server is starting";
  }
  if (state ===  16) {
    return "Server is running";
  };
  if (state ===  32 || state === 64) {
    return "Server is stopping";
  }
  if (state ===  48) {
    return "Error (Instance is terminated)";
  }
  if (state === 80) {
    return "Server is stopped";
  }
  return "Error (unknown state)";
}

export default Status;