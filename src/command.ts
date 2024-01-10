import * as vscode from 'vscode';

export async function command() {
    const componentName = await getComponentName();
    
    //TODO: Split parsing the selection / validation from component generation
    generateComponent();
    handleTemplateDependencies();
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

function handleTemplateDependencies() {
    const editor = vscode.window.activeTextEditor;
    const selections = editor?.selections;

    //TODO: Validate we're in a template and that the HTML is closed
    if (selections && selections.length >= 1) {
        vscode.window.showInformationMessage('Selected HTML: ' + editor.document.getText(selections[0]));
    }
    else {
        const message = 'Must select some html';
        vscode.window.showErrorMessage(message);
        throw new Error(message);
    }
}


function handleScriptDependencies() {
    //TODO
}


function handleStyleDependencies() {
    //TODO
}
function generateComponent() {
    //TODO
}

