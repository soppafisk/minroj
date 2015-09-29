$(document).ready(function() {

	var mines = [
		[ "0", "0", "0", "1", "0", "1", "0", "0", "0", "0"],
		[ "1", "0", "0", "0", "0", "1", "0", "0", "0", "0"],
		[ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
		[ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
		[ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
		[ "0", "0", "0", "1", "0", "0", "0", "0", "1", "0"],
		[ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
		[ "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"],
		[ "0", "1", "0", "0", "0", "0", "0", "1", "0", "0"],
		[ "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
	];


	$(".box").click(function(){
		var thisClass = $(this).attr('class');
		//console.log(thisClass);
		var row = thisClass.substr(4, 1);
		var col = thisClass.substr(6, 1);
		//console.log(col + " " + row);
		//var hit = ("mines" + row) + "["+col+"]";
		var hit = mines[row][col];

		var n1 = (row == 0 || col == 0) ? 0 : (mines[(row-1)][(col-1)]);
		var n2 = (row == 0) ? 0 : (mines[(row-1)][col]);	
		var n3 = (row == 0 || col == 9) ? 0 : (mines[(row-1)][(parseInt(col)+1)]);
		var n4 = (col == 0) ? 0 : (mines[row][(col-1)]);
		var n5 = (col == 9) ? 0 : (mines[row][(parseInt(col)+1)]) ;
		var n6 = (row == 9 || col == 0) ? 0 : (mines[(parseInt(row)+1)][(col-1)]);
		var n7 = (row == 9) ? 0 : (mines[(parseInt(row)+1)][col]);
		var n8 = (row == 9 || col == 9) ? 0 : (mines[(parseInt(row)+1)][(parseInt(col)+1)]);
		var neighbours = parseInt(n1)+parseInt(n2)+parseInt(n3)+parseInt(n4)+parseInt(n5)+parseInt(n6)+parseInt(n7)+parseInt(n8);

		//console.log("mines[" +row + "][" +(col--) +"] = " + (mines[row][(col--)]));
		//console.log(hit);
	

		if (hit == 1) {
			$(this).css("background", "red");
			alert("FEEEEL");
			$(".box").css("background", "lightgrey");
			$(".box").html("");

		} else {
			$(this).css("background", "#FFF");
			$(this).html(neighbours);
		}
	});

});
