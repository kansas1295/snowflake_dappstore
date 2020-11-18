import React from "react";
import { CardBody, Collapse } from "reactstrap";
import PrivacyContent from "../../common/config/privacy.json";

const Privacy = () => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: PrivacyContent.title }} />
    {PrivacyContent.content.map((ele) => (
      <>
        <div dangerouslySetInnerHTML={{ __html: ele.subtitle }} />
        <Collapse isOpen={false}>
          <CardBody>
            <div dangerouslySetInnerHTML={{ __html: ele.data }} />
          </CardBody>
        </Collapse>
      </>
    ))}
  </div>
);

export default Privacy;
