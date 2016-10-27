var sass,
	autoprefixer,
	write;

sass = require('node-sass');
autoprefixer = require('autoprefixer');
write = require('write');

sass.render(
	{
		file: 'src/sass/main.scss'
	},
	function(err, result) {
		if (err) {
			console.log(err);
		}
		else {
			write(
				'web/css/style.css',
				result.css,
				function(err) {
	  				if (err) {
	  					console.log(err);
	  				};
				}
			);
		}
	}
);
