import naturalScroll from 'natural-scroll';

export default function (container, element, duration, offset) {
	let position = element.offsetTop - (offset ? offset : 0);
	naturalScroll.scrollTop(container, position, duration);
}
