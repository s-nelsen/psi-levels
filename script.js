const terminal = document.getElementById("terminal")
const input = document.getElementById("input")

let psiLevel = 90
let volumeLevel = 50 // Default to 50
let pressureLevel = "Stable"
let convergenceActive = true
let adminLocked = true
let diskInserted = false
let fileName = "ggsmix.mp3"
let excessPowerRerouted = false

const log = (message) => {
  terminal.innerText += `${message}\n`
  terminal.scrollTop = terminal.scrollHeight
}

const displayStatus = () => {
  log(`Running Convergence.exe [ACTIVE]...`)
  log(`Psi Output: ${psiLevel}%`)
  log(`Pressure Level: ${pressureLevel}`)
  log(`Volume: ${volumeLevel}\n`)
}

const fakeDiskProcessing = () => {
  log("Reading disk...")
  setTimeout(() => {
    log("Processing disk...")
    
    setTimeout(() => {
      log("Disk data transfer complete.")
      log("⚠️ WARNING: Unfamiliar File Type")
      log("⚠️ WARNING: System instability likely.")
      //log(`${fileName} detected.`)
    }, 2000) // Simulate 2 seconds of disk processing
  }, 3000) // Simulate 3 seconds of disk reading time
}

const handleRun = (args) => {
  if (args[0] === "disk") {
    if (!excessPowerRerouted) {
      log("⚠️ Power levels too high. Excess power must be rerouted before running the disk.")
      return
    }

    log("Running disk...")
		fakeDiskProcessing()
    // Simulate logs after running the disk
    log("⚠️ WARNING: Excess power rerouted. SYSTEM UNSTABLE.")
    log("⚠️ WARNING: Psi levels nearing critical.")
    log("⚠️ WARNING: Pressure may fluctuate.")
    log("⚠️ WARNING: Disk operation completed.")
     // Fake disk processing after the disk run command
  } else {
    log("Invalid run command.")
  }
}

const handleDisk = (args) => {
  if (args[0] === "eject") {
    diskInserted = true
    log("Tray ejected. Insert disk")
  } else if (args[0] === "read") {
    if (diskInserted) {
      fakeDiskProcessing()
      setTimeout(() => {
      //log("Disk data transfer complete.")
      log(" ")
      log(" ")
      log(`${fileName} detected.`)
    }, 9000)
      //setTimeout(9000, log(`${fileName} detected.`))
     
      //log(`${fileName} detected.`)
       // Fake disk processing after reading the disk
    } else {
      log("No disk inserted.")
    }
  } else {
    log("Invalid disk command.")
  }
}

const handleRerouteExcess = (args) => {
  if (!args[0]) {
    log("Please input target classroom (room num) or 'all' for entire school:")
    return
  }

  const target = args[0].toLowerCase()

  if (target === "all") {
    log("⚠️ Excess power rerouted to entire school. SYSTEM UNSTABLE.")
    excessPowerRerouted = true
  } else if (
    /^(101|102|103|104|105|106|107|108|109|110|111|201|202|203|204|205|206|207|208|209)$/.test(
      target
    )
  ) {
    log(`⚠️ Excess power rerouted to Classroom ${target}. Explosion risk increased.`)
    excessPowerRerouted = true
  } else {
    log("Invalid classroom number.")
    return
  }

  log("Excess power rerouted.")
}

const handleVolume = (args) => {
  const volume = parseInt(args[0], 10)

  if (isNaN(volume) || volume < 20 || volume > 100) {
    if (volume < 20 && adminLocked) {
      log("⚠️ Volume set below 20. Admin login required.")
    } else {
      log("Invalid volume. Please enter a value between 20 and 100.")
    }
  } else {
    if (volume < 20 && adminLocked) {
      log("⚠️ Volume set below 20. Admin login required.")
    } else {
      volumeLevel = volume
      log(`Volume set to ${volumeLevel}.`)
    }
  }
}

const handleHelp = (args) => {
  if (!args[0]) {
    log("Available commands: run, disk, reroute.excess, volume, read, eject, exit, help")
  } else if (args[0] === "run") {
    log("run disk - Run disk after rerouting excess power.")
  } else if (args[0] === "disk") {
    log("disk eject - Eject the disk tray.")
    log("disk read - Read the disk inserted.")
  } else if (args[0] === "reroute.excess") {
    log("reroute.excess [classroom number or 'all'] - Reroute excess power to a classroom.")
  } else if (args[0] === "volume") {
    log("volume [value] - Set the volume level between 20 and 100.")
  } else {
    log("Invalid help target.")
  }
}

const handleCommand = (command) => {
  const parts = command.split(" ")
  const action = parts.shift().toLowerCase()

  switch (action) {
    case "run":
      handleRun(parts)
      break
    case "disk":
      handleDisk(parts)
      break
    case "reroute.excess":
      handleRerouteExcess(parts)
      break
    case "volume":
      handleVolume(parts)
      break
    case "help":
      handleHelp(parts)
      break
    case "exit":
      log("CONSOLE OFFLINE.")
      input.disabled = true
      break
    default:
      log("Invalid command.")
  }
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const command = input.value.trim()
    handleCommand(command)
    input.value = "" // Clear the input after handling
  }
})

log(">> SYSTEM CONSOLE ONLINE")
setTimeout(displayStatus, 1000)
