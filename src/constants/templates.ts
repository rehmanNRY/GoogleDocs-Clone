export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/logo.svg",
    initialContent: "<div><h1>Untitled Document</h1><p></p></div>"
  },
  {
    id: "resume",
    label: "Resume Template",
    imageUrl: "/logo.svg",
    initialContent: `<div>
      <h1 style="text-align: center;">Your Name</h1>
      <p style="text-align: center;">Email: your.email@example.com | Phone: (123) 456-7890 | Location: City, State</p>
      <h2>Professional Summary</h2>
      <p>Experienced professional with expertise in [Your Field]. Skilled in [Key Skills].</p>
      <h2>Work Experience</h2>
      <h3>Job Title</h3>
      <p>Company Name | Start Date - End Date</p>
      <ul>
        <li>Key achievement or responsibility</li>
        <li>Key achievement or responsibility</li>
      </ul>
      <h2>Education</h2>
      <h3>Degree Name</h3>
      <p>University Name | Graduation Year</p>
    </div>`
  },
  {
    id: "letter",
    label: "Business Letter",
    imageUrl: "/logo.svg",
    initialContent: `<div>
      <p style="text-align: right;">[Your Name]<br>[Your Address]<br>[City, State ZIP]<br>[Date]</p>
      <p>[Recipient's Name]<br>[Recipient's Title]<br>[Company Name]<br>[Company Address]<br>[City, State ZIP]</p>
      <p>Dear [Recipient's Name],</p>
      <p>[Your letter content goes here]</p>
      <p>Sincerely,<br>[Your Name]</p>
    </div>`
  },
  {
    id: "proposal",
    label: "Project Proposal",
    imageUrl: "/logo.svg",
    initialContent: `<div>
      <h1 style="text-align: center;">Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>[Brief overview of the project]</p>
      <h2>Project Objectives</h2>
      <ul>
        <li>Objective 1</li>
        <li>Objective 2</li>
      </ul>
      <h2>Project Scope</h2>
      <p>[Detailed description of project scope]</p>
      <h2>Timeline</h2>
      <p>[Project timeline and milestones]</p>
      <h2>Budget</h2>
      <p>[Budget breakdown]</p>
    </div>`
  },
  {
    id: "report",
    label: "Monthly Report",
    imageUrl: "/logo.svg",
    initialContent: `<div>
      <h1 style="text-align: center;">Monthly Report</h1>
      <h2>Executive Summary</h2>
      <p>[Brief summary of the month's activities and achievements]</p>
      <h2>Key Metrics</h2>
      <ul>
        <li>Metric 1: [Value]</li>
        <li>Metric 2: [Value]</li>
      </ul>
      <h2>Highlights</h2>
      <p>[Key highlights from the month]</p>
      <h2>Challenges</h2>
      <p>[Challenges faced and solutions implemented]</p>
      <h2>Next Steps</h2>
      <p>[Plans for the upcoming month]</p>
    </div>`
  },
  {
    id: "newsletter",
    label: "Newsletter",
    imageUrl: "/logo.svg",
    initialContent: `<div>
      <h1 style="text-align: center;">[Newsletter Title]</h1>
      <p style="text-align: center;">[Date]</p>
      <h2>Featured Story</h2>
      <p>[Main story content]</p>
      <h2>Updates</h2>
      <ul>
        <li>Update 1</li>
        <li>Update 2</li>
      </ul>
      <h2>Upcoming Events</h2>
      <p>[List of upcoming events]</p>
    </div>`
  },
  {
    id: "project",
    label: "Project letter",
    imageUrl: "/logo.svg",
    initialContent: `<div>
      <h1 style="text-align: center;">Project Letter</h1>
      <p>[Date]</p>
      <p>Dear [Recipient],</p>
      <p>I am writing to inform you about our upcoming project:</p>
      <h2>Project Overview</h2>
      <p>[Project description]</p>
      <h2>Project Details</h2>
      <ul>
        <li>Timeline: [Start Date - End Date]</li>
        <li>Budget: [Budget Amount]</li>
        <li>Team: [Team Members]</li>
      </ul>
      <p>Best regards,<br>[Your Name]</p>
    </div>`
  },
]