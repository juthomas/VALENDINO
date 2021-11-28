$(document).ready(function()
{


	var scoreFinal
	var intervalChrono
	var vies = 3
	var difficultyMultiplicator = 1.1; // entre 1 et 1.5
	var meteoriteFireDuration = 4000
	var meteoriteDuration = 3500

	function initGame()
	{
		//initialisation des variables
		//met en place l'UI

		scoreFinal= 0;

	}



	//Incremente la variable score
	//Affiche le score



	// Dino qui se déplace et rotate
	var mouvement;


	document.onkeydown = function(e) {
		switch(e.which) {
			case 37: mouvement = "gauche"// left
			$(".anime").css({left:$(".anime").position().left - 100 + "px"});
			$(".anime").css({transform: "rotateY(0deg)"});

			console.log($(".anime").position());
			break;

			case 39: mouvement = "droite"// right
			$(".anime").css({left:$(".anime").position().left + 100 + "px"});
			$(".anime").css({transform: "rotateY(180deg)"});
			break;

			default: return; // exit this handler for other keys
		}
		e.preventDefault(); // prevent the default action (scroll / move caret)
	};

	// Tacos qui tombent
	function postacos()
	{
		//Généré une postion (x,y) aléatoire
		var posXAl = Math.random() * ($(window).width() - $('#tacos1').width());
		posXAl = Math.floor(posXAl);
		console.log("Position aléatoire" + posXAl + "/" + $(window).width());
		$("#tacos1").css({left:posXAl + "px" , top:-100 + "px"});

		$('#tacos1').stop().animate({left:posXAl +'px', top:100 +'%'}, {duration:4500 , complete:postacos , progress: detecCollision});
	}
	postacos();


	// collisions tacos1
	let nbtacos=0;

	function detecCollision()
	{
		//console.log("detecCollision");
		var posX = $("#tacos1").position().left + $("#tacos1").width()/4;
		var posY = $("#tacos1").position().top + $("#tacos1").height()/4;
		var MX = $(".anime").position().left;
		var MY = $(".anime").position().top;
		var MW = $(".anime").width();
		var MH = $(".anime").height();

		if(posX>=MX && posX<=(MX+MW) && posY>=MY && posY<=(MY+MH))
		{
			//console.log("Collision !");
			postacos();
			nbtacos= nbtacos + 1;
			$("#nbtextetacos").html(nbtacos)
			window.localStorage.setItem('nbtacos', + nbtacos)
			
			/* Bouffer animation */
			meteoriteFireDuration = meteoriteFireDuration / difficultyMultiplicator
			meteoriteDuration = meteoriteDuration / difficultyMultiplicator

			explode(posX, posY)

			$(".anime").css({animation: ""});
			setTimeout(()=>{
				$(".anime").css({animation: "grr 0.7s steps(3)"});
			}, 0)

		}else{
		}
	}
	detecCollision();
	// Appel à la fonction initGame()
	initGame();



	// Métérorite1 qui tombent
	function posmeteorite1()
	{
		//Généré une postion (x,y) aléatoire
		var posXAl = Math.random() * ($(window).width() - $('#meteorite1').width());
		posXAl = Math.floor(posXAl);
		console.log("Position aléatoire" + posXAl + "/" + $(window).width());
		$("#meteorite1").css({left:posXAl + "px" , top:-100 + "px"});

		$('#meteorite1').stop().animate({left:posXAl +'px', top:100 +'%'}, {duration:meteoriteDuration , complete:posmeteorite1 , progress: detecCollisionMeteorite});
	}



	posmeteorite1();

	// collisions meteorite1
	function detecCollisionMeteorite()
	{
		//console.log("detecCollision");
		var posX = $(".anime").position().left + $(".anime").width()/2;
		var posY = $(".anime").position().top + $(".anime").height()/2;
		var MX = $("#meteorite1").position().left;
		var MY = $("#meteorite1").position().top;
		var MW = $("#meteorite1").width();
		var MH = $("#meteorite1").height();

		if(posX>=MX && posX<=(MX+MW) && posY>=MY && posY<=(MY+MH))
		{
			//console.log("Collision !");
			posmeteorite1();
			$("#Vies" + vies).hide();
			vies= vies - 1;
			if(vies== 0) {
				window.location.href = "Fin.html";
			}
			console.log ('nbvies:' + vies)
		}
	}
	detecCollisionMeteorite();
	// Appel à la fonction initGame()
	initGame();



	// MétéroriteFire qui tombe
	function posmeteoriteFire()
	{
		//Généré une postion (x,y) aléatoire
		var posXAl = Math.random() * ($(window).width() - $('#meteoriteFire').width());
		posXAl = Math.floor(posXAl);
		console.log("Position aléatoire" + posXAl + "/" + $(window).width());
		$("#meteoriteFire").css({left:posXAl + "px" , top:-100 + "px"});

		$('#meteoriteFire').stop().animate({left:posXAl +'px', top:100 +'%'}, {duration:meteoriteFireDuration , complete:posmeteoriteFire , progress: detecCollisionmeteoriteFire});
	}

	posmeteoriteFire();

	// collisions meteoritefire

	function detecCollisionmeteoriteFire()
	{
		//console.log("detecCollision");
		var posX = $(".anime").position().left + $(".anime").width()/4;
		var posY = $(".anime").position().top + $(".anime").height()/4;
		var MX = $("#meteoriteFire").position().left;
		var MY = $("#meteoriteFire").position().top;
		var MW = $("#meteoriteFire").width();
		var MH = $("#meteoriteFire").height();

		if(posX>=MX && posX<=(MX+MW) && posY>=MY && posY<=(MY+MH))
		{
			//console.log("Collision !");
			window.location.href = "Fin.html";
		}
	}

	detecCollisionmeteoriteFire();

	// Appel à la fonction initGame()
	initGame();


	//https://codepen.io/explosion/pen/zKEovE
    const colors = [ '#ffc000', '#ff3b3b', '#ff8400' ];
    const bubbles = 25;

    const r = (a, b, c) => parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));

    const explode = (x, y) => {
        let particles = [];
        let ratio = window.devicePixelRatio;
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');

        c.style.position = 'absolute';
        c.style.left = (x - 100) + 'px';
        c.style.top = (y - 100) + 'px';
        c.style.pointerEvents = 'none';
        c.style.width = 200 + 'px';
        c.style.height = 200 + 'px';
        c.style.zIndex = 100;
        c.width = 200 * ratio;
        c.height = 200 * ratio;
        document.body.appendChild(c);

        for(var i = 0; i < bubbles; i++) {
            particles.push({
                x: c.width / 2,
                y: c.height / 2,
                radius: r(20, 30),
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: r(0, 360, true),
                speed: r(8, 12),
                friction: 0.9,
                opacity: r(0, 0.5, true),
                yVel: 0,
                gravity: 0.1
            });
        }

        render(particles, ctx, c.width, c.height);
        setTimeout(() => document.body.removeChild(c), 1000);
    }

    const render = (particles, ctx, width, height) => {
        requestAnimationFrame(() => render(particles, ctx, width, height));
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, i) => {
            p.x += p.speed * Math.cos(p.rotation * Math.PI / 180);
            p.y += p.speed * Math.sin(p.rotation * Math.PI / 180);

            p.opacity -= 0.01;
            p.speed *= p.friction;
            p.radius *= p.friction;
            p.yVel += p.gravity;
            p.y += p.yVel;

            if(p.opacity < 0 || p.radius < 0) return;

            ctx.beginPath();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
            ctx.fill();
        });

        return ctx;
    }


})
