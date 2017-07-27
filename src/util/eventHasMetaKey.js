// Check if keyboard event object includes meta key being pressed
export default function (event) {
	return (event.ctrlKey || event.metaKey || event.shiftKey);
}
