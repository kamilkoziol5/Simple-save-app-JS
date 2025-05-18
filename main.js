const userValueInput = document.querySelector('#input-user-value');
const userGoalInput = document.querySelector('#input-user-goal');
const addBtn = document.querySelector('#add-btn');
const detailsContainer = document.querySelector('.details-container');

function calculatePercent() {
	const userValue = userValueInput.value;
	const userGoal = userGoalInput.value;

	const percent = Math.min((userValue / userGoal) * 100, 100).toFixed(1);

	if (!userValue || !userGoal) {
		alert('Podaj poprawne dane!');
		userValueInput.classList.add('error-input');
		userGoalInput.classList.add('error-input');
		return;
	} else {
		userValueInput.classList.remove('error-input');
		userGoalInput.classList.remove('error-input');
		detailsContainer.innerHTML = '';
		detailsContainer.style.display = 'flex';

		const h4 = document.createElement('h4');
		h4.innerHTML = `
  Udało Ci się odłożyć <span class="current-value">${userValue}</span> z <span class="goal-span">${userGoal}</span> euro!
`;

		const h2 = document.createElement('h2');
		h2.classList.add('percent-value');
		h2.textContent = `${percent} %`;

		const p = document.createElement('p');
		p.textContent = 'Niżej możesz zobaczyć ile ci brakuje do osiągnięcia celu!';

		const progressContainer = document.createElement('div');
		progressContainer.classList.add('progress-container');

		const progressBar = document.createElement('div');
		progressBar.classList.add('progress-bar');
		progressBar.style.width = `${percent}%`;

		const circle = document.createElement('div');
		circle.classList.add('circle');

		const resetBtn = document.createElement('button');
		resetBtn.classList.add('reset-btn');
		resetBtn.innerText = 'Reset';

		const addMoneyContainer = document.createElement('div');
		addMoneyContainer.classList.add('add-money-container');

		const addMoneyInput = document.createElement('input');
		addMoneyInput.type = 'number';
		addMoneyInput.placeholder = 'Add Value';
		addMoneyInput.classList.add('add-money-input');

		const addMoneyBtn = document.createElement('button');
		addMoneyBtn.innerText = 'Add Money';
		addMoneyBtn.classList.add('add-money-btn');

		detailsContainer.appendChild(h4);
		detailsContainer.appendChild(h2);
		detailsContainer.appendChild(p);
		detailsContainer.appendChild(progressContainer);
		progressContainer.appendChild(progressBar);
		progressBar.appendChild(circle);
		detailsContainer.appendChild(resetBtn);
		addMoneyContainer.appendChild(addMoneyInput);
		addMoneyContainer.appendChild(addMoneyBtn);
		detailsContainer.appendChild(addMoneyContainer);

		userGoalInput.value = '';
		userValueInput.value = '';

		resetBtn.addEventListener('click', () => {
			detailsContainer.style.display = 'none';
		});

		function updateProgress(newValue) {
			const newPercent = Math.min((newValue / userGoal) * 100, 100).toFixed(1);
			h4.innerHTML = `Udało Ci się odłożyć <span class="current-value">${newValue}</span> z <span class="goal-span">${userGoal}</span> euro!`;
			h2.textContent = `${newPercent} %`;
			progressBar.style.width = `${newPercent}%`;
		}

		addMoneyBtn.addEventListener('click', () => {
			const addValue = parseFloat(addMoneyInput.value);

			if (!addValue) {
				alert('Błąd!');
				return;
			}

			const currentValueSpan = h4.querySelector('.current-value');
			const currentValue = parseFloat(currentValueSpan.textContent);
			const newTotal = currentValue + addValue;

			updateProgress(newTotal);

			addMoneyInput.value = '';
		});
	}
}

addBtn.addEventListener('click', calculatePercent);

userValueInput.addEventListener('input', () => {
	if (userValueInput.value.trim() !== '') {
		userValueInput.classList.remove('error-input');
	}
});

userGoalInput.addEventListener('input', () => {
	if (userGoalInput.value.trim() !== '') {
		userGoalInput.classList.remove('error-input');
	}
});
