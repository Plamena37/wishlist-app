export const bg = {
  common: {
    cancel: 'Отказ',
    close: 'Затвори',
    save: 'Запази',
    saveChanges: 'Запази промените',
    goBack: 'Назад',
    edit: 'Редактирай',
    delete: 'Изтрий',
    required: 'Задължително',
    clickHere: 'Кликни тук',
  },
  loading: {
    loadingRequest: 'Моля, изчакай, докато обработваме заявката ти.',
    loadingCardTitle: 'Зареждане на Wishlist...',
    loadingCardSubtitle:
      'Моля, изчакай, докато зареждаме детайлите на Wishlist.',
    loadingCardsTitle: 'Зареждане на твоите Wishlists...',
    loadingCardsSubtitle: 'Моля, изчакай, докато зареждаме твоите Wishlists.',
  },
  navigation: {
    home: 'Начало',
    myCards: 'Моите карти',
    faq: 'Въпроси',
    signIn: 'Вход',
    signUp: 'Регистрация',
    signOut: 'Изход',
  },
  footer: {
    contactUs: 'Свържи се с мен',
    allRightsReserved: 'Всички права запазени',
    buildBy: 'Създадено от Пламена 💜 |',
  },
  auth: {
    signInToContinue: 'Влез, за да продължиш ✨',
    signUpToContinue: 'Регистрирай се, за да продължиш ✨',
    holdUpSignInFirst: 'Чакай малко! Първо влез 😉',
    continueWithGoogle: 'Продължи с Google',
    continueWithFacebook: 'Продължи с Facebook',
    dontHaveAccount: 'Нямаш профил? Регистрирай се',
    haveAccount: 'Вече имаш профил? Влез',
    signUpHere: 'Регистрирай се тук',
    signInHere: 'Влез оттук',
    signIn: 'Вход',
    signUp: 'Регистрация',
    loggingIn: 'Влизане',
    signingIn: 'Влизане...',
    signingUp: 'Регистрация...',
    or: 'ИЛИ',
    form: {
      emailLabel: 'Имейл',
      emailPlaceholder: 'Въведи имейла си',
      passwordLabel: 'Парола',
      passwordPlaceholder: 'Въведи паролата си',
      displayNameLabel: 'Псевдоним',
      displayNamePlaceholder: 'Въведи прякор',
      passwordLabelConfirm: 'Потвърди паролата',
      passwordPlaceholderConfirm: 'Въведи паролата отново',
    },
  },
  aiAssistant: {
    title: 'Асистент',
    placeholder: 'Задай ми въпрос...',
  },
  noCardsFound: {
    title: 'Все още няма карти',
    description: 'Няма създадени карти. Хайде, добави първата си!',
  },
  wishlistActions: {
    createWishlist: 'Създай Wishlist',
    editWishlist: 'Редактирай Wishlist',
    deleteWishlist: 'Изтрий Wishlist',
    editWishes: 'Редактирай Подаръци',
    copyLink: 'Копирай линка',
    viewDetails: 'Виж повече',
  },
  editWishlist: {
    titleLabel: 'Заглавие',
    titlePlaceholder: 'Въведи заглавие на Wishlist',
    descriptionLabel: 'Описание',
    descriptionPlaceholder: 'Въведи описание на Wishlist',
    timeLabel: 'Време',
    dateLabel: 'Дата',
    locationLabel: 'Място',
    locationPlaceholder: 'Въведи място',
  },
  editWishes: {
    title: 'Редактирай Подаръци 🎁',
    addWish: 'Добави подарък',
    addWishes: 'Добави подаръци',
    nameLabel: 'Подарък',
    namePlaceholder: 'Въведи подарък',
    linkLabel: 'Линк',
    linkPlaceholder: 'Въведи линк',
    priceLabel: 'Цена',
    pricePlaceholder: 'Въведи цена',
    deleteWish: 'Изтрии подарък',
    deleteConf: 'Сигурен ли си, че искаш да изтриеш ',
  },
  successMessages: {
    generalSuccessTitle: 'Успех!',
    wishAdded: 'Подаръкът е добавен.',
    wishUpdated: 'Подаръкът е обновен.',
    wishDeleted: 'Подаръкът е изтрит.',
    wishlistAdded: 'Wishlist-ът е създаден.',
    wishlistUpdated: 'Wishlist-ът е обновен.',
    wishlistDeleted: 'Wishlist-ът е изтрит.',
    wishlistLinkCopied: 'Линкът е копиран!',
  },
  errorMessages: {
    generalErrorTitle: 'Нещо се обърка.',
    wishAddedFailed: 'Неуспешно добавяне на подарък.',
    wishUpdatedFailed: 'Неуспешно обновяване на подаръка.',
    wishDeletedFailed: 'Неуспешно изтриване на подаръка.',
    wishAlreadyReserved: 'Този подарък вече е запазен от друг.',
    wishlistNotFound: 'Wishlist-ът не е намерен.',
    wishlistAddedFailed: 'Неуспешно създаване на Wishlist.',
    wishlistUpdatedFailed: 'Неуспешно обновяване на Wishlist.',
    wishlistDeletedFailed: 'Неуспешно изтриване на Wishlist.',
  },
  formValidation: {
    auth: {
      invalidEmail: 'Невалиден имейл',
      passwordMin: 'Поне 8 символа',
      passwordLetter: 'Трябва да съдържа буква',
      passwordNumber: 'Трябва да съдържа цифра',
      passwordSymbol: 'Трябва да съдържа символ',
      displayNameMin: 'Името трябва да е поне 2 символа',
      displayNameMax: 'Името е твърде дълго',
      confirmPasswordRequired: 'Моля, потвърдете паролата',
      passwordsDoNotMatch: 'Паролите не съвпадат',
    },
    card: {
      cardNameMin: 'Името е твърде кратко',
      dateRequired: 'Датата е задължителна',
      invalidDate: 'Невалидна дата',
    },
    cardItem: {
      nameMin: 'Името е твърде кратко',
      invalidUrl: 'Невалиден линк',
      invalidPrice: 'Цената не е валидна',
    },
  },
  homePage: {
    hero: {
      title:
        '<highlight>Спри</highlight> с обясненията за това какво искаш — просто сподели своя <highlight>Whishlist</highlight>',
      subTitle:
        'Създай whishlist за рожден ден, сватба или всеки друг повод — добави какво искаш, както и цени и линкове и го сподели с приятели.',
      description: 'Лесно като детска 🎮',
      cta: 'Създай свой Whishlist',
    },
    tired: {
      title: '🙄 Омръзна ли ти от въпроси „Какво искаш за рождения си ден?“',
      chat1: '“Какво искаш за рождения си ден???”',
      chat2: '“Ето ти линк с моя Wishlist 😎”',
      description:
        'Всяка година е едно и също — съобщения, обаждания, въпроси. Създай си Wishlist веднъж, прати линка и никога повече не обяснявай. Край на чорапите.',
    },
    threeSteps: {
      title: '✨ Три лесни стъпки към спокойствие и подаръци',
      description:
        'Създай картичка за рождения си ден или за друг повод — добави желанията си, цени и линкове, и я сподели с приятели',
      step1:
        '<highlight>Стъпка 1:</highlight> Създай своята картичка — от страницата „Моите карти“.',
      step2:
        '<highlight>Стъпка 2:</highlight> Добави желанията си — докато създаваш или редактираш картичката',
      step3: '<highlight>Стъпка 3:</highlight> Сподели линка',
      cta: 'Създай своя Wishlist',
      learnMore: 'Научи повече',
    },
    overview: {
      title: '🎁 Wishlist, направени лесно',
      card1Title: 'Един Wishlist за всеки повод',
      card1Description:
        'Събери всички идеи за подаръци на едно място — за всеки момент.',
      card2Title: 'Край на неудобните въпроси',
      card2Description:
        'Всички знаят какво да ти подарят. Без излишни въпроси.',
      card3Title: 'Твоят Wishlist асистент',
      card3Description: 'Получавай идеи за подаръци и помощ с нашия AI.',
      description:
        'По-малко чудене, по-малко повторения, по-приятни изненади 🎉',
    },
  },
  faqPage: {
    title: 'Имаш въпроси?',
    subtitle: 'Имаме отговори (е, поне в повечето случаи!)',
    description:
      'По-долу ще откриеш отговори на най-често задаваните въпроси за Whishlist.',
    faq1: {
      title: 'За какво е това приложение?',
      description1:
        'Това приложение ти позволява да създадеш <highlight>Whishlist</highlight>, да добавиш желанията си и да споделиш линк с приятели, за да ти подарят точно това, което искаш — без излишни драми!',
      description2:
        'Можеш да запазваш подаръци, да ги сортираш, да си чатиш с нашия AI асистент за още идеи и още много. 🎁',
    },
    faq2: {
      title: 'Как да създам Whishlist?',
      description1: 'Първо се увери, че си влязъл в профила си 🔐.',
      description2:
        'От началната страница: кликни <highlight>“Създай своя Whishlist”</highlight> или отиди в страницата „Моите карти“ → кликни <highlight>“Създай Whishlist”</highlight> (горе вдясно). Попълни повода, добави описание и започни да добавяш подаръци ✨',
    },
    faq3: {
      title: 'Как да добавя подаръци към Whishlist си?',
      description1:
        'Можеш да добавяш подаръци по всяко време: докато създаваш Whishlist си ✨',
      description2:
        'Или по-късно: отвори Whishlist → кликни трите точки → избери <highlight>Редактирай подаръците</highlight>',
    },
    faq4: {
      title: 'Как да редактирам Whishlist или подарък?',
      description:
        'Лесно! 👍 Използвай <highlight>Редактирай подаръците</highlight>, за да промениш подаръците си или <highlight>Редактирай Wishlist</highlight>, за да смениш заглавието или описанието',
    },
    faq5: {
      title: 'Мога ли да изтрия Whishlist или подарък?',
      description:
        'Да! Просто отвори Whishlist → кликни трите точки → избери <highlight>Изтрий Wishlist</highlight>',
    },
    faq6: {
      title: 'Нямам идея какви подаръци да добавя',
      description1: 'Спокойно! 😄',
      description2:
        ' Отвори нашия <highlight>AI Whishlist чатбот</highlight>, (долу вдясно), разкажи какво харесваш или какви са хобитата ти и той ще ти предложи идеи за подаръци, специално за теб.',
    },
    faq7: {
      title: 'Как да споделя Whishlist с приятели?',
      description:
        'Супер лесно 😊 Отвори Whishlist → кликни трите точки → избери <highlight>Копирай линка</highlight> → изпрати го на когото пожелаеш!',
    },
    faq8: {
      title: 'Как да резервирам подарък?',
      description1: 'Първо се увери, че си влязъл в профила си 🔐',
      description2:
        'Потърси подаръци, отбелязани като <highlight>“Свободен 💝”</highlight> и кликни, за да го резервираш',
      description3:
        'Ако пише <highlight>“Запазен 🙄”</highlight>, значи някой друг вече го е взел',
      description4:
        'Подаръците, които ти си запазил, ще се показват като <highlight>“Запазен от теб 💪”</highlight>',
    },
    faq9: {
      title: 'Могат ли двама души да резервират един и същи подарък?',
      description1: '<highlight>Не! ❌</highlight>',
      description2:
        'Резервациите се обновяват в реално време, така че щом някой запази подарък, той веднага се отбелязва и никой друг не може да го вземе.',
    },
    faq10: {
      title: 'Защо е нужно да вляза в профила си?',
      description1:
        'Входът основно помага за сигурното запазване на подаръци. 🎁',
      description2:
        'Без да си влязъл, приложението не може да разпознае дали си един и същи потребител в различни браузъри, което може да доведе до объркване.',
      description3:
        '<highlight>Не се притеснявай — не събираме лични данни.</highlight> Просто искаме всичко да работи гладко! ✅',
    },
  },
  cardPage: {
    wishes: 'Подаръци',
    link: 'Линк',
    price: 'Цена',
    noLink: 'Няма предоставен линк',
    noPrice: 'Очевидно безценен 🤔',
    free: 'Свободен 💝',
    reserved: 'Запазен 🙄',
    reservedByYou: 'Запазен от теб 💪',
    sortWishes: 'Сортирай',
    sortTitle: 'Име',
    sortPrice: 'Цена',
    sortFree: 'Свободни',
    sortReserved: 'Запазени',
    noItems: 'Все още няма добавени подаръци към този Whishlist.',
  },
  errorPage: {
    title: 'Страницата не е намерена',
    subtitle: 'Към началната страница',
  },
}
