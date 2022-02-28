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
  } else if (props.status.state ===  0) {
    return "Server is starting";
  } else if (props.status.state ===  16) {
    const lastStatusUpdate = props.status.serverStatus.last_status_update;
    const playerCount = props.status.serverStatus.player_count;
    if (lastStatusUpdate === undefined || playerCount === undefined) return "Server is starting";
    const oneMinuteAgo = new Date(new Date().getTime() - 60 * 1000);
    if (lastStatusUpdate < oneMinuteAgo.toISOString()) return "Server is starting";
    return `Server is running, ${props.status.serverStatus.player_count} players online`;
  } else if (props.status.state ===  32 || props.status.state === 64) {
    return "Server is stopping";
  } else if (props.status.state ===  48) {
    return "Error (Instance is terminated)";
  } else if (props.status.state === 80) {
    return "Server is stopped";
  } else {
    console.error("Unknown state:", props.state);
    return "Error (unknown state)";
  }
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