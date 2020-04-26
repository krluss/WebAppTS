document.addEventListener('DOMContentLoaded', function () { Start(); });
function Start() {
    var app = new App(input, inputNazwisko, mail, select, checkbox, textarea, date);
    app.Show();
}
var FieldType;
(function (FieldType) {
    FieldType[FieldType["text"] = 1] = "text";
    FieldType[FieldType["textarea"] = 2] = "textarea";
    FieldType[FieldType["date"] = 3] = "date";
    FieldType[FieldType["email"] = 4] = "email";
    FieldType[FieldType["select"] = 5] = "select";
    FieldType[FieldType["checkbox"] = 6] = "checkbox";
})(FieldType || (FieldType = {}));
var InputField = /** @class */ (function () {
    function InputField(name, label) {
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[1];
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }
    InputField.prototype.render = function () {
        return this.element;
    };
    InputField.prototype.getValue = function () {
        return this.element.value;
    };
    return InputField;
}());
var TextAreaField = /** @class */ (function () {
    function TextAreaField(name, label) {
        this.element = document.createElement('textarea');
        this.element.name = name;
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }
    TextAreaField.prototype.render = function () {
        return this.element;
    };
    TextAreaField.prototype.getValue = function () {
        return this.element.value;
    };
    return TextAreaField;
}());
var DateField = /** @class */ (function () {
    function DateField(name, label) {
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[3];
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }
    DateField.prototype.render = function () {
        return this.element;
    };
    DateField.prototype.getValue = function () {
        return this.element.value;
    };
    return DateField;
}());
var EmailField = /** @class */ (function () {
    function EmailField(name, label) {
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[4];
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }
    EmailField.prototype.render = function () {
        return this.element;
    };
    EmailField.prototype.getValue = function () {
        return this.element.value;
    };
    return EmailField;
}());
var SelectField = /** @class */ (function () {
    function SelectField(name, label) {
        var _this = this;
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
        this.element = document.createElement('select');
        options.forEach(function (element) {
            var options = document.createElement('option');
            options.value = element;
            options.text = element;
            _this.element.add(options);
        });
        this.element.name = name;
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }
    SelectField.prototype.render = function () {
        return this.element;
    };
    SelectField.prototype.getValue = function () {
        return this.element.value;
    };
    return SelectField;
}());
var CheckboxField = /** @class */ (function () {
    function CheckboxField(name, label) {
        this.element = document.createElement('input');
        this.element.name = name;
        this.element.type = FieldType[6];
        this.label = document.createElement('label');
        this.label.innerHTML = label;
        this.labelValue = label;
    }
    CheckboxField.prototype.render = function () {
        return this.element;
    };
    CheckboxField.prototype.getValue = function () {
        return (this.element.checked) ? 'Tak' : 'Nie';
    };
    return CheckboxField;
}());
var Form = /** @class */ (function () {
    function Form(id, values) {
        this.fields = new Array();
        this.formElement = document.getElementById(id);
        this.valueElement = document.getElementById(values);
    }
    Form.prototype.render = function () {
        var _this = this;
        this.fields.forEach(function (element) {
            _this.formElement.appendChild(element.label);
            _this.formElement.appendChild(element.render());
        });
    };
    Form.prototype.getValue = function () {
        var array = document.createElement('ol');
        array.className = 'arrayData';
        this.valueElement.appendChild(array);
        this.fields.forEach(function (element) {
            var li = document.createElement('li');
            li.innerHTML = element.labelValue + ': ' + element.getValue();
            array.appendChild(li);
        });
    };
    return Form;
}());
var App = /** @class */ (function () {
    function App() {
        var _a;
        var _this = this;
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        this.form = new Form('formData', 'formDataOut');
        (_a = this.form.fields).push.apply(_a, elements);
        this.sendValues = document.getElementById('sendValues');
        this.sendValues.addEventListener('click', function () { return _this.form.getValue(); });
    }
    App.prototype.Show = function () {
        this.form.render();
    };
    return App;
}());
var input = new InputField('Name', 'Imię');
var inputNazwisko = new InputField('Surname', 'Nazwisko');
var mail = new EmailField('Mail', 'E-Mail');
var select = new SelectField('Select', 'Wybrany kierunek studiów', 'Kryminalistyka', 'Logistyka', 'Ekonometria');
var checkbox = new CheckboxField('E-Learning', 'Czy preferujesz e-learning?');
var textarea = new TextAreaField('Notes', 'Uwagi');
var date = new DateField('Date', 'Data');
