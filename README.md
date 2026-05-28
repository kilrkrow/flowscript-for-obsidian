# FlowScript Diagrams for Obsidian

Render fenced ` ```flow ` code blocks as inline SVG flowcharts inside any Obsidian note, powered by [FlowScript](https://github.com/kilrkrow/flowscript).

## Usage

Create a fenced code block with the language set to `flow`:

~~~markdown
```flow
#start User Visits Page
  Enter Email
  #decision Valid?
    -> yes: #end Welcome
    -> no: Show Error
```
~~~

The block renders as an inline SVG diagram in both Live Preview and Reading view.

## Syntax

FlowScript uses an indentation-driven DSL. A few key constructs:

| Syntax | Meaning |
|---|---|
| `#start Label` | Start node (rounded rect) |
| `#end Label` | End node (rounded rect) |
| `#decision Label` | Decision diamond |
| `Plain text` | Process rectangle |
| `#subprocess`, `#io`, `#data`, `#note` | Additional shapes |
| `-> yes: Target` | Named branch |
| `~> Label` | Dashed / retry edge |
| `#group Name` | Logical grouping |
| `#lane Name` | Swimlane column |
| `@direction LR` | Flow direction (TB, BT, LR, RL) |
| `@theme clean-dark` | Theme override per diagram |

Full syntax reference: [kilrkrow/flowscript](https://github.com/kilrkrow/flowscript#syntax-reference)

## Settings

| Setting | Default | Description |
|---|---|---|
| Theme | Clean (light) | `Clean (light)` or `Clean (dark)` |
| Transparent background | Off | Removes the diagram background so it blends with your vault theme |

## Installation

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](../../releases/latest)
2. Copy them to `.obsidian/plugins/flowscript-diagrams/` in your vault
3. Enable **FlowScript Diagrams** in Settings → Community Plugins

### BRAT (beta)

Add `kilrkrow/flowscript-for-obsidian` in [BRAT](https://github.com/TfTHacker/obsidian42-brat).

## License

[MIT](LICENSE)
