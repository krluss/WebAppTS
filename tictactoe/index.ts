class Cell{
    posX: number;
    posY: number;
    htmlElement : HTMLElement;
    cellValue: string;
    constructor(x: number, y: number, cell: HTMLElement){
        this.posY = x;
        this.posX = y;
        this.htmlElement = cell;
    }
}
class Board{
    width: number;
    requiredToWin: number;
    cells: Array<Array<Cell>>;
    gameBoard: HTMLDivElement = document.querySelector('#gameBoard');
    boardTable: HTMLTableElement;
    activeChar: string = 'X'
    winner: HTMLDivElement = document.querySelector('#winner')

    constructor(width: number, requiredToWin: number){
        this.width = width;
        this.requiredToWin = requiredToWin;
        if(this.requiredToWin <= this.width && this.width >= 3){
            this.createBoard()
            this.clickHandler();
        }else{
            this.gameBoard.innerHTML = 'Error';
        }
        
    }

    createBoard(){
        let table = document.createElement('table');
        this.boardTable = table;
        this.createCells();
        this.gameBoard.appendChild(this.boardTable)
    }

    createCells(){
        let cellsArray = [];
        for(let i = 0; i < this.width; i++){
            let row = document.createElement('tr');
            let rowArray = [];
            for(let j = 0; j < this.width; j++){
                let cell = this.createCell(i, j);
                rowArray.push(cell);
                row.appendChild(cell.htmlElement);
            }
            cellsArray.push(rowArray);
            this.boardTable.appendChild(row);
        }
        this.cells = cellsArray;
    }

    createCell(x: number, y: number){
        let cellElement = document.createElement('td');
        let cell = new Cell(x, y , cellElement);
        cell.cellValue = '';
        return cell;
    }
    
    changeChar(){
        this.activeChar = this.activeChar === 'X' ? 'O' : 'X';
    }

    checkHorizontal(row: number){
        let count = 0;
        for(let i = 0 ; i < this.cells.length ; i++){
            if(this.cells[row][i].cellValue === this.activeChar){
                count++
            }
        }
        let isWinner = false;
        if(count === this.requiredToWin){
            isWinner = true;
        }
        return isWinner;
    }

    checkVertical(column: number){
        let count = 0;
        for(let i = 0 ; i < this.cells.length ; i++){
            if(this.cells[i][column].cellValue === this.activeChar){
                count++
            }
        }
        let isWinner = false;
        if(count === this.requiredToWin){
            isWinner = true;
        }
        return isWinner;
    }

    checkDiagonal00(){
        let count = 0;
        for(let i = 0; i < this.cells.length; i++){
            if(this.cells[i][i].cellValue === this.activeChar){
                count++
            }
        }
        let isWinner = false;
        if(count === this.requiredToWin){
            isWinner = true;
        }
        return isWinner;
    }

    checkDiagonalx0(){
        let count = 0;
        for (let i = (this.width - 1), j = 0; i >= 0; i--, j++) {
            if (this.cells[i][j].cellValue === this.activeChar) {
                count++;
            }
        }
        let isWinner = false;
        if (count === this.requiredToWin) {
            isWinner = true;
        }
        return isWinner;
    }

    checkWinner(column: number, row: number){

        let isWinner = this.checkVertical(column);

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
        
    }

    checkDraw(){
        let count = 0;
        for(let i = 0 ; i < this.width ; i++){
            for(let j = 0; j < this.width; j++){
                if(this.cells[i][j].cellValue !== ''){
                    count++
                }
            }
        }
        if(count === this.width*this.width){
            this.winner.innerHTML = 'Remis!'
        }
    }

    writeToCell(cell: Cell){
        if(cell.htmlElement.innerHTML === ''){
            cell.htmlElement.innerHTML = this.activeChar;
            cell.cellValue = this.activeChar;
            let row = cell.posY;
            let column = cell.posX;

            let isWinner = this.checkWinner(column, row);
            
            if(isWinner){
                this.winner.innerHTML = 'Wygrał : ' + this.activeChar;

                this.cells.forEach(row =>{
                    row.forEach(cell =>{
                        var newCell = cell.htmlElement.cloneNode(true);
                        cell.htmlElement.parentNode.replaceChild(newCell, cell.htmlElement);
                    })
                })
            }else{
                this.checkDraw();
                this.changeChar();
            }

           
        }
    }

    clickHandler(){
        this.cells.forEach(row =>{
            row.forEach(cell =>{
                cell.htmlElement.addEventListener('click', () => this.writeToCell(cell))
            })
        })
    }
}

let board = new Board(3, 3);




