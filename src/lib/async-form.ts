type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface AsyncFormMessages {
	success: string;
	error: string;
}

export function initAsyncForm(
	form: HTMLFormElement,
	statusEl: HTMLElement,
	endpoint: string,
	messages: AsyncFormMessages,
): void {
	const submitButton = form.querySelector<HTMLButtonElement>('[data-submit-button]');
	const submitLabel = submitButton?.querySelector<HTMLElement>('[data-submit-label]');
	const submitSpinner = submitButton?.querySelector<HTMLElement>('[data-submit-spinner]');
	if (!submitButton || !submitLabel) return;

	const fields = Array.from(form.querySelectorAll<FormControl>('input, textarea, select'));

	const validateField = (field: FormControl) => {
		const isValid = field.validity.valid;
		field.dataset.invalid = String(!isValid);
		field.setAttribute('aria-invalid', String(!isValid));
		const errorEl = document.getElementById(`${field.id}-error`);
		if (errorEl) errorEl.textContent = isValid ? '' : field.validationMessage;
	};

	const updateSubmitState = () => {
		submitButton.disabled = !form.checkValidity();
	};

	fields.forEach((field) => {
		field.addEventListener('input', () => {
			updateSubmitState();
			if (field.dataset.touched === 'true') validateField(field);
		});
		field.addEventListener('blur', () => {
			field.dataset.touched = 'true';
			validateField(field);
		});
		field.addEventListener('invalid', (event) => {
			event.preventDefault();
			field.dataset.touched = 'true';
			validateField(field);
			// Don't call updateSubmitState()/checkValidity() here: checkValidity()
			// synchronously fires `invalid` on every invalid control, and doing so
			// again from inside this handler re-triggers itself for the other
			// fields, recursing forever. We already know the form is invalid.
			submitButton.disabled = true;
		});
	});

	updateSubmitState();

	const originalLabel = submitLabel.textContent ?? '';

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		if (!form.checkValidity()) {
			fields.forEach((field) => {
				field.dataset.touched = 'true';
				validateField(field);
			});
			submitButton.disabled = true;
			return;
		}

		form.setAttribute('aria-busy', 'true');
		submitButton.disabled = true;
		submitLabel.textContent = 'Sending…';
		submitSpinner?.classList.remove('hidden');
		statusEl.textContent = '';
		delete statusEl.dataset.state;

		try {
			const formData = new FormData(form);
			const payload = Object.fromEntries(formData.entries());

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

			statusEl.textContent = messages.success;
			statusEl.dataset.state = 'success';
			form.hidden = true;
		} catch {
			statusEl.textContent = messages.error;
			statusEl.dataset.state = 'error';
			submitButton.disabled = false;
		} finally {
			form.removeAttribute('aria-busy');
			submitLabel.textContent = originalLabel;
			submitSpinner?.classList.add('hidden');
		}
	});
}
