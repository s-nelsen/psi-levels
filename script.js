const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

let state = {
  psiLevel: 97,
  volumeLevel: "Medium",
  pressureLevel: "Stable",
  location: "Gym",
  convergenceActive: true,
  adminLocked: true,
  diskInserted: false,
  trayInserted: true,
  fileName: "ggsmix.mp3",
  powerRerouted: false,
};

const log = (message) => {
  terminal.innerText += `${message}\n`;
  terminal.scrollTop = terminal.scrollHeight;
};

const displayStatus = () => {
  log(`Running Convergence.exe [ACTIVE]...`);
  log(`Psi Output: ${state.psiLevel}%`);
  log(`Pressure Level: ${state.pressureLevel}`);
  log(`Volume: ${state.volumeLevel}\n`);
};

const handleRun = (args) => {
  if (args[0] === "disk") {
    if (state.psiLevel > 95) {
      log("Running Disk");
      log("File...... GGsMix.mp3");
      log("⚠️ ERROR: FAIL SAFE ENABLE ACTION CANCELLED! Reroute Excess Power");
    } else {
      log("Running disk...");
      log("⚠️ WARNING: POWER AT CRITICAL MASS");
      setTimeout(() => log("File...... GGsMix.mp3"), 2000);
    }
  } else {
    log("Invalid /run command. Example: run disk");
  }
};

const handleRead = (args) => {
  switch (args[0]) {
    case "disk":
      log("Disk read initiated...");
      setTimeout(() => {
        log("Disk reading complete.");
        log("Initializing file system...");
        setTimeout(() => log("GGsMix.mp3"), 4000);
        state.pressureLevel = "Critical";
        state.psiLevel = 101;
      }, 2000);
      break;
    case "sys.log":
      log("-- SYS.LOG --");
      log("Priming System...");
      log("Running Convergence.exe...");
      log(`Psi Output: ${state.psiLevel}%`);
      log(`Pressure Level: ${state.pressureLevel}`);
      log(`Volume Level: ${state.volumeLevel}`);
      log(`Location: ${state.location}`);
      log("File system initialized...");
      log("Disk check complete...");
      break;
    case "power levels":
      log(`Psi Output: ${state.psiLevel}%`);
      log(`Pressure Level: ${state.pressureLevel}`);
      log(`Volume Level: ${state.volumeLevel}`);
      log(`Location: ${state.location}`);
      break;
    default:
      log("Invalid /read command. Examples: read disk, read sys.log, read power levels");
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
    case "eject":
      if (state.trayInserted) {
        log("Ejecting tray...");
        state.diskInserted = true;
        log("Tray ejected.");
      } else {
        log("An error has occurred");
      }
      break;
    case "read":
      if (state.diskInserted) {
        log("Reading disk...");
        setTimeout(() => {
          log("Disk reading complete.");
          log("Initializing file system...");
        }, 2000);
      } else {
        log("No tray inserted.");
      }
      break;
    default:
      log("Invalid /tray command. Examples: tray eject, tray read");
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
  if (state.powerRerouted) {
    log("Power already rerouted.");
  } else {
    const validRooms = /^(101|102|103|104|105|106|107|108|109|110|111|201|202|203|204|205|206|207|208|209)$/;
    if (args[0] === "all") {
      log("⚠️ Rerouting power to entire school");
      setTimeout(() => log("Power Rerouted, System is Sustaining"), 4000);
      state.psiLevel = 96;
      state.pressureLevel = "HIGH";
      state.location = "Entire Building";
    } else if (validRooms.test(args[0])) {
      log(`⚠️ Rerouting power to Room ${args[0]}.`);
      setTimeout(() => log("Power Rerouted, Systems Critical"), 4000);
      state.psiLevel = 120;
      state.pressureLevel = "CRITICAL";
      state.location = `Gym and Room ${args[0]}`;
    } else {
      log("Invalid target. Example: reroute [room number/all]");
      return;
    }
    state.powerRerouted = true;
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
