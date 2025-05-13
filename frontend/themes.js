
    const theme = localStorage.getItem('selectedTheme');
    if (theme) {
      document.getElementById('main-body').classList.add(theme);
    }
 