<!DOCTYPE html>
<html lang="sv">
<head>
	<meta charset="UTF-8">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css">
	<link rel="stylesheet" href="css/style.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<title>Minesweeper</title>
</head>
<body>
	<div class="wrapper">
		<div id="board"></div>
		<form id="config">
			<label for="rows">Rader</label>
			<input type="text" name="rows" value="10">

			<label for="cols">Kolumner</label>
			<input type="text" name="cols" value="10">

			<label for="mines">Antal minor</label>
			<input type="text" name="mines" value="10">
			<input type="button" id="resetButton" value="Ny omgång">
		</form>

		<div id="feedback"></div>

	</div>


	<script src="dist/bundle.js"></script>
</body>
</html>
