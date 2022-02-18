import { useEffect } from "react";
import { useState } from "react";

async function getServerStatus() {
  const response = await fetch("/api/get-server-status", { method: "POST" });
  return await response.json();
}

async function startServer() {
  const response = await fetch("/api/start-server", { method: "POST" });
  return await response.json();
}

function StatusMessage(props) {
  if (props.status.state === null) {
    return "Error (no state)";
  }
  if (props.status.state ===  0) {
    return "Server is starting";
  }
  if (props.status.state ===  16) {
    const playerCount = props.status.serverStatus.player_count;
    if (playerCount === undefined) return "Server is starting";
    return `Server is running, ${playerCount} players online`;
  };
  if (props.status.state ===  32 || props.status.state === 64) {
    return "Server is stopping";
  }
  if (props.status.state ===  48) {
    return "Error (Instance is terminated)";
  }
  if (props.status.state === 80) {
    return "Server is stopped";
  }
  console.error("Unknown state:", props.state);
  return "Error (unknown state)";
}

function StartServerButton(props) {
  return <button
    onClick={startServer}
    disabled={props.state !== 80}
  >
    Start Server
  </button>;
}

function Status() {
  const [status, setStatus] = useState();

  useEffect(() => {
    const timer = setInterval(async () => setStatus(await getServerStatus()), 2000);
    return () => clearInterval(timer);
  });
  
  if (!status) {
    return "Loading...";
  }
  if (status.state === null) {
    console.error("No state in status:", status);
    return "Error (no state)";
  }
  return <>
    <StatusMessage status={status} />
    <StartServerButton state={status.state} />
  </>;
}

export default Status;