import React from 'react';

import whatsappsIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

export interface Teacher {
  id: number;
  user_id: number;
  name: string;
  avatar: string;
  bio: string;
  subject: string;
  cost: number;
  whatsapp: string;
}

interface teacherItemsProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<teacherItemsProps> = ({ teacher }) => {
  return(
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={ teacher.name }/>
        <div>
          <strong>{ teacher.name }</strong>
          <span>{ teacher.subject }</span>
        </div>
      </header>

      <p>{ teacher.bio }</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ { teacher.cost }</strong>
        </p>

        <a href={`https://wa.me/${teacher.whatsapp}`}>
          <img src={whatsappsIcon} alt="WhatsApp"/>
          Entrar em contato
        </a>

      </footer>

  </article>
  )
}

export default TeacherItem;
