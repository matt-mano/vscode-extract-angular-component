import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Activated Extract Angular Component');

	let disposable = vscode.commands.registerCommand('extract-angular-component.extract-angular-component', () => {

		const editor = vscode.window.activeTextEditor;
		const selections = editor?.selections;

		if (selections && selections.length >= 1) {
			vscode.window.showInformationMessage('First Selection: ' + editor.document.getText(selections[0]));
		}
		else {
			vscode.window.showInformationMessage('No text');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
