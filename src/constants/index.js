import { github, linkedin, mail, resume } from '../utils';

export const navList = [
    { "name" : "github" , "link" : "https://github.com/ReubenGeoffrey" , "logo": github, } ,
    { "name" : "linkedIn" , "link" : "https://www.linkedin.com/in/reuben-geoffrey/" ,"logo": linkedin, },
    { "name" : "resume" , "link"  : "/assets/resume.pdf" , "logo": resume ,},
];

export const Email = { "mailId": "reubengeoffrey16@gmail.com" , "mailIcon" : mail};

export const introLinesByPersona = {
    default: "I'm Reuben Geoffrey, a Software Engineer, Data Analyst & Game Developer",
    hr: "I'm Reuben Geoffrey, a Versatile Developer with Expertise in SDE, Data Analysis & Game Development",
    creative: "I'm Reuben Geoffrey, Crafting Interactive Games and Data-Driven Solutions",
    interviewer: "I'm Reuben Geoffrey, Skilled in Full-Stack Development, Analytics & Game Programming",
    professional: "I'm Reuben Geoffrey, Building Scalable Software, Analyzing Data & Creating Immersive Games",
    client: "I'm Reuben Geoffrey, Your Partner for Software Development, Data Insights & Game Creation",
    secret: "Broo, I'm Reuben Geoffrey, coding games, crunching data, and building apps like a boss fr"
};

export const experience = [
    {"role": "Java Full Stack Intern", "company" : "Wipro","duration":"Nov 2024 - Feb 2025"},
    {"role": "Data Analyst (Top Rated)", "company" : "Fiverr","duration":"July 2022 - Present"}
]