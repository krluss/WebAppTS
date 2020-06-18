import {Field} from './Field';
import {FieldType} from './FieldType';


export class TextAreaField implements Field{
    name: string;
    label: string;
    type: FieldType;
    element: HTMLTextAreaElement;

    constructor(name: string, label: string, type: FieldType){
        this.name = name;
        this.label = label;
        this.type = type;
        this.element = <HTMLTextAreaElement>document.createElement('textarea');
        this.element.name = this.name;
        this.element.setAttribute('maxlength', '70');
    }

    render(){
        return this.element;
    }

    getValue(): any{
        return this.element.value;
    }
}


