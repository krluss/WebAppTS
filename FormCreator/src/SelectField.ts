import {Field} from './Field';
import {FieldType} from './FieldType';

export class SelectField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLSelectElement;

    constructor(name: string, label: string, type: FieldType, options: Array<string>){
        this.name = name;
        this.label = label;
        this.type = type;
        this.element = <HTMLSelectElement>document.createElement('select');
        this.element.name = this.name;

        options.forEach(element=>{
            const options = document.createElement('option');
            options.value = element;
            options.text = element;
            this.element.add(options);
        });

    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}
