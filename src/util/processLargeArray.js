// Process large array in chunks so that UI isn't blocked for too long at once
export default function (array, processItemCallback, finalCallback) {
	let chunk = 250;
	let i = 0;

	let doChunk = function (processItemCallback) {
		let count = chunk;

		// Process each item in this chunk
		while (count-- && i < array.length) {

			// Process array[i] here
			// NOTE: processItemCallback should not move, delete or add array items, but updating them is OK
			processItemCallback(array[i], i, array);

			// Iterate counter
			++i;
		}

		// Continue loop in next chunk after allowing other tasks to go on
		if (i < array.length) {
			setTimeout(function () {
				doChunk(processItemCallback);
			}, 2);
		} else {
			finalCallback();
		}

	};

	doChunk(processItemCallback);
}
