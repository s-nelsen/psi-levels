const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

let state = {
  psiLevel: 97,
  volumeLevel: "Medium",
  pressureLevel: "Stable",
  location: "Gym",
  convergenceActive: true,
  activeProgram: "Convergence.exe",
  adminLocked: true,
  diskInserted: false,
  trayInserted: true,
  fileName: "ggsmix.mp3",
  powerRerouted: true,
};

const log = (message) => {
  terminal.innerText += `${message}\n`;
  terminal.scrollTop = terminal.scrollHeight;
};

const displayStatus = () => {
  log("-----------------------------------------");
  log(`Running ${state.activeProgram} [ACTIVE]...`);
  log(`Psi Output: ${state.psiLevel}%`);
  log(`Pressure Level: ${state.pressureLevel}`);
  log(`Volume: ${state.volumeLevel}`);
  log(`Power Sector: ${state.location}`);
  log("-----------------------------------------");
};

const handleRun = (args) => {
  if (!state.diskInserted) {
    log("Please insert a disk");
    return;
  }

  if (args[0] === "ggsmix.mp3" || args[0] === "disk") {
    if (state.psiLevel > 100) {
      log("Running Disk");
      log("File...... GGsMix.mp3");
      setTimeout(() => log("POWER LEVEL RAISING"), 1000);
      setTimeout(() => log("PRESSURE AT MAX"), 2000);
      setTimeout(() => log("ERROR"), 2500);
      setTimeout(() => log("ERROR"), 3000);
      setTimeout(() => log("ERROR"), 3500);
      setTimeout(() => log("ERROR"), 4000);
      setTimeout(() => log("ERROR"), 4500);
      setTimeout(() => log("ERROR"), 5000);
      setTimeout(() => log("ERROR"), 5500);
      setTimeout(() => log("ERROR"), 6000);
      setTimeout(
        () =>
          log(
            "⚠️ CRITICAL POWER ERROR: FAIL SAFE ENABLED - ACTION CANCELLED! Reroute Excess Power"
          ),
        7000
      );
    } else {
      log("Running disk...");
      log("⚠️ WARNING: POWER AT CRITICAL MASS");
      setTimeout(() => log("File...... GGsMix.mp3"), 1000);
      setTimeout(() => log("Initializing"), 2000);
      setTimeout(() => log("Playing GGsMix.MP3"), 3000);
      state.activeProgram = "GGsMix.MP3";
      setTimeout(displayStatus, 4000);
    }
  } else {
    log("Invalid run command. Example: run [filename]");
  }
};

const handleRead = (args) => {
  switch (args[0]) {
    case "disk":
      if (state.diskInserted) {
        log("Reading disk...");
        setTimeout(() => {
          log("Disk reading complete.");
          log("Initializing file system...");
        }, 2000);
        setTimeout(() => log("GGsMix.mp3"), 4000);
        state.pressureLevel = "Critical";
        state.psiLevel = 101;
      } else {
        log("No Disk Inserted");
      }
      break;
    case "log":
      log("-- SYS.LOG --");
      log("Priming System...");
      log(`Running ${state.activeProgram}...`);
      log(`Psi Output: ${state.psiLevel}%`);
      log(`Pressure Level: ${state.pressureLevel}`);
      log(`Volume Level: ${state.volumeLevel}`);
      log(`Location: ${state.location}`);
      log("File system initialized...");
      log("Disk check complete...");
      break;
    // case "power levels":
    // log(`Psi Output: ${state.psiLevel}%`);
    // log(`Pressure Level: ${state.pressureLevel}`);
    // log(`Volume Level: ${state.volumeLevel}`);
    // log(`Location: ${state.location}`);
    // break;
    default:
      log("Invalid read command. usage read[name] disk/log ");
  }
};

const handleRunShut = () => {
  if (state.adminLocked) {
    log("Admin login required for shutdown.");
  } else {
    log("System shutting down...");
    setTimeout(() => log("Shutdown complete."), 2000);
  }
};

const handleTray = (args) => {
  switch (args[0]) {
    case "open":
      if (state.trayInserted) {
        log("Ejecting tray...");
        setTimeout(() => log("Tray is open, insert Disk"), 4000);
        state.trayInserted = false;
      } else {
        log("Tray is already ejected");
      }
      break;
    case "close":
      if (!state.trayInserted) {
        log("Closing Tray");
        setTimeout(() => log(" "), 4000);
        setTimeout(() => log("Disk Inserted"), 4000);
        state.diskInserted = true;
        state.psiLevel = 102;
        state.pressureLevel = "Severe";
        setTimeout(displayStatus, 6000);
      } else {
        log("Tray is not ejected");
      }
      break;
    default:
      log("Invalid tray command. Usage: tray[Open/Close]");
  }
};

const handleVolume = (args) => {
  const volumeInput = parseInt(args[0], 10);
  if (isNaN(volumeInput)) {
    log("Invalid volume input. Example: volume [number]");
  } else if (volumeInput < 20 && state.adminLocked) {
    log("Admin login required for volume below 20.");
  } else {
    state.volumeLevel = volumeInput;
    log(`Volume set to ${volumeInput}.`);
  }
};

const handleReroute = (args) => {
  if (!state.powerRerouted) {
    log("Power already rerouted.");
  } else {
    const validRooms = /^(101|102|103|104|105|106|107|108|109|110|111|201|202|203|204|205|206|207|208|209)$/;
    if (args[0] === "all") {
      log("⚠️ Rerouting power to entire school");
      setTimeout(() => log("Power Rerouted, System is Sustaining"), 4000);
      state.psiLevel = 99;
      state.pressureLevel = "HIGH";
      state.location = "Entire Building";
      setTimeout(displayStatus, 1000);
    } else if (validRooms.test(args[0])) {
      log(`⚠️ Rerouting power to Room ${args[0]}.`);
      setTimeout(() => log("Power Rerouted, Systems Critical"), 4000);
      state.psiLevel = 120;
      state.pressureLevel = "CRITICAL";
      state.location = `Gym and Room ${args[0]}`;
      setTimeout(displayStatus, 1000);
    } else {
      log("Invalid target. Usage: reroute [room/all]");
      return;
    }
    state.powerRerouted = true;
    setTimeout(displayStatus, 1000);
  }
};

const handleCommand = (command) => {
  const [action, ...args] = command.split(" ");
  switch (action) {
    case "run":
      handleRun(args);
      break;
    case "tray":
      handleTray(args);
      break;
    case "read":
      handleRead(args);
      break;
    case "shutdown":
      handleRunShut();
      break;
    case "volume":
      handleVolume(args);
      break;
    case "help":
      log("Available commands: run, tray, read, shutdown, help, volume, reroute");
      break;
    case "reroute":
      handleReroute(args);
      break;
    case "exit":
      log("CONSOLE OFFLINE.");
      input.disabled = true;
      break;
    default:
      log("Invalid command. Type 'help' for a list of available commands.");
  }
};

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const command = input.value.trim();
    if (command) handleCommand(command);
    input.value = "";
  }
});

log(">> SYSTEM CONSOLE ONLINE");
setTimeout(displayStatus, 1000);
