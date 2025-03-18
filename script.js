let diskInserted = false;
let explosionWarning = false;
let wholeSchoolRerouted = false;

const output = document.getElementById("output");
const input = document.getElementById("input");

function log(text) {
    output.innerText += text + "\n";
    output.scrollTop = output.scrollHeight;
}

function displayOptions() {
    log("\nSYSTEM OPTIONS:\n1. Reroute Power\n2. Total Shutdown\n3. Check Power/Pressure Levels\n4. Change Disk\n5. Eject Disk\n6. Exit Terminal");
}

function checkLevels() {
    log("\n> Checking power and pressure levels...");
    log("⚠️ POWER LEVEL: MAXIMUM");
    log("⚠️ PRESSURE LEVEL: MAXIMUM");
    if (wholeSchoolRerouted) {
        log("🔥 SYSTEM WARNING: Whole-school rerouting detected. Power grid unstable.");
    }
}

function reroutePower() {
    if (!diskInserted) {
        log("\nACCESS DENIED.");
        return;
    }

    log("\n> Rerouting power...");
    log("Select rerouting target:\n- Classrooms 101-111\n- Classrooms 201-209\n- WHOLE SCHOOL");

    input.addEventListener("keydown", function handler(event) {
        if (event.key === "Enter") {
            let target = input.value.trim().toLowerCase();

            if (target === "101-111" || target === "classrooms 101-111") {
                log("⚠️ Power successfully rerouted to Classrooms 101-111.");
                if (explosionWarning) log("🔥 WARNING: Power surge increasing. Explosion risk growing.");
            } else if (target === "201-209" || target === "classrooms 201-209") {
                log("⚠️ Power successfully rerouted to Classrooms 201-209.");
                if (explosionWarning) log("🔥 WARNING: Power surge increasing. Explosion risk growing.");
            } else if (target === "whole school" || target === "all") {
                if (!wholeSchoolRerouted) {
                    wholeSchoolRerouted = true;
                    log("⚠️⚠️ Power successfully rerouted to WHOLE SCHOOL.");
                    log("🔥 CRITICAL WARNING: System overload imminent. Emergency shutdown disabled.");
                } else {
                    log("⚠️ Whole-school rerouting already active.");
                }
            } else {
                log("Invalid target.");
            }
            input.value = "";
            input.removeEventListener("keydown", handler);
        }
    });
}

function totalShutdown() {
    if (!diskInserted) {
        log("\nACCESS DENIED.");
        return;
    }

    log("\n> Initiating total shutdown sequence...");
    if (wholeSchoolRerouted) {
        log("⚠️ ERROR: Whole-school rerouting detected. Shutdown sequence aborted.");
    } else if (explosionWarning) {
        log("⚠️ ERROR: Power surge detected. Shutdown sequence aborted.");
    } else {
        log("✅ SYSTEM SHUTDOWN SUCCESSFUL.");
        input.disabled = true;
    }
}

function changeDisk() {
    if (!diskInserted) {
        diskInserted = true;
        explosionWarning = true;
        log("⚠️ WARNING: Power levels exceeding safe limits!");
        log("⚠️ EXPLOSION IMMINENT.");
    } else {
        log("Disk already inserted.");
    }
}

function ejectDisk() {
    if (diskInserted) {
        diskInserted = false;
        explosionWarning = false;
        wholeSchoolRerouted = false;
        log("✅ Disk ejected. Power levels stabilizing.");
    } else {
        log("No disk inserted.");
    }
}

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const command = input.value.trim().toLowerCase();

        if (command === "1" || command === "reroute power") reroutePower();
        else if (command === "2" || command === "total shutdown") totalShutdown();
        else if (command === "3" || command === "check power" || command === "check pressure") checkLevels();
        else if (command === "4" || command === "change disk") changeDisk();
        else if (command === "5" || command === "eject disk") ejectDisk();
        else if (command === "6" || command === "exit") log("CONSOLE OFFLINE.");
        else log("\nACCESS DENIED.");

        input.value = "";
    }
});

log(">> SYSTEM CONSOLE ONLINE");
log(">> Initializing...");
setTimeout(() => displayOptions(), 1000);
