import styles from './privacyPage.module.scss';

export const PrivacyPage = () => (
  <div className={styles.content}>
    <h1>Политика конфиденциальности персональных данных</h1>

    <p>
      Данная Политика конфиденциальности применяется ко всей информации, которую
      сайт AniHub, размещенный по доменному имени anihub.icu (а также его
      субдоменам), может собирать о Пользователе при использовании сайта
      anihub.icu (и его субдоменов), его программ и продуктов.
    </p>

    <hr className={styles.content__line} />

    <h2>1. Определение терминов</h2>

    <p>
      1.1 В данной Политике конфиденциальности используются следующие термины:
    </p>

    <p>
      1.1.1. Администрация сайта (далее – Администрация) – уполномоченные лица,
      ответственные за управление сайтом AniHub, организацию и (или) обработку
      персональных данных, а также определение целей обработки, состава
      обрабатываемых персональных данных и действий (операций), совершаемых с
      персональными данными.
    </p>

    <p>
      1.1.2. Персональные данные - любая информация, относящаяся к прямо или
      косвенно определенному физическому лицу (субъекту персональных данных).
    </p>

    <p>
      1.1.3. Обработка персональных данных - любые действия (операции) или
      совокупность действий (операций), совершаемых с использованием средств
      автоматизации или без использования таковых, с персональными данными,
      включая их сбор, запись, систематизацию, накопление, хранение, уточнение
      (обновление, изменение), извлечение, использование, передачу
      (распространение, предоставление, доступ), обезличивание, блокирование,
      удаление, уничтожение.
    </p>

    <p>
      1.1.4. Конфиденциальность персональных данных - требование соблюдения
      Оператором или иного лица, получившего доступ к персональным данным,
      обязательства не распространять эти данные без согласия субъекта
      персональных данных или иного законного основания.
    </p>

    <p>
      1.1.5. Сайт AniHub - это совокупность взаимосвязанных веб-страниц,
      размещенных в сети Интернет по уникальному адресу (URL): anihub.icu, а
      также его субдомены.
    </p>

    <p>
      1.1.6. Субдомены - это страницы или группы страниц, размещенные на доменах
      третьего уровня, принадлежащих сайту AniHub, а также другие временные
      страницы, на которых указана контактная информация Администрации.
    </p>

    <p>
      1.1.7. Пользователь сайта AniHub (далее Пользователь) – лицо, имеющее
      доступ к сайту AniHub через сеть Интернет и использующее информацию,
      материалы и продукты сайта AniHub.
    </p>

    <p>
      1.1.8. Cookies — небольшие фрагменты данных, отправляемые веб-сервером и
      хранящиеся на компьютере пользователя, которые веб-клиент или веб-браузер
      передает веб-серверу в каждом HTTP-запросе при попытке открыть страницу
      соответствующего сайта.
    </p>

    <p>
      1.1.9. IP-адрес — уникальный сетевой адрес узла в компьютерной сети, через
      который Пользователь получает доступ к AniHub.
    </p>

    <hr className={styles.content__line} />

    <h2>2. Общие положения</h2>

    <p>
      2.1. Использование Пользователем сайта AniHub подразумевает полное
      согласие с настоящей Политикой конфиденциальности и условиями обработки
      персональных данных.
    </p>

    <p>
      2.2. В случае несогласия с условиями Политики конфиденциальности
      Пользователь обязан прекратить использование сайта AniHub.
    </p>

    <p>
      2.3. Данная Политика конфиденциальности распространяется только на сайт
      AniHub. Администрация не контролирует и не несет ответственности за сайты
      третьих лиц, на которые Пользователь может перейти по ссылкам, доступным
      на сайте AniHub.
    </p>

    <p>
      2.4. Администрация не осуществляет проверку на достоверность
      предоставляемых Пользователем персональных данных.
    </p>

    <hr className={styles.content__line} />

    <h2>3. Предмет политики конфиденциальности</h2>

    <p>
      3.1. Настоящая Политика конфиденциальности определяет обязательства
      Администрации по сохранению конфиденциальности и обеспечению защиты
      персональных данных, предоставляемых Пользователем по запросу
      Администрации при регистрации на сайте AniHub или при подписке на
      информационную рассылку по электронной почте.
    </p>

    <p>
      3.2. Персональные данные, разрешенные к обработке в рамках настоящей
      Политики конфиденциальности, предоставляются Пользователем при заполнении
      форм на сайте AniHub и могут включать следующую информацию:
    </p>

    <ul className={styles.content__list}>
      <li>3.2.1. Фамилия, имя, отчество Пользователя;</li>
      <li>3.2.2. Адрес электронной почты (e-mail);</li>
      <li>3.2.3. Место жительства Пользователя (при необходимости);</li>
      <li>3.2.4. Фотография (при необходимости);</li>
      <li>3.2.5. Пол (при необходимости).</li>
    </ul>

    <p>
      3.3. AniHub также защищает автоматически передаваемые данные при
      посещении страниц сайта, включая:
    </p>

    <ul className={styles.content__list}>
      <li>IP-адрес</li>
      <li>Информацию из cookies</li>
      <li>Информацию о браузере</li>
      <li>Время доступа</li>
      <li>Реферер (адрес предыдущей страницы)</li>
    </ul>

    <p>
      3.3.1. Отключение cookies может привести к невозможности доступа к
      определенным частям сайта, требующим авторизации.
    </p>

    <p>
      3.3.2. AniHub собирает статистику об IP-адресах посетителей для
      предотвращения, выявления и устранения технических проблем.
    </p>

    <p>
      3.4. Любая другая персональная информация, не указанная выше (например,
      история посещений, используемые браузеры, операционные системы и т.д.),
      подлежит надежному хранению и не распространяется, за исключением случаев,
      предусмотренных пунктом 5.2. настоящей Политики конфиденциальности.
    </p>

    <hr className={styles.content__line} />

    <h2>4. Цели сбора персональной информации пользователя</h2>

    <p>
      4.1. Администрация использует персональные данные Пользователя с
      следующими целями:
    </p>

    <p>
      4.1.1. Идентификация зарегистрированного Пользователя на сайте AniHub для
      последующей авторизации.
    </p>

    <p>
      4.1.2. Предоставление Пользователю доступа к персонализированным данным на
      сайте AniHub.
    </p>

    <p>
      4.1.3. Установление обратной связи с Пользователем, включая направление
      уведомлений, ответов на запросы, связанные с использованием сайта AniHub,
      и обработку запросов и заявок Пользователя.
    </p>

    <p>
      4.1.4. Определение местоположения Пользователя для обеспечения
      безопасности и предотвращения мошенничества.
    </p>

    <p>
      4.1.5. Подтверждение достоверности и полноты предоставленных Пользователем
      персональных данных.
    </p>

    <p>
      4.1.6. Создание учетной записи для использования различных частей сайта
      AniHub, при условии согласия Пользователя на создание учетной записи.
    </p>

    <p>4.1.7. Уведомление Пользователя по электронной почте.</p>

    <p>
      4.1.8. Предоставление эффективной технической поддержки Пользователю при
      возникновении проблем с использованием сайта AniHub.
    </p>

    <p>
      4.1.9. Предоставление Пользователю с его согласия специальных предложений,
      новостных рассылок и другой информации от имени сайта AniHub.
    </p>

    <hr className={styles.content__line} />

    <h2>5. Способы и сроки обработки персональной информации</h2>

    <p>
      5.1. Обработка персональных данных Пользователя осуществляется без
      ограничения срока, любым законным способом, в том числе в информационных
      системах персональных данных с использованием средств автоматизации или
      без использования таких средств.
    </p>

    <p>
      5.2. Персональные данные Пользователя могут быть переданы уполномоченным
      органам государственной власти только по основаниям и
      в порядке, установленным законодательством.
    </p>

    <p>
      5.3. При утрате или разглашении персональных данных Администрация вправе
      не информировать Пользователя об утрате или разглашении персональных
      данных.
    </p>

    <p>
      5.4. Администрация принимает необходимые организационные и технические
      меры для защиты персональной информации Пользователя от неправомерного или
      случайного доступа, уничтожения, изменения, блокирования, копирования,
      распространения, а также от иных неправомерных действий третьих лиц.
    </p>

    <p>
      5.5. Администрация совместно с Пользователем принимает все необходимые
      меры по предотвращению убытков или иных отрицательных последствий,
      вызванных утратой или разглашением персональных данных Пользователя.
    </p>

    <hr className={styles.content__line} />
    <h2>6. Права и обязанности сторон</h2>

    <p>6.1. Пользователь вправе:</p>

    <p>
      6.1.1. Принимать свободное решение о предоставлении своих персональных
      данных, необходимых для использования сайта AniHub, и давать согласие на
      их обработку.
    </p>

    <p>
      6.1.2. Обновлять и дополнять предоставленную информацию о персональных
      данных в случае изменения этой информации.
    </p>

    <p>
      6.1.3. Требовать от Администрации предоставления информации об обработке
      своих персональных данных.
    </p>

    <p>
      6.1.4. Требовать от Администрации уточнения своих персональных данных, их
      блокирования или уничтожения в случае, если они являются неполными,
      устаревшими, неточными, незаконно полученными или не являются необходимыми
      для заявленной цели обработки.
    </p>

    <p>6.2. Администрация обязана:</p>

    <p>
      6.2.1. Использовать полученную информацию исключительно для целей,
      указанных в пункте 4 настоящей Политики конфиденциальности.
    </p>

    <p>
      6.2.2. Обеспечивать хранение конфиденциальной информации в тайне, не
      разглашать ее без предварительного письменного разрешения Пользователя.
    </p>

    <p>
      6.2.3. Принимать меры предосторожности для защиты конфиденциальности
      персональных данных Пользователя в соответствии с установленным порядком.
    </p>

    <p>
      6.2.4. Осуществлять блокирование персональных данных Пользователя с
      момента обращения или запроса Пользователя, или его законного
      представителя либо уполномоченного органа по защите прав субъектов
      персональных данных на период проверки в случае выявления недостоверных
      данных или неправомерных действий.
    </p>
    <hr className={styles.content__line} />
    <h2>7. Ответственность сторон</h2>

    <p>
      7.1. Администрация, не исполнившая свои обязательства, несет
      ответственность за убытки, понесенные Пользователем в связи с
      неправомерным использованием персональных данных в соответствии с
      законодательством, за исключением случаев,
      предусмотренных пунктами 5.2. и 7.2. настоящей Политики
      Конфиденциальности.
    </p>

    <p>
      7.2. В случае утраты или разглашения Конфиденциальной информации,
      Администрация не несет ответственности, если данная конфиденциальная
      информация:
    </p>

    <p>
      7.2.1. Стала публичным достоянием до ее утраты или разглашения. 7.2.2.
      Была получена от третьей стороны до момента ее получения Администрацией
      Ресурса. 7.2.3. Была разглашена с согласия Пользователя.
    </p>

    <p>
      7.3. Пользователь несет полную ответственность за соблюдение требований
      законодательства, включая законы о рекламе, защите
      авторских и смежных прав, охране товарных знаков и знаков обслуживания, а
      также за содержание и форму материалов.
    </p>

    <p>
      7.4. Пользователь признает, что ответственность за любую информацию, к
      которой он может иметь доступ как часть сайта AniHub, несет лицо,
      предоставившее такую информацию.
    </p>

    <p>
      7.5. Пользователь соглашается, что информация, предоставленная ему как
      часть сайта AniHub, может являться объектом интеллектуальной
      собственности, права на который защищены и принадлежат другим
      Пользователям, партнерам или рекламодателям. Пользователь не вправе
      вносить изменения, передавать в аренду, передавать на условиях займа,
      продавать, распространять или создавать производные работы на основе
      такого Содержания (полностью или в части), за исключением случаев, когда
      такие действия были письменно прямо разрешены собственниками такого
      Содержания в соответствии с условиями отдельного соглашения.
    </p>

    <p>
      7.6. В отношении текстовых материалов (статей, публикаций, находящихся в
      свободном публичном доступе на сайте AniHub) допускается их
      распространение при условии, что будет дана ссылка на AniHub.
    </p>

    <p>
      7.7. Администрация не несет ответственности перед Пользователем за любой
      убыток или ущерб, понесенный Пользователем в результате удаления, сбоя или
      невозможности сохранения какого-либо Содержания и иных коммуникационных
      данных, содержащихся на сайте AniHub или передаваемых через него.
    </p>

    <p>
      7.8. Администрация не несет ответственности за любые прямые или косвенные
      убытки, произошедшие из-за: использования или невозможности использования
      сайта, несанкционированного доступа к коммуникациям Пользователя,
      заявлений или поведения третьих лиц на сайте.
    </p>

    <p>
      7.9. Администрация не несет ответственности за любую информацию,
      размещенную Пользователем на сайте AniHub, включая, но не ограничиваясь,
      информацией, защищенной авторским правом, без прямого согласия владельца
      авторского права.
    </p>
    <hr className={styles.content__line} />
    <h2>8. Разрешение споров</h2>

    <p>
      8.1. До обращения в суд с иском по спорам, возникающим из отношений между
      Пользователем и Администрацией, обязательным является предъявление
      претензии (письменного предложения или предложения в электронном виде о
      добровольном урегулировании спора).
    </p>

    <p>
      8.2. Получатель претензии в течение 30 календарных дней со дня получения
      претензии, письменно или в электронном виде уведомляет заявителя претензии
      о результатах рассмотрения претензии.
    </p>

    <p>
      8.3. К настоящей Политике конфиденциальности и отношениям между
      Пользователем и Администрацией применяется действующее законодательство.
    </p>
    <hr className={styles.content__line} />
    <h2>9. Дополнительные условия</h2>

    <p>
      9.1. Администрация вправе вносить изменения в настоящую Политику
      конфиденциальности без согласия Пользователя.
    </p>

    <p>
      9.2. Новая Политика конфиденциальности вступает в силу с момента ее
      размещения на сайте AniHub, если иное не предусмотрено новой редакцией
      Политики конфиденциальности.
    </p>

    <p>
      9.3. Все предложения или вопросы касательно настоящей Политики
      конфиденциальности следует сообщать по адресу: support@anihub.icu
    </p>

    <p>
      9.4. Действующая Политика конфиденциальности размещена на странице по
      адресу https://anihub.icu/privacy
    </p>
  </div>
);
