import { Field } from './Field';
import { FieldType } from './FieldType'
import { InputField } from './InputField';
import { EmailField } from './EmailField';
import { SelectField } from './SelectField';
import { CheckboxField } from './CheckboxField';
import { TextAreaField } from './TextAreaField';
import { DateField } from './DateField';

export class Form{
    fields: Field[];
    formElement: HTMLElement;
    valuesTable: HTMLElement;
    formValues: Array<string>;
    id: string;
    _storage: Array<string> = [];
    outputDiv = <HTMLElement>document.getElementById('formDataOut');
    sendBtn = <HTMLElement>document.getElementById('sendValues');
    Form: HTMLFormElement;
    

    constructor(id: string){
        this.id = id;
        this.fields = new Array();
        this.formValues = new Array();
        this.formElement = document.getElementById(id) as HTMLElement;
        this.Form = document.getElementById('Form') as HTMLFormElement;
        this.sendBtn.addEventListener('click', () =>  {this.sendValues()});
        this.fields.push(new InputField('Imię', 'Imię', FieldType.text));
        this.fields.push(new InputField('Nazwisko', 'Nazwisko', FieldType.text));
        this.fields.push(new EmailField('EMail', 'E-Mail', FieldType.email));
        this.fields.push(new DateField('Data', 'Data urodzenia', FieldType.date));
        this.fields.push(new SelectField('Kierunek', 'Wybrany kierunek studiów', FieldType.select, ['Kryminalistyka', 'Logistyka', 'Ekonometria', 'IT']));
        this.fields.push(new CheckboxField('Elearning', 'Czy preferujesz e-learning ?', FieldType.checkbox));
        this.fields.push(new TextAreaField('Uwagi', 'Uwagi', FieldType.textarea));
        this.createTable();
        this.valuesTable = <HTMLElement>document.getElementById('values');
        this.loadTable();
        this.render();
    }

    createTable(): void{
        let table = document.createElement('table');
        table.id =  'values';
        let headings = document.createElement('tr');
        headings.id = 'headings';
        this.fields.forEach(element => {
            let th = document.createElement('th');
            th.innerHTML = element.label;
            headings.appendChild(th);
        });
        let th = document.createElement('th');
        th.innerHTML = 'Usuwanie';
        headings.appendChild(th);
        table.appendChild(headings);
        this.outputDiv.appendChild(table);
    }

    render(): void{
        const hForm = document.createElement('h1');
        hForm.setAttribute('id', 'hForm');
        hForm.appendChild(document.createTextNode('Wypełnij formularz'));
        this.formElement.parentNode.insertBefore(hForm, this.formElement);
        this.fields.forEach(element => {
            if (element.render().getAttribute('type') == 'checkbox') {
                let p = document.createElement('p');
                p.append(element.label);
                p.append(element.render());
                this.formElement.appendChild(p);
            }
            else {
                this.formElement.appendChild(element.render());
                this.formElement.appendChild(document.createElement("br"));
            }
        })
    }

    getValue(): void{
        this.formValues.length=0;
        this.fields.forEach(element => {
            this.formValues.push(element.getValue());
        })
    }
    addRecord(row_id?: any): void {
        let Single = row_id || {
            row_id: 'id_' + new Date().getTime()
        }
        const row = document.createElement('tr');
        this.valuesTable.appendChild(row);
        for (let i = 0; i < this.formValues.length; i++) {
            const cell = document.createElement('td');
            cell.append(this.formValues[i]);
            row.appendChild(cell);
        }
        row_id == undefined ? row.id = Single.row_id : row.id = row_id;
        const createButtonCell = document.createElement('td');
        const buttonDeleteRow = document.createElement('button');
        buttonDeleteRow.setAttribute('id', 'del');
        buttonDeleteRow.innerHTML = "Usuń";
        createButtonCell.appendChild(buttonDeleteRow);
        row.appendChild(createButtonCell);
        buttonDeleteRow.addEventListener('click', () => { this.deleteRecord(row) });
        if (row_id == undefined) {
            this._storage.push(JSON.stringify(row.id));
            this._storage.push(JSON.stringify(this.formValues));
        }
        localStorage.setItem(this.id, JSON.stringify(this._storage));
        this.formValues.length = 0;
        this.Form.reset();
    }

    deleteRecord(row: HTMLTableRowElement): void {
        let localValues = JSON.parse(localStorage.getItem(this.id));
        console.log(row.id);
        for (let i = 0; i < localValues.length; i++) {
            if (JSON.parse(localValues[i]) == row.id) {
                localValues.splice(i, 2);
            }
        }
        localStorage.setItem(this.id, JSON.stringify(localValues));
        this.valuesTable.removeChild(row);
    }

    loadTable(): void {
        if (localStorage.length != 0) {
            let localValues = JSON.parse(localStorage.getItem(this.id));
            let key = '';
            for (let i = 0; i < localValues.length; i++) {
                if ((i % 2 == 0) == true) {
                    key = JSON.parse(localValues[i]);
                }
                else {
                    this.formValues = JSON.parse(localValues[i]);
                    this._storage.push(JSON.stringify(key));
                    this._storage.push(JSON.stringify(this.formValues));
                    this.addRecord(key);
                }
            }
        }
    }

    sendValues() {
        this.getValue();
        this.addRecord();
    }
}

