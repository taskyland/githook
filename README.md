# githook

Filters useless Github events (bot pushes, state changes, etc) before forwarding to Discord, reducing noise.

An instance is hosted at https://githook.tasky.workers.dev/.

# Configuration

The webhook can be configured with the following params:

- Only forward events from specific branches (`allowBranches`, simplified wildcard syntax) 
  - `abc*xyz` is equivalent to `/^(abc.*xyz)$/`

- Ignore release tag updates (`hideTags`)
