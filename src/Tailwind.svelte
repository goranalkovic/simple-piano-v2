<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:focus:not(:focus-visible) {
		outline: none;
	}

	*::-webkit-scrollbar {
		width: 2px;
		height: 2px;
	}

	*::-webkit-scrollbar-track {
		background: transparent;
	}

	*::-webkit-scrollbar-thumb {
		@apply bg-gray-400 dark:bg-gray-800;
		border-radius: 20px;
		border: none;
	}
</style>
