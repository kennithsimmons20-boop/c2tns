# Ndless C to TNS — browser starter

This is the user-interface starter for a browser-based TI-Nspire CX / Ndless C compiler.

## Run it

Serve this folder over HTTP (do not open `index.html` directly):

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Current status — important

This starter is **not yet a working C-to-TNS compiler**. It includes the UI, C-file upload, source editor, project-name validation, and setup messaging. The compile button intentionally reports that the compiler runtime is not installed instead of producing a fake `.tns` file.

A real browser build still needs a compatible WebAssembly toolchain and runtime integration:

- ARM GCC/binutils targeting the Ndless calculator (ARM926EJ-S)
- the matching Ndless headers and libraries
- Ndless linker configuration (`nspire-ld`)
- `genzehn`
- `make-prg` and the required loader asset

The normal Ndless build flow compiles and links the source, converts the ELF to Zehn, and packages the resulting `.tns`. A generic C compiler or renaming a file to `.tns` is not sufficient.

The first-run notice is already in place. When the actual WASM toolchain package is ready, its installer should download it once, verify its integrity, cache it locally (for example with IndexedDB/Cache Storage), and then enable compilation.

## References

- Ndless project: https://github.com/ndless-nspire/Ndless
- Ndless SDK build overview: https://www.hackspire.org/C_and_assembly_development_introduction/
- Zehn format and tools: https://www.hackspire.org/Zehn/
- TNS Tool WASM (web editor; general Ndless C/C++ compilation is currently in its Windows portable edition): https://github.com/acewalt/tns-tool-wasm
