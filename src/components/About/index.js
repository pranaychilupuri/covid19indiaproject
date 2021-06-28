import Footer from '../Footer'
import './index.css'

const About = () => (
  <div className="about-container">
    <h1 className="about-heading">About</h1>
    <p className="update-para">Last update on march 28th 2021.</p>
    <p className="vaccine-para">COVID-19 vaccines be ready for distribution</p>
    <h1 className="questions">
      What are your sources? How is the data gathered for this project?
    </h1>
    <p className="answers">
      The vaccines must be proven safe and effective in large (phase III)
      clinical trials. Some COVID-19 vaccine candidates have completed their
      phase III trials, and many other potential vaccines are being developed.
      <br />
      Independent reviews of the efficacy and safety evidence is required for
      each vaccine candidate, including regulatory review and approval in the
      country where the vaccine is manufactured, before WHO considers a vaccine
      candidate for prequalification.
    </p>
    <h1 className="questions">
      Why does covid19india.org have difference in numbers compared to MOHFW
      website?
    </h1>
    <p className="answers">
      The vaccines must be manufactured in large quantities, which is a major
      and unprecedented challenge – all the while continuing to produce all the
      other important life-saving vaccines already in use. <br />
      As a final step, all approved vaccines will require distribution through a
      complex logistical process, with rigorous stock management and temperature
      control.
    </p>
    <h1 className="questions">Where can I find the data for this?</h1>
    <p className="answers">
      In addition to review of the data for regulatory purposes, the evidence
      must also be reviewed for the purpose of policy recommendations on how the
      vaccines should be used.
    </p>
    <h1 className="questions">
      Why are you guys putting in time and resources to do this while not
      gaining a single penny from it?
    </h1>
    <p className="answers">
      In addition to review of the data for regulatory purposes, the evidence
      must also be reviewed for the purpose of policy recommendations on how the
      vaccines should be used. <br />
      Officials in individual countries decide whether to approve the vaccines
      for national use and develop policies for how to use the vaccines in their
      country based on the WHO recommendations.
    </p>
    <h1 className="questions">Where can I find the data for this?</h1>
    <p className="answers">
      In addition to review of the data for regulatory purposes, the evidence
      must also be reviewed for the purpose of policy recommendations on how the
      vaccines should be used.
    </p>
    <Footer />
  </div>
)

export default About
