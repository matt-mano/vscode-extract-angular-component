import * as vscode from 'vscode';
import { command } from './command';

export function activate(context: vscode.ExtensionContext) {
	console.log('Activated Extract Angular Component');

	let disposable = vscode.commands.registerCommand('extract-angular-component.extract-angular-component', command);

	context.subscriptions.push(disposable);
}

export function deactivate() { }
