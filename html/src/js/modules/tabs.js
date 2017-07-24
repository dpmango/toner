'use strict';

const moduleName = 'tabs';

module.exports = function () {
	Array.from(document.querySelectorAll('[js-tabs]')).forEach((self) => {
		if (self.dataset[moduleName + 'Init']) return;
		self.dataset[moduleName + 'Init'] = true;



		const wrapper 	   	   = self;

		const nav	   		   = wrapper.querySelector('[js-tabs-nav]');
		const navBtn   		   = nav.querySelectorAll('[js-tabs-nav-btn]');

		const content   	   = searchContent();

		const btnAccordion     = searchBtnAccordion();

		let   numberActiveItem = 0;



		navBtn.addEventListener('click', function (event) {
			if (event.currentTarget.nodeName === 'A') event.preventDefault();

			if (this.parentNode.classList.contains('disabled')) { return; }

			const number = this.parentNode.getElementIndex();

			changeActiveClassNav(number);
			changeActiveClassContent(number);
			changeActiveClassAccordionBtn(number);
		});



		if (btnAccordion.length) {
			btnAccordion.addEventListener('click', function (event) {
				event.preventDefault();

				if (this.classList.contains('active')) {
					this.classList.remove('active');
					return;
				}

				const number = this.getElementIndex('a');

				changeActiveClassNav(number);
				changeActiveClassContent(number);
				changeActiveClassAccordionBtn(number);
			});
		}



		function changeActiveClassNav(number) {
			const childrenNav = nav.getChildren('div');

			childrenNav.forEach((self) => self.classList.remove('active'));
			childrenNav[number].classList.add('active');
			numberActiveItem = number;
		}



		function changeActiveClassContent(number) {
			Array.from(content).forEach((self) => {
				const childrenContent = self.getChildren('div');

				childrenContent.forEach((self) => self.classList.remove('active'));
				childrenContent[number].classList.add('active');
				numberActiveItem = number;
			});
		}



		function changeActiveClassAccordionBtn(number) {
			if (btnAccordion.length) {
				btnAccordion[number].classList.add('active');
				numberActiveItem = number;
			}
		}



		function searchContent() {
			let content = Array.from(wrapper.querySelectorAll('[js-tabs-content]'));

			Array.from(content).forEach((self, index) => {
				if (self.closest('[js-tabs]') !== wrapper) content.splice(index, 1);
			});

			return content;
		}



		function searchBtnAccordion() {
			let btnAccordion = Array.from(wrapper.querySelectorAll('[js-tabs-btn-accordion]'));

			Array.from(btnAccordion).forEach((self, index) => {
				if (self.closest('[js-tabs]') !== wrapper) btnAccordion.splice(index, 1);
			});

			return btnAccordion;
		}



		let setActiveClass = true;

		Array.from(nav.children).filter((self) => {
			if (self.classList.contains('active')) {
				setActiveClass = false;
				return false;
			}
		});

		if (setActiveClass) {
			!!nav.children.length ? nav.children[numberActiveItem].classList.add('active') : undefined;

			Array.from(content).forEach((self) => {
				const childrenContent = self.getChildren('div');

				childrenContent[numberActiveItem].classList.add('active')
			});

			if (btnAccordion.length) {
				btnAccordion[numberActiveItem].classList.add('active');
			}
		}



	});
};  