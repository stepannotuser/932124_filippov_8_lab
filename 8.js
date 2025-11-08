const elementsContainer = document.getElementsByClassName('field_container')[0];
const resultDisplay = document.getElementById('output_field');
const createdElements = [];

class InputBlock {
    constructor() {
        this.blockElement = document.createElement('div');
        this.blockElement.className = 'field';
        
        this.textInput = this.createInputElement('text');
        this.numInput = this.createInputElement('number');
        
        this.moveUpBtn = this.createControlButton('↑', () => this.shiftUpwards());
        this.moveDownBtn = this.createControlButton('↓', () => this.shiftDownwards());
        this.deleteBtn = this.createControlButton('×', () => this.deleteBlock());
        
        this.assembleBlock();
    }
    
    createInputElement(inputType) {
        const input = document.createElement('input');
        input.type = inputType;
        return input;
    }
    
    createControlButton(label, clickHandler) {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', clickHandler);
        return button;
    }
    
    assembleBlock() {
        this.blockElement.append(this.textInput);
        this.blockElement.append(this.numInput);
        this.blockElement.append(this.moveUpBtn);
        this.blockElement.append(this.moveDownBtn);
        this.blockElement.append(this.deleteBtn);
    }
    deleteBlock() {
        this.blockElement.remove();
        const elementIndex = createdElements.indexOf(this);
        if (elementIndex > -1) {
            createdElements.splice(elementIndex, 1);
        }
    }
    shiftUpwards() {
        const previousBlock = this.blockElement.previousElementSibling;
        if (previousBlock) {
            previousBlock.before(this.blockElement);
        }
    }
    
    shiftDownwards() {
        const nextBlock = this.blockElement.nextElementSibling;
        if (nextBlock) {
            nextBlock.after(this.blockElement);
        }
    }

}

function addNewElement() {
    const newBlock = new InputBlock();
    elementsContainer.appendChild(newBlock.blockElement);
    createdElements.push(newBlock);
}

function exportData() {
    const exportData = {};  
    const fieldBlocks = elementsContainer.querySelectorAll('.field');
    fieldBlocks.forEach(block => {
        const textField = block.querySelector('input[type="text"]');
        const numberField = block.querySelector('input[type="number"]');
        
        if (textField.value.trim() !== '') {
            exportData[textField.value] = numberField.value;
        }
    });
    resultDisplay.textContent = JSON.stringify(exportData, null, 2);
}