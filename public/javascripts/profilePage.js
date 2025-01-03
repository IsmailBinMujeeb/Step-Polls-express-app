const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    
    tabButtons.forEach((button) => button.classList.remove('active'));
    tabPanes.forEach((pane) => pane.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});
