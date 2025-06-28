import { github, linkedin, mail, resume } from '../utils';

export const navList = [
    { "name" : "github" , "link" : "https://github.com/ReubenGeoffrey" , "logo": github, } ,
    { "name" : "linkedIn" , "link" : "https://www.linkedin.com/in/reuben-geoffrey/" ,"logo": linkedin, },
    { "name" : "resume" , "link"  : "/assets/resume.pdf" , "logo": resume ,},
];

export const Email = { "mailId": "reubengeoffrey16@gmail.com" , "mailIcon" : mail};

export const introLinesByPersona = {
    default: "I'm Reuben Geoffrey, a Software Engineer Crafting Digital Experiences",
    hr: "I'm Reuben Geoffrey, a Detail-Oriented Professional Ready to Add Value to Your Team",
    creative: "I'm Reuben Geoffrey, a Creative Developer Building Digital Magic",
    interviewer: "I'm Reuben Geoffrey, a Problem Solver Passionate About Clean Code",
    professional: "I'm Reuben Geoffrey, a Full-Stack Developer Focused on Scalable Solutions",
    client: "I'm Reuben Geoffrey, Your Trusted Partner Delivering Excellence in Development",
    secret: "Broo, I'm Reuben Geoffrey, lowkey vibin' with the tech game fr"
};

export const experience = [
    {"role": "Web Developer Intern", "company" : "Octanet Services Pvt Ltd  ","duration":"May 2024 - June 2024"},
    {"role": "Co Founder | Developer", "company" : " The Espadas SUK ","duration":"Aug 2022 - present"}
]