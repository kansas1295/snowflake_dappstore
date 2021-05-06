import React from "react";
import { Row, Col, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

function AdditionalHelp() {
  return (
    // <div>
    //   <Row className="">
    //     <Col>
    //       <Row className="additional-help align-items-center">
    //         <Col>
    //           <h4 className="additional-help__title">Add A dApp</h4>
    //           <p className="additional-help__subtitle">
    //             You do not have any dApps. Add one from the dApp Store and it
    //             will show up here.
    //           </p>
    //         </Col>
    //         <Col sm="4" className="text-right">
    //           <Button tag={NavLink} to="/" className="btn-outlined">
    //             Explore
    //           </Button>
    //         </Col>
    //       </Row>
    //     </Col>
    //   </Row>
    // </div>
    <div className="col-lg-12">
      <div className="additional_help_main">
        <div className="row">
          <div className="col-lg-10">
            <h2>Add A dApp</h2>
            <p>You do not have any dApps. Add one from the dApp Store and it will show up here.</p>
          </div>

          <div className="col-lg-2">
            <Button type="button" tag={NavLink} to="/" className="button" >Explore</Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdditionalHelp;
