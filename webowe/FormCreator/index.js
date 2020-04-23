var FieldType;
(function (FieldType) {
    FieldType[FieldType["text"] = 1] = "text";
    FieldType[FieldType["textAreaBox"] = 2] = "textAreaBox";
    FieldType[FieldType["date"] = 3] = "date";
    FieldType[FieldType["email"] = 4] = "email";
    FieldType[FieldType["SelectField"] = 5] = "SelectField";
    FieldType[FieldType["checkbox"] = 6] = "checkbox";
})(FieldType || (FieldType = {}));
var InputField = /** @class */ (function () {
    function InputField(name, label, type) {
        this.type = type[1];
        this.element = document.createElement('input');
        this.element.setAttribute('type', 'this.type');
        this.name = name;
        this.label = label;
        this.element.className = this.name;
    }
    InputField.prototype.render = function () {
        return this.element;
    };
    InputField.prototype.getValue = function () {
        return this.element.nodeValue;
    };
    return InputField;
}());
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label) {
        this.element = document.createElement('textarea');
        this.name = name;
        this.label = label;
        this.element.className = this.name;
    }
    TextAreaField.prototype.render = function () {
        return this.element;
    };
    TextAreaField.prototype.getValue = function () {
        return this.element.nodeValue;
    };
    return TextAreaField;
}());
var DateField = /** @class */ (function () {
    function DateField(name, label, type) {
        this.type = type[3];
        this.element = document.createElement('input');
        this.element.setAttribute('type', ' this.type');
        this.name = name;
        this.label = label;
        this.element.className = this.name;
    }
    DateField.prototype.render = function () {
        return this.element;
    };
    DateField.prototype.getValue = function () {
        return this.element.nodeValue;
    };
    return DateField;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label, type) {
        this.type = type[4];
        this.element = document.createElement('input');
        this.element.setAttribute('type', 'this.type');
        this.name = name;
        this.label = label;
        this.element.className = this.name;
    }
    EmailField.prototype.render = function () {
        return this.element;
    };
    EmailField.prototype.getValue = function () {
        return this.element.nodeValue;
    };
    return EmailField;
}());
var SelectField = /** @class */ (function () {
    function SelectField(name, label) {
        this.element = document.createElement('select');
        this.name = name;
        this.label = label;
        this.element.className = this.name;
    }
    SelectField.prototype.render = function () {
        return this.element;
    };
    SelectField.prototype.getValue = function () {
        return this.element.nodeValue;
    };
    return SelectField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label, type) {
        this.type = type[6];
        this.element = document.createElement('input');
        this.element.setAttribute('type', 'this.type');
        this.name = name;
        this.label = label;
        this.element.className = this.name;
    }
    CheckboxField.prototype.render = function () {
        return this.element;
    };
    CheckboxField.prototype.getValue = function () {
        return this.element.nodeValue;
    };
    return CheckboxField;
}());
var Form = /** @class */ (function () {
    function Form(id) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
    }
    Form.prototype.render = function () {
        //TODO
    };
    Form.prototype.getValue = function () {
        //TODO
    };
    return Form;
}());
