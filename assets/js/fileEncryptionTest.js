(function() {
	console.log('hi');

	var fe = {
		settings: {
			dir: 'data/fileEncryptionTest/'
		},

		init: function() {
			fe = this.settings;

			document.getElementById('btn_uploadFile').addEventListener('click', function() {
				console.log('fileUploading');
				var file = document.getElementById('uploadFile').files[0];
				fe.encrypt(file);
			});
		},

		encrypt: function(file) {
			console.log(file);
		},

		decrypt: function(fileName) {
			console.log(fileName);
		}
	};

	fe.init();
});