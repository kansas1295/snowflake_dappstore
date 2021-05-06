import React from "react";
import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
} from "reactstrap";

import contractsJson from "../../common/config/submit/contracts.json";
import resourcesJson from "../../common/config/submit/resources.json";
import partnersJson from "../../common/config/submit/partners.json";
import snippetsJson from "../../common/config/submit/snippets.json";

import QA from "../../components/qa";
import faqJson from "../../common/config/submit/faq.json";

const Submit = () => (
  <div className="container-fluid">
    <div className="row">

      <div className="col-lg-12">
        <div className="title">Submit A dApp</div>
        <p>Looking to submit a dApp? Use the resources below to get started on bringing you idea to life.</p>
      </div>
      <hr style={{ width: '100%', background: '#726262' }}></hr>


      <div className="col-lg-12">
        <div className="submit_drop_title">3rd Party Partners</div>
        <p>The following resources are from our partners.</p>
      </div>
      {partnersJson.map((Partner) => (
        <div className="col-lg-3">
          <div className="submit_drop_main">
            <div className="title">{Partner.title}</div>
            <div className="description">{Partner.description}
              <br /><br />
              <img src={Partner.icon}
                alt={Partner.title} alt="3Box" width="80" />
            </div>
            <Button
              className="button"
              onClick={() => {
                window.open(Partner.link);
              }}
            >
              View Partner
              </Button>
          </div>
        </div>
      ))}

      <div className="col-lg-3">
        <div className="submit_drop_main">
          <div className="title">Become A Partner</div>
          <div className="description">Want to see your buttoned up dApp developer tools listed here?
          Join our growing curated list today!
            <br /><br />
            <img src="../../img/settings_icon.png"
              alt="Become A Partner" alt="3Box" width="80" />
          </div>
          <Button
            className="button"
            onClick={() => {
              window.open("mailto:da@projecthydro.org");
            }}
          >
            Become A Partner
            </Button>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="submit_drop_title">Resources & Tutorials</div>
        <p>Use the resources below to learn about best practices.</p>
      </div>
      {resourcesJson.map((Resource) => (
        <div className="col-lg-3">
          <div className="submit_drop_main">
            <div className="title">{Resource.title}</div>
            <div className="description">{Resource.description}
              <br /><br />
              <img src={Resource.icon}
                alt={Resource.title} alt="3Box" width="80" />
            </div>
            <Button
              className="button"
              onClick={() => {
                window.open(Resource.link);
              }}
            >
              View Resource
              </Button>
          </div>
        </div>
      ))}

      <div className="col-lg-12">
        <div className="submit_drop_title">Code Snippets</div>
        <p>Below are some code snippets to get you started.</p>
      </div>
      {snippetsJson.map((Snippet) => (
        <div className="col-lg-3">
          <div className="submit_drop_main">
            <div className="title">{Snippet.title}</div>
            <div className="description">{Snippet.description}
              <br /><br />
              <img src={Snippet.icon}
                alt={Snippet.title} alt="3Box" width="80" />
            </div>
            <Button
              className="button"
              onClick={() => {
                window.open(Snippet.link);
              }}
            >
              View Code Snippet
              </Button>
          </div>
        </div>
      ))}

      <div className="col-lg-12">
        <div className="submit_drop_title">Hydro Smart Contracts</div>
        <p>The smart contracts below can speed up your dApp development time.</p>
      </div>
      {contractsJson.map((Contract) => (
        <div className="col-lg-3">
          <div className="submit_drop_main">
            <div className="title">{Contract.title}</div>
            <div className="description">{Contract.description}
              <br /><br />
              <img src={Contract.icon}
                alt={Contract.title} alt="3Box" width="80" />
            </div>
            <Button
              className="button"
              onClick={() => {
                window.open(Contract.link);
              }}
            >
              View Contract
              </Button>
          </div>
        </div>
      ))}

      <div className="col-lg-12">
        <div className="submit_drop_title">FAQ</div>
        <p>Have a question about dApp development or submitting to the store,
            read below</p>
      </div>
      <div className="col-lg-12">
        {faqJson.map((qa) => (
          <QA
            key={qa.question}
            question={qa.question}
            answer={qa.answer}
          />
        ))}
      </div>

      <div className="col-lg-12">
        <div className="additional_help_main">
          <div className="row">
            <div className="col-lg-10">
              <h2>Need Additional Help?</h2>
              <p>Send us a message via Telegram</p>
            </div>

            <div className="col-lg-2">
              <Button type="button" onClick={() => { window.open("https://t.me/projecthydro"); }} className="button" >Get Assistance</Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Submit;
