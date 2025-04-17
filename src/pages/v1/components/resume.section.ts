import { differenceInMonths, differenceInYears } from "date-fns";
import { Version1Config } from "../../../lib/schemas/v1/config.v1.js";
import { Job, TODAY } from "../../../lib/schemas/v1/career-zod-schema.js";

export default function resumeSection(context: Version1Config): string {
  
  const noJobs = context.career.jobs.filter(item => item.show_on.website).length === 0;
  const noEducation = context.career.education.filter(item => item.show_on.website).length === 0;

  // TODO: add the link to pdf!

  const result = (innerHTML: string) => ( /*html*/`
    <section id="resume">
    <h2 class="mt-16">Resume</h2>
      <p>
        My resume is also available as a pdf document. You can <a href="./curriculum-vitae.pdf" target="_blank">download my 
        cv</a> also freshly compiled for you.
      </p>
      ${innerHTML}
    </section>
  `);

  // When there is no matching on tuples...
  switch (`${noEducation} ${noJobs}`) {
    case "false false": return result(/*html*/`
      <div class="md:grid grid-cols-2">
        <div>${namedJobSection("Experience", context.career.jobs, true)}</div>
        <div>${namedJobSection("Education", context.career.education, false)}</div>
      </div>
    `);

    case "true false":
    case "false true": return result(/*html*/`
      ${namedJobSection("Experience", context.career.jobs, true)}
      ${namedJobSection("Education", context.career.education, false)}
    `);

    default: return "";
  }
}

function JobToHTML(item: Job, showTotalTime: boolean) {

  const start_date = new Date(item.start_date);
  const end_date = new Date(item.end_date);

  const years = differenceInYears(end_date, start_date);
  const months = differenceInMonths(end_date, start_date) - years * 12;

  const yearsStr = (years === 0 ? "" : ( years === 1 ? "1&nbsp;year" : `${years}&nbsp;years` ));
  const monthsStr = (months === 0 ? "" : ( months === 1 ? "1&nbsp;month" : `${months}&nbsp;months` ));
  const timeStr = ( yearsStr === "" || monthsStr === "" ? `${yearsStr}${monthsStr}` : `${yearsStr},&nbsp;${monthsStr}` );

  const monthsMap = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec" ];
  const fromStr = `${monthsMap[start_date.getMonth()]} ${start_date.getFullYear()}`
  const tillStr = ( item.end_date === TODAY 
    ? "Present" 
    : `${monthsMap[end_date.getMonth()]} ${end_date.getFullYear()}`
  );

  const totalTimeStr = ( showTotalTime ? `(${timeStr})` : "" );

  return (/*html*/`
    <li class="relative">
      <h4 class="ml-2 uppercase font-semibold text-base mt-6">${item.name}</h4>
      <p class="m-2"><span class="uppercase">${fromStr}&nbsp;-&nbsp;${tillStr}</span> ${totalTimeStr}</p>
      <p class="m-2">${item.description}</p>
      <p class="m-2">${item.location}</p>
    </li>`
  );
}

/** This function generates the jobs section from the context. */
export function namedJobSection(title: string, array: Job[], showTotalTime: boolean): string {
  
  const items = array.filter(item => item.show_on.website);

  if (items.length === 0) return "";

  return ( /*html*/`
    <h3 class="mt-12" id="resume-${title.toLowerCase()}">${title}</h3>
    <ol class="marker:text-text-header">
      ${items.map(item => JobToHTML(item, showTotalTime)).join("\n")}
    </ol>`
  );
}
