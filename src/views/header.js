export function header() {
  const header = document.createElement('header');
  header.className = 'header';
  header.innerHTML = `
               <div class="header__inner">
                   <div class="container">
                   <nav class="header__nav">
                      <img src="../public/images/logo.png" alt="App Logo" class="logo" />
                      <span class="title">Pikachu Quiz</span>
                   </nav>
                  </div>
               </div>
    `;
  return header;
}
