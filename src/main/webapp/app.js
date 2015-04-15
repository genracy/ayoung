var images = [];
var pairsFoundCount;
var guess1 = "";
var guess2 = "";

function init() {
	pairsFoundCount = 0;
	$("#pair-count").html(pairsFoundCount);
	// get images, place them in an array & randomize the order
	for (var i = 0; i < 8; i++) {

		var img = {
			id : i,
			src : 'http://192.168.0.4:8080/ayoung/' + i + '.jpg'
		};
		var img2 = {
			id : i + 8,
			src : 'http://192.168.0.4:8080/ayoung/' + i + '.jpg'
		};
		images.push(img);
		images.push(img2);

	}
	randomizeImages();

	// output images then hide them
	var output = "<ol>";
	for (var i = 0; i < 16; i++) {
		output += "<li>";
		output += "<img id='" + images[i].id + "' />";
		output += "</li>";
	}
	output += "</ol>";
	document.getElementById("container").innerHTML = output;
	$("img").hide();

	$("li").click(checkPair);

}

// randomize array of images
function randomizeImages() {
	Array.prototype.randomize = function() {
		var i = this.length, j, temp;
		while (--i) {
			j = Math.floor(Math.random() * (i - 1));
			temp = this[i];
			this[i] = this[j];
			this[j] = temp;
		}
	};

	images.randomize();
}

function checkPair() {

	var id = $(this).children("img").attr("id");
	$(this).children("img").attr("src", imageSrcLookup(id));
	$(this).children("img").show();
	$(this).children("img").addClass("face-up");

	if (guess1 === "") {
		guess1 = $(this).children("img").attr("src");
	} else {

		guess2 = $(this).children("img").attr("src");
		if (guess1 === guess2) {
			$("li").children("img[src='" + guess2 + "']").addClass("match");
			pairsFoundCount++;
			$("#pair-count").html(pairsFoundCount);
		} else {
			setTimeout(function() {
				$("img").not(".match").hide();
				$("img").not(".match").removeClass("face-up");
				$("img").not(".match").removeAttr("src");
			}, 1000);
		}
		guess1 = "";
		guess2 = "";

	}
	;
}

function imageSrcLookup(imageId) {
	var src = "";
	for (var i = 0; i < images.length; i++) {
		if (images[i].id.toString() === imageId) {
			src = images[i].src;
			break;
		}
		;
	}
	return src;

};