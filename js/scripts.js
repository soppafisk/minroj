$(document).ready(function() {
	function random(a,b) {
			return( parseInt( Math.random()*10 ) %2 );
	}

	var Cell = function(hasMine, x, y) {
		this.y = y;
		this.x = x;
		this.hasMine = hasMine;
		this.neighbours = null;
		this.surrMines = null;
		this.revealed = false;
	}

	Cell.prototype.getNeighbours = function(){
		var n1 = (this.y == 0 || this.x == 0) ? null : (cells[this.y-1][this.x-1]);
		var n2 = (this.y == 0) ? null : (cells[(this.y-1)][this.x]);
		var n3 = (this.y == 0 || this.x == 9) ? 0 : (cells[this.y-1][this.x+1]);
		var n4 = (this.x == 0) ? null : (cells[this.y][this.x-1]);
		var n5 = (this.x == 9) ? null : (cells[this.y][this.x+1]) ;
		var n6 = (this.y == 9 || this.x == 0) ? 0 : (cells[this.y+1][this.x-1]);
		var n7 = (this.y == 9) ? null : (cells[(this.y+1)][this.x]);
		var n8 = (this.y == 9 || this.x == 9) ? null : (cells[this.y+1][this.x+1]);
		var neighbours = [n1, n2, n3, n4, n5, n6, n7, n8];
		return neighbours;
	}

	Cell.prototype.getSurrMines = function(){
		var surrMines = 0;
		for(var n in this.neighbours) {
			var nb = this.neighbours[n];
			if(nb)
				surrMines += nb.hasMine;
		}
		return surrMines;
	}

	// Reveals the cell, if 0 surrMines, it's recursive
	Cell.prototype.reveal = function() {
		var htmlCell = $("." + this.y + "_" + this.x);
		if(!this.revealed) {
			if (this.hasMine) {
				htmlCell.css("background", "red");
				alert("FEEEEL");
				resetMines();

			} else {
				htmlCell.css("background", "#FFF");
				htmlCell.html(this.surrMines);
				this.revealed = true;
				if(this.surrMines === 0) {
					for(var n in this.neighbours) {
						if(this.neighbours[n])
							this.neighbours[n].reveal();
					}
				}
			}
		}
	}

	// Resets the board
	function resetMines() {
		cells = [];

		$(".box").css("background", "lightgrey");
		$(".box").html("");

		for(var i = 0; i<90; i++) {
			cells.push(new Cell(0));
		}
		for(var i = 0; i<10; i++) {
			cells.push(new Cell(1));
		}

		cells.sort(random);
		for (var i = 0; i<10; i++) {
			var row = cells.splice(0, 10);
			cells.push(row);
		}

		for(var i = 0; i<10; i++) {
			for(var j = 0; j<10; j++) {
				var cell = cells[i][j];
				cell.y = i;
				cell.x = j;
				cell.neighbours = cell.getNeighbours();
				cell.surrMines = cell.getSurrMines();
			}
		}
	}


	// returns the clicked cell
	function getCell(clickedCell){
			var thisClass = clickedCell.attr('class');
			var row = thisClass.substr(4, 1);
			var col = thisClass.substr(6, 1);

			return cells[row][col];
	}

	// Init game
	var cells = [];
	resetMines();

	$("#resetButton").click(resetMines);

	$(".box").click(function(){
		var clickedCell = getCell($(this));
		clickedCell.reveal();
	});

});
