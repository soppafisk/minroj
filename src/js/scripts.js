var _ = require('lodash');

'use strict';

$(document).ready(function() {
	var Board = function(x, y, mines) {
		this.x = x;
		this.y = y;
		this.mines = mines;
		this.cells = [];
		this.revealed = false;
		this.yetToBeRevealed = this.x*this.y;

		this.setup();
		this.render();
		this.placeMines();
	}

	// fill cells[] with new cells
	Board.prototype.setup = function() {
		for(var i = 0; i<this.y; i++) {
			var row = [];
			for(var j = 0; j<this.x; j++) {
				row.push(new Cell(j, i));
			}
			this.cells.push(row);
		}
	}

	// render the cells
	Board.prototype.render = function() {
		$('#board').html('');
		for(var i = 0; i<this.y; i++) {
			var row = $("<div class='cell-row'></div>").appendTo('#board');
			for(var j = 0; j<this.x; j++) {
				row.append("<div class='cell " + i + "_" + j + "'></div>");
			}
		}
	}

	// returns a random mine
	Board.prototype.randomMine = function() {
		var x = _.random(0,this.x-1);
		var y = _.random(0,this.y-1);
		return this.cells[y][x];
	}

	// place the number of mines in random cells
	Board.prototype.placeMines = function() {
		for(var i = 0; i<this.mines; i++) {
			var cell = this.randomMine();
			while(cell.hasMine) {
				cell = this.randomMine();
			}
			cell.hasMine = true;
		}
	}

	// returns the clicked cell  looks for classname like y_x
	Board.prototype.getCell = function(clickedCell) {
			var thisClass = clickedCell.attr('class');


			var regex = /(\d+)_(\d+)/;
			var match = regex.exec(thisClass);
			var row = match[1];
			var col = match[2];
			return this.cells[row][col];
	}

	// run callback on every cell
	Board.prototype.loopAllCells = function(callback) {
		for(var row = 0; row<this.y; row++) {
			for(var col = 0; col<this.x; col++) {
				callback(this.cells[row][col]);
			}
		}
	}

	// reveal all mines with a mine
	Board.prototype.revealMines = function() {
		this.loopAllCells(function(cell) {
			board.revealed = true;
			if(cell.hasMine) {
				cell.reveal();
			}
		});
	}

	// returns array of neighbours
	Board.prototype.getNeighboursOf = function(cell){
		//if cell is at an edge return null, else return cell
		var n1 = (cell.y == 0 || cell.x == 0) ? null : (this.cells[cell.y-1][cell.x-1]);
		var n2 = (cell.y == 0) ? null : (this.cells[(cell.y-1)][cell.x]);
		var n3 = (cell.y == 0 || cell.x == this.x-1) ? 0 : (this.cells[cell.y-1][cell.x+1]);
		var n4 = (cell.x == 0) ? null : (this.cells[cell.y][cell.x-1]);
		var n5 = (cell.x == this.x-1) ? null : (this.cells[cell.y][cell.x+1]) ;
		var n6 = (cell.y == this.y-1 || cell.x == 0) ? null : (this.cells[cell.y+1][cell.x-1]);
		var n7 = (cell.y == this.y-1) ? null : (this.cells[(cell.y+1)][cell.x]);
		var n8 = (cell.y == this.y-1 || cell.x == this.x-1) ? null : (this.cells[cell.y+1][cell.x+1]);
		// strip all null values
		var neighbours = _.compact([n1, n2, n3, n4, n5, n6, n7, n8]);
		return neighbours;
	}

	var Cell = function(x, y) {
		this.y = y;
		this.x = x;
		this.hasMine = false;
		this.neighbours = null;
		this.surrMines = null;
		this.revealed = false;
	}

	// loop through neighbours, set cell's surrMines
	Cell.prototype.setSurrMines = function() {
		var neighbours = board.getNeighboursOf(this);
		this.surrMines = 0;
		_.forEach(neighbours, function(nb) {
			if(nb.hasMine)
				this.surrMines++;
		}, this);
	}

	// get number of surrounding mines. If not set,
	Cell.prototype.getSurrMines = function(){
		if(this.surrMines === null) {
			this.setSurrMines();
		}
		return this.surrMines;
	}

	// Reveals the cell, if 0 surrMines, it's recursive
	Cell.prototype.reveal = function() {
		if(!this.revealed) {

			var htmlCell = $("." + this.y + "_" + this.x);
			if (this.hasMine) {
				htmlCell.css("background", "red");
				$('#feedback').html("FEEEEL");

				// reveal all mines
				if(!board.revealed)
					board.revealMines();
			} else {
				htmlCell.css("background", "#FFF");
				var surrMines = this.getSurrMines();
				htmlCell.html(surrMines);
				this.revealed = true;
				if(this.surrMines === 0) {
					var neighbours = board.getNeighboursOf(this);
					_.forEach(neighbours, function(nb) {
						nb.reveal();
					});
				}
			}
			board.yetToBeRevealed--;
			if (board.yetToBeRevealed <= board.mines && !board.revealed) {
					$('#feedback').html("Du vann!");
			}
		}
	}

	var resetGame = function() {

		var cols = config.cols.value || 10;
		var rows = config.rows.value || 10;
		var mines = config.mines.value || 10;
		board = new Board(cols, rows, mines);
		$('#feedback').html('');

		// on cell click
		$(".cell").click(function(){
			var clickedCell = board.getCell($(this));
			clickedCell.reveal();
		});
	}

	// Init game
	var board;
	resetGame();
	$("#resetButton").click(resetGame);
});
