export const TRANSLATIONS = {
  shared: {
    add: 'Ajouter',
    logout: 'Se déconnecter',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    request_accept: 'Accepter',
    request_deny: 'Refuser',
    upcoming: 'Prochainement :',
    wage: 'Salaire',
    yourself: 'vous-même',
    menu_bar: {
      planning: 'Planning',
      vacation: 'Congés',
      payroll: 'Salaire',
      contracts: 'Contrats',
      account: 'Compte',
    },
    header: {
      vacation: 'Congés',
      payroll: 'Salaire',
      contracts: 'Mes Contrats',
      account: 'Mon Compte',
    },
    contextualButton: {
      askQuestion: 'Poser une question',
    },
    expiredSessionWarningMessage: 'Votre session a expiré. Veuillez vous reconnecter.',
    defaultServerErrorMessage: 'Une erreur inattendue est survenue. Notre équipe technique a été avertie pour traiter le problème dans les plus brefs délais. N\'hésitez pas à nous contacter pour obtenir de l\'aide.',
    defaultServerErrorReloadButton: 'Recharger l\'application',
  },
  sign_in: {
    email: 'Email',
    password: 'Mot de passe (mini 6 caractères)',
    login_button: 'Se connecter',
    sign_up: 'Choisissez votre mot de passe',
    lostPswLink: 'Mot de passe oublié ?',
    lostPswScreen: 'Entrez votre email, vous recevrez un lien pour créer un nouveau mot de passe',
    defaultErrorMessage: 'Erreur du serveur, veuillez réessayer.',
    requiredField: 'Ce champ est obligatoire',
    forgottenPasswordEmailSended: 'Nous vous avons envoyé les instructions pour changer votre mot de passe à l\'adresse {0}, veuillez vérifier dans votre boîte de réception ainsi que dans vos courriers indésirables',
  },
  createPassword: {
    yourEmail: 'Votre email :',
    explanation1: 'Choisissez votre mot de passe',
    explanation2: '',
    createPasswordButton: 'Changer le mot de passe',
    loginRedirection1: 'Si vous possédez un compte, vous pouvez',
    loginRedirection2: 'vous connecter',
    form: {
      fields: {
        password: 'Mot de passe (mini 6 caractères)',
        passwordConfirmation: 'Mot de passe (Confirmation)',
      },
      errors: {
        differentPasswords: 'Mots de passe différents',
      },
    },
  },
  planning: {
    title: 'Planning',
    navigation: {
      previous: 'Préc.',
      next: 'Suiv.',
      week: 'Semaine',
    },
    vignette: {
      status_1: 'Adaptation',
      status_2: 'Accueil supplémentaire',
      status_3: 'Maladie',
      status_4: 'Congé',
      status_5: 'Absence',
      status_6: 'Absence sans solde',
      status_7: 'Congé annuel',
      status_8: 'Hors Contrat',
      status_9: 'Pas d\'accueil prévu',
      loading: 'Chargement...',
      headerUnplanned: 'Accueil non prévu',
      headerAdaptation: 'Adaptation',
      headerHoliday: 'Jour Férié',
      childLeave: 'Congé enfant',
    },
    planningNotSet: 'Manque planning',
    thisWeek: 'Cette semaine',
    absence: 'Absence',
    contextualButton: {
      addAbsence: 'Me déclarer absente/malade',
      addPresence: 'Ajouter un accueil',
      defineWeekPlanning: 'Définir le planning de la semaine',
      editPlanning: 'Ajouter/Modifier le planning de {0}'
    },
    childSummary: {
      weekDuration: 'Durée semaine',
      extraHours: 'dont non prévues',
      overpaidHours: 'dont majorées (>45h)',
      specificHours: 'dont nuit',
      unpaidLeaves: 'Congé sans solde',
      breakfast: '🥐',
      lunch: '🥪',
      snack: '🍪',
      diner: '🍲',
      planningNotSet: 'Planning non défini',
      notSubscribed: 'Contenu réservé aux abonnés',
      noPresnece: 'Pas d\'accueil',
      childVacation: 'Semaine congé enfant',
      everythingIsOkey: 'Rien à signaler',
    },
    childrenFilter: {
      instruction: 'Filtrer :',
    },
  },
  planningEdit: {
    components: {
      workingHoursBar: {
        contractHours: 'Contrat : {0}',
        workingHoursToSet: '{0} à placer',
        overtime: 'Sup. {0}',
        noTimeToPlace: 'Le compte est bon !',
      },
      actionBar: {
        cancel: 'Annuler',
        confirm: 'Valider',
      },
      absenceCard: {
        label: 'Absence',
      },
    },
  },
  holidays: {
    header: {
      title: 'Congés',
    },
    noHolidays: 'Aucun congé',
    addHoliday: 'Pour ajouter des congés, appuyez sur le bouton + en bas',
    upcoming: [
      'Visualisez et modifiez vos semaines de congés',
      'Pour tout ajout ou modification concernant les congés merci de nous transmettre les dates via la messagerie.',
    ],
    contextualButton: {
      title: 'Poser des congés',
      addHoliday: 'Poser des congés',
    },
    from: 'Du ',
    to: 'Au ',
  },
  wages: {
    header: {
      title: 'Salaire',
    },
    noWage: 'Pas encore de salaire cette année',
    upcoming: [
      'Visualisez ici le détail de vos salaires et déclarations Pajemploi',
    ],
    pajemploi_button: 'Vos bulletins sont disponibles dans votre espace sur Pajemploi.fr',
  },
  wageDetail: {
    cards: {
      monthlyWage: {
        title: 'Rémunération du mois',
        previousBalance: 'Solde au 1er',
        amountPaid: 'Montant payé',
        amountCesu: 'Payé en CESU',
        currentBalance: 'A reporter sur',
        payoff: 'Indemnité de rupture',
        paidLeaveAllowance: 'Indemnité de congés payés',
      },
      attendanceDetails: {
        title: 'Accueil de {0} du {1} au {2}',
        salary: 'Salaire',
        baseSalary: 'Salaire de base',
        deductedHours: 'Retenue sur le salaire',
        extraHours: 'Heures complémentaires',
        occasionalAttendance: 'Accueil occasionnel',
        adaptationAttendance: 'Accueil adaptation',
        overpaidHours: 'Heures supplémentaires (>45h)',
        nightSurcharge: 'Majoration nuits',
        firstMaySurcharge: 'Majoration 1er mai',
        restDaySurcharge: 'Majoration fériés/repos',
        adjustement: 'Régularisation',
        compensation: 'Indemnités',
        maintenance: 'Entretien',
        meals: 'Repas',
        travel: 'Transport',
        remaining_annual_paidleaves: 'Solde annuel CP',
        annual_paidleaves: 'CP annuel',
        monthly_paidleaves: 'CP (1/12ème)',
        monthly_advance_payment: 'Acompte CP (10%)',
        adaptation_paidleaves: 'CP adaptation (10%)',
        occasional_paidleaves: 'Congés Payés (10%)',
      },
      pajemploi: {
        title: 'Déclaration Pajemploi',
        sendDate: 'Transmise le',
        normalHours: 'Heures normales',
        workingDays: 'Jours d\'activité',
        paidleave: 'Jours de congés payés',
        overpaidHours: 'Heures majorées',
        extraHours: 'Heures complémentaires',
        specificHours: 'Heures spécifiques',
        salary: 'Salaire net',
        maintenanceFee: 'Indemnité entretien',
        mealFee: 'Indemnité repas',
        travelFee: 'Indemnité trajet',
        payoff: 'Indemnité rupture',
      },
      leaves: {
        title: 'Droits à Congés Payés',
        advancePayment: 'Acompte versé',
        periodEntitlement: 'En cours d\'acquisition',
        anticipatedPaidLeaves: 'Prise anticipée',
        acquired: 'Acquis',
        period: 'Période',
        remaining: 'Reste',
      },
    },
    defaultErrorMessage: 'Erreur du serveur, veuillez réessayer.',
  },
  contracts: {
    header: {
      title: 'Mes contrats',
    },
    buttons: {
      contacts: 'Voir les contacts',
      detail: 'Voir le détail',
    },
    noContracts: 'Vous n\'avez aucun contrat',
    statuses: {
      finished: 'terminé',
      running: 'en cours',
      future: 'à venir'
    },
  },
  contractTimeline: {
    header: {
      backLabel: 'Détail contrat'
    },
    childcare: {
      care_types_titles: {
        adaptation: 'Adaptation',
        regular: 'Accueil Régulier',
        occasional: 'Accueil Occasionnel',
      },
    }
  },
  contractContacts: {
    header: {
      backLabel: 'Contacts'
    },
    parents: 'Parents',
    trusted_people: 'Personnes à contacter',
    trusted_people_kinds: {
      grand_parent: 'Grand-Parent',
      friend: 'Ami(e)',
    },
    nanny: 'Assistante Maternelle',
    doctor: 'Médecin traitant',
    children: 'Enfants',
    noChildren: 'Aucun enfant à charge',
  },
  contractContactDetail: {
    header: {
      backLabel: 'Contacts'
    },
  },
  childcareDetail: {
    planning: {
      title: 'Planning de l\'accueil',
      start_date: 'Date de début',
      end_date: 'Date de fin',
      care_type: 'Type d\'accueil',
      care_types: {
        adaptation: 'Adaptation',
        regular: 'Régulier',
        occasional: 'Occasionnel',
      },
      year: 'Mensualisation',
      full_year: 'Année Complète',
      partial_year: 'Année Incomplète',
      monthly_basis: 'Payé au réel',
      schedules: {
        week_type: 'Semaine type',
        occurrences_line1: 'semaines',
        occurrences_line2: 'par an',
        occurrences_short: 'sem./an',
      },
    },
    prices: {
      title: 'Tarifs',
      hourly_prices: 'Tarifs horaires',
      hourly_rate: 'Taux horaire (Net)',
      overtime_increase: 'Majoration heures supplémentaires',
      night_increase: 'Majoration heures de nuit',
      holiday_and_rest_day_increase: 'Majoration jours de repos et fériés',
      fees: 'Indemnités',
      maintenance_fee: 'Entretien',
      breakfast_fee: 'Petit déjeuner',
      lunch_fee: 'Déjeuner',
      snack_fee: 'Goûter',
      diner_fee: 'Dîner',
      travel_fee: 'Trajet (/km)',
    },
    paidleaves: {
      title: 'Paiement des congés',
      adaptation: '10% du salaire net',
      anticipated: {
        normal: 'A chaque prise, dès qu\'ils sont acquis. (Anticipation)',
        monthly: 'Acompte mensuel (10%) avec revalorisation en juin par rapport au maintien de salaire',
      },
      not_anticipated: {
        normal: 'A chaque prise, à l\'issue de la période d\'acquisition',
        monthly: 'Au 1/12e chaque mois, à l\'issue de la période d\'acquisition',
        yearly: 'En une seule fois au mois de juin',
      },
    }
  },
  commitment: {
    title: 'ENGAGEMENT RÉCIPROQUE',
    parents: 'PARENTS',
    nanny: 'NOUNOU',
    children: 'ENFANTS',
    fares: 'TARIFS',
    generate_pdf: 'GÉNÉRER LE PDF',
    go_back: 'Revenir à l\'engagement',
    parents_page: {
      first_name: 'Entrez votre prénom : ',
      last_name: 'Entrez votre nom',
      email: 'Entrez votre adresse mail',
      fn_placeholder: 'Entrez votre prénom',
      ln_placeholder: 'Entrez votre nom',
      email_placeholder: 'Entrez votre adresse mail',
    },
    nanny_page: {
      first_name: 'Entrez votre prénom : ',
      last_name: 'Entrez votre nom : ',
      email: 'Entrez votre adresse mail : ',
    },
    children_page: {
      first_name: 'Entrez le prénom de votre enfant : ',
      birthdate: 'Entrez sa date de naissance : ',
    },
    fares_page: {
      start_contract: 'Le contrat débutera le : ',
      hourly_rate: 'Le taux horaire sera de : ',
      hourly_maintenance_fee: 'Les frais d\'entretien seront-ils à l\'heure ?',
      daily_maintenance_fee: 'Les frais d\'entretien seront-ils à la journée ? ',
      maintenance_fee: 'Indiquez le montant des frais d\'entretien : ',
    },
  },
  schedulePage: {
    header: {
      title: 'Semaine Type {0}'
    },
    unplannedDay: 'Pas d\'accueil prévu',
  },
  contactDetail: {
    mobilePhone: 'Mobile',
    homePhone: 'Fixe',
    email: 'Email',
    address: 'Adresse',
    ssn: 'N° sécu.',
  },
  childDetail: {
    birthdate: 'Né(e) le',
  },
  vacation: {
    vignette: 'En congé du {0} au {1}',
  },
  clockIn: {
    addAttendance: 'Ajouter un accueil',
    lastEditionSignature: 'Modifié le {0} par {1}',
    notEditable: '⚠️ La déclaration Pajemploi n\'est plus modifiable, veuillez contacter le support PapaGère en cas de nécessité de corriger une présence.',
    presence_card: {
      titlePresence: 'PRÉSENCE',
      titleAbsence: 'ABSENCE toute la journée',
      titleAdaptation: 'Adaptation',
      titleUnplanned: 'Accueil non prévu',
      titleHoliday: 'Jour Férié',
      absence_info: 'Salaire maintenu ',
      sickness_info: 'Salaire déduit',
      overtime: 'Sup. {0}',
      justified_absence: 'La journée sera déduite du salaire.',
      unjustified_absence: 'Le salaire est maintenu, les indemnités ne sont pas dûes.',
      sick_with_justification: 'Malade avec justificatif ?',
      justification_legal_info: 'Le justificatif doit être présenté sous 48H.',
    },
    mealCard: {
      titleMeal: 'REPAS',
      subtitleMeal: 'fournis par',
      parents: 'Parents',
      nanny: 'AssMat',
    },
    travelCard: {
      titleTravel: 'TRAJETS',
      unit: 'km',
    },
    comment_card: {
      commentTitle: 'COMMENTAIRE {@related_user_name}',
      placeholder: 'Notez vos remarques',
      nanny: 'AssMat',
      parents: 'Parents',
    }
  },
  components: {
    time_range_picker: {
      from: 'De :',
      to: ' à :',
    }
  },
  navigation_bar: {
    planning: 'Planning',
    holidays: 'Congés',
    wage: 'Salaire',
    contracts: 'Contrats',
    account: 'Compte',
  },
  context_button: {
    support: "Obtenir de l'aide",
    change_timetable: 'Modifier le planning hebdo',
    nanny_absence: 'Déclarer mon absence',
  },
  absenceCreation: {
    declarationCard: {
      title: 'Déclaration',
      absenceType: 'Type d\'absence',
      absenceTypePlaceholder: 'Selectionnez le type d\'absence',
      absenceReason: 'Raison de l\'absence',
      absenceReasonPlaceholder: 'Selectionnez la raison',
      fullDay: 'Journée entière',
      beginDate: 'Date de début',
      beginHour: 'Heure de début',
      endDate: 'Date de fin',
      endHour: 'Heure de fin',
    },
    actionBar: {
      cancel: 'Annuler',
      confirm: 'Valider',
      delete: 'Supprimer',
    },
    modal: {
      deleteModalText: 'Cet évènement sera supprimé',
      exitModalText: 'Attention, modifications non prises en compte. Voulez-vous quitter ?',
      errorModalText: 'Merci de modifier votre déclaration ou l\'évènement déjà existant',
    },
    notEditable: 'Cet évènement n\'est plus modifiable.',
    careSelector: {
      title: 'Enfants concernés par l\'absence:',
      noCares: 'Aucun accueil prévu sur cette période'
    }
  },
  account: {
    title: 'Mon Compte',
    buttons: {
      mySubscription: 'Mon abonnement',
      profile: 'Mon profil',
      children: 'Mes enfants',
    },
  },
  mySubscription: {
    mySubscriptionCard: {
      title: 'Mon Abonnement',
      subscribed: '🎉 Vous êtes abonné à PapaGère',
      unsubscribed: 'Vous n\'êtes pas abonné à PapaGère',
      nonSubscribable: 'Tous les contrats sont abonnés à PapaGère',
      nonSubscribableParent: 'Votre assistante maternelle prend en charge votre abonnement à PapaGère',
      unsubscribedParent: [
        'L\'abonnement à PapaGère vous permet d\'accéder aux synthèses hebdomadaires et aux calculs du salaire chaque mois et de bénéficier de la déclaration automatique Pajemploi.',
      ],
      unsubscribedNanny: [
        'Proposez l\'abonnement aux parents-employeurs pour bénéficier de l\'accès aux salaires liés aux contracts',
        'Vous pouvez aussi vous abonner à leur place',
      ],
      nextPayment1: 'Vous serez prélevé de ',
      nextPayment2: ' le ',
      lastPayment: 'Dernier paiement : {0} le {1}',
      lastPaymentError: '⚠️ Erreur lors du dernier paiement',
      editMySubscription: 'Modifier mon abonnement',
      subscribeButton: 'Je m\'abonne',
    },
    agreementsCard: {
      title: 'Contrats',
      statuses: {
        notSubscribed: 'Pas d\'abonnement',
        hasSubscribed: 'Vous êtes abonné',
        parentSubscribed: 'Parent abonné',
        nannySubscribed: 'Assmat abonnée',
        trial: 'Gratuit ce mois',
      },
      features: {
        presence: 'Présence',
        salary: 'Salaire',
        pajemploi: 'Pajemploi',
      },
    },
  },
  subscriptionEdit: {
    confirm: 'Valider',
    cancelSubscription: 'Je souhaite résilier mon abonnement',
    myOptionsCard: {
      title: 'Ma formule',
      pricePerMonth: '{0} / mois',
      extraAgreementPrice: 'Contrat supplémentaire + {0}',
      descriptions: [
        'L\'abonnement à PapaGère vous permet d\'accéder aux synthèses hebdomadaires et aux calculs du salaire chaque mois et de bénéficier de la déclaration automatique Pajemploi.',
      ],
    },
    agreementsSelectionCard: {
      title: 'Sélectionnez votre contrat',
      totalPrice: 'Total',
      debitMonthly: 'Prélevé tous les mois',
      total: 'Total',
      paymentFrequency: 'Prélevé tous les mois',
    },
    paymentMethodCard: {
      title: 'Mon moyen de paiement',
      editCard: 'Modifier',
      virtualCard: {
        label: 'Carte Virtuelle',
        text: 'créez une carte dont le montant et la date de validité permettront de prélever l\'abonnement pendant toute la durée de votre contrat',
        example: 'Exemple: 96€ si vous envisagez une fin dans 10 mois',
      },
    },
    cancelSubscriptionModal: {
      text: 'Souhaitez-vous vraiment annuler votre abonnement ?',
    },
    successModal: {
      subscribeSuccess: [
        '🎉 Merci !',
        'Vous êtes maintenant abonné à PapaGère !',
      ],
      editSuccess: [
        '👌',
        'Vos modifications ont bien été prises en compte.',
      ],
    },
    exitModal: {
      text: 'Attention, modifications non prises en compte. Voulez-vous quitter ?',
    },
    errors: {
      canNotDeleteCard: 'Impossible de supprimer votre carte bancaire. Veuillez contacter le support PapaGère.',
    },
  },
  profile: {
    goBackButton: 'Mon compte',
  },
  children: {
    title: 'Mes enfants',
    noChildren: 'Aucun enfant à charge',
  },
  installModal: {
    text1: 'Installer l\'application sur votre téléphone: Cliquez sur',
    text2: 'et puis ajouter à l\'écran d\'accueil.',
  },
  networkGuard: {
    message1: 'Vous n\'êtes pas connecté à internet.',
    message2: 'Veuillez vérifier les réglages de votre appareil.',
    message3: 'L\'application s\'actualisera dès que vous serez de nouveau connecté.',
  }
};
