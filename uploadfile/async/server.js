var express = require("express"),
	multer = require("multer"),
	app = express(),
	done = false;
	
	
/* configure the multer. */
app.use(multer({dest: "./uploads",
	rename: function(fieldname, filename){
		return filename + Date.now();
	},
	onFileUploadStart: function(file) {
		console.log(file.originalname + " is starting...");
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname  + " uploaded to " + file.path);
		done = true;
	}	
}));

/* handling routes. */
app.get("/", function (req, res) {
	res.sendfile("index.html");
});

app.post("/api/photo", function (req, res) {
	if(done){
		console.log(req.files);
		res.end('File uploaded');
	}
});

/* Run the server. */
app.listen(3000, function (params) {
	console.log("working on port 3000");
});