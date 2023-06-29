const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', e => {
	if (e.code.toLowerCase() === 'space') {
		event.preventDefault();
		setRandomColors();
	}
});

document.addEventListener('click', e => {
	const type = e.target.dataset.type;

	if (type === 'lock') {
		const node =
			e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];

		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
	} else if (type === 'copy') {
		copyToClipboard(e.target.innerText);
	} else if (type === 'close') {
		closeModal();
	} else if (type === 'random') {
		setRandomColors();
	}
});

const copyToClipboard = text => {
	return navigator.clipboard.writeText(text);
};

const setRandomColors = isInitial => {
	const colors = isInitial ? getColorsFromHash() : [];

	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock');
		const text = col.querySelector('h2');
		const btn = col.querySelector('button');

		if (isLocked) {
			colors.push(text.innerText);
			return;
		}

		const color = isInitial
			? colors[index]
				? colors[index]
				: chroma.random()
			: chroma.random();

		if (!isInitial) {
			colors.push(color);
		}

		text.innerText = color;
		col.style.background = color;

		setTextColor(text, color);
		setTextColor(btn, color);
	});

	updateColorsHash(colors);
};

const setTextColor = (text, color) => {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white';
};

const updateColorsHash = (colors = []) => {
	document.location.hash = colors
		.map(col => {
			return col.toString().substring(1);
		})
		.join('-');
};

const getColorsFromHash = () => {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map(color => '#' + color);
	}

	return [];
};

const closeModal = () => {
	const modal = document.querySelector('.modal-wrapper');
	modal.style.display = 'none';
};

setRandomColors(true);
