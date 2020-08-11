import React from 'react';

import whatsappsIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return(
    <article className="teacher-item">
      <header>
        <img src="https://avatars2.githubusercontent.com/u/55329726?s=460&u=93f1b11a2037a8c10515dc8a5295b68f2ba2692b&v=4" alt="Rafael Jesus"/>
        <div>
          <strong>Rafael Jesus</strong>
          <span>PowerApps</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <br/><br/>
        Cupiditate repellendus magni recusandae dicta quis dolorem eius similique sunt aliquid temporibus.
        Totam est placeat aspernatur eligendi facere dolorum doloremque pariatur error consequatur!
        Excepturi ad tenetur provident eaque explicabo dicta, facilis tempore.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$40,00</strong>
        </p>

        <button type="button">
          <img src={whatsappsIcon} alt="WhatsApp"/>
          Entrar em contato
        </button>

      </footer>

  </article>
  )
}

export default TeacherItem;
