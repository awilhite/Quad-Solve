
window.onload = function() {

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

function round(n) {
	return Math.round(n*10000)/10000;
}

function solve() {

	var a = parseFloat(document.form.a.value);
	var b = parseFloat(document.form.b.value);
	var c = parseFloat(document.form.c.value);
	
	if ( isNaN(a) || isNaN(b) ||isNaN(c) ) {
		return;
	}
	
	console.log(b)
	
	var maxormin = {
		x: -1*b/2*a,
		y: a * (-1*b/2*a * -1*b/2*a) + b * (-1*b/2*a) + c,
		text: a < 0 ? "Maximum" : "Minimum"
	};
	
	var positive, negative, real, imaginary;
	
	var discriminant = b*b - 4*a*c;
	var exact = "<span style='text-decoration: underline'>" + "( " + (-1 * b).toString() + " ± sqrt( " + discriminant.toString() + " ) )" + "</span>" + "<br><span>" + (2 * a).toString() + "</span>";
	var sq = Math.sqrt( Math.abs( discriminant ) );

	solutionsBox.toggle();
	
	if (discriminant > 0) {
		negative = round( (-1*b - sq) / (2*a) );
		positive = round( (-1*b + sq) / (2*a) );

		solutionsBox.html = { header: "Two Real Solutions", solutions: [positive, negative], discriminant: discriminant, exact: exact, maxormin: maxormin  }; 
	}

	if (discriminant == 0) {
		posititve = round( (-1*b + sq) / (2*a) );
	
		solutionsBox.html = { header: "One Real Solution", solutions: [positive], discriminant: discriminant, exact: exact, maxormin: maxormin  };
	}

	if (discriminant < 0) {
		real = round( (-1*b) / (2*a) );
		imaginary = round( sq / (2*a) )+"i";
	
		solutionsBox.html = { header: "Two Complex Roots", solutions: [real+" + "+imaginary, real+" - "+imaginary], discriminant: discriminant, exact: exact, maxormin: maxormin };
	}
}

