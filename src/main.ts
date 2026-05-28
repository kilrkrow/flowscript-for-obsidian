import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { render, resolveTheme } from '@kilrkrow/flowscript';

interface FlowScriptSettings {
	theme: string;
	transparentBackground: boolean;
}

const DEFAULT_SETTINGS: FlowScriptSettings = {
	theme: 'clean',
	transparentBackground: false,
};

export default class FlowScriptPlugin extends Plugin {
	settings: FlowScriptSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new FlowScriptSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor('flow', (source, el) => {
			try {
				const svg = render(source, { theme: resolveTheme(this.settings.theme) });
				el.innerHTML = svg;
				const svgEl = el.querySelector('svg');
				if (svgEl) {
					svgEl.style.maxWidth = '100%';
					svgEl.style.height = 'auto';
					svgEl.style.display = 'block';
					svgEl.style.margin = '0 auto';
					if (this.settings.transparentBackground) {
						el.querySelector('svg > rect')?.remove();
					}
				}
			} catch (err) {
				const pre = el.createEl('pre', { cls: 'flowscript-error' });
				pre.textContent = err instanceof Error ? err.message : String(err);
			}
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class FlowScriptSettingTab extends PluginSettingTab {
	plugin: FlowScriptPlugin;

	constructor(app: App, plugin: FlowScriptPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Theme')
			.setDesc('Visual theme for rendered diagrams.')
			.addDropdown(drop => drop
				.addOption('clean', 'Clean (light)')
				.addOption('clean-dark', 'Clean (dark)')
				.setValue(this.plugin.settings.theme)
				.onChange(async (value) => {
					this.plugin.settings.theme = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName('Transparent background')
			.setDesc('Remove the diagram background so it blends with your vault theme.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.transparentBackground)
				.onChange(async (value) => {
					this.plugin.settings.transparentBackground = value;
					await this.plugin.saveSettings();
				})
			);
	}
}
