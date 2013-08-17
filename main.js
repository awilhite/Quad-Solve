
var app = {};

app.init = function() {
	
	app.a = document.getElementById("a");
	app.b = document.getElementById("b");
	app.c = document.getElementById("c");

	app.a.addEventListener("change", app.solve, false);
	app.a.addEventListener("keyup", app.solve, false);
	app.b.addEventListener("change", app.solve, false);
	app.b.addEventListener("keyup", app.solve, false);
	app.c.addEventListener("change", app.solve, false);
	app.c.addEventListener("keyup", app.solve, false);

	window.solutionsBox = {
		el: document.getElementById("solution"),
		visible: false,
		toggle: function() {
			if (!this.visible) {
				this.el.style.display = "block";
				document.getElementById("help").style.display = "none";
				this.visible = true;
			}
		},
		set html(x) {
			var str = "<h3>"+x.header+"</h3>";
			x.solutions.forEach(function(item){
				str = str + "<span>"+item+"</span><br>";
			});
			this.el.innerHTML = str + "<h3>Discriminant</h3><span>"+x.discriminant+"</span><h3>Exact</h3><span>"+x.exact+"</span><h3>"+x.maxormin.text+"</h3><span> ("+x.maxormin.x+" ,"+x.maxormin.y+" ) </span>";
		}

	};

};

app.round = function(n) {
	return Math.round(n*10000)/10000;
}

app.solve = function() {
	console.log("HI");


	var a = parseFloat(app.a.value);
	var b = parseFloat(app.b.value);
	var c = parseFloat(app.c.value);
	
	if ( isNaN(a) || isNaN(b) ||isNaN(c) ) {
		return;
	}
	
	var maxormin = {
		x: -1*b/2*a,
		y: a * (-1*b/2*a * -1*b/2*a) + b * (-1*b/2*a) + c,
		text: a < 0 ? "Maximum" : "Minimum"
	};
	
	var positive, negative, real, imaginary;
	
	var discriminant = b*b - 4*a*c;
	var exact = "<span style='text-decoration: underline'>" + "( " + (-1 * b).toString() + " &plusmn; sqrt( " + discriminant.toString() + " ) )" + "</span>" + "<br><span>" + (2 * a).toString() + "</span>";
	var sq = Math.sqrt( Math.abs( discriminant ) );

	solutionsBox.toggle();
	
	if (discriminant > 0) {
		negative = app.round( (-1*b - sq) / (2*a) );
		positive = app.round( (-1*b + sq) / (2*a) );

		solutionsBox.html = { header: "Two Real Solutions", solutions: [positive, negative], discriminant: discriminant, exact: exact, maxormin: maxormin  }; 
	}

	if (discriminant == 0) {
		posititve = round( (-1*b + sq) / (2*a) );
	
		solutionsBox.html = { header: "One Real Solution", solutions: [positive], discriminant: discriminant, exact: exact, maxormin: maxormin  };
	}

	if (discriminant < 0) {
		real = app.round( (-1*b) / (2*a) );
		imaginary = app.round( sq / (2*a) )+"i";
	
		solutionsBox.html = { header: "Two Complex Roots", solutions: [real+" + "+imaginary, real+" - "+imaginary], discriminant: discriminant, exact: exact, maxormin: maxormin };
	}
}


window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false);
    app.init();  
}, false);

