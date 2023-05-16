import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney, getRandom_2 } from './functions.js';
import { startData } from './startData.js';

const heroImage = document.querySelector('.field__hero');

if (sessionStorage.getItem('privacy')) {
	document.querySelector('.preloader').classList.add('_hide');
}

export function initStartData() {
	drawStartCurrentItem();
	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', startData.bank);
		writeScore();
	}

	if (!sessionStorage.getItem('current-bet')) {
		sessionStorage.setItem('current-bet', startData.countBet);
		writeCurrentBet();
	} else {
		writeCurrentBet();
	}
}

function writeScore() {
	if (document.querySelector('.score')) {
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

export function writeCurrentBet() {
	const betItem = document.querySelectorAll(startData.nameBetScore);
	if (betItem.length) {
		betItem.forEach(item => {
			item.textContent = sessionStorage.getItem('current-bet');
		})
	}

}

initStartData();


//========================================================================================================================================================
//main

if (document.querySelector('.main')) {
	document.querySelector('.main').classList.add('_active');

	drawPrices();
	checkBoughtItems();
	removeSelectedItems();
	writeSelected();
}

function drawStartCurrentItem() {
	if (!sessionStorage.getItem('current-item')) sessionStorage.setItem('current-item', 1);
	if (!sessionStorage.getItem('item-1')) sessionStorage.setItem('item-1', true);
}

function drawPrices() {
	document.querySelector('[data-price="1"]').textContent = startData.prices.price_1;
	document.querySelector('[data-price="2"]').textContent = startData.prices.price_2;
	document.querySelector('[data-price="3"]').textContent = startData.prices.price_3;
	document.querySelector('[data-price="4"]').textContent = startData.prices.price_4;
}

export function checkBoughtItems() {
	if (sessionStorage.getItem('item-1')) {
		document.querySelector('[data-shop-button="1"]').textContent = 'Select';
		document.querySelector('[data-item="1"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-2')) {
		document.querySelector('[data-shop-button="2"]').textContent = 'Select';
		document.querySelector('[data-item="2"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-3')) {
		document.querySelector('[data-shop-button="3"]').textContent = 'Select';
		document.querySelector('[data-item="3"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-4')) {
		document.querySelector('[data-shop-button="4"]').textContent = 'Select';
		document.querySelector('[data-item="4"]').classList.add('_bought');
	}
}

function removeSelectedItems() {
	const blocks = document.querySelectorAll('.shop__item');

	blocks.forEach(block => {
		if (block.classList.contains('_selected')) block.classList.remove('_selected');
	})
}

export function writeSelected() {
	document.querySelectorAll('[data-shop-button]').forEach(btn => {
		if (btn.closest('._bought')) btn.textContent = 'Select';
	})

	if (+sessionStorage.getItem('current-item') === 1) {
		document.querySelector('[data-shop-button="1"]').textContent = 'Selected';
		document.querySelector('[data-item="1"]').classList.add('_selected');
		heroImage.style.backgroundImage = 'url("../img/shop/shop-1.png")';
	} else if (+sessionStorage.getItem('current-item') === 2) {
		document.querySelector('[data-shop-button="2"]').textContent = 'Selected';
		document.querySelector('[data-item="2"]').classList.add('_selected');
		heroImage.style.backgroundImage = 'url("../img/shop/shop-2.png")';
	} else if (+sessionStorage.getItem('current-item') === 3) {
		document.querySelector('[data-shop-button="3"]').textContent = 'Selected';
		document.querySelector('[data-item="3"]').classList.add('_selected');
		heroImage.style.backgroundImage = 'url("../img/shop/shop-3.png")';
	} else if (+sessionStorage.getItem('current-item') === 4) {
		document.querySelector('[data-shop-button="4"]').textContent = 'Selected';
		document.querySelector('[data-item="4"]').classList.add('_selected');
		heroImage.style.backgroundImage = 'url("../img/shop/shop-4.png")';
	}
}

//========================================================================================================================================================
// game
// ++1. Выбрали цвет - зафиксировали выбор в игровой объект
//	2. Нажали кнопку bet, тем самым запустили игру:
//	++	- Если активно итоговое слово - скрываем его
//	++	- снимаем деньги за ставку
//	++	2.1 Блокируем кнопку запуска игры
//	++	2.2 Блокируем кнопки выбора цвета
//		2.3 Генерируем случайный цвет:
//	++		2.3.1 Создаем массив из трех цветов
//	++		2.3.2 Генерируем случайное число от 1 до 3
//	++		2.3.3 Записываем в объект игры выпавший случайный цвет
//	++	2.4 Отрисовываем соответствующий цвет на экране
//		2.5 Проверяем совпал ли выбор игрока
//			2.5.1 Если совпал:
//	++			- в итоговое слово записываем Right
//	++			- Показываем итоговое слово
//	++			- добавляем в банк деньги
//			2.5.2 Если не сопал:
//	++			- в итоговое слово записываем Lose!
//	++			- Показываем итоговое слово
//		2.6 Разблокируем кнопки

export const configGame = {
	currentSelect: '_red',
	randomSelect: '_blue',

	bet: 5,
	coeff: 5,

	colors: ['red', 'yellow', 'blue']
}

const finalWord = document.querySelector('.field__final-word');
const colorButtons = document.querySelector('.controls-field__buttons');
const startButton = document.querySelector('.controls-field__button-start');
const colorBox = document.querySelector('.field__color');

export function startGame() {
	checkHideFinalWord();
	resetFinalSelectColor();

	deleteMoney(configGame.bet);

	holdGameButtons();
	generateRandomColor();

	setTimeout(() => {
		drawResultColor();

		const collision = checkCollision();

		console.log(collision);
		if (collision) {
			showFinalWord('win');
			addMoney(configGame.bet * configGame.coeff, '.score', 1000, 2000);
		} else {
			showFinalWord();
		}

		removeHoldGameButtons();

		console.log(configGame);
	}, 1000);
}

export function checkHideFinalWord() {
	if (finalWord.classList.contains('_visible')) finalWord.classList.remove('_visible');
}

function holdGameButtons() {
	colorButtons.classList.add('_hold');
	startButton.classList.add('_hold');
}

function removeHoldGameButtons() {
	colorButtons.classList.remove('_hold');
	startButton.classList.remove('_hold');
}

function generateRandomColor() {
	const randomNum = getRandom(0, 3);
	configGame.randomSelect = configGame.colors[randomNum];
}

function drawResultColor() {
	if (configGame.randomSelect === 'red') {
		colorBox.classList.add('_red');
	} else if (configGame.randomSelect === 'yellow') {
		colorBox.classList.add('_yellow');
	} else if (configGame.randomSelect === 'blue') {
		colorBox.classList.add('_blue');
	}
}

export function resetFinalSelectColor() {
	if (colorBox.classList.contains('_red')) {
		colorBox.classList.remove('_red');
	}
	if (colorBox.classList.contains('_yellow')) {
		colorBox.classList.remove('_yellow');
	}
	if (colorBox.classList.contains('_blue')) {
		colorBox.classList.remove('_blue');
	}
}

function checkCollision() {
	if (configGame.currentSelect === configGame.randomSelect) {
		console.log('Collision');
		return true;
	}
	return false;
}

function showFinalWord(status = 'lose') {
	if (status === 'win') {
		finalWord.textContent = 'RIGHT!';
	} else {
		finalWord.textContent = 'LOSE!';
	}
	finalWord.classList.add('_visible');
}

//========================================================================================================================================================

export function showFinalScreen(count = 0, status = 'lose') {
	const final = document.querySelector('.final');
	const finalCheck = document.querySelector('.final-check');
	const finalTitle = document.querySelector('.final__title');
	const button = document.querySelector('.final .final__button span');

	if (status === 'win') {
		finalTitle.textContent = 'GOAL!';
		finalCheck.textContent = `+${count}`;
		button.textContent = 'GO!';
	} else {
		finalTitle.textContent = 'MISS!';
		finalCheck.textContent = `-${count}`;
		button.textContent = 'Repeat';
	}

	setTimeout(() => {
		final.classList.add('_visible');
	}, 500);
}
