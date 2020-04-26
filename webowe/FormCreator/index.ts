document.addEventListener('DOMContentLoaded', ()=>{Start()})

function Start(){
    const app = new App(input, inputNazwisko ,mail ,select ,checkbox ,textarea ,date );
    app.Show();
}

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
    label: HTMLLabelElement;
    labelValue: string;
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
}


class InputField implements Field{
    name: string;
    label: HTMLLabelElement;
    labelValue: string;
    type: FieldType;
    element: HTMLInputElement;

    constructor(name: string, label: string){
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[1];
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
        
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}


class TextAreaField implements Field{
    name: string;
    label: HTMLLabelElement;
    labelValue: string;
    type: FieldType;
    element: HTMLTextAreaElement;

    constructor(name: string, label: string){
        this.element = <HTMLTextAreaElement>document.createElement('textarea');
        this.element.name = name;
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}


class DateField implements Field{
    name: string;
    label: HTMLLabelElement;
    labelValue: string;
    type: FieldType;
    element: HTMLInputElement;

    constructor(name: string, label: string){
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[3];
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}

class EmailField implements Field{
    name: string;
    label: HTMLLabelElement;
    labelValue: string;
    type: FieldType;
    element: HTMLInputElement;

    constructor(name: string, label: string){
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[4];
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}

class SelectField implements Field{
    name: string;
    label: HTMLLabelElement;
    labelValue: string;
    type: FieldType;
    element: HTMLSelectElement;

    constructor(name: string, label: string, ...options: string[]){
        this.element = <HTMLSelectElement>document.createElement('select');
        options.forEach(element=>{
            const options = document.createElement('option');
            options.value = element;
            options.text = element;
            this.element.add(options);
        });
        this.element.name = name;
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}

class CheckboxField implements Field{
    name: string;
    label: HTMLLabelElement;
    labelValue: string;
    type: FieldType;
    element: HTMLInputElement;

    constructor(name: string, label: string){
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[6];
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return (this.element.checked) ?  'Tak' :  'Nie';
}

class Form{
    fields: Field[];
    formElement: HTMLElement;
    valueElement: HTMLElement;

    constructor(id: string, values: string){
        this.fields = new Array();
        this.formElement = document.getElementById(id);
        this.valueElement = document.getElementById(values);
    }

    render(): void{
        this.fields.forEach(element =>{
            this.formElement.appendChild(element.label);
            this.formElement.appendChild(element.render());
        });
    }

    getValue(): void{
        const array = <HTMLElement>document.createElement('ol');
        array.className = 'arrayData';
        this.valueElement.appendChild(array);

        this.fields.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = element.labelValue + ': '+ element.getValue();
            array.appendChild(li);
        });
    }
}

class App{
    form: Form;
    sendValues: HTMLElement;

    constructor(...elements: Field[]){
        this.form = new Form('formData', 'formDataOut');
        this.form.fields.push(...elements);
        this.sendValues = document.getElementById('sendValues');
        this.sendValues.addEventListener('click', () => this.form.getValue());
    }
    Show(){
        this.form.render();
    }

}


const input = new InputField('Name', 'Imię');
const inputNazwisko = new InputField('Surname', 'Nazwisko');
const mail = new EmailField('Mail', 'E-Mail');
const select = new SelectField('Select', 'Wybrany kierunek studiów', 'Kryminalistyka', 'Logistyka', 'Ekonometria');
const checkbox = new CheckboxField('E-Learning', 'Czy preferujesz e-learning?');
const textarea = new TextAreaField('Notes', 'Uwagi');
const date = new DateField('Date', 'Data');


