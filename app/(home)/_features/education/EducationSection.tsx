export function EducationSection() {
  return (
    <section
      className="section education reveal"
      aria-labelledby="education-heading"
    >
      <p className="sectionLabel">/ Education</p>
      <div className="sectionContent">
        <h2 className="sr-only" id="education-heading">
          Education
        </h2>
        <p className="educationSchool">
          King&apos;s College London{" "}
          <span className="educationDates">2017 - 2020</span>
        </p>
        <p className="educationDegree">BSc in Computer Science</p>
      </div>
    </section>
  );
}
