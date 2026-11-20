const $ = (id) => document.getElementById(id);
const log = (message) => { $("log").textContent += `\n${message}`; $("log").scrollTop = $("log").scrollHeight; };

$("fileInput").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  $("sourceCode").value = await file.text();
  $("programName").value = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 48) || "myprogram";
  $("log").textContent = `Loaded ${file.name} (${file.size.toLocaleString()} bytes).`;
});

$("setupButton").addEventListener("click", async () => {
  $("setupStatus").textContent = "Checking for compiler files…";
  try {
    const response = await fetch("./toolchain/manifest.json", { cache: "no-store" });
    if (!response.ok) throw new Error("No browser compiler package is installed in this site build.");
    const manifest = await response.json();
    if (!manifest.worker || !manifest.archive) throw new Error("Compiler manifest is incomplete.");
    $("setupStatus").textContent = "Compiler package detected; runtime integration is not configured.";
    log("A toolchain manifest was found, but this starter build does not yet include the compiler runtime.");
  } catch (error) {
    $("setupStatus").textContent = "Compiler package not installed";
    log(error.message);
  }
});

$("compileButton").addEventListener("click", () => {
  const source = $("sourceCode").value.trim();
  const name = $("programName").value.trim();
  if (!source) { log("Error: add some C source code first."); return; }
  if (!/^[a-zA-Z0-9_-]{1,48}$/.test(name)) {
    log("Error: use 1–48 letters, numbers, underscores, or hyphens for the program name.");
    return;
  }
  $("buildStatus").textContent = "NOT READY";
  log("Build not started: this starter website contains the interface, but not the Ndless WebAssembly compiler package.");
  log("A working build needs an ARM926EJ-S compiler/linker, Ndless headers and libraries, genzehn, and the TNS packaging step.");
  log("No output file was created. Your source remains in this browser tab and was not uploaded.");
});

$("log").textContent = "Ready. Select a C file or edit the example above.";
