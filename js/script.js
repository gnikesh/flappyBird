(function(){

	function getRandom(min, max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}


	function Bird(){
		this.x = 250;
		this.y = 300;
		this.element;
		this.init = function(){
			this.element = document.createElement('div');
			this.element.setAttribute('id', 'bird');
			// this.element.style.background='white';
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
			document.getElementById('border').appendChild(this.element);
		}

		this.redraw = function(){
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px'; 
		}	
	}

	function Obstacles (x, y, height){
		this.x = x;
		this.y = y;
		this.element;
		this.height = height;
		this.init = function() {
			this.element = document.createElement('div');
			this.element.setAttribute('id', 'obs');
			// this.element.style.background='yellow';
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
			this.element.style.height = height + 'px';
			document.getElementById('border').appendChild(this.element);
		}

		this.redrawObs = function(){
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
		}
	}

	function BirdAnimation(){
		this.bird1 = new Bird();
		this.obUpper = [];
		this.obLower = [];
		this.bird1.init();
		this.SCORE = 0;
		// this.obUp1 = new Obstacles(300, 0);
		// this.obUp1.init();
		// this.obUp2 = new Obstacles(1100, 0);
		// this.obUp2.init();
		// this.obLw1 = new Obstacles(300, 400);
		// this.obLw1.init();
		// this.obLw2 = new Obstacles(1100, 400);
		// this.obLw2.init();
		this.opp1;
		this.opp2;
		
		var xPos = 0;

		that = this;

		var ob1 = new Obstacles(800, 0, 200);
		ob1.init();
		var ob2 = new Obstacles(1600, 0, 200);
		ob2.init();
		var ob3 = new Obstacles(2400, 0, 200);
		ob3.init();
		this.obUpper.push(ob1, ob2, ob3);


		// var ob11 = new Obstacles(800, 400, 200);
		// ob11.init();
		// ob11.element.style.borderTop = '2px solid #513949';
		// // ob11.element.style.top = 
		// var ob12 = new Obstacles(1600, 400, 100);
		// ob12.init();
		// ob12.element.style.borderTop = '2px solid #513949';
		// var ob13 = new Obstacles(2400, 400, 350);
		// ob13.element.style.borderTop = '2px solid #513949';

		// this.obLower.push(ob11, ob12, ob13);

		for (var i = 0; i < 3; i ++){
			var ob1 = new Obstacles(this.obUpper[i].x, 400, 200);
			ob1.init();
			ob1.element.style.borderTop = '2px solid #513949';
			// ob1.element.style.top = (200 + i * 50) + 200 + 'px';
			this.obLower.push(ob1);
			// console.log("TOP: ", ob1.element.style.top);
			// console.log("NEW TOP: ", (200 + i * 50) + 200 + 'px' );
			// ob1.redrawObs();
		}

		this.keyPress = function(e){
			var keynum;

			if(window.event) { // IE                    
				keynum = e.keyCode;
			} else if(e.which){ // Netscape/Firefox/Opera                   
				keynum = e.which;
			}

			var pressedKey = String.fromCharCode(keynum);
			// if (e.keyCode == '32'){
			// 	console.log("button left");	
			// }
			if (pressedKey == ' '){
				bird1.y -=80;

			}
			
		}

		this.isCollision = function(){
			var collision = 0;
			var tempUp;
			var tempLw;
			var heightUp = 0;
			var heightLw = 0;			

			if (bird1.y < 0 || bird1.y > 547){
				return 1;
			}
			for (var i = 0; i < 3; i ++){
				tempUp = obUpper[i];
				tempLw = obLower[i];
				// tempUp.element.style.height
				heightUp = parseInt(tempUp.element.style.height, 0);

				heightLw = parseInt(tempLw.element.style.height, 0);

				if (bird1.x < tempUp.x + 120 && bird1.x + 76 > tempUp.x && bird1.y < tempUp.y + heightUp  && 53 + bird1.y > tempUp.y){
					return 1;
				}

				if (bird1.x < tempLw.x + 120 && bird1.x + 76 > tempLw.x && bird1.y < tempLw.y + heightLw && 53 + bird1.y > tempLw.y){
					return 1;
				}



			}


			return collision;
		}


		this.moveBird = function(){
			bird1.y += 3;
			bird1.redraw();
			this.newRan = 0;
			this.temp = 0;
			this.newHeight = 0;
			// that.obUp1.x -= 5;
			// that.obUp1.redrawObs();
			// that.obLw1.x -= 5;
			// that.obLw1.redrawObs();

			// that.obUp2.x -= 5;
			// that.obUp2.redrawObs();
			// that.obLw2.x -= 5;
			// that.obLw2.redrawObs();


			for (var i = 0; i < 3; i++){
				that.opp1 = that.obUpper[i];
				that.opp2 = that.obLower[i];
				that.opp1.x -= 5;
				that.opp2.x -= 5;
				that.opp1.redrawObs();
				that.opp2.redrawObs();
				
				if (that.opp1.x < -120){
					that.SCORE += 1;
					that.opp1.x = 2400;
					that.opp2.x = 2400;
					this.newHeight = getRandom(20, 380);
					that.opp1.element.style.height = this.newHeight + 'px';
					that.opp2.element.style.height = 600 - this.newHeight + 200 + 'px'; 
					that.opp2.y = this.newHeight + 200;
					

					// console.log("tala ko Height: ", that.opp2.element.style.height);
					// console.log("Tala ko top: ", that.opp2.element.style.top);
					// // console.log(this.newHeight + 600 - (this.newHeight + 200));
				}
				
				document.getElementById('scoreDisplay').innerHTML = 'SCORE: ' + this.SCORE;

			}
			
			var a = isCollision();
			if (a == 1) {
				var choice = confirm("GAME OVER!!! \nYOUR SCORE: " + that.SCORE + "\nPress Cancel to EXIT, Press OK to restart");
				if (choice == true){
					window.location.reload();
				}
					
			}
			document.addEventListener("keypress", keyPress, false);
		}
		
		setInterval(this.moveBird, 30);
	}

	
	BirdAnimation();
	
})();