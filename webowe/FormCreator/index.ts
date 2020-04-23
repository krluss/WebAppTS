enum FieldType {
    text = 1,
    textarea,
    date,
    email,
    select,
    checkbox
}

interface Field {
    name: string;
    label: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
}


class InputField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;

    constructor(name: string, label: string){
        this.type = FieldType.text;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.setAttribute('type', 'this.type');
        this.name = name;
        this.label = label;
        this.element.name = this.name;
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.nodeValue;
    }
}


class TextAreaField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLElement;

    constructor(name: string, label: string){
        this.type = FieldType.textarea
        this.element = <HTMLTextAreaElement>document.createElement('textarea');
        this.name = name;
        this.label = label;
        this.element.className = this.name
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.nodeValue;
    }
}


class DateField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLElement;

    constructor(name: string, label: string){
        this.type = FieldType.date;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.setAttribute('type', ' this.type');
        this.name = name;
        this.label = label;
        this.element.className = this.name
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.nodeValue;
    }
}

class EmailField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLElement;

    constructor(name: string, label: string){
        this.type = FieldType.email;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.setAttribute('type', 'this.type');
        this.name = name;
        this.label = label;
        this.element.className = this.name
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.nodeValue;
    }
}

class SelectField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLElement;

    constructor(name: string, label: string){
        this.type = FieldType.select
        this.element = <HTMLSelectElement>document.createElement('select');
        this.name = name;
        this.label = label;
        this.element.className = this.name
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.nodeValue;
    }
}

class CheckboxField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLElement;

    constructor(name: string, label: string){
        this.type = FieldType.checkbox;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.setAttribute('type', 'this.type');
        this.name = name;
        this.label = label;
        this.element.className = this.name
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.nodeValue;
    }
}

class Form{
    fields: Field[];
    formElement: HTMLElement;

    constructor(id: string){
        this.fields = new Array();
        this.formElement = document.getElementById(id);
    }

    render(): void{
        //TODO
    }

    getValue(): void{
        //TODO
    }
}