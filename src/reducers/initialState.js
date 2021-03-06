let newDate = new Date();
newDate.setDate(newDate.getDate() - 1);

export default {
  loading: false,
  error: '',
  login: {
    login: false,
    name: '',
    email: '',
    password: ''
  },
  user: {
    _id: '',
    name: '',
    email: '',
    started: new Date(),
    last: newDate,
    longestStreak: 0,
    streak: 0,
    score: 0,
    created: [],
    answered: [],
    favorites: [],
    saved: [],
    daily: []
  },
  editUser: {
    name: '',
    email: ''
  },
  answerState: 'none', // 'changed', 'saved', ''
  answer: {
    _id: '',
    user_id: '',
    user_name: '',
    prompt_id: '',
    prompt_title: '',
    answered: new Date(),
    modified: new Date(),
    text: '',
    type: 'paragraph',
    categories: []
  },
  category: '',
  list: '',
  listTitle: '',
  search: '',
  newPrompt: {
    title: '',
    type: 'paragraph',
    categories: []
  },
  todayPrompt: '',
  prompts: [],
  myPrompts: [],
  answers: [],
  seen: {
    today: new Date(),
    prompts: []
  },
  categories: ['Self', 'Life', 'Today', 'Gratitude', 'Growth', 'Work'],
  offline: {
    beenOffline: false,
    answered: [],
    created: [],
    streak: null,
    longestStreak: null,
    score: null,
    last: null,
    deleted: [],
    saved: [],
    removeSaved: [],
    favorites: [],
    removeFavorites: [],
    daily: [],
    removeDaily: []
  },
  sharedAnswers: []
};
