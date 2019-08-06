const JOURNEY = {
    basics: ["HTML5", "CSS3", "JAVASCRIPT"],
    levelTwoChallenges: [23711, 23712, 23713],
    levelThreeBasicChallenges: {
        challengeId: '0',
        title:"sign up form",
        question: "build a form using HMTL, CSS and JAVASCRIPT",
        image: "none",
        difficultyLevel: "easy",
        zaions: 20,
        specializaion:"web"
    },
    specializaions: {
        frontend: ["REACT"],
        backend: ["NODEJS", "PHP"]
    },
    links: {
        frontend: "https://www.youtube.com/watch?v=IF_021eJ5SA",
        backend: "https://www.youtube.com/watch?v=eUfGBbPWw5o"
    },
};

const COURSE_ZAIONS = [
    {
        course: "HTML5",
        zaions: 2500,
    },
    {
        course: "CSS3",
        zaions: 2500,
    },
    {
        course: "JAVASCRIPT",
        zaions: 2500,
    },
    {
        course: "REACT",
        zaions: 2500,
    },
    {
        course: "NODEJS",
        zaions: 2500,
    },
    {
        course: "PHP",
        zaions: 2500,
    },
];

const COURSE = {
    name: String,
    videosWatched: [Number],
    competencyTestPassed: Boolean,
    startDate: Date,
    endDate: Date,
};