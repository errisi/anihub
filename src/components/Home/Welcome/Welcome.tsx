import styles from './Welcome.module.scss';

export const Welcome = () => (
  <div className={styles.welcome}>
    <hr
      className={styles.welcome__line}
    />
    <h2 className={styles.welcome__title}>
      Добро пожаловать на AniHub
      <br />
      Приятного просмотра!
    </h2>
    <hr
      className={styles.welcome__line}
    />
  </div>
);
