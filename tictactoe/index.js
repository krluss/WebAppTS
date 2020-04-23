var Cell = /** @class */ (function () {
    function Cell(x, y, cell) {
        this.posY = x;
        this.posX = y;
        this.htmlElement = cell;
    }
    return Cell;
}());
var Board = /** @class */ (function () {
    function Board(width, requiredToWin) {
        this.gameBoard = document.querySelector('#gameBoard');
        this.activeChar = 'X';
        this.winner = document.querySelector('#winner');
        this.width = width;
        this.requiredToWin = requiredToWin;
        if (this.requiredToWin <= this.width && this.width >= 3) {
            this.createBoard();
            this.clickHandler();
        }
        else {
            this.gameBoard.innerHTML = 'Error';
        }
    }
    Board.prototype.createBoard = function () {
        var table = document.createElement('table');
        this.boardTable = table;
        this.createCells();
        this.gameBoard.appendChild(this.boardTable);
    };
    Board.prototype.createCells = function () {
        var cellsArray = [];
        for (var i = 0; i < this.width; i++) {
            var row = document.createElement('tr');
            var rowArray = [];
            for (var j = 0; j < this.width; j++) {
                var cell = this.createCell(i, j);
                rowArray.push(cell);
                row.appendChild(cell.htmlElement);
            }
            cellsArray.push(rowArray);
            this.boardTable.appendChild(row);
        }
        this.cells = cellsArray;
    };
    Board.prototype.createCell = function (x, y) {
        var cellElement = document.createElement('td');
        var cell = new Cell(x, y, cellElement);
        cell.cellValue = '';
        return cell;
    };
    Board.prototype.changeChar = function () {
        this.activeChar = this.activeChar === 'X' ? 'O' : 'X';
    };
    Board.prototype.checkHorizontal = function (row) {
        var count = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[row][i].cellValue === this.activeChar) {
                count++;
            }
        }
        var isWinner = false;
        if (count === this.requiredToWin) {
            isWinner = true;
        }
        return isWinner;
    };
    Board.prototype.checkVertical = function (column) {
        var count = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i][column].cellValue === this.activeChar) {
                count++;
            }
        }
        var isWinner = false;
        if (count === this.requiredToWin) {
            isWinner = true;
        }
        return isWinner;
    };
    Board.prototype.checkDiagonal00 = function () {
        var count = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i][i].cellValue === this.activeChar) {
                count++;
            }
        }
        var isWinner = false;
        if (count === this.requiredToWin) {
            isWinner = true;
        }
        return isWinner;
    };
    Board.prototype.checkDiagonalx0 = function () {
        var count = 0;
        for (var i = (this.width - 1), j = 0; i >= 0; i--, j++) {
            if (this.cells[i][j].cellValue === this.activeChar) {
                count++;
            }
        }
        var isWinner = false;
        if (count === this.requiredToWin) {
            isWinner = true;
        }
        return isWinner;
    };
    Board.prototype.checkWinner = function (column, row) {
        var isWinner = this.checkVertical(column);
        if (!isWinner) {
            isWinner = this.checkHorizontal(row);
        }
        if (!isWinner) {
            isWinner = this.checkDiagonal00();
        }
        if (!isWinner) {
            isWinner = this.checkDiagonalx0();
        }
        return isWinner;
    };
    Board.prototype.checkDraw = function () {
        var count = 0;
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.width; j++) {
                if (this.cells[i][j].cellValue !== '') {
                    count++;
                }
            }
        }
        if (count === this.width * this.width) {
            this.winner.innerHTML = 'Remis!';
        }
    };
    Board.prototype.writeToCell = function (cell) {
        if (cell.htmlElement.innerHTML === '') {
            cell.htmlElement.innerHTML = this.activeChar;
            cell.cellValue = this.activeChar;
            var row = cell.posY;
            var column = cell.posX;
            var isWinner = this.checkWinner(column, row);
            if (isWinner) {
                this.winner.innerHTML = 'Wygrał : ' + this.activeChar;
                this.cells.forEach(function (row) {
                    row.forEach(function (cell) {
                        var newCell = cell.htmlElement.cloneNode(true);
                        cell.htmlElement.parentNode.replaceChild(newCell, cell.htmlElement);
                    });
                });
            }
            else {
                this.checkDraw();
                this.changeChar();
            }
        }
    };
    Board.prototype.clickHandler = function () {
        var _this = this;
        this.cells.forEach(function (row) {
            row.forEach(function (cell) {
                cell.htmlElement.addEventListener('click', function () { return _this.writeToCell(cell); });
            });
        });
    };
    return Board;
}());
var board = new Board(3, 3);
