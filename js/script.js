const arr = Array(9).fill(0);
console.log(arr);

//! рисуем игровое поле
arr.forEach((item, index) => {
	const div = document.createElement('div');
	div.setAttribute('data-n', index);
	ttt.append(div)
});

let step = 1;

ttt.addEventListener('click', click);
function click(event) {
	//? получаю номер элемента по которому кликнул
	let n = +event.target.getAttribute('data-n')
	//? поле не пустое?
	if (arr[n] !== 0) return;
	//? меняем крестик-нолик (1 - 2)
	step = (step === 1) ? 2 : 1;
	//? поле пустое - ставлю ход
	arr[n] = step;
	console.log(arr);
	//? отрисовываем
	draw();
	//? проверяем победу
	checkWinner(step)
}

const tttDiv = document.querySelectorAll('#ttt > div')

//! должно перебрать массив и отрисовать крестик - нолик
function draw() {
	arr.forEach((item, index) => {
		switch (item) {
			case 1: tttDiv[index].textContent = 'X';
				break;
			case 2: tttDiv[index].textContent = "O";
				break;
		}
	});
}

//! проверяем победу
function checkWinner(step) {
	//? комбинации для победы data-n
	const winnerArr = ['012', '345', '678', '036', '147', '258', '048', '246'];
	//? маcсив индексов т.е. ход 0 => массив 0, ход Х => массив Х
	let indexStep = [];
	arr.forEach((item, index) => {
		if (item === step) indexStep.push(index);
	})

	console.log(indexStep);

	//? перебераем массив indexStep и если есть 3 совпадения с winnerArr[]- победа
	for (let i = 0; i < winnerArr.length; i++) {
		const winPattern = winnerArr[i];
		let count = 0;
		winPattern.split('').forEach(item => {
			if (indexStep.includes(+item)) count++;
		});
		if (count === 3) {
			showWin(step);
			return;
		}
	}
	//? если ничья
	if (!arr.includes(0)) showDraw();
}

//! кто победил и удаляем событие
function showWin(step) {
	console.log('Победил ' + (step === 1 ? 'X' : '0'));
	ttt.removeEventListener('click', click);
	ttt.style.opacity = .5;
	document.querySelector('.out').innerHTML = 'Победил <span>' + (step === 1 ? 'X' : '0') + '</span>';
}

//! если ничья и удаляем событие
function showDraw() {
	console.log('Ничья');
	ttt.removeEventListener('click', click);
	ttt.style.opacity = .5;
	document.querySelector('.out').innerHTML = 'Ничья';
}

//! button new game
document.querySelector('.button-start-new-game').addEventListener('click', () => {
	location.reload()
})