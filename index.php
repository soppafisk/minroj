<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="css/style.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<title>Minesweeper</title>
</head>
<body>
	<div class="wrapper">
	<?php

	for ($i = 0; $i < 10; $i++) {
		for ($j = 0; $j < 10; $j++) {
			print "<div class='box " . $i . "_" . $j . "'></div>";
		}
	}

	?>
	</div>
	<script src="js/scripts.js"></script>
</body>
</html>