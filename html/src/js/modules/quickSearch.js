'use strict';

const moduleName = 'quickSearch';

module.exports = function () {
	Array.from(document.querySelectorAll('[js-quick-search]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper    = self;
		const entry      = wrapper.querySelector('[js-quick-search-entry]');
		const urlForSend = entry.dataset['quickSearchUrl'];
		const ajax       = entry.dataset['ajax'];



		entry.addEventListener('input', () => {
			const entryValue = entry.value;

			if (!entryValue) {
				clearElements();
				return;
			}

			sendValueEntryByAjax(entryValue);
		});



		entry.addEventListener('focusin', (event) => showElements());



		entry.addEventListener('focusout', (event) => removeActiveClassInItem());



		entry.addEventListener('keydown', (event) => {
			const keyCode = event.keyCode;

			if (keyCode === 38 || keyCode === 40 || keyCode === 13) {
				const items 	 	 = wrapper.querySelectorAll('.quick-search__item');
				const activeItem 	 = wrapper.querySelector('.quick-search__item.active');
				const hrefActiveItem = !!activeItem ? activeItem.dataset['href'] : undefined;

				if (keyCode === 38) {
					shiftUpActiveClassInItem(items, activeItem);
				} else if (keyCode === 40) {
					shiftDownActiveClassInItem(items, activeItem);
				} else if (keyCode === 13 && activeItem) {
					event.preventDefault();
					window.location = hrefActiveItem;
				}
			}
		});



		document.addEventListener('click', (event) => {
			const element = event.target.closest('[js-quick-search]');

			if (!element) hideElements();
		});



		document.addEventListener('touchtap', (event) => {
			event = event.detail;
			const element = event.target.closest('[js-quick-search]');

			if (!element) hideElements();
		});



		document.addEventListener('keydown', (event) => {
			const elements = wrapper.querySelector('.quick-search');

			if (event.keyCode === 27 && elements) {
				event.preventDefault();

				hideElements();
			}
		});



		function sendValueEntryByAjax(entryValue) {
			const formData    = new FormData();
			const xhr         = new XMLHttpRequest();
			const url         = urlForSend;
			const dataForSend = {
				q 	 : entryValue,
				ajax : ajax
			};

			fillFormData(formData, dataForSend);

			xhr.open('POST', url);
			// xhr.open('GET', url);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.onreadystatechange = () => {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					if (xhr.responseText) {
						renderElements(JSON.parse(xhr.responseText));
					} else {
						clearElements();
					}
				}
			};
			xhr.send(formData);
		}



		function fillFormData(formData, dataForSend, parentKey) {
			let formDataKey;

			for (const key in dataForSend) {
				formDataKey = (parentKey === undefined ? key : `${parentKey}[${key}]`);

				if (typeof dataForSend[key] === 'object') {
					fillFormData(formData, dataForSend[key], formDataKey);
				} else {
					formData.append(formDataKey, dataForSend[key]);
				}
			}
		}



		function showElements() {
			const elements = wrapper.querySelector('.quick-search');

			if (elements) elements.classList.remove('hidden');
		}



		function hideElements() {
			const elements = wrapper.querySelector('.quick-search');

			if (elements) elements.classList.add('hidden');
		}



		function clearElements() {
			const elements = wrapper.querySelector('.quick-search');

			if (elements) elements.remove();
		}



		function renderElements(dataElements) {
			let elements = '';

			Array.from(dataElements).forEach((self) => {
				elements += `
						<li class="quick-search__item" data-href="${self.link}">
							<div class="quick-search__row">
								<div class="quick-search__col-1">
									<a href="${self.link}" class="quick-search__link"><img src="${self.image}" alt="" class="quick-search__image"></a>
								</div>
	
								<div class="quick-search__col-2">
									<a href="${self.link}" class="quick-search__name">${self.name}</a>
									<span class="quick-search__code">${self.code}</span>
								</div>
							</div>
						</li>
				`;
			});

			const html = `
						<div class="quick-search">
							<ul class="quick-search__list">
								${elements}
							</ul>
						</div>
			`;

			clearElements();

			wrapper.insertAdjacentHTML('beforeend', html);
		}



		function shiftUpActiveClassInItem(items, activeItem) {
			if (!activeItem) {
				items[items.length - 1].classList.add('active');
			} else {
				activeItem.classList.remove('active');

				const prevElement = activeItem.prev();

				if (activeItem && prevElement) prevElement.classList.add('active');
			}
		}



		function shiftDownActiveClassInItem(items, activeItem) {
			if (!activeItem) {
				items[0].classList.add('active');
			} else {
				activeItem.classList.remove('active');

				const nextElement = activeItem.next();

				if (activeItem && nextElement) nextElement.classList.add('active');
			}
		}



		function removeActiveClassInItem() {
			const activeItem = wrapper.querySelector('.quick-search__item.active');

			if (activeItem) activeItem.classList.remove('active');
		}



	});
};