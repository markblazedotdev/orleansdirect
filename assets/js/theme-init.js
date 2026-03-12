try {
  const savedTheme = localStorage.getItem("selected-theme");
  document.documentElement.classList.toggle(
    "dark-theme",
    savedTheme !== "light",
  );
} catch (error) {
  document.documentElement.classList.add("dark-theme");
}
