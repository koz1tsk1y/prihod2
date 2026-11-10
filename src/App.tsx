import { FormEvent, useEffect, useState } from "react";
import hero from "./assets/church/hero.jpg";
import exterior from "./assets/church/church-exterior.png";
import procession from "./assets/church/procession.png";
import service from "./assets/church/service.png";
import censer from "./assets/church/censer.png";
import child from "./assets/church/child.png";

const Icon = ({ name, size = 24 }: { name: string; size?: number }) => {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-1-2 2c-4-1.7-7.3-5-9-9l2-2-1-4Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
};

const events = [
  {
    date: "12 мая",
    title: "Крестный ход в день памяти святителя Николая",
    image: procession,
    tag: "Жизнь прихода",
  },
  {
    date: "05 мая",
    title: "Пасхальная Божественная литургия",
    image: service,
    tag: "Богослужение",
  },
  { date: "28 апреля", title: "Вербное воскресенье в нашем храме", image: child, tag: "Праздники" },
  {
    date: "18 апреля",
    title: "Таинство соборования Великим постом",
    image: censer,
    tag: "Богослужение",
  },
  {
    date: "07 апреля",
    title: "Благовещение Пресвятой Богородицы",
    image: exterior,
    tag: "Праздники",
  },
  {
    date: "31 марта",
    title: "Воскресная школа: путь к Пасхе",
    image: child,
    tag: "Воскресная школа",
  },
];

const schedules = [
  {
    weekday: "Понедельник",
    date: "19 мая",
    feast: "Прав. Иова Многострадального",
    times: [["08:30", "Утреня. Часы. Божественная литургия"]],
  },
  {
    weekday: "Вторник",
    date: "20 мая",
    feast: "Воспоминание явления на небе Креста Господня",
    times: [["08:30", "Молебен. Божественная литургия"]],
  },
  {
    weekday: "Среда",
    date: "21 мая",
    feast: "Апостола и евангелиста Иоанна Богослова",
    times: [
      ["08:30", "Часы. Божественная литургия"],
      ["17:00", "Акафист апостолу Иоанну Богослову"],
    ],
  },
  {
    weekday: "Четверг",
    date: "22 мая",
    feast: "Святителя Николая Чудотворца",
    times: [
      ["08:00", "Водосвятный молебен"],
      ["09:00", "Божественная литургия"],
    ],
  },
  {
    weekday: "Пятница",
    date: "23 мая",
    feast: "Апостола Симона Зилота",
    times: [["08:30", "Утреня. Часы. Божественная литургия"]],
  },
  {
    weekday: "Суббота",
    date: "24 мая",
    feast: "Прп. Симеона Нового Богослова",
    times: [
      ["09:00", "Божественная литургия"],
      ["17:00", "Всенощное бдение"],
    ],
  },
  {
    weekday: "Воскресенье",
    date: "25 мая",
    feast: "Неделя 6-я по Пасхе, о слепом",
    times: [
      ["08:00", "Ранняя Божественная литургия"],
      ["10:00", "Поздняя Божественная литургия"],
    ],
  },
];

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = events.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Поиск по сайту">
      <button className="search-close" onClick={onClose} aria-label="Закрыть поиск">
        <Icon name="close" size={30} />
      </button>
      <div className="search-box">
        <p className="eyebrow">Поиск по сайту</p>
        <div className="search-field">
          <Icon name="search" size={30} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Что вы хотите найти?"
          />
        </div>
        {query && (
          <div className="search-results">
            {results.length ? (
              results.map((item) => (
                <a key={item.title} href="#events" onClick={onClose}>
                  <span>{item.date}</span>
                  {item.title}
                  <Icon name="arrow" />
                </a>
              ))
            ) : (
              <p>По вашему запросу ничего не найдено.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const submitPrayer = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="site-shell">
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      <header className="header">
        <a className="brand" href="#top" aria-label="На главную">
          <span className="brand-cross">☦</span>
          <span>
            <strong>Храм Рождества Христова</strong>
            <small>Брест · Белорусская Православная Церковь</small>
          </span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Основная навигация">
          <a href="#schedule" onClick={() => setMenuOpen(false)}>
            Богослужения
          </a>
          <a href="#events" onClick={() => setMenuOpen(false)}>
            События
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            О храме
          </a>
          <a href="#contacts" onClick={() => setMenuOpen(false)}>
            Контакты
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setSearchOpen(true)}
            aria-label="Открыть поиск"
          >
            <Icon name="search" />
          </button>
          <button
            className="icon-button menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Открыть меню"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top" style={{ backgroundImage: `url(${hero})` }}>
          <div className="hero-copy">
            <p className="eyebrow">Добро пожаловать</p>
            <h1>Храм Рождества Христова</h1>
            <p className="hero-subtitle">Место молитвы, мира и встречи в городе Бресте</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#schedule">
                Расписание служб <Icon name="arrow" />
              </a>
              <a className="text-link" href="#about">
                Узнать о храме <Icon name="arrow" />
              </a>
            </div>
          </div>
          <div className="hero-note">
            <span>Сегодня храм открыт</span>
            <strong>с 08:00 до 19:00</strong>
          </div>
        </section>

        <section className="welcome-line">
          <p>«Приидите ко Мне все труждающиеся и обремененные, и Я успокою вас»</p>
          <span>Мф. 11:28</span>
        </section>

        <section className="section schedule-section" id="schedule">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Ближайшие службы</p>
              <h2>Расписание богослужений</h2>
            </div>
            <div className="schedule-range">
              <Icon name="calendar" />
              <span>
                Неделя
                <strong>19–25 мая</strong>
              </span>
            </div>
          </div>
          <div className="schedule-list">
            {schedules.map((item, index) => (
              <article
                className={`schedule-row ${index >= 5 ? "schedule-weekend" : ""}`}
                key={item.weekday}
              >
                <span className="schedule-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="schedule-date">
                  <strong>{item.weekday}</strong>
                  <span>{item.date}</span>
                </div>
                <h3>{item.feast}</h3>
                <div className="schedule-times">
                  {item.times.map(([time, name]) => (
                    <div key={`${item.weekday}-${time}`}>
                      <time>{time}</time>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="schedule-caption">
            <Icon name="clock" /> Исповедь совершается перед началом Божественной литургии
          </p>
        </section>

        <section className="calendar-section" id="calendar">
          <div
            className="calendar-image parallax-photo"
            style={{ backgroundImage: `url(${service})` }}
          >
            <span>24</span>
            <small>мая</small>
          </div>
          <div className="calendar-content">
            <p className="eyebrow">Православный календарь</p>
            <h2>Преподобного Симеона Нового Богослова</h2>
            <p className="calendar-lead">Седмица 5-я по Пасхе. Глас 4. Поста нет.</p>
            <div className="reading">
              <span className="ornament">✣</span>
              <p>«Свет Христов просвещает всех, и всякая душа, ищущая Его, обретает покой».</p>
            </div>
            <a href="#calendar" className="button button-outline">
              <Icon name="calendar" /> Календарь на сегодня
            </a>
          </div>
        </section>

        <section className="section" id="events">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Жизнь прихода</p>
              <h2>Последние события</h2>
            </div>
            <a className="text-link" href="#events">
              Все события <Icon name="arrow" />
            </a>
          </div>
          <div className="events-grid">
            {events.map((event, index) => (
              <article className={`event-card event-${index + 1}`} key={event.title}>
                <a href="#events" className="event-image">
                  <img src={event.image} alt="Жизнь прихода храма" />
                  <span>{event.tag}</span>
                </a>
                <div className="event-body">
                  <time>{event.date}</time>
                  <h3>
                    <a href="#events">{event.title}</a>
                  </h3>
                  <a href="#events" className="round-link" aria-label="Читать событие">
                    <Icon name="arrow" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-image-wrap">
            <img src={exterior} alt="Храм Рождества Христова в Бресте" />
            <div className="seal">
              с 2001 года
              <br />
              вместе
            </div>
          </div>
          <div className="about-copy">
            <p className="eyebrow">О нашем храме</p>
            <h2>Дом, где каждого ждут</h2>
            <p className="large-copy">
              Храм Рождества Христова — молодой приход с большой и тёплой общиной в Московском
              районе Бреста.
            </p>
            <p>
              Здесь совершаются богослужения и таинства, работает воскресная школа, проходят беседы
              со священником и встречи для всей семьи. Мы стараемся, чтобы всякий вошедший
              почувствовал тишину, заботу и радость общей молитвы.
            </p>
            <div className="about-stats">
              <div>
                <strong>24</strong>
                <span>года истории</span>
              </div>
              <div>
                <strong>7</strong>
                <span>дней в неделю открыты</span>
              </div>
            </div>
            <a className="button button-primary" href="#about">
              История храма <Icon name="arrow" />
            </a>
          </div>
        </section>

        <section className="section helpful-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Мы рядом</p>
              <h2>Полезная помощь</h2>
            </div>
          </div>
          <div className="help-grid">
            <a href="#contacts" className="help-card help-wine">
              <span>01</span>
              <h3>Помощь при алкогольной зависимости</h3>
              <p>Духовная поддержка, беседы и группы трезвости</p>
              <Icon name="arrow" />
            </a>
            <a href="#contacts" className="help-card help-sand">
              <span>02</span>
              <h3>Воскресная школа</h3>
              <p>Занятия для детей и беседы для родителей</p>
              <Icon name="arrow" />
            </a>
            <a href="#contacts" className="help-card help-green">
              <span>03</span>
              <h3>Беседа со священником</h3>
              <p>Задайте вопрос или договоритесь о личной встрече</p>
              <Icon name="arrow" />
            </a>
          </div>
        </section>

        <section className="contact-section" id="contacts">
          <div className="contact-intro">
            <p className="eyebrow">Будем рады встрече</p>
            <h2>Контакты</h2>
            <p>Приходите на богослужение или просто зайдите поставить свечу и побыть в тишине.</p>
            <div className="contact-list">
              <a href="https://maps.google.com" target="_blank" rel="noreferrer">
                <Icon name="pin" />
                <span>
                  <small>Адрес</small>г. Брест, ул. Вульковская, 108
                </span>
              </a>
              <a href="tel:+375162000000">
                <Icon name="phone" />
                <span>
                  <small>Телефон</small>+375 (162) 00-00-00
                </span>
              </a>
              <a href="mailto:hram@example.by">
                <Icon name="mail" />
                <span>
                  <small>Почта</small>hram@example.by
                </span>
              </a>
            </div>
          </div>
          <div className="map-card">
            <div className="map-lines"></div>
            <div className="map-marker">
              <span className="brand-cross">☦</span>
            </div>
            <div className="map-label">
              <strong>Храм Рождества Христова</strong>
              <span>
                Построить маршрут <Icon name="chevron" />
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="privacy">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-cross">☦</span>
            <h2>
              Храм Рождества
              <br />
              Христова
            </h2>
            <p>
              Белорусская Православная Церковь
              <br />
              Брестская епархия
            </p>
          </div>
          <div className="footer-nav">
            <h3>Навигация</h3>
            <a href="#schedule">Расписание</a>
            <a href="#events">Новости прихода</a>
            <a href="#about">О храме</a>
            <a href="#contacts">Контакты</a>
          </div>
          <form className="prayer-form" onSubmit={submitPrayer}>
            <h3>{sent ? "Записка принята" : "Подать записку"}</h3>
            <p>
              {sent
                ? "Благодарим. Имена будут переданы в храм."
                : "О здравии или об упокоении — имена будут переданы в алтарь."}
            </p>
            {!sent && (
              <div>
                <input required aria-label="Имена для поминовения" placeholder="Введите имена" />
                <button aria-label="Отправить">
                  <Icon name="arrow" />
                </button>
              </div>
            )}
          </form>
          <div className="donation">
            <div className="qr" aria-label="QR-код для пожертвования">
              {Array.from({ length: 49 }).map((_, i) => (
                <i key={i} className={(i * 7 + i * i) % 5 < 2 ? "dark" : ""} />
              ))}
            </div>
            <div>
              <h3>Поддержать храм</h3>
              <p>Наведите камеру телефона на QR-код, чтобы сделать пожертвование</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Храм Рождества Христова</span>
          <a href="#privacy">Политика конфиденциальности</a>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
    </div>
  );
}
