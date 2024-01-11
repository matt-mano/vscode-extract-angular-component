import { close } from 'fs';
import * as vscode from 'vscode';

export async function command() {
    const componentName = await getComponentName();
    
    //TODO: Split parsing the selection / validation from component generation
    await generateComponent(componentName);
    await handleTemplateDependencies(componentName);
    handleScriptDependencies()
    handleStyleDependencies();
}

async function getComponentName(): Promise<string> {
    const componentNameQuery = await vscode.window.showInputBox({
        placeHolder: "Component Name",
        prompt: "Enter subcomponent name"
    });

    if(!componentNameQuery){
        const message = 'Component name required';
        vscode.window.showErrorMessage(message);
        throw new Error(message);
    }

    return componentNameQuery;
}

async function handleTemplateDependencies(name: string) {
    let editor = vscode.window.activeTextEditor;
    const selections = editor?.selections;
    let subcomponent = '';

    //TODO: Validate we're in a template and that the HTML is closed
    if (selections && selections.length >= 1) {
        subcomponent = editor?.document?.getText(selections[0]) ?? '';
    }

    const path = vscode.workspace?.workspaceFolders?.at(0)?.uri?.fsPath ?? ''; 
    vscode.window.showInformationMessage(path + "\\" + name + "\\" + name + ".component.html");
    await vscode.workspace.openTextDocument(vscode.Uri.parse(path));

    editor = vscode.window.activeTextEditor;
    if(!editor)
        throw new Error("Couldn't generate the component");

    const document = editor.document;
    const lastLine = document.lineAt(document.lineCount - 1);
    const range = new vscode.Range(lastLine.range.start, lastLine.range.end);
    editor.edit((editBuilder) => {
    editBuilder.insert(range.end, "\n" + subcomponent);
});}


function handleScriptDependencies() {
    //TODO
}


function handleStyleDependencies() {
    //TODO
}
async function generateComponent(name: string) {
    const terminalName = 'Extract Angular Component';
    let terminal = vscode.window.terminals.find(t => t.name === terminalName);

    if(!terminal){
        terminal = vscode.window.createTerminal(terminalName);
    }
    
    terminal.sendText('ng g c ' + name, true);
    terminal.sendText('exit', true);

    return new Promise((resolve, reject) => {
        const disposable = vscode.window.onDidCloseTerminal(async (closeEvent) => {
            if (closeEvent === terminal) {
                disposable.dispose();
                if (terminal.exitStatus !== undefined) {
                    resolve(terminal.exitStatus);
                } else {
                    reject("Could not generate component");
                }
            }
        });
    });
}

