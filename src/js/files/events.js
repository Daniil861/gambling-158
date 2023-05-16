import { deleteMoney, checkRemoveAddClass, noMoney, addMoney } from './functions.js';
import { checkBoughtItems, writeSelected, initStartData, configGame, startGame, checkHideFinalWord, resetFinalSelectColor } from './script.js';
import { startData } from './startData.js';

const preloader = document.querySelector('.preloader');

// Объявляем слушатель событий "клик"

document.addEventListener('click', (e) => {
	const targetElement = e.target;

	const money = +sessionStorage.getItem('money');
	const currentBet = +sessionStorage.getItem('current-bet');
	const wrapper = document.querySelector('.wrapper');

	initStartData();

	if (targetElement.closest('.preloader__button')) {
		preloader.classList.add('_hide');
		if (!sessionStorage.getItem('privacy')) sessionStorage.setItem('privacy', true);
	}

	if (targetElement.closest('[data-btn="privacy"]') && preloader.classList.contains('_hide')) {
		preloader.classList.remove('_hide');
	}

	if (targetElement.closest('[data-btn="shop"]')) {
		writeSelected();
		wrapper.classList.add('_shop');
	}

	if (targetElement.closest('.header-shop__button-back')) {
		wrapper.classList.remove('_shop');
	}

	if (targetElement.closest('[data-btn="game-home"]')) {
		wrapper.classList.remove('_game');

		checkHideFinalWord();
		resetFinalSelectColor();
	}

	if (targetElement.closest('[data-btn="game"]')) {
		wrapper.classList.add('_game');
	}

	if (targetElement.closest('[data-btn="slot-home"]')) {
		wrapper.classList.remove('_slot');
	}

	if (targetElement.closest('[data-btn="slot"]')) {
		wrapper.classList.add('_slot');
	}

	//shop

	if (targetElement.closest('[data-shop-button="1"]') && !targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_1) {
			deleteMoney(startData.prices.price_1, '.score');
			sessionStorage.setItem('item-1', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="1"]') && targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="1"]'));
		sessionStorage.setItem('current-item', 1);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="2"]') && !targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_2) {
			deleteMoney(startData.prices.price_2, '.score');
			sessionStorage.setItem('item-2', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="2"]') && targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="2"]'));
		sessionStorage.setItem('current-item', 2);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="3"]') && !targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_3) {
			deleteMoney(startData.prices.price_3, '.score');
			sessionStorage.setItem('item-3', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="3"]') && targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="3"]'));
		sessionStorage.setItem('current-item', 3);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="4"]') && !targetElement.closest('[data-item="4"]').classList.contains('_bought')) {
		if (money >= startData.prices.price_4) {
			deleteMoney(startData.prices.price_4, '.score');
			sessionStorage.setItem('item-4', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="4"]') && targetElement.closest('[data-item="4"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="4"]'));
		sessionStorage.setItem('current-item', 4);
		writeSelected();
	}

	//========================================================================================================================================================
	// bet-box

	if (targetElement.closest('.bet-box__minus') && currentBet > startData.countBet) {
		sessionStorage.setItem('current-bet', currentBet - startData.countBet);
		if (document.querySelector(startData.nameBetScore)) document.querySelector(startData.nameBetScore).textContent = sessionStorage.getItem('current-bet');
	}

	if (targetElement.closest('.bet-box__plus') && money > currentBet + startData.countBet && currentBet < startData.maxBet) {
		sessionStorage.setItem('current-bet', currentBet + startData.countBet);
		if (document.querySelector(startData.nameBetScore)) document.querySelector(startData.nameBetScore).textContent = sessionStorage.getItem('current-bet');
	}
	//game

	if (targetElement.closest('.controls-field__button') && !targetElement.closest('.controls-field__button').classList.contains('_active')) {
		checkRemoveAddClass('.controls-field__button', '_active', targetElement.closest('.controls-field__button'));

		const color = targetElement.closest('.controls-field__button').dataset.color;
		configGame.currentSelect = color;

	}

	if (targetElement.closest('.controls-field__button-start')) {
		startGame();
	}


})