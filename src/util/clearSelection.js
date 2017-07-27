export default function () {

	if (window.document.selection && window.document.selection.empty) {
		window.document.selection.empty();

	} else if (window.getSelection) {
		var sel = window.getSelection();
		sel.removeAllRanges();
	}

}
