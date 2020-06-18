import { Field } from './Field';
import {FieldType } from './FieldType';

export class EmailField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLInputElement;

    constructor(name: string, label: string, type: FieldType){
        this.name = name;
        this.label = label;
        this.type = type;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = this.name;
        this.element.type = this.type
        this.element.placeholder = this.label;
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}

